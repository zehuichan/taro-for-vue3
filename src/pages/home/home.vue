<template>
  <view class="home">
    {{ appStore.count }}
    {{ value }}
    <nut-input
      v-model="value"
      label="文本"
    />
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
