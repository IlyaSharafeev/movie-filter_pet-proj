export default defineNuxtConfig({
    css: [
        '@/assets/styles/index.scss',
    ],
    runtimeConfig: {
        public: {
            VUE_APP_X_API_KEY_MOVIES: process.env.VUE_APP_X_API_KEY_MOVIES,
        }
    },
    vite: {
        define: {
            "process.env.DEBUG": false,
        },
    },
    modules: [
        '@pinia/nuxt',
        '@vueuse/nuxt',
    ],
    plugins: [
        '@/plugins/vue-awesome-paginate.ts',
    ],
    ssr: false,
})
