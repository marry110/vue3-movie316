import { createStore } from 'vuex'

export default createStore({
  state: {
    // 是否显示按钮 首页不显示 非首页显示
    isShowBack: false,
  },
  getters: {
    getIsShowBack(state) {
      return state.isShowBack
    },
  },
  mutations: {
    setShowBack(state: any, isShowBack: boolean) {
      state.isShowBack = isShowBack
    },
  },
  actions: {},
  modules: {},
})
