/*
 * @Author: your name
 * @Date: 2020-12-03 21:50:22
 * @LastEditTime: 2021-07-06 11:05:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /Tamil-admin-master/vue.config.js
 */
'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')
function resolve (dir) {
  return path.join(__dirname, dir)
}
// const moment = require('moment')
// const NAMES = moment().format('YYYY-MM-DD HH:ss')
const name = defaultSettings.title || '教育培训-政府端' // page title
const port = process.env.port || process.env.npm_config_port || 8090 // dev port
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '././' : './',
  outputDir: 'dist_Jypx_Gov_' + defaultSettings.Time,
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    // 开发环境跨域问题，修改IP地址为  接口地址即可
    // proxy: {
    // [process.env.VUE_APP_BASE_API]: {
    //   target: `127.0.0.1`,
    //   changeOrigin: true,
    //   pathRewrite: {
    //     ['^' + process.env.VUE_APP_BASE_API]: ''
    //   }
    // }
    // },
    disableHostCheck: true,
    before: require('./mock/mock-server.js')
  },
  configureWebpack: {
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
    // plugins: [
    //   new FileManagerPlugin({
    //     events: {
    //       onEnd: {
    //         delete: ['./dist/*.zip'],
    //         archive: [
    //           { source: './dist', destination: `./dist/${NAME}.zip` }
    //         ]
    //       }
    //     }
    //   })
    // ]
  },
  chainWebpack (config) {
    config.plugin('preload').tap(() => [
      {
        rel: 'preload',
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: 'initial'
      }
    ])

    config.plugins.delete('prefetch')
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial'
                },
                elementUI: {
                  name: 'chunk-elementUI',
                  priority: 20,
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'),
                  minChunks: 3,
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          // eslint-disable-next-line no-sequences
          config.optimization.runtimeChunk('single'),
          {
            from: path.resolve(__dirname, './public/robots.txt'), // 防爬虫文件
            to: './' // 到根目录下
          }
        }
      )
  }
}
