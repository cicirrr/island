import {
  BookModule
} from '../../modules/book_module'
const bookModule = new BookModule()
// pages/book/book.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotBook: [],
    searching: false,
    loading: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getHotBookList()
  },
  openSearch(event){
    this.setData({
      searching: true
    })
  },
  onCancel(event){
    this.setData({
      searching: false
    })
   
  },
  onReachBottom(){
    const loading = Math.random().toString(36).substr(2,4)

    
    this.setData({
      loading,
    })
  },
  _getHotBookList(){
    bookModule.getHotBookList().then(res => {
      this.setData({
        hotBook: res
      })
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})