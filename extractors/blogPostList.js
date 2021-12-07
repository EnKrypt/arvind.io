import { promises as fs } from 'fs';
import remarkFrontmatter from 'remark-frontmatter';
import remarkParse from 'remark-parse';
import { unified } from 'unified';
import YAML from 'yaml';

const getBlogPostList = async (page = 1, tag = '', postsInAPage) => {
  const folders = await fs.readdir('./posts');
  const posts = await Promise.all(
    folders.map(async (folder) => {
      const tree = await getPostTree(folder);
      return {
        frontmatter: getFrontmatter(tree),
        excerpt: getExcerpt(tree)
      };
    })
  );
  return posts
    .filter((post) => (tag ? post.frontmatter.tags.includes(tag) : true))
    .sort((a, b) => -a.frontmatter.date.localeCompare(b.frontmatter.date))
    .slice((page - 1) * postsInAPage, page * postsInAPage);
};

export const getPostTree = async (folder) => {
  return (
    await unified()
      .use(remarkParse)
      .use(remarkFrontmatter)
      .parse(
        await fs.readFile(`./posts/${folder}/index.md`, {
          encoding: 'utf8'
        })
      )
  ).children;
};

export const getFrontmatter = (tree) => {
  if (tree[0].type === 'yaml' && tree[0].value) {
    try {
      const frontmatter = YAML.parse(tree[0].value);
      return {
        ...frontmatter,
        // Need at least node v13 for en-GB locale
        formattedDate: new Intl.DateTimeFormat('en-GB', {
          dateStyle: 'long',
          timeZone: 'UTC'
        }).format(new Date(frontmatter.date))
      };
    } catch (err) {
      console.error(
        'FATAL: Could not parse YAML frontmatter for a blog post. Is the syntax wrong? Process will terminate.',
        err
      );
      process.exit(1);
    }
  } else {
    console.error(
      'FATAL: Could not find YAML frontmatter for a blog post. Process will terminate.'
    );
    process.exit(1);
  }
};

const getExcerpt = (tree) => {
  const limit = 300; // Excerpt should not be more than 300 characters
  const excerpt = traverseTreeForText(tree, '', limit);
  /* We passed `limit` to the above recursive function so that it knows
   * to come out of recursion as soon as the size of the built excerpt
   * exceeds `limit` to avoid wasted computation. This means that the
   * returned excerpt will likely be above that limit and needs further
   * pruning. To do this cleanly we truncate the excerpt up to the last
   * word that keeps it below `limit`.
   */
  if (excerpt.length <= limit) {
    return excerpt;
  }
  return excerpt
    .substring(0, limit)
    .split(' ')
    .slice(0, -1)
    .join(' ')
    .concat('...');
};

const traverseTreeForText = (tree, excerpt, limit) => {
  let modifiedExcerpt = excerpt;
  for (const node of tree) {
    if (node.children && node.children.length > 0) {
      modifiedExcerpt = traverseTreeForText(
        node.children,
        modifiedExcerpt,
        limit
      );
    } else if (node.type === 'text' && node.value) {
      if (modifiedExcerpt) {
        modifiedExcerpt = modifiedExcerpt.concat(' ', node.value);
      } else {
        modifiedExcerpt = node.value;
      }
    }
    if (modifiedExcerpt.length > limit) {
      return modifiedExcerpt;
    }
  }
  return modifiedExcerpt;
};

export default getBlogPostList;
