<template>
  <view class="home">
    <nut-input
      v-model="value"
      label="文本"
    />
    <VF2 id="chart-id" :init="basic"/>
  </view>
</template>

<script setup>
// vue
import { ref } from 'vue'
// store
import { useAppStoreWithInstall } from '@/store/modules/app'
// hooks
import { useStorage } from '@/hooks'
import F2 from '@antv/f2'
import VF2 from '@/components/chart'

const basic = (options) => {
  const chart = new F2.Chart(options)

  chart.source(this.chartData)
  chart.interval().position('genre*sold').color('genre')

  chart.render()

  return chart
}

const appStore = useAppStoreWithInstall()
const value = ref(useStorage('input'))
</script>

<style lang="less">
.home {

}
</style>
