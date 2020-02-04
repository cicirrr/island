import {
  HTTP
} from '../utils/http'

class LikeModule extends HTTP {
  like = '/like'
  unlike = '/like/cancel'
  postLike(likeStatus,id,type){
    return this.request({
      url: likeStatus? this.like:this.unlike,
      method: 'POST',
      data:{
        art_id: id,
        type
      }
    })
  }
  getLikeStatus(type,id){
    return this.request({
      url: `/classic/${type}/${id}/favor`
    })
  }
}
export {
  LikeModule
}