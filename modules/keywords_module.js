import {
  HTTP
} from '../utils/http'

class Keywords extends HTTP {
  key = 'history'
  maxlength = 8
  getHotKeyWords() {
    return this.request({
      url: '/book/hot_keyword'
    })
  }
  getHistory() {
    return wx.getStorageSync(this.key)
  }
  addToHistory(q) {
    let history = this.getHistory() || []
    // if(!history){
    //   history = []
    // }
    if (!history.includes(q)) {
      history.unshift(q)
      if (history.length > this.maxlength) {
        history.pop()
      }
      wx.setStorageSync(this.key, history)
    }

  }
}
export {
  Keywords
}