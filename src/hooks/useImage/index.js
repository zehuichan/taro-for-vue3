import { chooseImage } from '@tarojs/taro'
import { ref } from 'vue'

export default function useImage(options) {
  const fileInfo = ref({})

  async function chooseImageAsync(option) {
    const { count, sizeType, sourceType } = options
    const finalOptions = Object.assign(
      {},
      Object.fromEntries(
        [
          ['count', count],
          ['sizeType', sizeType],
          ['sourceType', sourceType]
        ].filter((v) => v[1]) || []
      ),
      option || {}
    )

    const res = await chooseImage({
      ...finalOptions
    })
    fileInfo.value = res
    console.log(fileInfo.value)
  }

  return [
    fileInfo,
    {
      choose: chooseImageAsync
    }
  ]
}
