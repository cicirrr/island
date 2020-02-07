import {
  HTTP
} from '../utils/http.js'

class ClassicModule extends HTTP {
  getClassicLatest(){
    const promise = this.request({
      url: '/classic/latest'
    })
    promise.then(res => {
      this._setLatestIndex(res.index)
      this._setClassicStorage(res.index,res)
    })
    return promise
  }
  goPreviousOrNext(index,step){
    const cindex = step == 'next' ? index +1 : index -1
    const classic = this._getClassicStorage(cindex)
    if(classic){
      return new Promise(resolve => resolve(classic))
    }
    const promise = this.request({
      url:`/classic/${index}/${step}`
    })
    promise.then(res => {
      this._setClassicStorage(res.index,res)
    })
    return promise
  }
  isLatest(index){
    return this._getLatestIndex() == index ? true : false
  }
  isFirst(index){
    return index == 1 ? true:false
  }
  getClassicPage(id,type){
    return this.request({
      url: `/classic/${type}/${id}`
    })
  }
  _setLatestIndex(index){
    wx.setStorageSync('latest', index)
  }
  _getLatestIndex(){
    return wx.getStorageSync('latest')
  }
  _getKey(index){
    return 'cid'+index
  }
  _setClassicStorage(index,data){
    wx.setStorageSync(this._getKey(index), data)
  }
  _getClassicStorage(index){
    return wx.getStorageSync(this._getKey(index))
  }
  
  
}
export {
  ClassicModule
}