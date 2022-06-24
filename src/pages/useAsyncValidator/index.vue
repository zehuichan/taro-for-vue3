<template>
  <view>pass:{{ pass }}</view>
  <view>isFinished:{{ isFinished }}</view>
  <view>
    <input v-model="form.email" placeholder="email" />
    <text>{{ errorFields.email?.[0].message }}</text>
    <input v-model="form.name" placeholder="name" />
    <text>{{ errorFields.name?.[0].message }}</text>
    <input v-model="form.age" placeholder="age" />
    <text>{{ errorFields.age?.[0].message }}</text>
    <button @click="submit">submit</button>
  </view>
</template>

<script setup>
import { reactive } from 'vue'
import { useAsyncValidator } from '@/hooks'

const form = reactive({ email: '', name: '', age: '' })
const rules = {
  name: [
    {
      required: true,
      message: '必填项'
    },
    {
      type: 'string',
      min: 5,
      max: 20,
      message: '5-20'
    }
  ],
  age: [
    {
      required: true,
      message: '必填项'
    }
  ],
  email: [
    {
      required: true,
      message: '必填项'
    },
    {
      type: 'email',
      message: '正确邮箱'
    }
  ]
}
const { pass, isFinished, errorFields, validate } = useAsyncValidator(
  form,
  rules
)

const submit = async () => validate()
</script>

<style lang="less">
page {
  padding: 20rpx;
}

input {
  display: block;
  border: 1rpx solid #ddd;
  line-height: 80rpx;
  height: 80rpx;
}

input + input {
  margin-bottom: 10rpx;
}
</style>
