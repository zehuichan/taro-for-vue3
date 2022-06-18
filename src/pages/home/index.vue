<template>
  <view class="photo">
    <v-uploader
      class="ocr"
      v-model="dataForm.idcardface"
      max-count="1"
      :max-size="5 * 1024 * 1024"
      :after-read="onAfterRead({ side: 1, type: 1 })"
      @oversize="oversize"
      @fail="fail"
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
      :after-read="onAfterRead({ side: 2, type: 1 })"
      @oversize="oversize"
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
      :after-read="onAfterRead({ side: 1, type: 2 })"
      @oversize="oversize"
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
      :after-read="onAfterRead({ side: 2, type: 2 })"
      @oversize="oversize"
    >
      <view class="drv-side">
        <image class="placeholder" src="~@/assets/images/drv-side.png" />
        <view class="txt">行驶证（条码页）</view>
      </view>
    </v-uploader>
  </view>
  <v-picker
    label="准驾车型"
    label-width="128"
    v-model="dataForm.driveType"
    placeholder="准驾车型"
    :columns="DriveType"
    :border="false"
  />
</template>

<script setup>
import { getCurrentInstance, reactive } from 'vue'
import { recognition } from '@/api/ocr'
// hooks
import { useMessage } from '@/hooks'

const { showToast, showLoading, hideLoading } = useMessage()
const { proxy } = getCurrentInstance()
const { DriveType } = proxy.$dicts(['DriveType'])
const dataForm = reactive({
  idcardface: [],
  idcardside: [],
  // 行驶证
  drvface: [],
  drvside: [],
  driveType: ['1']
})
const oversize = (file) => {
  console.log(file)
  showToast('图片大小限制为5M')
}
const fail = (e) => {
  console.log(e)
  showToast('图片上传失败')
}
const onAfterRead = (type) => async (items) => {
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
