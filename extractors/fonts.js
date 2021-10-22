import fetch from 'node-fetch';
import theme from '../theme';

const getFontFacesToInject = async () =>
  await (
    await fetch(
      `https://fonts.googleapis.com/css2?family=${theme.fonts.secondary
        .split(' ')
        .join(
          '+'
        )}:ital,wght@0,400;0,500;1,400;1,500&family=${theme.fonts.primary
        .split(' ')
        .join('+')}:wght@300;400&display=swap`,
      {
        /*
         * We have to do this sadly because if Google thinks we're not hitting this URL from a
         * browser, it results in font-face styles that fetches almost 200 KB of extra resources,
         * lowering the pagespeed score. Google wants a hack to work well, so we wrote one.
         */
        headers: {
          'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36'
        }
      }
    )
  ).text();

export default getFontFacesToInject;
