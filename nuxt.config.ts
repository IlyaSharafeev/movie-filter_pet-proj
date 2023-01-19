export default defineNuxtConfig({
    css: [
        '@/assets/styles/index.scss',
    ],
    // runtimeConfig: {
    //     public: {
    //         VUE_APP_X_API_KEY_MOVIES: process.env.VUE_APP_X_API_KEY_MOVIES,
    //     }
    // },
    app: {
        head: {
            meta: [
                { name: 'viewport', content: 'width=device-width, initial-scale=1' }
            ],
            link: [
                { rel: 'stylesheet', href: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" }
            ],
        }
    },
    routeRules: {
        '/': {ssr: false},
        '/selected-movie': {ssr: false},
    },
    vite: {
        define: {
            "process.env.DEBUG": false,
        },
    },
    modules: [
        '@pinia/nuxt',
        '@vueuse/nuxt',
        'nuxt-icon',
    ],
    plugins: [
        '@/plugins/vue-awesome-paginate.ts',
    ],
    ssr: true,
})
