<template>
  <view>{{ JSON.stringify(from) }}</view>
</template>

<script setup>
import { useFrom } from '@/hooks'

definePageConfig({
  navigationBarTitleText: 'useFrom'
})

const from = useFrom()
</script>
