import {
  ClassicModule
} from '../../modules/classic_module'
import {
  LikeModule
} from '../../modules/like_module'
const classicModule = new ClassicModule()
const likeModule = new LikeModule()
// pages/classic/classic.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classic: null,
    latest: true,
    first: false,
    likeCount: 0,
    likeStatus: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getClassicLatest();

  },
  getClassicLatest() {
    classicModule.getClassicLatest().then(res => {
      this.setData({
        classic: res
      })
      this._updateLike(res)
    })
  },
  onToggleLike(event) {
    const {
      likeStatus
    } = event.detail
    this._postLike(likeStatus)
  },
  nextOrPrevious(event) {
    const step = event.detail
    const index = this.data.classic.index
    classicModule.goPreviousOrNext(index, step).then(res => {
      this.setData({
        classic: res,
        first: classicModule.isFirst(res.index),
        latest: classicModule.isLatest(res.index)
      })
      this._getLikeStatus(res.type,res.id)

    })
    
  },
  _getLikeStatus(type,id){
    likeModule.getLikeStatus(type,id).then(res => {
      this._updateLike(res)
    })
  },
  _updateLike(res) {
    this.setData({
      likeCount: res.fav_nums,
      likeStatus: res.like_status
    })
  },
  _postLike(likeStatus) {
    const id = this.data.classic.id
    const type = this.data.classic.type
    likeModule.postLike(likeStatus, id, type)
    
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})