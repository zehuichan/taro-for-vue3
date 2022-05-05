const path = require('path')
const dayjs = require('dayjs')
const pkg = require('../package.json')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

const { name, version } = pkg

const __APP_INFO__ = {
  name,
  version,
  lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
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
  outputRoot: 'dist',
  plugins: [
    '@tarojs/plugin-html',
    'taro-plugin-pinia'
  ],
  terser: {
    enable: ['production', 'staging'].indexOf(process.env.NODE_ENV) > -1,
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
    webpackChain(chain) {
      chain.merge({
        module: {
          rule: {
            mjsScript: {
              test: /\.mjs$/,
              include: [/pinia/],
              use: {
                babelLoader: {
                  loader: require.resolve('babel-loader')
                }
              }
            }
          }
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
  console.log(process.env.NODE_ENV)
  console.log(['production', 'staging'].indexOf(process.env.NODE_ENV) > -1)
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  if (process.env.NODE_ENV === 'staging') {
    return merge({}, config, require('./stage'))
  }
  return merge({}, config, require('./prod'))
}
