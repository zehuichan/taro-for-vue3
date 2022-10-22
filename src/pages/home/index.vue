<template>
  <view>
    <nut-cell-group title="hooks">
      <nut-cell
        title="useAsyncValidator"
        is-link
        @click="navigate('/pages/useAsyncValidator/index')"
      />
      <nut-cell
        title="useAuthorize"
        is-link
        @click="navigate('/pages/useAuthorize/index')"
      />
      <nut-cell
        title="useImage"
        is-link
        @click="navigate('/pages/useImage/index')"
      />
      <nut-cell
        title="useLocation"
        is-link
        @click="navigate('/pages/useLocation/index')"
      />
      <nut-cell
        title="useRouter"
        is-link
        @click="navigate('/pages/useRouter/index')"
      />
      <nut-cell
        title="useTimeoutFn"
        is-link
        @click="navigate('/pages/useTimeoutFn/index')"
      />
    </nut-cell-group>
    <nut-cell-group title="component">
      <nut-cell
        title="OSS"
        is-link
        @click="navigate('/pages/uploader/index')"
      />
      <nut-cell
        title="OCR"
        is-link
        @click="navigate('/pages/uploader/index')"
      />
    </nut-cell-group>
  </view>
</template>

<script setup>
import { useDict, useRouter } from '@/hooks'

const [, { navigate }] = useRouter()
const { CarType, Position } = useDict('CarType', 'Position')
</script>

<style lang="less">
page {
  background-color: #f2f3f5;
  padding: 20rpx;
}
</style>
