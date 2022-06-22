import { computed, ref, unref, watchEffect } from 'vue'
import Schema from 'async-validator'
import { until } from '..'

export default function useAsyncValidator(value, rules, options = {}) {
  const errorInfo = ref()
  const isFinished = ref(false)
  const pass = ref(false)
  const errors = computed(() => errorInfo.value?.errors || [])
  const errorFields = computed(() => errorInfo.value?.fields || {})

  const { validateOption = {} } = options

  watchEffect(validate)

  async function validate() {
    isFinished.value = false
    pass.value = false
    const validator = new Schema(unref(rules))
    try {
      await validator.validate(unref(value), validateOption)
      pass.value = true
      errorInfo.value = null
    } catch (err) {
      errorInfo.value = err
    } finally {
      isFinished.value = true
    }
  }

  const shell = {
    pass,
    isFinished,
    errorInfo,
    errors,
    errorFields
  }

  function waitUntilFinished() {
    return new Promise((resolve, reject) => {
      until(isFinished)
        .toBe(true)
        .then(() => resolve(shell))
        .catch((error) => reject(error))
    })
  }

  return {
    ...shell,
    validate,
    then(onFulfilled, onRejected) {
      return waitUntilFinished().then(onFulfilled, onRejected)
    }
  }
}
