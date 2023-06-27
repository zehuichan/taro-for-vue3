import ComponentsPlugin from 'unplugin-vue-components/webpack'
import NutUIResolver from '@nutui/nutui-taro/dist/resolver'
// 导入unocss
import UnoCSS from 'unocss/webpack'

import path from 'path'
import dayjs from 'dayjs'
import pkg from '../package.json'

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
  plugins: ['@tarojs/plugin-html'],
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
  compiler: 'webpack5',
  alias: {
    '@': resolve('src')
  },
  cache: {
    enable: false // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
  },
  sass: {
    data: `@import "@nutui/nutui-taro/dist/styles/variables.scss";`
  },
  mini: {
    // https://github.com/NervJS/taro/issues/11133
    webpackChain(chain) {
      chain.plugin('unplugin-vue-components').use(ComponentsPlugin({
        resolvers: [NutUIResolver({ taro: true })]
      }))
      // https://github.com/unocss/unocss
      chain.plugin('unocss').use(UnoCSS())
      chain.merge({
        module: {
          rule: [
            {
              test: /\.mjs$/,
              include: [/pinia/],
              loader: 'babel-loader'
            },
            {
              test: /\.js$/,
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
