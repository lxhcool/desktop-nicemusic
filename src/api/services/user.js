import api from './instance'

/**
 * @method 手机登录
 * @params phone 用户id
 */
export const login = () =>
  api.get(`/login/cellphone?phone=18668161482&password=lxhcool.cn`, {
    withCredentials: true
  })

/**
 * @method 获取用户详情
 * @params uid 用户id
 */
export const getUserDetail = uid => api.get(`/user/detail?uid=${uid}`, {})
