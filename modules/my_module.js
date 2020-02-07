import {
  HTTP
} from '../utils/http'

class MyModule extends HTTP{
  getBookCount(){
    return this.request({
      url: '/book/favor/count'
    })
  }
  getFavorClassic(){
    return this.request({
      url: '/classic/favor'
    })
  }
}
export {
  MyModule
}