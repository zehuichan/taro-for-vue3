import { ref } from 'vue'
import { usePage } from '..'

export default function useFrom() {
  const [stackLength, { pageStack }] = usePage()

  const generateFromInfo = () => {
    return stackLength > 1 ? pageStack[stackLength - 2] : null
  }

  return ref(generateFromInfo()).value
}
