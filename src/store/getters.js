export const loginStatu = state => {
  return (
    state.loginStatu || JSON.parse(window.localStorage.getItem('loginStatu'))
  )
}

export const userInfo = state => {
  return state.userInfo || JSON.parse(window.localStorage.getItem('userInfo'))
}
export const singer = state => state.singer
