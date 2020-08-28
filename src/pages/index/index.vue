<template>
  <view class="index">
    <van-cell-group>
      <van-cell title="单元格" value="内容"/>
      <van-cell title="单元格" value="内容" label="描述信息"/>
    </van-cell-group>
    <view class="van-clearfix">
      <view class="fl">
        <van-button type="primary">主要按钮{{name}}</van-button>
      </view>
      <view class="fr">
        <van-button type="danger">危险按钮</van-button>
      </view>
    </view>
  </view>
</template>

<script>
  // vuex
  import {mapGetters} from 'vuex'

  export default {
    computed: {
      ...mapGetters(['name'])
    },
  }
</script>

<style lang="less">

</style>
