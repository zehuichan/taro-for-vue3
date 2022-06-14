<template>
  <v-ocr v-model="ocr" />
</template>

<script setup>
import { ref } from 'vue'

const ocr = ref({})
</script>

<style>
page {
  background-color: #f2f3f5;
}
</style>
