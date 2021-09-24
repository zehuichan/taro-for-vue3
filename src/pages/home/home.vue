<template>
  <view class="home">

  </view>
</template>

<script>
// api
import { pageList, orderDeliverFuc } from '@/api'

export default {
  data() {
    return {
      switchChecked: false
    }
  },
  created() {
    this._orderDeliverFuc()
  },
  methods: {
    initData() {
      pageList().then((res) => {
        console.log('pageList', res)
      })
    },
    _orderDeliverFuc() {
      const data = {
        id: '123131231213123',
        fnType: 'add'
      }
      orderDeliverFuc(data).then((res) => {
        console.log(res)
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="less">
.home {

}
</style>
