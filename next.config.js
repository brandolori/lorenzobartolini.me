const { withGoogleFonts } = require("nextjs-google-fonts");
const path = require("path")

module.exports = withGoogleFonts({
    googleFonts: {
        fonts: [
            "https://fonts.googleapis.com/css2?family=Rubik:wght@700&display=swap",
        ],
    },
    webpack: (config) => {
        config.resolve.alias.three$ = path.resolve('./src/three-exports.js')
        return config
    }
});