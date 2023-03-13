<template>
  <view> 来源页面{{ routeInfo?.from?.route }}</view>
  <nut-cell
    title="跳转TabBar"
    is-link
    @click="switchTab('/pages/home/index')"
  />
  <nut-cell
    title="重新打开一个页面"
    is-link
    @click="relaunch('/pages/useAuthorize/index')"
  />
  <nut-cell
    title="重定向页面"
    is-link
    @click="redirect('/pages/useImage/index')"
  />
  <nut-cell
    title="跳转页面"
    is-link
    @click="navigate('/pages/demo/index', { from: 'useRouter' })"
  />
  <nut-cell title="返回上一页" is-link @click="back()" />
  <nut-cell
    title="跳转小程序"
    is-link
    @click="
      navigate(
        '/pages/index/index',
        { appId: '2021001168687581', extraData: { from: 'taro-hooks' } },
        true
      )
    "
  />
  <nut-cell
    title="半屏打开小程序"
    is-link
    @click="
      navigate(
        '/pages/index/index',
        { appId: '2021001168687581', extraData: { from: 'taro-hooks' } },
        true,
        true
      )
    "
  />
  <nut-cell title="返回小程序" is-link @click="back({}, true)" />
  <nut-cell title="退出小程序" is-link @click="exit()" />
</template>

<script setup>
import { useRouter } from '@/hooks'

definePageConfig({
  navigationBarTitleText: 'useRouter'
})

const [routeInfo, { navigate, switchTab, relaunch, redirect, back, exit }] = useRouter()
</script>

<style lang="less">
page {
  background-color: #f2f3f5;
  padding: 20rpx;
}
</style>
