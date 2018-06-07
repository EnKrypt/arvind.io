// This import is for my personal deployment convenience.
// Remove and replace the values before using it in your environment.
var config = require('../configurations/arvind.io.config');

module.exports = {
    siteMetadata: {
        title: config.title,
        author: config.author,
        description: config.description,
        siteUrl: config.url,
    },
    plugins: [
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/src/pages`,
                name: 'pages',
            },
        },
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: [
                    {
                        resolve: `gatsby-remark-images`,
                        options: {
                            maxWidth: 590,
                        },
                    },
                    {
                        resolve: `gatsby-remark-responsive-iframe`,
                        options: {
                            wrapperStyle: `margin-bottom: 1.0725rem`,
                        },
                    },
                    'gatsby-remark-prismjs',
                    'gatsby-remark-copy-linked-files',
                    'gatsby-remark-smartypants',
                ],
            },
        },
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        {
            resolve: `gatsby-plugin-google-analytics`,
            options: {
                trackingId: config.GATrackingID,
            },
        },
        `gatsby-plugin-feed`,
        `gatsby-plugin-offline`,
        `gatsby-plugin-preact`,
        `gatsby-plugin-react-helmet`,
    ],
};
