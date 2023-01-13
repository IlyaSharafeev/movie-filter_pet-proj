export default defineNuxtConfig({
    css: [
        '@/assets/styles/index.scss',
    ],
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
    ssr: true,
})
