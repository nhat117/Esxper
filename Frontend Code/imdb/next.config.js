/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,
    env: {
        MV_DETAIL: process.env.MV_DETAIL,
        TMDB_API_KEY: process.env.TMDB_API_KEY,
        IMG_URL: process.env.IMG_URL,
        MV_POPULAR: process.env.MV_POPULAR,
        MV_TOPRATED: process.env.MV_TOPRATED,
        DISCOVER: process.env.DISCOVER,
        P_DETAIL: process.env.P_DETAIL,
        P_POPULAR: process.env.P_POPULAR,
        COGNITO_ID: process.env.COGNITO_ID,
        COGNITO_APPCLIENT_WEB: process.env.COGNITO_APPCLIENT_WEB,
        COGNITO_SECRET: process.env.COGNITO_SECRET,
        COGNITO_DOMAIN: process.env.COGNITO_DOMAIN,
        COGNITO_POOL_ID: process.env.COGNITO_POOL_ID,
        COGNITO_REGION: process.env.COGNITO_REGION
    },
    images: {
        domains: ['image.tmdb.org'],
    },
}

module.exports = nextConfig
