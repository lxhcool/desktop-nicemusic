/** 视频处理方法 */

import utils from '../utils/utils'

export default class Video {
  constructor({ id, singer, name, album, duration, image, url }) {
    this.id = id
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }
}

export function createVideo(videoData) {
  return new Video({
    id: videoData.id,
    singer: filterSinger(videoData.ar),
    name: videoData.name,
    album: videoData.al.name,
    duration: utils.formatTime(videoData.dt),
    image: videoData.al.picUrl,
    url: `https://music.163.com/song/media/outer/url?id=${videoData.id}.mp3`
  })
}

// 歌手处理
function filterSinger(singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.map(item => {
    ret.push(item.name)
  })
  return ret.join(' / ')
}
