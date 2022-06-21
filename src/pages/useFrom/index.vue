<template>
  <view>{{ JSON.stringify(from) }}</view>
</template>

<script setup>
import { useFrom } from '@/hooks'

const from = useFrom()
</script>
