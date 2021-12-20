import rehypePrism from '@mapbox/rehype-prism';
import { promises as fs } from 'fs';
import { JSDOM } from 'jsdom';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeMinify from 'rehype-preset-minify';
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

const getPostHTML = async (folder) => {
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
        traverseTreeForMedia(folder, tree.children);
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

const traverseTreeForMedia = (folder, tree) => {
  for (const node of tree) {
    if (node.children && node.children.length > 0) {
      traverseTreeForMedia(folder, node.children);
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
  if (dom.window.document.querySelector('code')) {
    styles = styles.concat(css`
      @import url('https://cdn.jsdelivr.net/npm/hack-font@3/build/web/hack-subset.css');
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
        padding: 0.5em;
        overflow-x: auto;
      }

      .dark .content code .token.punctuation {
        color: #f0c040;
      }

      .dark .content code .token.class-name {
        color: #50c0f0;
      }

      .dark .content code .token.keyword {
        color: #f05080;
      }

      .dark .content code .token.operator {
        color: #f09040;
      }

      .dark .content code .token.boolean {
        color: #b090f0;
      }

      .dark .content code .token.attr-name,
      .dark .content code .token.function {
        color: #80c000;
      }

      .dark .content code .token.comment {
        color: #909090;
      }

      .light .content code .token.punctuation {
        color: #a09000;
      }

      .light .content code .token.class-name {
        color: #1080a0;
      }

      .light .content code .token.keyword {
        color: #a01060;
      }

      .light .content code .token.operator {
        color: #b07040;
      }

      .light .content code .token.boolean {
        color: #a070c0;
      }

      .light .content code .token.attr-name,
      .light .content code .token.function {
        color: #60a000;
      }

      .light .content code .token.comment {
        color: #909090;
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
