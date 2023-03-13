<template>
  <view>
    <view>位置信息{{ location }}</view>
    <nut-cell title="获取当前位置" is-link @click="get" />
    <nut-cell title="选择地理位置" is-link @click="handleChoose" />
    <nut-cell title="选择POI位置" is-link @click="handleChoosePOI" />
    <nut-cell title="查看位置" is-link />
    <nut-cell title="切换前台接受地理" is-link />
    <nut-cell title="切换监听地理位置" is-link />
  </view>
</template>

<script setup>
import { useLocation } from '@/hooks'

definePageConfig({
  navigationBarTitleText: 'useLocation'
})

const [location, { get, choose, choosePOI, open, toggleUpdate, on, off }] =
  useLocation({
    isHighAccuracy: true,
    altitude: true,
    type: 'gcj02'
  })

async function handleChoose() {
  try {
    const chooseInfo = await choose()
    console.log(chooseInfo)
  } catch (e) {
    console.log(e, '获取位置失败')
  }
}

async function handleChoosePOI() {
  try {
    const chooseInfo = await choosePOI()
    console.log(chooseInfo)
  } catch (e) {
    console.log(e, '获取POI失败')
  }
}
</script>

<style lang="less">
page {
  background-color: #f2f3f5;
  padding: 20rpx;
}
</style>
