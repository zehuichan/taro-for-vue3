import { defineConfig } from 'unocss'
import presetWeapp from 'unocss-preset-weapp'
import { transformerClass } from 'unocss-preset-weapp/transformer'


export default defineConfig({
  presets: [
    // https://github.com/MellowCo/unocss-preset-weapp
    presetWeapp({
      isH5: process.env.TARO_ENV === 'h5',
      platform: 'taro',
      taroWebpack: 'webpack5',
      whRpx: false
    })
  ],
  transformers: [
    // https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerClass
    transformerClass()
  ]
})