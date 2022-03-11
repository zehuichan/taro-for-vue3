<template>
  <view class="home">
    <v-f2 :init="init"/>
  </view>
</template>

<script setup>
import { createElement } from '@antv/f2'
import VF2 from '@/components/chart'
import Basic from '@/components/chart/basic.jsx'


const init = () => {
  const data = [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ]

  return createElement(Basic, { data: data })
}
</script>

<style lang="less">
.home {

}
</style>
