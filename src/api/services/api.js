import api from './instance'
/**
 * @method 获取轮播图
 */
export const getBanner = () => api.get('/banner', {})
