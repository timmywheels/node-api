module.exports = {
    APPLICATION: {
        COOKIE: process.env.COOKIE
    },
    AWS: {
        S3: {
            BUCKET_NAME: process.env.S3_BUCKET_NAME,
            BUCKET_URL: process.env.S3_BUCKET_URL,
        },

    },
    GOOGLE: {
        CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET
    },
    MONGO: {
        URI: process.env.MONGO_URI
    }
};
