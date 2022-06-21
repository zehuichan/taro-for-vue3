<template>
  <view>{{ text }}</view>
  <nut-button
    type="info"
    shape="square"
    :disabled="isPending"
    block
    @click="restart"
  >
    Restart
  </nut-button>
</template>

<script setup>
import { ref } from 'vue'
import { useTimeoutFn } from '@/hooks'

const defaultText = `Please wait for 3 seconds`
const text = ref(defaultText)
const { isPending, start } = useTimeoutFn(() => {
  text.value = 'Fired!'
}, 3000)

const restart = () => {
  text.value = defaultText
  start()
}
</script>
