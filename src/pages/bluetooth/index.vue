<template>
  <view class="padding-wrapper">
    <view>本蓝牙协议只支持低功耗蓝牙协议ble</view>
    <view class="btn-group">
      <button :disabled="connectStatus === 1" @click="_scan">
        扫描并连接{{ connectStatus }}
      </button>
    </view>
    <view class="title-view">Notify Characteristic</view>
    <view class="title-view">Write Characteristic</view>
  </view>
</template>

<script setup>
import Taro from '@tarojs/taro'
import { onMounted, ref } from 'vue'
import { BTManager, ConnectStatus } from '@/vendor/mini-ble'

definePageConfig({
  navigationBarTitleText: 'bluetooth'
})

const connectStatus = ref(0)
const connected = ref(false)
const device = ref({})
const bt = ref(null)

const didUpdateConnectStatus = (res) => {
  console.log('registerDidUpdateConnectStatus', res)
  connectStatus.value = res.connectStatus
  if (res.connectStatus === ConnectStatus.connected) {
    connected.value = true
    device.value = res.device
  } else if (res.connectStatus === ConnectStatus.disconnected) {
    connected.value = false
  }
}

const didDiscoverDevice = (res) => {
  console.log('didDiscoverDevice', res)
}

const didUpdateValueForCharacteristic = (res) => {
  console.log('registerDidUpdateValueForCharacteristic', res)
}

const _scan = async () => {
  try {
    Taro.showToast({
      title: '正在扫描设备中...',
      icon: 'none',
      duration: 0
    })
    await bt.value.scan({
      services: ['FFB0', '0000FFB0-0000-1000-8000-00805F9B34FB'],
      allowDuplicatesKey: false,
      interval: 0,
      timeout: 15 * 1000,
      deviceName: '',
      containName: ''
    })
  } catch (e) {
    console.log('scan fail', e)
    Taro.showToast({
      title: '未搜索到附近蓝牙设备',
      icon: 'none'
    })
  }
}

onMounted(() => {
  // 初始化蓝牙管理器
  bt.value = new BTManager({
    debug: true
  })
  // 注册状态回调
  bt.value.registerDidUpdateConnectStatus(didUpdateConnectStatus)
  // 注册发现外设回调
  bt.value.registerDidDiscoverDevice(didDiscoverDevice)
  // 注册特征值改变回调
  bt.value.registerDidUpdateValueForCharacteristic(
    didUpdateValueForCharacteristic
  )
})
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
