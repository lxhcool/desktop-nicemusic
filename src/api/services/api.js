import api from './instance'
/**
 * @method 获取轮播图
 */
export const getBanner = () => api.get('/banner', {})

/**
 * @method 获取推荐歌单
 */
export const getPersonalized = limit =>
  api.get(`/personalized?limit=${limit}`, {})
