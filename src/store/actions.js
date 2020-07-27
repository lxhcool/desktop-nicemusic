import * as types from './mutation-type'

// 选择播放
export const selectPlay = function({ commit, state }, { list, index }) {
  commit(types.SET_SEQUENCE_LIST, list)
  commit(types.SET_PLAYLIST, list)
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_PLAYING_STATE, true)
}

// export const setInfo = function({ commit }, { num }) {
//   commit(types.SET_INFO, num)
// }
