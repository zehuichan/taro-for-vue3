<template>
  <nut-input label="name" v-model="state.name" placeholder="name" />
  <nut-input label="color" v-model="state.color" placeholder="color" />
  <nut-input label="size" v-model="state.size" placeholder="size" />
  <v-uploader v-model="files" />
</template>

<script setup>
import { useStorage } from '@/hooks'
import { ref } from 'vue'

const state = useStorage('form', {
  name: 'Banana',
  color: 'Yellow',
  size: 'Medium'
})

const files = ref([
  'https://fastly.jsdelivr.net/npm/@vant/assets/leaf.jpeg',
  'https://fastly.jsdelivr.net/npm/@vant/assets/leaf.jpeg'
])
</script>

<style>
page {
  background-color: #fff;
}
</style>
