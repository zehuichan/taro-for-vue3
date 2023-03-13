<template>
  <view>
    <input v-model="form.email" placeholder="email" />
    <input v-model="form.name" placeholder="name" />
    <input v-model="form.age" placeholder="age" />
    <button @click="submit">submit</button>
  </view>
</template>

<script setup>
import { reactive } from 'vue'
import { useAsyncValidator, useMessage } from '@/hooks'

definePageConfig({
  navigationBarTitleText: 'useAsyncValidator'
})

const { showToast } = useMessage()

const form = reactive({ email: '471303121@qq.com', name: 'zehuichan', age: '' })
const rules = {
  email: [
    {
      required: true,
      message: 'email必填项'
    },
    {
      type: 'email',
      message: '正确邮箱'
    }
  ],
  name: [
    {
      required: true,
      message: 'name必填项'
    },
    {
      type: 'string',
      min: 5,
      max: 20,
      message: 'name长度5-20'
    }
  ],
  age: [
    {
      required: true,
      message: 'age必填项'
    }
  ]
}

const submit = async () => {
  const { pass, errorsRes } = useAsyncValidator(form, rules)
  if (pass.value) {
    showToast('submit!')
  } else {
    showToast(errorsRes.value[0]?.message)
  }
}
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
  margin-top: 10rpx;
}
</style>
