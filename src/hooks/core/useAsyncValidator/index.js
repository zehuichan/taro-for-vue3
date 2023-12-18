import { ref, unref, watchEffect } from 'vue'
import Schema from 'async-validator'
import { until } from '../until'

export function useAsyncValidator(value, rules) {
  const isFinished = ref(false)
  const pass = ref(false)
  const errorsRes = ref([])
  const errorFields = ref({})

  watchEffect(() => {
    isFinished.value = false
    pass.value = false
    const validator = new Schema(unref(rules))
    void validator.validate(unref(value), (errors, fields) => {
      if (Array.isArray(errors)) {
        errorsRes.value = errors
        errorFields.value = fields
      } else {
        pass.value = true
        isFinished.value = true
      }
    })
  })

  const shell = {
    pass,
    isFinished,
    errorsRes,
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
    then(onFulfilled, onRejected) {
      return waitUntilFinished().then(onFulfilled, onRejected)
    }
  }
}
