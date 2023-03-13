<template>
  <view>{{ stackLength }}</view>
  <view>{{ pageInstance }}</view>
</template>

<script setup>
import { usePage } from '@/hooks'

definePageConfig({
  navigationBarTitleText: 'usePage'
})

const [stackLength, { pageInstance = {} }] = usePage()
console.log('pageInstance', pageInstance)
</script>
