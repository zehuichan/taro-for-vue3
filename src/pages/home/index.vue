<template>
  <view class="photo">
    <v-uploader
      class="ocr"
      v-model="dataForm.idcardface"
      max-count="1"
      :after-read="onAfterRead('idcardface')"
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
      :after-read="onAfterRead('idcardside')"
    >
      <view class="idcard-face">
        <image class="placeholder" src="~@/assets/images/idcard-side.png" />
        <view class="txt">身份证（人像面）</view>
      </view>
    </v-uploader>
  </view>
</template>

<script setup>
import { reactive } from 'vue'
import { recognition } from '@/api/ocr'

const dataForm = reactive({
  idcardface: [],
  idcardside: []
})
const onAfterRead = (type) => async (items) => {
  console.log(type)
  try {
    const res = await recognition({ image: items[0], side: 1, type: 1 })
    console.log(res.data)
  } catch (e) {
    console.log(e)
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
