// todo vue初始化加载基础数据
export function setupRouterGuard(router) {
  router.beforeEach((to, from) => {
    console.log(to, from)
  })

  router.afterEach((to) => {
  })
}
