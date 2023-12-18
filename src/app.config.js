export default defineAppConfig({
  pages: [
    'pages/home/index',
    'pages/order/index',
    'pages/mall/index',
    'pages/center/index',
    // 公共页面
    'pages/checkout/index',
    'pages/demo/index',
  ],
  subPackages: [],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'taro-for-vue3',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: '#CCCCCC',
    selectedColor: '#3974FF',
    borderStyle: 'black',
    backgroundColor: '#ffffff',
    list: [
      {
        pagePath: 'pages/home/index',
        text: '首页',
        iconPath: 'assets/tabs/work-bench-inactive.png',
        selectedIconPath: 'assets/tabs/work-bench.png'
      },
      {
        pagePath: 'pages/order/index',
        text: '点单',
        iconPath: 'assets/tabs/work-bench-inactive.png',
        selectedIconPath: 'assets/tabs/work-bench.png'
      },
      {
        pagePath: 'pages/mall/index',
        text: '商城',
        iconPath: 'assets/tabs/work-bench-inactive.png',
        selectedIconPath: 'assets/tabs/work-bench.png'
      },
      {
        pagePath: 'pages/center/index',
        text: '我的',
        iconPath: 'assets/tabs/my-inactive.png',
        selectedIconPath: 'assets/tabs/my.png'
      }
    ]
  }
})