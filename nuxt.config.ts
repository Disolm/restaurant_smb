// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'
export default defineNuxtConfig({
    app: {
        pageTransition: { name: 'page', mode: 'in-out' },
        head: {
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
            title: 'Sa\`MegoBro ресторан грузинской кухни',
            htmlAttrs: {
                lang: 'ru'
            },
            script: [
                {
                    src: "https://widgets.2gis.com/js/DGWidgetLoader.js",
                    async: true
                }
            ]
        },

    },
    devtools: {enabled: true},
    css: [
        '@/src/assets/css/index.css',
        '@/src/assets/css/cssDefault.css',
    ],
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@use "@/src/assets/scss/global-style.scss" as *;'
                }
            }
        },
    },
    typescript: {
        strict: true
    },
    modules: [
        '@pinia/nuxt',
        '@nuxt/devtools',
        '@nuxt-alt/proxy',
    ],
    pinia: {
        autoImports: [
            // automatically imports `defineStore`
            'defineStore', // import { defineStore } from 'pinia'
            ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
        ],
    },

})
