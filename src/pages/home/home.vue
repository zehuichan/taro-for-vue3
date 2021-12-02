<template>
  <view class="home">
    <nut-input
      v-model="value"
      label="文本"
    />

    <text class="iconfont icon-home"></text>
  </view>
</template>

<script setup>
// vue
import { ref } from 'vue'
// store
import { useAppStoreWithInstall } from '@/store/modules/app'
// hooks
import { useStorage } from '@/hooks'

const appStore = useAppStoreWithInstall()
const value = ref(useStorage('input'))
</script>

<style lang="less">
.home {

}
</style>
