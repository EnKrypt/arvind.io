const withPlugins = require('next-compose-plugins');
const withPreact = require('next-plugin-preact');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});

const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (isServer || process.env.NODE_ENV === 'development') {
      return config;
    }
    return {
      ...config,
      entry: config.entry().then((entry) => {
        return {
          polyfills:
            './node_modules/next/dist/build/polyfills/polyfill-nomodule.js',
          'pages/_app': './client/app.js'
        };
      })
    };
  }
};

module.exports = withPlugins([[withPreact], [withBundleAnalyzer]], nextConfig);
