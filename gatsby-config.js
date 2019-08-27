var config = require('./config');

module.exports = {
    siteMetadata: {
        title: config.TITLE,
        author: config.AUTHOR,
        email: config.EMAIL,
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
                            maxWidth: 650,
                            quality: 90,
                            linkImagesToOriginal: false,
                        },
                    },
                    `gatsby-remark-responsive-iframe`,
                    'gatsby-remark-prismjs',
                    'gatsby-remark-copy-linked-files',
                    'gatsby-remark-external-links',
                    'gatsby-remark-smartypants',
                ],
            },
        },
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: config.TITLE,
                short_name: config.TITLE,
                start_url: '/',
                background_color: '#202020',
                theme_color: '#0094ff',
                display: 'standalone',
                icon: 'static/images/logo-icon.png',
            },
        },
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        {
            resolve: 'gatsby-plugin-fathom',
            options: {
                trackingUrl: 'fathom.arvind.io',
                siteId: config.FATHOMSITEID,
            },
        },
        `gatsby-plugin-feed`,
        `gatsby-plugin-sass`,
        `gatsby-plugin-react-helmet`,
    ],
};
