import * as types from './mutation-type'

const mutations = {
  // 是否登录
  [types.SET_LOGINSTATU](state, loginStatu) {
    state.loginStatu = loginStatu
  },

  // 获取用户信息
  [types.SET_USERINFO](state, userInfo) {
    state.userInfo = userInfo
  },

  // 获取歌手信息
  [types.SET_SINGER](state, singer) {
    state.singer = singer
  }
}

export default mutations
