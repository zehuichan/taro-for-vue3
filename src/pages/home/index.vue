<template>
  <nut-cell-group title="hooks">
    <nut-cell
      title="useAsyncValidator"
      is-link
      @click="() => navigateTo('/pages/useAsyncValidator/index')"
    />
    <nut-cell
      title="useAuthorize"
      is-link
      @click="() => navigateTo('/pages/useAuthorize/index')"
    />
    <nut-cell
      title="useImage"
      is-link
      @click="() => navigateTo('/pages/useImage/index')"
    />
    <nut-cell
      title="useTimeoutFn"
      is-link
      @click="() => navigateTo('/pages/useTimeoutFn/index')"
    />
  </nut-cell-group>
  <nut-cell-group title="component">
    <nut-cell
      title="OSS"
      is-link
      @click="() => navigateTo('/pages/uploader/index')"
    />
    <nut-cell
      title="OCR"
      is-link
      @click="() => navigateTo('/pages/uploader/index')"
    />
  </nut-cell-group>
</template>

<script setup>
import { useNavigator } from '@/hooks'

const [, { navigateTo }] = useNavigator()
</script>

<style lang="less">
page {
  background-color: #f2f3f5;
  padding: 20rpx;
}
</style>
