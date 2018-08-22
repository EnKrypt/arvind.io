var config = require('./config');

module.exports = {
    siteMetadata: {
        title: config.TITLE,
        author: config.AUTHOR,
        description: config.DESCRIPTION,
        siteUrl: config.URL,
        disqusId: config.DISQUSSHORTNAME,
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
                            linkImagesToOriginal: false,
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
                trackingId: config.GATRACKINGID,
            },
        },
        `gatsby-plugin-feed`,
        `gatsby-plugin-offline`,
        `gatsby-plugin-sass`,
        `gatsby-plugin-react-helmet`,
    ],
};
