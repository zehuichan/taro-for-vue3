const path = require('path')
const pkg = require('../package.json')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

const isProd = process.env.NODE_ENV !== 'production'

const { dependencies, name, version } = pkg

const __APP_INFO__ = {
  dependencies,
  name,
  version,
  lastBuildTime: new Date(),
}

const config = {
  projectName: 'taro-tpl-for-vue3',
  date: '2020-7-3',
  designWidth: 375,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
    375: 2 / 1
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: [
    '@tarojs/plugin-html',
    'taro-plugin-pinia'
  ],
  defineConstants: {
    __APP_INFO__: JSON.stringify(__APP_INFO__),
  },
  copy: {
    patterns: [],
    options: {}
  },
  framework: 'vue3',
  alias: {
    '@': resolve('src')
  },
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {}
      },
      url: {
        enable: true,
        config: {
          limit: 1024 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    },
    webpackChain(config) {
      // config
      //   .module
      //   .rule('images')
      //   .test(/\.(png|jpe?g|gif)$/i)
      //   .use('url-loader')
      //   .loader('url-loader')
      //   .options({
      //     fallback: 'responsive-loader',
      //     quality: 85,
      //   })
      //   .end()
    }
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true,
        config: {}
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  }
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
