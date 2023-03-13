<template>
  <view class="photo">
    <v-uploader
      class="ocr"
      v-model="dataForm.face"
      max-count="1"
      :after-read="onAfterRead({ side: 1, type: 1 })"
    >
      <view class="idcard-face">
        <image class="placeholder" src="~@/assets/images/idcard-face.png" />
        <view class="txt">身份证（人像面）</view>
      </view>
    </v-uploader>
    <v-uploader
      class="ocr"
      v-model="dataForm.side"
      max-count="1"
      :after-read="onAfterRead({ side: 2, type: 1 })"
    >
      <view class="idcard-face">
        <image class="placeholder" src="~@/assets/images/idcard-side.png" />
        <view class="txt">身份证（国徽面）</view>
      </view>
    </v-uploader>
  </view>
  <view>
    {{ dataForm }}
  </view>
</template>

<script setup>
import { reactive } from 'vue'
import { recognition } from '@/api/ocr'

definePageConfig({
  navigationBarTitleText: 'Uploader'
})

const dataForm = reactive({
  face: [],
  side: [],
  name: '',
  docNum: '',
  docValidEnd: ''
})
const onAfterRead =
  (info = {}) =>
    async (items) => {
      try {
        const res = await recognition({ image: items[0], ...info })
        if (info.side == 1) {
          idcard.name = res.data.name
          idcard.docNum = res.data.num
        }
        if (info.side == 2) {
          idcard.docValidEnd = res.data.end_date
        }
      } catch (e) {
        console.log(e)
      }
    }
</script>

<style lang="less">
.photo {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 32rpx;
}
</style>
