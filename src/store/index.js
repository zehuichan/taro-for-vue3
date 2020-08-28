import {createStore} from 'vuex'
// modules
import app from './modules/app'
import user from './modules/user'
// getters
import getters from './getters'

const store = createStore({
  modules: {
    app,
    user
  },
  getters
})

export default store
