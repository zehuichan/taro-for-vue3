<template>
  home
  <nut-cell is-link @click="showKeyBoard" :show-icon="true" title="默认键盘" />
  <v-vehicle-keyboard v-model="value" :visible="visible" />
</template>

<script setup>
import { ref } from 'vue'

const value = ref('')
const visible = ref(false)
const showKeyBoard = () => {
  visible.value = true
}
console.log(value.value)
</script>
