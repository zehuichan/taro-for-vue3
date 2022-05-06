export default {
  pages: ['pages/home/index', 'pages/about/index'],
  subPackages: [
    {
      root: 'pages/account',
      pages: ['center/index', 'settings/index']
    }
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
        selectedIconPath: 'assets/tabs/tab-1-active.png'
      },
      {
        pagePath: 'pages/about/index',
        text: 'about',
        iconPath: 'assets/tabs/tab-3.png',
        selectedIconPath: 'assets/tabs/tab-3-active.png'
      }
    ]
  }
}
