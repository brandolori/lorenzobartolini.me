const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')
const path = require("path")

/** @type {import('next').NextConfig} */
const baseConfig = {
    reactStrictMode: true,
    swcMinify: true,
}

/** @return {import('next').NextConfig} */
module.exports = (phase) => {

    if (phase === PHASE_DEVELOPMENT_SERVER) {
        return baseConfig
    }

    return {
        ...baseConfig,
        webpack: (config) => {
            config.resolve.alias.three$ = path.resolve('./src/three-exports.js')
            return config
        },
        compiler: {
            removeConsole: true
        }
    }
}