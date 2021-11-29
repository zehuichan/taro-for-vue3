<template>
  <view class="home">
    {{appStore.count}}
  </view>
</template>

<script>
import { useAppStore } from '../../store/modules/app.js'

export default {
  setup() {
    const appStore = useAppStore()
    return {
      appStore
    }
  }
}
</script>

<style lang="less">
.home {

}
</style>
