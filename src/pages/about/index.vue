<template>
  <nut-cell-group title="分包">
    <nut-cell
      title="个人中心"
      desc="描述文字"
      @click="onClick('/pages/account/center/index')"
    />
    <nut-cell
      title="个人设置"
      sub-title="副标题描述"
      desc="描述文字"
      @click="onClick('/pages/account/settings/index')"
    />
  </nut-cell-group>
</template>

<script setup>
import Taro from '@tarojs/taro'

definePageConfig({
  navigationBarTitleText: '关于我'
})

const onClick = (path) => {
  Taro.navigateTo({
    url: path
  })
}
</script>
