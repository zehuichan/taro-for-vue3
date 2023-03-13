<template>
  <nut-button type="default" shape="square" block @click="open(true)">
    打开设置面板
  </nut-button>
  <template v-for="auth in [authSetting, subscriptionsSetting]">
    {{ auth }}
  </template>

  <nut-button
    shape="square"
    type="primary"
    class="gap"
    block
    @click="handleAuth"
  >
    授权
  </nut-button>
  <nut-button
    shape="square"
    type="primary"
    class="gap"
    block
    @click="handleGetUserInfo"
  >
    授权
  </nut-button>
</template>

<script setup>
import { reactive } from 'vue'
import { useAuthorize, useLogin, useUserInfo } from '@/hooks'

definePageConfig({
  navigationBarTitleText: 'useAuthorize'
})

const { authSetting, subscriptionsSetting, authorize, open } = useAuthorize(true)
const [userInfo = {}, { getUserInfo, getUserProfile }] = useUserInfo()
const { login } = useLogin();


async function handleAuth() {
  try {
    await authorize('scope.userInfo')
  } catch (e) {
    console.log(e)
  }
}

async function handleGetUserInfo() {
  try {
    await login(true)
    await getUserInfo({ lang: 'zh_CN', withCredentials: true })
    console.log(userInfo)
  } catch (e) {
    console.log(e)
  }
}
</script>
