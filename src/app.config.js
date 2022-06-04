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
  }
}
