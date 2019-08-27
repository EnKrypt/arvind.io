const noConfig = variable => {
    console.error(
        "Required environment variable '" +
            variable +
            "' is not set.\nTerminating."
    );
    process.exit(1);
    return '';
};

// Set the corresponding environment variables, or replace the values here before using it in your environment.
module.exports = {
    TITLE: process.env.TITLE || noConfig('TITLE'), // Required
    AUTHOR: process.env.AUTHOR || noConfig('AUTHOR'), // Required
    URL: process.env.URL || noConfig('URL'), // Required
    EMAIL: process.env.EMAIL || noConfig('EMAIL'), // Required
    DESCRIPTION: process.env.DESCRIPTION || noConfig('DESCRIPTION'), // Required
    FATHOMSITEID: process.env.FATHOMSITEID || noConfig('FATHOMSITEID'), // Required
    DISQUSSHORTNAME: process.env.DISQUSSHORTNAME || noConfig('DISQUSSHORTNAME'), // Required
};
