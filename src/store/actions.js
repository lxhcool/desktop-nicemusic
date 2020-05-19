import * as types from './mutation-type'

export const setCount = function({ commit }, { num }) {
  commit(types.SET_COUNT, num)
}
