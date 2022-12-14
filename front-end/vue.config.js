/*
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
*/

const path = require('path')

module.exports = {
  outputDir: path.resolve(__dirname, '../back-end/public/'),
  pages: {
    login: {
      entry:'src/pages/login/main.js',
      template:'public/index.html',
      filename: 'index.out.html'
    },
    main: {
      entry: 'src/pages/main/main.js',
      template: 'public/main.html',
      filename: 'main.out.html'
    },
    signup: {
      entry: 'src/pages/signup/main.js',
      template: 'public/signup.html',
      filename: 'signup.out.html'
    }
  },
/*
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        }
      }
    }
  },*/
}
