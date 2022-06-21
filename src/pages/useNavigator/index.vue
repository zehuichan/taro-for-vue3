<template>
  <nut-cell
    title="跳转TabBar"
    is-link
    @click="() => switchTab('/pages/home/index')"
  />
  <nut-cell
    title="重新打开一个页面"
    is-link
    @click="() => relaunch('/pages/useAuthorize/index')"
  />
  <nut-cell
    title="重定向页面"
    is-link
    @click="() => redirectTo('/pages/useImage/index')"
  />
  <nut-cell
    title="跳转页面"
    is-link
    @click="() => navigateTo('/pages/demo/index', { from: 'useRoute' })"
  />
  <nut-cell title="返回上一页" is-link @click="() => navigateBack()" />
  <nut-cell
    title="跳转小程序"
    is-link
    @click="
      () =>
        navigateTo(true, {
          appId: '2021001168687581',
          extraData: { from: 'taro-hooks' }
        })
    "
  />
  <nut-cell title="返回小程序" is-link @click="() => navigateBack(true)" />
  {{ routerInfo }}
</template>

<script setup>
import { useNavigator } from '@/hooks'

const [
  routerInfo,
  { switchTab, relaunch, redirectTo, navigateTo, navigateBack }
] = useNavigator()
</script>

<style lang="less">
page {
  background-color: #f2f3f5;
  padding: 20rpx;
}
</style>
