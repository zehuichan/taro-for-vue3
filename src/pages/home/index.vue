<template>
  <v-uploader v-model="files" max-count="3" />
  {{ OrderType }}
  {{ OrderState }}
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue'

const files = ref([])
const { proxy } = getCurrentInstance()
const { OrderType, OrderState } = proxy.$dicts(['OrderType', 'OrderState'])
</script>

<style>
page {
  background-color: #fff;
}
</style>
