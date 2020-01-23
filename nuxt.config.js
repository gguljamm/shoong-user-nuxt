module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'shoong-user-app',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'shoong app' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Build configuration
  */
  modules: [
    ['nuxt-sass-resources-loader'],
  ],
  css: ['~/assets/css/normalize.css'],
  plugins: [
    { src: '~/plugins/firebase.js', ssr: false },
  ],
  // buildDir: 'build',
  build: {
    // publicPath: '/nuxtfiles/',
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  router: {
    mode: 'hash',
    extendRoutes(routes, resolve) {
      let parent = routes.find(route => route.path === '/chat')
      parent.children = [];
      parent.children.push({
        name: 'chat-roomId',
        path: ':roomId',
        component: resolve(__dirname, 'components/modal.vue'),
      });
    },
  },
}

