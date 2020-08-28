const getters = {
  // app
  loading: state => state.app.loading,

  // user
  avatar: state => state.user.avatar,
  tel: state => state.user.tel,
  name: state => state.user.name,
  logged: state => state.user.logged,

}

export default getters