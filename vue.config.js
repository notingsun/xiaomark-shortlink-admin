const path = require('path')

function resolve(dir) {
  return path.join(__dirname, './', dir)
}

module.exports = {
  devServer: {
    port: 8083,
    // 代理设置
    // 如果前后端的项目在一个同一域下，使用代理比较方便～
    proxy: {
      '/api': {
        target: 'http://admin-test.xiaomark.com',
        ws: true,
        changeOrigin: true
      }
    }
  },
  chainWebpack: (config) => {
    config.output.chunkFilename('[name].[contenthash:4].js')
    config.module
      .rule('svg')
      .exclude.add(resolve('src/components/svg-icon/icons'))
      .end()

    config.module // webpackChain 提供的添加 loader 方法
      .rule('icons') // 规则的名称
      .test(/\.svg$/)
      .include.add(resolve('src/components/svg-icon/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
  },

  transpileDependencies: ['PDo'],
  productionSourceMap: false,

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, 'src/styles/variables.less')]
    }
  }
}
