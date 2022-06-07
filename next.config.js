const path = require("path")

module.exports = {
    webpack: (config) => {
        config.resolve.alias.three$ = path.resolve('./src/three-exports.js')
        return config
    }
};