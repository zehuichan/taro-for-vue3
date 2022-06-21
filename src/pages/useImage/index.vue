<template>
  <nut-button type="info" shape="square" block @click="choose">
    useImage
  </nut-button>
</template>

<script setup>
import { useImage } from '@/hooks'

const [, { choose }] = useImage({ count: 9 })
</script>
