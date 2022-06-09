<template>
  <v-uploader v-model="files" max-count="3" />
</template>

<script setup>
import { ref } from 'vue'

const files = ref([])
</script>

<style>
page {
  background-color: #fff;
}
</style>
