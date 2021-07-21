export default {
  pages: [
    'pages/home/home',
    'pages/my/my',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'taro-tpl',
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
  }
}
