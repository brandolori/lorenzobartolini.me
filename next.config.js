const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')
const path = require("path")
/**
 * @return {import('next').NextConfig}
 */
module.exports = (phase, { defaultConfig }) => {

    if (phase === PHASE_DEVELOPMENT_SERVER) {
        return {
            reactStrictMode: true,
        }
    }

    return {
        reactStrictMode: true,
        webpack: (config) => {
            config.resolve.alias.three$ = path.resolve('./src/three-exports.js')
            return config
        }
    }
}