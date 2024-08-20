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
                        return ['slim', 'tip', 'info'].includes(tag)
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

    modules: ["nuxt-route-meta", "@nuxt/image", "@nuxt/content"],

    app: {
        head: {
            link: [{
                rel: 'icon',
                type: 'image/png',
                href: '/favicon-black.png'
            }]
        }
    },

    content: {
        api: {
            baseURL: '/contentapi'
        },
        highlight: {
            theme: {
                default: 'github-light',
                dark: 'github-dark',
            }
        }
    }
});