import {
  BookModule
} from '../../modules/book_module'
const bookModule = new BookModule()
// pages/book-detail/book-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    book: null,
    comments: [],
    likeCount: 0,
    likeStatus: 0,
    inputing: false,
    content: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    const id = options.bid
    this._getAllInfo(id)
    

  },
  showInputing(event){
    this.setData({
      inputing: true
    })
  },
  onCancel(event){
    this.setData({
      inputing: false
    })
  },
  onPosting(event){
    
    const content = event.detail.value || event.detail.content
    this.setData({
      content
    })
    // console.log(content)
    if(!content){
      return
    }
    const id = this.data.book.id
    
    this._postingComment(id,content)
  },
  _postingComment(id,content){
    bookModule.postingComment(id,content).then(res => {
      // console.log(res)
      this._addCommentArray(content)
    })
  },
  _addCommentArray(content){
    
    wx.showToast({
      title: '+1',
      icon: 'none',
      duration: 1500
    })
    this.data.comments.unshift({
      content,
      nums: 1
    })
    this.setData({
      content: '',
      comments: this.data.comments,
      inputing: false
    })
  },
  _getAllInfo(id){
    const bookInfo = bookModule.getBookInfo(id)
    const comments = bookModule.getComments(id)
    const bookLikeStatus =  bookModule.getBookLikeStatus(id)
    Promise.all([bookInfo,comments,bookLikeStatus]).then(res => {
      this.setData({
        book: res[0],
        comments: res[1].comments,
        likeCount: res[2].fav_nums,
        likeStatus: res[2].like_status
      })
      wx.hideLoading()
    })
  }
 
})