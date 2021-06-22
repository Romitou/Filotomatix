export default {

  // Static project
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Filotomatix',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ]
  },

  globalName: 'filotomatix',

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '~/assets/app.scss'
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxt/http',
    '@nuxtjs/pwa',
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseUrl: process.env.API_URL || '/'
  },

  publicRuntimeConfig: {
    axios: {
      browserBaseURL: process.env.API_URL || '/'
    }
  },

  // Auth module configuration
  auth: {
    strategies: {
      local: {
        scheme: 'local',
        token: {
          property: 'accessToken',
          maxAge: 60 * 60 * 24 * 30, // 30 days
          type: 'Bearer'
        },
        user: {
          property: 'user'
        },
        endpoints: {
          login: { url: '/auth/login', method: 'post' },
          user: { url: '/auth/self', method: 'get' },
          logout: { url: '/auth/logout', method: 'post' }
        },
        redirect: {
          home: '/',
          login: '/login'
        }
      }
    }
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    babel: {
      plugins: [
        ['@babel/plugin-proposal-private-methods', { loose: true }]
      ]
    },
    publicPath: 'filotomatix/'
  },

  vuetify: {
    theme: {
      themes: {
        light: {
          primary: '#134483'
        },
        dark: {
          primary: '#134483'
        }
      }
    }
  },

  server: {
    port: process.env.APP_PORT || 3000
  }

};
