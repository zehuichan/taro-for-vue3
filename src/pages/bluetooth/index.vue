<template>
  <view class="padding-wrapper">
    <view> 本蓝牙协议只支持低功耗蓝牙协议ble </view>
    <view class="title-view">Notify Characteristic</view>
    <view class="title-view">Write Characteristic</view>
  </view>
</template>

<script setup>
import Taro from '@tarojs/taro'

console.log(Taro.getEnv())
</script>

<style lang="less">
.padding-wrapper {
  padding: 32rpx;
}

.btn-group {
  display: flex;
  margin-top: 20rpx;

  button {
    flex: 1;
    font-size: 28rpx;
  }

  button + button {
    margin-left: 20rpx;
  }
}

.title-view {
  padding: 24rpx;
}

.device_list {
  background-color: #fdfdfd;
}

.device_item {
  border-bottom: 1rpx solid #ddd;
  padding: 20rpx;
  color: #666;
  background-color: #c0c0c0;
  margin-bottom: 20rpx;
}

.link {
  color: #156ed9;
}
</style>
