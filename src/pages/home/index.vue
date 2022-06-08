<template>
  <v-uploader v-model="files" />
  <v-plate-input
    gutter="30"
    :value="value"
    :focused="showKeyboard"
    @focus="showKeyboard = true"
  />
  <v-plate-keyboard v-model:visible="showKeyboard" />
</template>

<script setup>
import { ref } from 'vue'

const files = ref([
  'https://fastly.jsdelivr.net/npm/@vant/assets/leaf.jpeg',
  'https://fastly.jsdelivr.net/npm/@vant/assets/leaf.jpeg'
])
const value = ref('1234568')
const showKeyboard = ref(false)
</script>

<style>
page {
  background-color: #fff;
}
</style>
