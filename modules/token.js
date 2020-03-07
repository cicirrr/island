import { config } from '../config.js'

class Token {
  constructor(){
    this.verifyUrl = config.baseUrl + '/token/verify'
    this.tokenUrl = config.baseUrl + '/token'
  }
  verify(){
    const token = wx.getStorageSync('token')
    if(!token){
      this.getTokenFromServe()
    }else{
      this._verifyToken(token)
    }
  }
  getTokenFromServe(callback){
    wx.login({
      success: (res) => {
        if(res.code){
          wx.request({
            url: this.tokenUrl,
            method: 'POST',
            data: {
              account: res.code,
              type: 100
            },
            success: (res) => {
              const status = res.statusCode.toString()
              if(status.startsWith('2')){
                wx.setStorageSync('token', res.data.token)
                callback&&callback(res.data.token)
              }
              

            }
          })
        }
      },
    })
  }
  _verifyToken(token){
    wx.request({
      url: this.verifyUrl,
      method: 'POST',
      data: {
        token
      },
      success: (res)=>{
        
        const valid = res.data.isVerify
        if(!valid){
          this.getTokenFromServe()
        }
      }
    })
  }
  
}
export{
  Token
}