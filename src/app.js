import {createApp} from 'vue'
import store from './store'

// 每个页面公共css
import './wxcomponents/vant/lib/common/index.wxss'
// 全局less
import './assets/scss/index.scss'

// TIM相关
// import tim from './tim.js'
// import TIM from 'tim-wx-sdk'

// wxcomponents
// import Toast from './wxcomponents/vant/lib/toast/toast.js'

const App = createApp({
  async onShow(options) {
    console.log('App Show')
    // this.initListener()
  },
  methods: {
    initListener() {
      // 登录成功后会触发 SDK_READY 事件，该事件触发后，可正常使用 SDK 接口
      tim.on(TIM.EVENT.SDK_READY, this.onReadyStateUpdate, this)
      // 收到新消息
      tim.on(TIM.EVENT.MESSAGE_RECEIVED, this.onReceiveMessage)
      // 收到消息被撤回的通知
      tim.on(TIM.EVENT.MESSAGE_REVOKED, this.onRevokedMessage)
      // SDK NOT READY
      tim.on(TIM.EVENT.SDK_NOT_READY, this.onReadyStateUpdate, this)
      // SDK内部出错
      tim.on(TIM.EVENT.ERROR, this.onError)
      // 会话列表更新
      tim.on(TIM.EVENT.CONVERSATION_LIST_UPDATED, this.onUpdateConversationList)
      // 群组列表更新
      tim.on(TIM.EVENT.GROUP_LIST_UPDATED, this.onUpdateGroupList)
      // 网络监测
      tim.on(TIM.EVENT.NET_STATE_CHANGE, this.onNetStateChange)
      // 已读回执
      tim.on(TIM.EVENT.MESSAGE_READ_BY_PEER, this.onMessageReadByPeer)
      // 被踢出
      tim.on(TIM.EVENT.KICKED_OUT, this.onKickOut)
    },
    onReadyStateUpdate({name}) {
      // 收到离线消息和会话列表同步完毕通知，接入侧可以调用 sendMessage 等需要鉴权的接口
      // event.name - TIM.EVENT.SDK_READY
      console.log('SDK_READY', name)
      const isSDKReady = name === TIM.EVENT.SDK_READY
      if (isSDKReady) {
        TIM.getMyProfile().then(({data}) => {
          store.commit('conversation/updateCurrentUserProfile', data)
        })
      }
      store.commit('conversation/toggleIsSDKReady', isSDKReady)
    },
    onError({data}) {
      if (data.message !== 'Network Error') {
        Toast({
          message: data.message
        })
      }
    },
    onReceiveMessage({data: messageList}) {
      // 收到推送的单聊、群聊、群提示、群系统通知的新消息，可通过遍历 event.data 获取消息列表数据并渲染到页面
      // event.name - TIM.EVENT.MESSAGE_RECEIVED
      // event.data - 存储 Message 对象的数组 - [Message]
      console.log('MESSAGE_RECEIVED', messageList)
      store.commit('conversation/pushCurrentMessageList', messageList)
    },
    onRevokedMessage(event) {
      // 收到消息被撤回的通知
      // event.name - TIM.EVENT.MESSAGE_REVOKED
      // event.data - 存储 Message 对象的数组 - [Message] - 每个 Message 对象的 isRevoked 属性值为 true
      console.log('MESSAGE_REVOKED', event)
    },
    onUpdateConversationList(event) {
      // 收到会话列表更新通知，可通过遍历 event.data 获取会话列表数据并渲染到页面
      // event.name - TIM.EVENT.CONVERSATION_LIST_UPDATED
      // event.data - 存储 Conversation 对象的数组 - [Conversation]
      console.log('CONVERSATION_LIST_UPDATED', event)
      store.commit('conversation/updateConversationList', event.data)
    },
    onUpdateGroupList(event) {
      // 收到群组列表更新通知，可通过遍历 event.data 获取群组列表数据并渲染到页面
      // event.name - TIM.EVENT.GROUP_LIST_UPDATED
      // event.data - 存储 Group 对象的数组 - [Group]
      console.log('GROUP_LIST_UPDATED', event)
    },
    onNetStateChange(event) {
      console.log('NET_STATE_CHANGE', event)
      Toast(this.$_checkoutNetState(event.data.state))
    },
    onMessageReadByPeer(event) {
      console.log(event)
    },
    onKickOut(event) {
      // 收到被踢下线通知
      // event.name - TIM.EVENT.KICKED_OUT
      // event.data.type - 被踢下线的原因，例如:
      //    - TIM.TYPES.KICKED_OUT_MULT_ACCOUNT 多实例登录被踢
      //    - TIM.TYPES.KICKED_OUT_MULT_DEVICE 多终端登录被踢
      //    - TIM.TYPES.KICKED_OUT_USERSIG_EXPIRED 签名过期被踢
      console.log('KICKED_OUT', event)
      Toast.fail(this.$_kickedOutReason(event.data.type))
    },
    $_checkoutNetState(state) {
      switch (state) {
        case TIM.TYPES.NET_STATE_CONNECTED:
          return {message: '已接入网络', type: 'success'}
        case TIM.TYPES.NET_STATE_CONNECTING:
          return {message: '当前网络不稳定', type: 'loading'}
        case TIM.TYPES.NET_STATE_DISCONNECTED:
          return {message: '当前网络不可用', type: 'fail'}
        default:
          return ''
      }
    },
    $_kickedOutReason(type) {
      switch (type) {
        case TIM.TYPES.KICKED_OUT_MULT_ACCOUNT:
          return '由于多实例登录'
        case TIM.TYPES.KICKED_OUT_MULT_DEVICE:
          return '由于多设备登录'
        case TIM.TYPES.KICKED_OUT_USERSIG_EXPIRED:
          return '由于 userSig 过期'
        default:
          return ''
      }
    }
  },
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
})

App.use(store)

export default App
