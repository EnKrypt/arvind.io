import React from 'react';
import Helmet from 'react-helmet';

// Common meta tags for the entire website
const Meta = ({ metadata }) => {
    return (
        <Helmet>
            <meta charset="utf-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />

            <meta name="title" content={metadata.title} />
            <meta name="description" content={metadata.description} />
            <meta name="robots" content="all" />
            <meta name="referrer" content="origin" />
            <meta name="viewport" id="viewport" content="width=device-width, initial-scale=1" />
            <meta property="og:title" content={metadata.title} />
            <meta property="og:image" content={metadata.image || '/images/preview.png'} />
            <meta property="og:description" content={metadata.description} />
            <meta itemprop="name" content={metadata.title} />
            <meta itemprop="description" content={metadata.description} />
            <meta itemprop="image" content="/images/preview.png" />

            <meta name="msapplication-config" content="/icons/browserconfig.xml" />
            <meta name="theme-color" content="#0094ff" />
            <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
            <link rel="icon" type="image/png" href="/icons/favicon-32x32.png" sizes="32x32" />
            <link rel="icon" type="image/png" href="/icons/favicon-16x16.png" sizes="16x16" />
            <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#0094ff" />
            <link rel="shortcut icon" href="/icons/favicon.ico" />
            <link rel="manifest" href="/manifest.webmanifest" />
        </Helmet>
    );
};

export default Meta;
