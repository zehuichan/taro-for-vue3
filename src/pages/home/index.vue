<template>
  <v-uploader
    v-model="files"
    max-count="3"
    :disabled="disabled"
    :deletable="!disabled"
    :show-upload="!disabled"
  />
  <v-ocr v-model="ocr" />
</template>

<script setup>
import { ref } from 'vue'

const disabled = ref(false)
const files = ref([
  '/tmao-oss/oss/objects/4s-api/download/7f26af3958944a8db75dce69f118f3b3?md5=a0efd9696d82482495b61b7d1cd6a8f1'
])
const ocr = ref({})
</script>

<style>
page {
  background-color: #f2f3f5;
}
</style>
