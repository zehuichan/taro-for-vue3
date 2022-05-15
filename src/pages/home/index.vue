<template>
  <nut-input label="name" v-model="state.name" placeholder="name" />
  <nut-input label="color" v-model="state.color" placeholder="color" />
  <nut-input label="size" v-model="state.size" placeholder="size" />
</template>

<script setup>
import { useStorage } from '@/hooks'

const state = useStorage('form', {
  name: 'Banana',
  color: 'Yellow',
  size: 'Medium'
})
</script>
