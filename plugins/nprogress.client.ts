import nProgress from "nprogress";

export default defineNuxtPlugin(nuxt => {
    nuxt.hook('page:start', () => {
        nProgress.start();
    });
    nuxt.hook('page:finish', () => {
        nProgress.done();
    })
})