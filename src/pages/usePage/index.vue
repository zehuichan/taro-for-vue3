<template>
  <view>{{ stackLength }}</view>
  <view>{{ JSON.stringify(scope) }}</view>
</template>

<script setup>
import { usePage } from '@/hooks'

const [stackLength, { pageInstance, pageStack, useScope }] = usePage()
console.log('pageInstance', pageInstance)
console.log('pageStack', pageStack)
const scope = useScope()
</script>
