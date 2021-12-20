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
        // Replace React with Preact only in client production build
        if (process.env.NODE_ENV != "development") {
            Object.assign(config.resolve.alias, {
                "react": "preact/compat",
                "react-dom/test-utils": "preact/test-utils",
                "react-dom": "preact/compat",     // Must be below test-utils
                "react/jsx-runtime": "preact/jsx-runtime"
            });
        }
        return config
    }
});