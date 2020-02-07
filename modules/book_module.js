import {
  HTTP
} from '../utils/http'

class BookModule extends HTTP {
  getHotBookList() {
    return this.request({
      url: '/book/hot_list'
    })
  }
  getBookInfo(id) {
    return this.request({
      url: `/book/${id}/detail`
    })
  }
  getComments(id) {
    return this.request({
      url: `/book/${id}/short_comment`
    })
  }
  getBookLikeStatus(id) {
    return this.request({
      url: `/book/${id}/favor`
    })
  }
  postingComment(id, content) {
    return this.request({
      url: `/book/add/short_comment`,
      method: 'POST',
      data: {
        book_id: id,
        content
      }
    })
  }
  searchBook(q, start = 0, count = 20) {
    
    return this.request({
      url: '/book/search',
      data: {
        start,
        count,
        summary: 1,
        q
      }
    })
  }
}
export {
  BookModule
}