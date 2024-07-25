import svgLoader from 'vite-svg-loader'

export default defineNuxtConfig({
    devtools: {enabled: true},

    devServer: {
        port: 7070
    },

    vite: {
        plugins: [
            svgLoader()
        ],
      vue: {
            template: {
                compilerOptions: {
                    isCustomElement: (tag) => {
                        return ['slim'].includes(tag)
                    }
                }
            }
      }
    },

    nitro: {
        devProxy: {
            '/api': {
                target: 'http://localhost:4567/',
                changeOrigin: true
            }
        }
    },

    modules: ["nuxt-route-meta", "@nuxt/image"]
});