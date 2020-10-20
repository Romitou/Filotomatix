module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended'
  ],
  plugins: [
  ],
  rules: {
    semi: ['error', 'always'],
    'space-before-function-paren': 0,
    curly: 0
  }
};
