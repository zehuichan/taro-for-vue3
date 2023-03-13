<template>
  {{ title }}
</template>

<script setup>
import { ref } from 'vue'

definePageConfig({
  navigationBarTitleText: '个人中心'
})

const title = ref('center')
</script>
