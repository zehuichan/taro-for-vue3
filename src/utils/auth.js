import cache from '@/utils/cache'

export function getToken() {
  return cache.getItem('token')
}
