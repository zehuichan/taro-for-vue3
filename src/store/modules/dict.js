import { defineStore } from 'pinia'
import { store } from '@/store'
import { DICT_DATA_KEY } from '@/enums/cacheEnum'

export const useDictStore = defineStore({
  id: 'app',
  state: () => ({
    dictDatas: null
  }),
  getters: {
    getDictDatas() {
      return this.dictDatas || Cache.getItem(DICT_DATA_KEY)
    }
  },
  actions: {
    setDictDatas(dictDatas) {
      this.dictDatas = dictDatas
      Cache.setItem(DICT_DATA_KEY, dictDatas)
    },
    resetState() {
      this.dictDatas = null
      Cache.removeItem(DICT_DATA_KEY)
    },
    async loadDictDatas() {
      try {
        const response = await dictData()

        // 如果未加载到数据，则直接返回
        if (!response || !response.data) {
          return
        }
        // 设置数据
        const dictDataMap = {}
        response.data.forEach(dictData => {
          const pid = dictData.dictType
          if (pid === cache_yard || pid === cache_return) return
          // 获得 dictType 层级
          const enumValueObj = dictDataMap[pid]
          if (!enumValueObj) {
            dictDataMap[pid] = []
          }
          // 处理 dictValue 层级
          dictDataMap[pid].push({
            ...dictData,
            value: dictData.dictValue,
            label: dictData.dictLabel
          })
        })

        console.log(Object.keys(dictDataMap), Object.keys(dictDataMap).length)

        // 存储到 Store 中
        this.setDictDatas(dictDataMap)

      } catch (e) {
        console.log(e)
      }
    }
  }
})

export function useDictStoreWithOut() {
  return useDictStore(store)
}
