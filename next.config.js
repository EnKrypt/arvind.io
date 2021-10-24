const withPlugins = require('next-compose-plugins');
const withPreact = require('next-plugin-preact');
const optimizedImages = require('next-optimized-images');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});

const nextConfig = {
  reactStrictMode: true,
  images: {
    disableStaticImages: true
  },
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

module.exports = withPlugins(
  [
    [
      optimizedImages,
      {
        responsive: {
          adapter: require('responsive-loader/sharp'),
          min: 64,
          max: 1920,
          steps: 30,
          format: 'webp',
          placeholder: true
        },
        imagesOutputPath: '../../static/images/',
        inlineImageLimit: -1,
        optimizeImages: false
      }
    ],
    [withPreact],
    [withBundleAnalyzer]
  ],
  nextConfig
);
