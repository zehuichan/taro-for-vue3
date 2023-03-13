export default defineAppConfig({
  pages: [
    'pages/home/index',
    'pages/about/index',
    // hooks
    'pages/useAsyncValidator/index',
    'pages/useAuthorize/index',
    'pages/useFrom/index',
    'pages/useImage/index',
    'pages/useLocation/index',
    'pages/useMessage/index',
    'pages/useRouter/index',
    'pages/usePage/index',
    'pages/useTimeoutFn/index',
    // component
    'pages/uploader/index',
    'pages/demo/index'
  ],
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
    color: '#CCCCCC',
    selectedColor: '#3974FF',
    borderStyle: 'black',
    backgroundColor: '#ffffff',
    list: [
      {
        pagePath: 'pages/home/index',
        text: '工作台',
        iconPath: 'assets/tabs/work-bench-inactive.png',
        selectedIconPath: 'assets/tabs/work-bench.png'
      },
      {
        pagePath: 'pages/about/index',
        text: '我的',
        iconPath: 'assets/tabs/my-inactive.png',
        selectedIconPath: 'assets/tabs/my.png'
      }
    ]
  }
})