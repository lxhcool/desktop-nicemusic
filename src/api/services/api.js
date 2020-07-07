import api from './instance'
/**
 * @method 获取轮播图
 */
export const getBanner = () => api.get('/banner', {})

/**
 * @method 获取推荐歌单
 * @params limit 取出数量默认为 30
 */
export const getPersonalized = limit =>
  api.get(`/personalized?limit=${limit}`, {})

/**
 * @method 获取推荐歌单
 */
export const getNewSongs = () => api.get(`/personalized/newsong`, {})

/**
 * @method 获取歌手分类列表
 * @params cat 即 category Code,歌手类型,默认 1001,返回华语男歌手数据
 * @params limit 返回数量 , 默认为30
 * @params offset 偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
 * @params initial 按首字母索引查找参数, 如 /artist/list?type=1&area=96&initial=b 返回内容将以 name 字段开头为 b 或者拼音开头为 b 为顺序排列, 热门传-1,#传0
 */
export const getSingerList = params => api.get(`/artist/list`, { params })

/**
 * @method 获取歌手单曲
 * @params id 歌手 id
 */
export const getArtists = id => api.get(`/artists?id=${id}`, {})

/**
 * @method 获取歌手mv
 * @params id 歌手 id
 */
export const getArtistMv = params => api.get(`/artist/mv`, { params })

/**
 * @method 获取歌手专辑
 * @params limit 返回数量 , 默认为30
 * @params offset 偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
 */
export const getArtistAlbum = params => api.get(`/artist/album`, { params })

/**
 * @method 获取歌手描述
 * @params id 歌手 id
 */
export const getArtistDesc = id => api.get(`/artist/desc?id=${id}`, {})

/**
 * @method 获取相似歌手
 * @params id 歌手 id
 */
export const getArtistSimi = id => api.get(`/simi/artist?id=${id}`, {})
