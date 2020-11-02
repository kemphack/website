const pkg = require('./package')
require('dotenv').config()

import data from './static/langs/data.json'
let sandboxRoutes = () => {
  return new Promise(resolve => {
    resolve(data.map(lang => `sandbox/${lang.extention}`))
  })
}

module.exports = {
  env: {
    SIM_VERSION: process.env.SIM_VERSION,
    PROFILE_URL: process.env.PROFILE_URL,
    API_URL: process.env.API_URL,
    SANDBOX_STORAGE: process.env.SANDBOX_STORAGE,
    SANDBOX_API_URL: process.env.SANDBOX_API_URL,
  },
  // Doc: https://web.dev/maskable-icon-audit/?utm_source=lighthouse&utm_medium=devtools
  icon: {
    purpose: ['maskable', 'any']
  },
  /*
  ** Set cache age for static folder
  */
  render: {
    static: {
      maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year
    }
  },
  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description },
      { name: 'msapplication-TileColor', content: '#da532c' },
      { name: 'theme-color', content: '#ffffff' },
      { name: 'name', itemscope: true, itemtype: 'http://schema.org/WebPage', content: pkg.name },
      { name: 'description', itemscope: true, itemtype: 'http://schema.org/WebPage', content: pkg.description },
      { name: 'image', itemscope: true, itemtype: 'http://schema.org/WebPage', content: '/meta.png' },
      { property: 'og:locale', content: 'en_US' },
      { property: 'og:url', content: 'https://anthive.io/' },
      { property: 'og:type', content: 'Coding game' },
      { property: 'og:title', content: pkg.name + '- Coding game' },
      { property: 'og:description', content: pkg.description },
      { property: 'og:image', content: '/meta.png' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: pkg.name },
      { name: 'twitter:description', content: pkg.description },
      { name: 'twitter:image', content: 'summary_large_image' }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png'
      },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png'
      },
      {
        rel: 'manifest',
        href: '/site.webmanifest'
      },
      {
        rel: 'mask-icon',
        href: '/safari-pinned-tab.svg'
      }
    ],
    script: [{ src: '/js/anthive-5.0.js', defer: true }]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */

  css: [
    '~/assets/style/app.styl',
    '~/assets/style/style.css',
    '~/assets/style/fonts.css',
    '~/assets/style/global.scss',
    '~/assets/style/textures.css'
  ],

  webfontloader: {
    google: {
      families: ['Rubik:300,400,500,600&display=swap']
    }
  },
  /*
  ** Plugins to load before mounting the App
  */
  plugins: ['@/plugins/vuetify', '@/plugins/anthive'],

  /*
  ** Nuxt.js modules
  */
  modules: [
    'nuxt-webfontloader',
    '@nuxtjs/pwa',
    '@nuxtjs/dotenv',
    '@nuxtjs/markdownit',
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    'nuxt-clipboard2',
    ['@nuxtjs/google-analytics', { id: 'UA-122954385-1' }],
    [
      'nuxt-i18n',
      {
        lazy: true,
        locales: [
          {
            code: 'en',
            file: 'en.json'
          },
          {
            code: 'ru',
            file: 'ru.json'
          }
        ],
        loadLanguagesAsync: true,
        langDir: 'lang/',
        defaultLocale: 'en'
      }
    ],
    '@nuxtjs/sitemap',
    ['cookie-universal-nuxt', { alias: 'cookiz' }]
  ],
  sitemap: {
    hostname: 'https://anthive.io'
  },
  workbox: {
    clientsClaim: false
  },
  markdownit: {
    preset: 'commonmark',
    linkify: true,
    breaks: true,
    html: true,
    langPrefix: ''
  },
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
  build: {
    buildModules: ['nuxt-webfontloader'],
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },

    transpile: ['countup.js', 'vue-countup-v2'],
    quiet: false
  },

  generate: {
    routes: sandboxRoutes
  }
}
