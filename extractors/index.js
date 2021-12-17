import getNotFoundGifs from './404gifs';
import getBlogPostList, { getBlogPostSlugs } from './blogPostList';
import getBlogPost from './blogPost';
import getConfig from './config';
import getFontFacesToInject from './fonts';
import {
  getNumberOfPages,
  getUniqueTagPages,
  getUniqueTags
} from './pathGenerators';

// Build time data fetching is put here under various extractors

const postsInAPage = 5;

export const commonExtractor = async () => {
  const config = await getConfig();
  const fontFaces = await getFontFacesToInject();
  return { config, fontFaces };
};

export const notFoundPageExtractor = async () => {
  const notFoundGifs = await getNotFoundGifs();
  return { notFoundGifs };
};

export const blogPostListExtractor = async (page, tag) => {
  const blogPostList = await getBlogPostList(page, tag, postsInAPage);
  return { blogPostList };
};

export const blogPostSlugsExtractor = async () => {
  const blogPostSlugs = await getBlogPostSlugs();
  return { blogPostSlugs };
};

export const numberOfPagesExtractor = async () => {
  const numberOfPages = await getNumberOfPages(postsInAPage);
  return { numberOfPages };
};

export const uniqueTagsExtractor = async () => {
  const uniqueTags = await getUniqueTags();
  return { uniqueTags };
};

export const uniqueTagPagesExtractor = async () => {
  const uniqueTagPages = await getUniqueTagPages(postsInAPage);
  return { uniqueTagPages };
};

export const blogPostExtractor = async (slug) => {
  return await getBlogPost(slug);
};
