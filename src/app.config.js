export default {
  pages: [
    'pages/home/home',
    'pages/api/api',
    'pages/my/my',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'taro-for-vue3',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: '#6B7280',
    selectedColor: '#1E3A8A',
    borderStyle: 'black',
    backgroundColor: '#ffffff',
    list: [
      {
        pagePath: 'pages/home/home',
        text: 'home',
        iconPath: 'assets/tabs/tab-1.png',
        selectedIconPath: 'assets/tabs/tab-1-active.png',
      },
      {
        pagePath: 'pages/api/api',
        text: 'api',
        iconPath: 'assets/tabs/tab-2.png',
        selectedIconPath: 'assets/tabs/tab-2-active.png',
      },
      {
        pagePath: 'pages/my/my',
        text: 'about me',
        iconPath: 'assets/tabs/tab-3.png',
        selectedIconPath: 'assets/tabs/tab-3-active.png',
      },
    ]
  }
}
