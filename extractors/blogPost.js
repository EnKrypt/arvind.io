import { promises as fs } from 'fs';
import { JSDOM } from 'jsdom';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeMinify from 'rehype-preset-minify';
import rehypePrism from 'rehype-prism-plus';
import rehypeStringify from 'rehype-stringify';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import remarkSmartypants from 'remark-smartypants';
import { unified } from 'unified';
import theme from '../theme';
import {
  getBlogPostSlugs,
  getExcerpt,
  getFrontmatter,
  getPostTree
} from './blogPostList';

const getBlogPost = async (slug) => {
  const folders = await getBlogPostSlugs();
  const posts = (
    await Promise.all(
      folders.map(async (folder) => {
        const tree = await getPostTree(folder);
        return {
          tree,
          frontmatter: getFrontmatter(tree)
        };
      })
    )
  ).sort((a, b) => -a.frontmatter.date.localeCompare(b.frontmatter.date));
  const postIndex = posts.findIndex((post) => post.frontmatter.key === slug);
  if (postIndex < 0) {
    console.error(
      `FATAL: Could not generate blog post page with slug ${slug} as the slug was not found in the posts array. Process will terminate.`,
      err
    );
    process.exit(1);
  }
  const html = await getPostHTML(slug);
  const post = {
    frontmatter: posts[postIndex].frontmatter,
    excerpt: getExcerpt(posts[postIndex].tree),
    html,
    styles: getPostContentStyles(html)
  };
  return {
    post,
    prevPost:
      postIndex === posts.length - 1 ? false : posts[postIndex + 1].frontmatter,
    nextPost: postIndex === 0 ? false : posts[postIndex - 1].frontmatter
  };
};

export const getPostHTML = async (folder, skipSrcSet) => {
  return (
    await unified()
      .use(remarkParse)
      .use(remarkFrontmatter)
      .use(remarkGfm)
      .use(remarkSmartypants)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeExternalLinks)
      .use(rehypePrism)
      .use(() => (tree) => {
        traverseTreeForMedia(folder, tree.children, skipSrcSet);
      })
      .use(rehypeMinify)
      .use(rehypeStringify, { allowDangerousHtml: true })
      .process(
        await fs.readFile(`./posts/${folder}/index.md`, {
          encoding: 'utf8'
        })
      )
  ).value;
};

const traverseTreeForMedia = (folder, tree, skipSrcSet) => {
  for (const node of tree) {
    if (node.children && node.children.length > 0) {
      traverseTreeForMedia(folder, node.children, skipSrcSet);
    } else if (
      node.type === 'element' &&
      node.tagName === 'img' &&
      node.properties &&
      node.properties.src &&
      node.properties.src.startsWith('./') &&
      (node.properties.src.endsWith('.png') ||
        node.properties.src.endsWith('.jpg'))
    ) {
      let image = {};
      if (node.properties.src.endsWith('.jpg')) {
        image = require(`../posts/${folder}/${node.properties.src.substring(
          2,
          node.properties.src.length - 4
        )}.jpg?resize`);
      } else if (node.properties.src.endsWith('.png')) {
        image = require(`../posts/${folder}/${node.properties.src.substring(
          2,
          node.properties.src.length - 4
        )}.png?resize`);
      }
      if (skipSrcSet) {
        node.properties.src =
          image.images[image.images.length - 1].path || image.src;
      } else {
        const width = image.images[image.images.length - 1].width;
        const height = image.images[image.images.length - 1].height;
        node.properties.style = `width: ${Math.min(
          650,
          width
        )}px; aspect-ratio: ${width} / ${height};`;
        node.properties.class = 'lazy';
        node.properties.src = image.placeholder || image.src;
        node.properties['data-srcset'] = image.srcSet;
        node.properties.sizes = `(max-width: 768px) min(${width}px, calc(100vw - 64px)), ${Math.min(
          650,
          width
        )}px`;
      }
    } else if (
      node.type === 'element' &&
      node.tagName === 'img' &&
      node.properties &&
      node.properties.src &&
      node.properties.src.startsWith('./') &&
      (node.properties.src.endsWith('.webm') ||
        node.properties.src.endsWith('.webm'))
    ) {
      const video = require(`../posts/${folder}/${node.properties.src.substring(
        2,
        node.properties.src.length - 5
      )}.webm`);
      node.tagName = 'video';
      node.properties = { controls: true, class: 'embed' };
      node.children = [
        {
          type: 'element',
          tagName: 'source',
          properties: {
            src: `/_next/static/chunks/${video.match(/[^\/]+$/)[0]}`,
            type: 'video/webm'
          }
        },
        {
          type: 'text',
          value: "Sorry, your browser doesn't support embedded videos."
        }
      ];
    }
  }
  return;
};

const getPostContentStyles = (html) => {
  let styles = '';
  const dom = new JSDOM(html);
  if (dom.window.document.querySelector('img')) {
    styles = styles.concat(css`
      .content img {
        display: block;
        margin: 0 auto;
      }

      @media (max-width: 768px) {
        .content img {
          max-width: calc(100vw - 64px);
        }
      }
    `);
  }
  if (dom.window.document.querySelector('h2')) {
    styles = styles.concat(css`
      .content h2 {
        font-size: 1.4em;
      }
    `);
  }
  if (dom.window.document.querySelector('h5')) {
    styles = styles.concat(css`
      .content h5 {
        color: ${theme.colors.gray};
        font-size: 0.7em;
        font-weight: 400;
      }
    `);
  }
  if (dom.window.document.querySelector('.embed')) {
    styles = styles.concat(css`
      .content .embed {
        width: 100%;
        border: none;
        aspect-ratio: 16 / 9;
      }
    `);
  }
  if (dom.window.document.querySelector('.index')) {
    styles = styles.concat(css`
      .content .index {
        max-width: 30em;
        width: max-content;
        font-family: 'Signika';
        font-size: 0.8em;
        padding: 0.5em;
        margin: 2.5em auto;
        border-radius: 0.5em;
        text-align: left;
      }

      .content .index-title {
        text-align: center;
        padding-bottom: 0.25em;
        border-bottom: solid 1px ${theme.colors.gray};
      }

      .content .index ul {
        padding-right: 1em;
      }

      .content .index a {
        text-decoration: none;
        color: ${theme.colors.primary};
      }

      .dark .content .index {
        background-color: ${theme.colors.darkgray};
      }

      .light .content .index {
        background-color: ${theme.colors.lightgray};
      }

      @media (max-width: 768px) {
        .content .index {
          max-width: 100%;
        }
      }
    `);
  }
  if (dom.window.document.querySelector('.footnotes')) {
    styles = styles.concat(css`
      .content sup a[id^='user-content-fnref-'] {
        padding: 3.6em 0.1em 0.1em 0.1em;
        margin-top: -3.5em;
        font-size: 0.9em;
      }

      .content sup a[id^='user-content-fnref-']:before {
        content: '[';
      }

      .content sup a[id^='user-content-fnref-']:after {
        content: ']';
      }

      .content .footnotes {
        font-size: 0.8em;
      }

      .content .footnotes h2 {
        font-size: 0;
        border-bottom: solid 1px ${theme.colors.gray};
      }

      .content .footnotes ol {
        padding: 0;
      }

      .content .footnotes li {
        padding-top: 3.5em;
        margin-top: -3.5em;
        list-style-type: none;
      }

      .content .footnotes li p {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1em;
        margin-block-start: 0.5em;
        margin-block-end: 0.5em;
      }
    `);
  }
  if (dom.window.document.querySelector('blockquote')) {
    styles = styles.concat(css`
      .content blockquote {
        font-style: italic;
        color: ${theme.colors.brown};
        border-left: 10px solid;
        margin: 1em;
        padding: 0.5em;
        quotes: '\201C''\201D''\2018''\2019';
      }

      .content blockquote p {
        display: inline;
      }

      .content blockquote:before {
        content: open-quote;
        font-size: 4em;
        line-height: 0.1em;
        margin-right: 0.25em;
        vertical-align: -0.4em;
      }
    `);
  }
  if (dom.window.document.querySelector('table')) {
    styles = styles.concat(css`
      .content th {
        text-align: center;
      }

      .content td {
        padding: 0em 0.5em;
      }
    `);
  }
  if (dom.window.document.querySelector('.choice-a')) {
    styles = styles.concat(css`
      .content .choice-a {
        color: ${theme.colors.orange};
      }
    `);
  }
  if (dom.window.document.querySelector('.choice-b')) {
    styles = styles.concat(css`
      .content .choice-b {
        color: ${theme.colors.cyan};
      }
    `);
  }
  if (dom.window.document.querySelector('.internal-link')) {
    styles = styles.concat(css`
      .content .internal-link {
        padding-top: 2.5em;
        margin-top: -2.5em;
      }
    `);
  }
  if (dom.window.document.querySelector('code')) {
    styles = styles.concat(css`
      @font-face {
        font-family: 'Hack';
        src: url('https://cdn.jsdelivr.net/npm/hack-font@3/build/web/fonts/hack-regular-subset.woff2?sha=3114f1256')
          format('woff2');
        font-weight: 400;
        font-style: normal;
      }

      .content code {
        font-family: 'Hack';
        font-size: 0.7em;
        padding: 0.2em 0.4em;
        border-radius: 0.2em;
      }

      .dark .content code {
        background-color: ${theme.colors.darkgray};
      }

      .light .content code {
        background-color: ${theme.colors.lightgray};
      }
    `);
  }
  if (dom.window.document.querySelector('pre > code')) {
    styles = styles.concat(css`
      .content pre code {
        display: block;
        overflow-x: auto;
        font-size: 0.6em;
        padding: 0.75em;
      }

      .content pre code.code-highlight {
        padding: 0.5em 0;
        color: #f8f8f2;
        border-radius: 0.75em;
        background-color: #272822;
      }

      .content code .code-line {
        display: block;
        padding: 0.25em 1em;
        border-left: solid 5px #404030;
        white-space: pre-wrap;
        text-align: left;
      }

      .content code .code-line.line-number {
        padding-left: 3em;
      }

      .content code .code-line.code-line:hover {
        background-color: #363634;
      }

      .content code .code-line.highlight-line {
        border-left: solid 5px #a09080;
        background-color: #404030;
      }

      .content code .line-number::before {
        content: attr(line);
        width: 1.75em;
        display: inline-block;
        text-align: right;
        padding-right: 1em;
        color: #747474;
        margin-left: -3em;
      }

      .content code .token.punctuation {
        color: #ffb51d;
      }

      .content code .token.attr-name,
      .content code .token.class-name {
        color: #a6e22e;
      }

      .content code .token.keyword {
        color: #66d9ef;
      }

      .content code .token.number,
      .content code .token.boolean {
        color: #ae81ff;
      }

      .content code .token.string {
        color: #e6db74;
      }

      .content code .token.operator,
      .content code .token.ip-address,
      .content code .token.function {
        color: #f92672;
      }

      .content code .token.date,
      .content code .token.time,
      .content code .token.comment {
        color: #85816e;
      }
    `);
  }
  return styles.replace(/\s+/g, ' ');
};

// This is a trick to make the editor apply css syntax highlighting to the string
// literals above when you have the vscode-styled-components extension installed.
// Felt good to have figured this out spontaneously. https://i.giphy.com/media/yGLA1z4KSOPxFIDTJx/giphy.webp
const css = String.raw;

export default getBlogPost;
