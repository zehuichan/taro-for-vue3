const path = require('path')
const dayjs = require('dayjs')
const pkg = require('../package.json')

const outputRootPath = {
  development: 'dev',
  staging: 'stage',
  production: 'build'
}

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

const { name, version } = pkg

const __APP_INFO__ = {
  name,
  version,
  lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
}

const config = {
  projectName: 'zhongshi-taro',
  date: '2022-4-26',
  designWidth: 375,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
    375: 2 / 1
  },
  sourceRoot: 'src',
  outputRoot: `dist/${outputRootPath[process.env.NODE_ENV] || 'dev'}/${
    process.env.TARO_ENV
  }`,
  plugins: ['@tarojs/plugin-html', 'taro-plugin-pinia'],
  terser: {
    enable: true,
    config: {
      compress: true, // 默认使用terser压缩
      // mangle: false,
      keep_classnames: true, // 不改变class名称
      keep_fnames: true // 不改变函数名称
    }
  },
  defineConstants: {
    __APP_INFO__: JSON.stringify(__APP_INFO__)
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
    // https://github.com/NervJS/taro/issues/11133
    webpackChain(chain) {
      chain.merge({
        module: {
          rule: [
            {
              test: /.js$/,
              loader: 'babel-loader'
            }
          ]
        }
      })
    },
    postcss: {
      pxtransform: {
        enable: true,
        config: {}
      },
      url: {
        enable: true,
        config: {
          limit: 10240 // 设定转换尺寸上限
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
    lessLoaderOption: {
      additionalData: `@import "~@/assets/less/var.less";`
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
  if (process.env.NODE_ENV === 'staging') {
    return merge({}, config, require('./stage'))
  }
  return merge({}, config, require('./prod'))
}
