import svgLoader from 'vite-svg-loader'

export default defineNuxtConfig({
    devtools: {enabled: true},
    devServer: {
        port: 7070
    },
    vite: {
        plugins: [
            svgLoader()
        ]
    },
    nitro: {
        devProxy: {
            '/api': {
                target: 'http://localhost:4567/',
                changeOrigin: true
            }
        }
    }
});
