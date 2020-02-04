import { config } from '../config.js'

const tips = {
  1: '抱歉，出现了一个错误',
  1005: 'appkey无效，请前往www.7yue.pro申请',
  3000: '期刊不存在'

}
class HTTP {
  request({url,data={},method='GET'}){
    return new Promise((resolve,reject) => {
      this._request(url,resolve,reject,data,method)
    })
    
  }
  _request(url,resolve,reject,data={},method='GET'){
    wx.request({
      url: config.baseUrl + url,
      data,
      method,
      header:{
        'content-type': 'application/json',
        'appkey': config.appkey
      },
      success: res => {
        const statusCode = res.statusCode.toString();
        if(statusCode.startsWith('2')){
          resolve(res.data);
        }else{
          reject()
          this._showToast(statusCode)
        }
      },
      fail: res => {
        reject()
        this._showToast(1)
      }
    })
  }
  _showToast(code){
    if(!code){
      code = 1
    }
    const tip  = tips[code] || tips[1]
    wx.showToast({
      title: tip,
      icon: 'none',
      duration: 2000
    })
  }
}

export {
  HTTP
}