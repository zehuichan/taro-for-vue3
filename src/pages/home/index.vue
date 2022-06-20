<template>
  <nut-button type="default" shape="square" block @click="openSetting"
    >打开设置面板</nut-button
  >
  <nut-button
    type="default"
    shape="square"
    block
    :disabled="authSetting.userInfo"
    open-type="getAuthorize"
    scope="userInfo"
    @getauthorize="getauthorize('userInfo')"
    @error="autherror"
  >
    userInfo
  </nut-button>
  <nut-button
    type="default"
    shape="square"
    block
    :disabled="authSetting.phoneNumber"
    open-type="getAuthorize"
    scope="phoneNumber"
    @getauthorize="getauthorize('phoneNumber')"
    @error="autherror"
  >
    phoneNumber
  </nut-button>

  <image :src="dataForm.aliPayAvatar" />
</template>

<script setup>
import { useAuthorize } from '@/hooks'
import { reactive } from 'vue'

const [{ authSetting }, { getSetting, openSetting }] = useAuthorize({
  withSubscriptions: true
})

const dataForm = reactive({
  phone: '',
  aliPayNickName: '',
  aliPayAvatar: ''
})

const getauthorize = (scope) => {
  if (scope === 'userInfo') {
    my.getOpenUserInfo({
      success: (res) => {
        const userInfo = JSON.parse(res.response).response // 以下方的报文格式解析两层 response
        console.log(userInfo)
        dataForm.aliPayNickName = userInfo.nickName
        dataForm.aliPayAvatar = userInfo.avatar
        getSetting()
      },
      fail: (err) => {
        console.log(err)
      }
    })
  }
  if (scope === 'phoneNumber') {
    my.getPhoneNumber({
      success: (res) => {
        const encryptedData = res.response
        console.log(encryptedData)
        dataForm.phone = encryptedData
        getSetting()
      },
      fail: (err) => {
        console.log(err)
      }
    })
  }
}
const autherror = (event) => {
  console.log(event)
}
</script>

<style lang="less">
page {
  background-color: #f2f3f5;
  padding: 20rpx;
}
</style>
