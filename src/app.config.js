export default {
  pages: [
    'pages/home/home',
    'pages/my/my',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '陈泽辉的家',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: '#333333',
    selectedColor: '#4270f5',
    borderStyle: 'black',
    backgroundColor: '#ffffff',
    list: [
      {
        pagePath: 'pages/home/home',
        text: '首页',
        iconPath: 'assets/tabs/tab-1.png',
        selectedIconPath: 'assets/tabs/tab-1-active.png',
      },
      {
        pagePath: 'pages/my/my',
        text: '我的',
        iconPath: 'assets/tabs/tab-5.png',
        selectedIconPath: 'assets/tabs/tab-5-active.png',
      },
    ]
  },
  usingComponents: {
    // vant weapp v1.5.2 2020-10-15
    // 这里为方便，全局引入了所有组件，也可以在某个page下单独引用某个组件

    // 基础组件
    'van-button': 'wxcomponents/vant/lib/button/index',
    'van-cell': 'wxcomponents/vant/lib/cell/index',
    'van-cell-group': 'wxcomponents/vant/lib/cell-group/index',
    'van-icon': 'wxcomponents/vant/lib/icon/index',
    'van-image': 'wxcomponents/vant/lib/image/index',
    'van-row': 'wxcomponents/vant/lib/row/index',
    'van-col': 'wxcomponents/vant/lib/col/index',
    'van-popup': 'wxcomponents/vant/lib/popup/index',
    'van-transition': 'wxcomponents/vant/lib/transition/index',

    // 表单组件
    'van-calendar': 'wxcomponents/vant/lib/calendar/index',
    'van-checkbox': 'wxcomponents/vant/lib/checkbox/index',
    'van-checkbox-group': 'wxcomponents/vant/lib/checkbox-group/index',
    'van-datetime-picker': 'wxcomponents/vant/lib/datetime-picker/index',
    'van-field': 'wxcomponents/vant/lib/field/index',
    'van-picker': 'wxcomponents/vant/lib/picker/index',
    'van-radio': 'wxcomponents/vant/lib/radio/index',
    'van-radio-group': 'wxcomponents/vant/lib/radio-group/index',
    'van-rate': 'wxcomponents/vant/lib/rate/index',
    'van-search': 'wxcomponents/vant/lib/search/index',
    'van-slider': 'wxcomponents/vant/lib/slider/index',
    'van-stepper': 'wxcomponents/vant/lib/stepper/index',
    'van-switch': 'wxcomponents/vant/lib/switch/index',
    'van-uploader': 'wxcomponents/vant/lib/uploader/index',

    // 反馈组件
    'van-action-sheet': 'wxcomponents/vant/lib/action-sheet/index',
    'van-dialog': 'wxcomponents/vant/lib/dialog/index',
    'van-dropdown-menu': 'wxcomponents/vant/lib/dropdown-menu/index',
    'van-dropdown-item': 'wxcomponents/vant/lib/dropdown-item/index',
    'van-loading': 'wxcomponents/vant/lib/loading/index',
    'van-notify': 'wxcomponents/vant/lib/notify/index',
    'van-overlay': 'wxcomponents/vant/lib/overlay/index',
    'van-share-sheet': 'wxcomponents/vant/lib/share-sheet/index',
    'van-swipe-cell': 'wxcomponents/vant/lib/swipe-cell/index',
    'van-toast': 'wxcomponents/vant/lib/toast/index',

    // 展示组件
    'van-circle': 'wxcomponents/vant/lib/circle/index',
    'van-collapse': 'wxcomponents/vant/lib/collapse/index',
    'van-collapse-item': 'wxcomponents/vant/lib/collapse-item/index',
    'van-count-down': 'wxcomponents/vant/lib/count-down/index',
    'van-empty': 'wxcomponents/vant/lib/empty/index',
    'van-divider': 'wxcomponents/vant/lib/divider/index',
    'van-notice-bar': 'wxcomponents/vant/lib/notice-bar/index',
    'van-panel': 'wxcomponents/vant/lib/panel/index',
    'van-progress': 'wxcomponents/vant/lib/progress/index',
    'van-skeleton': 'wxcomponents/vant/lib/skeleton/index',
    'van-steps': 'wxcomponents/vant/lib/steps/index',
    'van-sticky': 'wxcomponents/vant/lib/sticky/index',
    'van-tag': 'wxcomponents/vant/lib/tag/index',
    'van-tree-select': 'wxcomponents/vant/lib/tree-select/index',

    // 导航组件
    'van-grid': 'wxcomponents/vant/lib/grid/index',
    'van-grid-item': 'wxcomponents/vant/lib/grid-item/index',
    'van-index-bar': 'wxcomponents/vant/lib/index-bar/index',
    'van-index-anchor': 'wxcomponents/vant/lib/index-anchor/index',
    'van-sidebar-bar': 'wxcomponents/vant/lib/sidebar/index',
    'van-sidebar-item': 'wxcomponents/vant/lib/sidebar-item/index',
    'van-nav-bar': 'wxcomponents/vant/lib/nav-bar/index',
    'van-tab': 'wxcomponents/vant/lib/tab/index',
    'van-tabs': 'wxcomponents/vant/lib/tabs/index',
    'van-tabbar': 'wxcomponents/vant/lib/tabbar/index',
    'van-tabbar-item': 'wxcomponents/vant/lib/tabbar-item/index',

    // 业务组件
    'van-area': 'wxcomponents/vant/lib/area/index',
    'van-card': 'wxcomponents/vant/lib/card/index',
    'van-submit-bar': 'wxcomponents/vant/lib/submit-bar/index',
    'van-goods-action': 'wxcomponents/vant/lib/goods-action/index',
    'van-goods-action-icon': 'wxcomponents/vant/lib/goods-action-icon/index',
    'van-goods-action-button': 'wxcomponents/vant/lib/goods-action-button/index'
  }
}
