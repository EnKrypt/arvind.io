import { promises as fs } from 'fs';

const noConfig = (variable) => {
  console.error(
    `Required configuration variable '${variable}' is not set.\nTerminating.`
  );
  process.exit(1);
};

const getConfig = async () => {
  let env = {};
  try {
    env = JSON.parse(
      await fs.readFile('../configurations/envs/arvind.io.config.json')
    );
  } catch (err) {
    console.warn(err);
  }
  // Set the corresponding configuration variables, or replace the values here.
  return {
    TITLE: env.title || process.env.TITLE || noConfig('title'), // Required
    AUTHOR: env.author || process.env.AUTHOR || noConfig('author'), // Required
    URL: env.url || process.env.URL || noConfig('url'), // Required
    EMAIL: env.email || process.env.EMAIL || noConfig('email'), // Required
    DESCRIPTION:
      env.description || process.env.DESCRIPTION || noConfig('description'), // Required
    FATHOMSITEID:
      env.fathomSiteID || process.env.FATHOMSITEID || noConfig('fathomSiteID'), // Required
    DISQUSSHORTNAME:
      env.disqusShortname ||
      process.env.DISQUSSHORTNAME ||
      noConfig('disqusShortname') // Required
  };
};

export default getConfig;
