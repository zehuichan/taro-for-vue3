<template>
  <view class="photo">
    <v-uploader
      class="ocr"
      v-model="dataForm.idcardface"
      max-count="1"
      :max-size="5 * 1024 * 1024"
      @oversize="oversize"
      :after-read="onAfterRead({ side: 1, type: 1 })"
    >
      <view class="idcard-face">
        <image class="placeholder" src="~@/assets/images/idcard-face.png" />
        <view class="txt">身份证（人像面）</view>
      </view>
    </v-uploader>
    <v-uploader
      class="ocr"
      v-model="dataForm.idcardside"
      max-count="1"
      :max-size="5 * 1024 * 1024"
      @oversize="oversize"
      :after-read="onAfterRead({ side: 2, type: 1 })"
    >
      <view class="idcard-side">
        <image class="placeholder" src="~@/assets/images/idcard-side.png" />
        <view class="txt">身份证（国徽面）</view>
      </view>
    </v-uploader>
  </view>
  <view class="photo">
    <v-uploader
      class="ocr"
      v-model="dataForm.drvface"
      max-count="1"
      :max-size="5 * 1024 * 1024"
      @oversize="oversize"
      :after-read="onAfterRead({ side: 1, type: 2 })"
    >
      <view class="drv-face">
        <image class="placeholder" src="~@/assets/images/drv-face.png" />
        <view class="txt">行驶证（印章页）</view>
      </view>
    </v-uploader>
    <v-uploader
      class="ocr"
      v-model="dataForm.drvside"
      max-count="1"
      :max-size="5 * 1024 * 1024"
      @oversize="oversize"
      :after-read="onAfterRead({ side: 2, type: 2 })"
    >
      <view class="drv-side">
        <image class="placeholder" src="~@/assets/images/drv-side.png" />
        <view class="txt">行驶证（条码页）</view>
      </view>
    </v-uploader>
  </view>
</template>

<script setup>
import { reactive } from 'vue'
import { recognition } from '@/api/ocr'
// hooks
import { useMessage } from '@/hooks'

const { showToast, showLoading, hideLoading } = useMessage()

const dataForm = reactive({
  idcardface: [],
  idcardside: [],
  // 行驶证
  drvface: [],
  drvside: []
})
const oversize = (file) => {
  console.log(file)
  showToast('图片大小限制为5M')
}
const onAfterRead = (type) => async (items) => {
  console.log(type)
  try {
    showLoading('ocr识别中...')
    const res = await recognition({ image: items[0], ...type })
    console.log(res.data)
  } catch (e) {
    console.log(e)
  } finally {
    hideLoading()
  }
}
</script>

<style lang="less">
page {
  background-color: #f2f3f5;
  padding: 20rpx;
}

.photo {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #181818;
  padding: 32rpx;
}
</style>
