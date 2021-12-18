import { promises as fs } from 'fs';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeStringify from 'rehype-stringify';
import remarkFrontmatter from 'remark-frontmatter';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import remarkSmartypants from 'remark-smartypants';
import { unified } from 'unified';
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
  const post = {
    frontmatter: posts[postIndex].frontmatter,
    excerpt: getExcerpt(posts[postIndex].tree),
    html: await getPostHTML(slug)
  };
  return {
    post,
    prevPost: postIndex === 0 ? false : posts[postIndex - 1].frontmatter,
    nextPost:
      postIndex === posts.length - 1 ? false : posts[postIndex + 1].frontmatter
  };
};

const getPostHTML = async (folder) => {
  return (
    await unified()
      .use(remarkParse)
      .use(remarkFrontmatter)
      .use(remarkSmartypants)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeExternalLinks)
      .use(() => (tree) => {
        traverseTreeForImages(folder, tree.children);
      })
      .use(rehypeStringify, { allowDangerousHtml: true })
      .process(
        await fs.readFile(`./posts/${folder}/index.md`, {
          encoding: 'utf8'
        })
      )
  ).value;
};

const traverseTreeForImages = (folder, tree) => {
  for (const node of tree) {
    if (node.children && node.children.length > 0) {
      traverseTreeForImages(folder, node.children);
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
    }
  }
  return;
};

export default getBlogPost;
