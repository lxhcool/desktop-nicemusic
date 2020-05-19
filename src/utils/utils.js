export default {
  // 补0方法
  formatZero(num, len) {
    if (String(num).length > len) return num
    return (Array(len).join(0) + num).slice(-len)
  },
  // localStorage存储
  setStore(name, content) {
    let contentClone = content
    if (!name) return
    if (typeof content !== 'string') {
      contentClone = JSON.stringify(contentClone)
    }
    window.localStorage.setItem(name, contentClone)
  },
  // localStorage获取
  getStore(name) {
    if (!name) return null
    return window.localStorage.getItem(name)
  },
  // localStorage删除
  removeStore(name) {
    if (!name) return
    window.localStorage.removeItem(name)
  },
  // 日期格式化
  dateFormat(str, type) {
    let date = new Date(str)
    let year = date.getFullYear()
    let month = this.formatZero(date.getMonth() + 1, 2)
    let day = this.formatZero(date.getDate(), 2)
    let hour = this.formatZero(date.getHours(), 2)
    let minute = this.formatZero(date.getMinutes(), 2)
    let seconds = this.formatZero(date.getSeconds(), 2)
    if (type == 'YYYY-MM-DD') {
      return `${year}-${month}-${day}`
    } else if (type == 'YYYY-MM-DD HH:MM:SS') {
      return `${year}-${month}-${day} ${hour}:${minute}:${seconds}`
    } else if (type == 'MM/DD  HH:MM:SS') {
      return `${month}/${day} ${hour}:${minute}:${seconds}`
    }
  },
  // 获取当前时间前后N天前后日期
  getDateBefore(dayCount) {
    var date = new Date()
    date.setDate(date.getDate() + dayCount)
    let year = date.getFullYear()
    let month = this.formatZero(date.getMonth() + 1, 2)
    let day = this.formatZero(date.getDate(), 2)
    return `${year}-${month}-${day}`
  }
}
