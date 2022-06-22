<template>
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
    title="useFrom"
    is-link
    @click="() => navigateTo('/pages/useFrom/index')"
  />
  <nut-cell
    title="useImage"
    is-link
    @click="() => navigateTo('/pages/useImage/index')"
  />
  <nut-cell
    title="useMessage"
    is-link
    @click="() => navigateTo('/pages/useMessage/index')"
  />
  <nut-cell
    title="useNavigator"
    is-link
    @click="() => navigateTo('/pages/useNavigator/index')"
  />
  <nut-cell
    title="usePage"
    is-link
    @click="() => navigateTo('/pages/usePage/index')"
  />
  <nut-cell
    title="useTimeoutFn"
    is-link
    @click="() => navigateTo('/pages/useTimeoutFn/index')"
  />
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
