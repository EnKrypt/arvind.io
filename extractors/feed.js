import { Feed } from 'feed';
import { promises as fs } from 'fs';
import { getPostHTML } from './blogPost';
import { getBlogPostSlugs, getFrontmatter, getPostTree } from './blogPostList';
import getConfig from './config';

const generateFeed = async () => {
  console.log('\nGenerating feeds...');
  const config = await getConfig();

  const feed = new Feed({
    title: config.TITLE,
    description: config.DESCRIPTION,
    id: config.URL,
    link: config.URL,
    language: 'en',
    image: `${config.URL}/images/preview.png`,
    favicon: `${config.URL}/manifest/favicon.ico`,
    feedLinks: {
      rss: `${config.URL}/rss.xml`,
      atom: `${config.URL}/atom.xml`
    },
    author: {
      name: config.AUTHOR,
      email: config.EMAIL,
      link: config.URL
    }
  });

  const folders = await getBlogPostSlugs();
  const posts = (
    await Promise.all(
      folders.map(async (folder) => {
        const tree = await getPostTree(folder);
        const html = await getPostHTML(folder, true);
        return {
          html,
          frontmatter: getFrontmatter(tree)
        };
      })
    )
  )
    .sort((a, b) => -a.frontmatter.date.localeCompare(b.frontmatter.date))
    .slice(0, 10);

  posts.forEach((post) => {
    feed.addItem({
      title: post.frontmatter.title,
      id: post.frontmatter.key,
      link: `${config.URL}/posts/${post.frontmatter.key}`,
      description: post.frontmatter.description,
      content: post.html,
      author: {
        name: config.AUTHOR,
        email: config.EMAIL,
        link: config.URL
      },
      date: new Date(post.frontmatter.date),
      image: `${config.URL}/images/previews/${post.frontmatter.key}.png`
    });
  });

  await fs.writeFile('./public/rss.xml', feed.rss2());
  await fs.writeFile('./public/atom.xml', feed.atom1());
  console.log('\nRSS and Atom feeds generated.');
};

export default generateFeed;
