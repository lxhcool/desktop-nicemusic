import * as types from './mutation-type'

const mutations = {
  // 获取歌手信息
  [types.SET_SINGER](state, singer) {
    state.singer = singer
  }
}

export default mutations
