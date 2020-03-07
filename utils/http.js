import {
  config
} from '../config.js'
import {
  Base64
} from 'js-base64';
import {
  Token
} from '../modules/token.js'
// const token = new Token()
const tips = {
  1: '啊呀ㄟ(▔,▔)ㄏ',
  1005: 'appkey无效，请前往www.7yue.pro申请',
  3000: '期刊不存在'

}
class HTTP {
  request({
    url,
    data = {},
    method = 'GET'
  }) {
    return new Promise((resolve, reject) => {
      this._request(url, resolve, reject, data, method)
    })

  }
  _request(url, resolve, reject, data = {}, method = 'GET', noRefetch = false) {
    wx.request({
      url: config.baseUrl + url,
      data,
      method,
      header: {
        'content-type': 'application/json',
        Authorization: this._encode()
      },
      success: res => {
        const statusCode = res.statusCode.toString();
        if (statusCode.startsWith('2')) {
          resolve(res.data);
        } else {
          if (statusCode == '403') {
            if (!noRefetch) {
              this._refetch(url, resolve, reject, data, method)
            }
          } else {
            reject()
            this._showToast(statusCode)
          }

        }
      },
      fail: res => {
        reject()
        this._showToast(1)
      }
    })
  }
  _showToast(code) {
    if (!code) {
      code = 1
    }
    const tip = tips[code] || tips[1]
    wx.showToast({
      title: tip,
      icon: 'none',
      duration: 2000
    })
  }
  _refetch(...params) {
    let token = new Token()
    token.getTokenFromServe((token) => {
      this._request(...params, true)
    })
  }
  _encode() {
    const token = wx.getStorageSync('token')
    const base64 = Base64.encode(token + ':')
    return 'Basic ' + base64
  }
}

export {
  HTTP
}