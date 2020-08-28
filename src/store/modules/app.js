const state = {
  loading: false
}

const mutations = {
  SET_LOADING_STATE: (state, loading) => {
    state.loading = loading
  },
}

const actions = {
  setLoadingState({commit, state}, loading) {
    commit('SET_LOADING_STATE', loading)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}