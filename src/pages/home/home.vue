<template>
  <view class="home">
    <nut-button type="primary">点我</nut-button>
    <nut-cell-group title="自定义右侧箭头区域" round-radius="0">
      <nut-cell title="Switch">
        <template v-slot:link>
          <nut-switch v-model="switchChecked"/>
        </template>
      </nut-cell>
    </nut-cell-group>
  </view>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const switchChecked = ref(false)
    return {
      switchChecked
    }
  }
}
</script>

<style lang="less">
.home {

}
</style>
