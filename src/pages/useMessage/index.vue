<template>
  <nut-button
    type="info"
    shape="square"
    block
    @click="() => showToast('showToast')"
  >
    showToast
  </nut-button>
  <nut-button type="info" shape="square" block @click="onClick">
    showLoading
  </nut-button>
  <nut-button
    type="info"
    shape="square"
    block
    @click="() => showAlert('content')"
  >
    alert
  </nut-button>
  <nut-button
    type="info"
    shape="square"
    block
    @click="() => showConfirm('content')"
  >
    confirm
  </nut-button>
</template>

<script setup>
import { useMessage, useTimeoutFn } from '@/hooks'

definePageConfig({
  navigationBarTitleText: 'useMessage'
})

const { showToast, showLoading, hideLoading, showAlert, showConfirm } = useMessage()

useTimeoutFn(() => {
  hideLoading()
}, 3000)

const onClick = () => {
  showLoading('3s后关闭')
}
</script>
