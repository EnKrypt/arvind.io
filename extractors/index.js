import getNotFoundGifs from './404gifs';
import getConfig from './config';
import getFontFacesToInject from './fonts';

// Build time data fetching is put here under various extractors

export const commonExtractor = async () => {
  const config = await getConfig();
  const fontFaces = await getFontFacesToInject();
  return { config, fontFaces };
};

export const notFoundPageExtractor = async () => {
  const notFoundGifs = await getNotFoundGifs();
  return { notFoundGifs };
};
