<template>
  <view>pass: {{ pass }}</view>
  <view>isFinished: {{ isFinished }}</view>
  <view>
    <view>
      <input v-model="form.email" type="text" />
    </view>
    <view>
      <input v-model="form.name" type="text" />
    </view>
    <view>
      <input v-model="form.age" type="number" />
    </view>
    <view>
      <button @click="submit">submit</button>
    </view>
  </view>
</template>

<script setup>
import { reactive } from 'vue'
import { useAsyncValidator } from '@/hooks'

const form = reactive({ email: '', name: '', age: '' })
const rules = {
  name: {
    type: 'string',
    min: 5,
    max: 20,
    required: true
  },
  age: {
    type: 'number',
    required: true
  },
  email: [
    {
      type: 'email',
      required: true
    }
  ]
}
const { pass, isFinished, errorFields, validate } = useAsyncValidator(
  form,
  rules
)

const submit = async () => {
  await validate()
  console.log(errorFields)
}
</script>
