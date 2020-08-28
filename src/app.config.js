export default {
  pages: [
    'pages/index/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  usingComponents: {
    // vant weapp v1.5.0 2020-08-27
    // 这里为方便，全局引入了所有组件，也可以在某个page下单独引用某个组件

    // 基础组件
    'van-button': 'wxcomponents/vant/dist/button/index',
    'van-cell': 'wxcomponents/vant/dist/cell/index',
    'van-cell-group': 'wxcomponents/vant/dist/cell-group/index',
    'van-icon': 'wxcomponents/vant/dist/icon/index',
    'van-image': 'wxcomponents/vant/dist/image/index',
    'van-row': 'wxcomponents/vant/dist/row/index',
    'van-col': 'wxcomponents/vant/dist/col/index',
    'van-popup': 'wxcomponents/vant/dist/popup/index',
    'van-transition': 'wxcomponents/vant/dist/transition/index',

    // 表单组件
    'van-calendar': 'wxcomponents/vant/dist/calendar/index',
    'van-checkbox': 'wxcomponents/vant/dist/checkbox/index',
    'van-checkbox-group': 'wxcomponents/vant/dist/checkbox-group/index',
    'van-datetime-picker': 'wxcomponents/vant/dist/datetime-picker/index',
    'van-field': 'wxcomponents/vant/dist/field/index',
    'van-picker': 'wxcomponents/vant/dist/picker/index',
    'van-radio': 'wxcomponents/vant/dist/radio/index',
    'van-radio-group': 'wxcomponents/vant/dist/radio-group/index',
    'van-rate': 'wxcomponents/vant/dist/rate/index',
    'van-search': 'wxcomponents/vant/dist/search/index',
    'van-slider': 'wxcomponents/vant/dist/slider/index',
    'van-stepper': 'wxcomponents/vant/dist/stepper/index',
    'van-switch': 'wxcomponents/vant/dist/switch/index',
    'van-uploader': 'wxcomponents/vant/dist/uploader/index',

    // 反馈组件
    'van-action-sheet': 'wxcomponents/vant/dist/action-sheet/index',
    'van-dialog': 'wxcomponents/vant/dist/dialog/index',
    'van-dropdown-menu': 'wxcomponents/vant/dist/dropdown-menu/index',
    'van-dropdown-item': 'wxcomponents/vant/dist/dropdown-item/index',
    'van-loading': 'wxcomponents/vant/dist/loading/index',
    'van-notify': 'wxcomponents/vant/dist/notify/index',
    'van-overlay': 'wxcomponents/vant/dist/overlay/index',
    'van-share-sheet': 'wxcomponents/vant/dist/share-sheet/index',
    'van-swipe-cell': 'wxcomponents/vant/dist/swipe-cell/index',
    'van-toast': 'wxcomponents/vant/dist/toast/index',

    // 展示组件
    'van-circle': 'wxcomponents/vant/dist/circle/index',
    'van-collapse': 'wxcomponents/vant/dist/collapse/index',
    'van-collapse-item': 'wxcomponents/vant/dist/collapse-item/index',
    'van-count-down': 'wxcomponents/vant/dist/count-down/index',
    'van-empty': 'wxcomponents/vant/dist/empty/index',
    'van-divider': 'wxcomponents/vant/dist/divider/index',
    'van-notice-bar': 'wxcomponents/vant/dist/notice-bar/index',
    'van-panel': 'wxcomponents/vant/dist/panel/index',
    'van-progress': 'wxcomponents/vant/dist/progress/index',
    'van-skeleton': 'wxcomponents/vant/dist/skeleton/index',
    'van-steps': 'wxcomponents/vant/dist/steps/index',
    'van-sticky': 'wxcomponents/vant/dist/sticky/index',
    'van-tag': 'wxcomponents/vant/dist/tag/index',
    'van-tree-select': 'wxcomponents/vant/dist/tree-select/index',

    // 导航组件
    'van-grid': 'wxcomponents/vant/dist/grid/index',
    'van-grid-item': 'wxcomponents/vant/dist/grid-item/index',
    'van-index-bar': 'wxcomponents/vant/dist/index-bar/index',
    'van-index-anchor': 'wxcomponents/vant/dist/index-anchor/index',
    'van-sidebar-bar': 'wxcomponents/vant/dist/sidebar/index',
    'van-sidebar-item': 'wxcomponents/vant/dist/sidebar-item/index',
    'van-nav-bar': 'wxcomponents/vant/dist/nav-bar/index',
    'van-tab': 'wxcomponents/vant/dist/tab/index',
    'van-tabs': 'wxcomponents/vant/dist/tabs/index',
    'van-tabbar': 'wxcomponents/vant/dist/tabbar/index',
    'van-tabbar-item': 'wxcomponents/vant/dist/tabbar-item/index',

    // 业务组件
    'van-area': 'wxcomponents/vant/dist/area/index',
    'van-card': 'wxcomponents/vant/dist/card/index',
    'van-submit-bar': 'wxcomponents/vant/dist/submit-bar/index',
    'van-goods-action': 'wxcomponents/vant/dist/goods-action/index',
    'van-goods-action-icon': 'wxcomponents/vant/dist/goods-action-icon/index',
    'van-goods-action-button': 'wxcomponents/vant/dist/goods-action-button/index'
  }
}
