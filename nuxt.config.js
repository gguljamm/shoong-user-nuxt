module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'shoong-user-app',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, viewport-fit=cover, shrink-to-fit=no' },
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
  css: ['~/assets/css/normalize.css', 'assets/css/main.css'],
  plugins: [
    { src: '~/plugins/firebase.js', ssr: false },
    { src: '~/plugins/cookies.js', ssr: false }
  ],
  buildDir: 'build',
  build: {
    publicPath: '/nuxtfiles/',
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
      let parent = routes.find(route => route.path === '/')
      parent.children = [];
      parent.children.push({
        name: 'index-login',
        path: 'login',
        component: resolve(__dirname, 'components/modal.vue'),
      });
      parent.children.push({
        name: 'index-feedId',
        path: ':feedId',
        component: resolve(__dirname, 'components/modal.vue'),
        children: [{
          name: 'index-feedId-deepId',
          path: ':deepId',
          component: resolve(__dirname, 'components/modal.vue'),
        }],
      });
      parent = routes.find(route => route.path === '/chat')
      parent.children = [];
      parent.children.push({
        name: 'chat-roomId',
        path: ':roomId',
        component: resolve(__dirname, 'components/modal.vue'),
      });
    },
  },
}

