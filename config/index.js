import { defineConfig } from '@tarojs/cli'

import ComponentsPlugin from 'unplugin-vue-components/webpack'
import NutUIResolver from '@nutui/nutui-taro/dist/resolver'
// 导入unocss
import UnoCSS from 'unocss/webpack'

import path from 'path'
import dayjs from 'dayjs'
import pkg from '../package.json'

import devConfig from './dev'
import stageConfig from './stage'
import prodConfig from './prod'

function resolve(dir) {
  return path.resolve(__dirname, '..', dir)
}

const { name, version } = pkg

const __APP_INFO__ = {
  name,
  version,
  lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
}

export default defineConfig(async (merge, { command, mode }) => {
  const baseConfig = {
    projectName: name,
    date: '2022-4-26',
    designWidth: 375,
    deviceRatio: {
      640: 2.34 / 2,
      750: 1,
      828: 1.81 / 2,
      375: 2 / 1
    },
    sourceRoot: 'src',
    outputRoot: `dist/${process.env.TARO_ENV}`,
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
    compiler: {
      type: 'webpack5',
      prebundle: { enable: false }
    },
    alias: {
      '@': resolve('src')
    },
    cache: {
      enable: false // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
    },
    sass: {
      // 默认京东 APP 10.0主题 > @import "@nutui/nutui-taro/dist/styles/variables.scss";
      // 京东科技主题 > @import "@nutui/nutui-taro/dist/styles/variables-jdt.scss";
      // 京东B商城主题 > @import "@nutui/nutui-taro/dist/styles/variables-jdb.scss";
      // 京东企业业务主题 > @import "@nutui/nutui-taro/dist/styles/variables-jddkh.scss";
      data: `
      @import "@nutui/nutui-taro/dist/styles/variables.scss";
      @import "~@/assets/styles/var.scss";
      `,
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
      webpackChain(chain) {
        chain.plugin('unplugin-vue-components').use(ComponentsPlugin({
          resolvers: [NutUIResolver({ taro: true })]
        }))
      },
      publicPath: '/',
      staticDirectory: 'static',
      esnextModules: ['nutui-taro', 'icons-vue-taro'],
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
  if (process.env.NODE_ENV === 'development') {
    // 本地开发构建配置（不混淆压缩）
    return merge({}, baseConfig, devConfig)
  }
  if (process.env.NODE_ENV === 'staging') {
    // 本地开发构建配置（不混淆压缩）
    return merge({}, baseConfig, stageConfig)
  }
  // 生产构建配置（默认开启压缩混淆等）
  return merge({}, baseConfig, prodConfig)
})