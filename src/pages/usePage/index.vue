<template>
  <view>{{ stackLength }}</view>
  <view>{{ pageInstance }}</view>
</template>

<script setup>
import { usePage } from '@/hooks'

const [stackLength, { pageInstance = {} }] = usePage()
console.log('pageInstance', pageInstance)
</script>
