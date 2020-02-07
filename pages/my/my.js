import {
  MyModule
} from '../../modules/my_module'

const myModule = new MyModule()

// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    count: 0,
    favorClassic: [],
    authorized: false,
    userInfo: null
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.isAuthorized()
    this._getBookCount()
    this._getFavorClassic()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  isAuthorized(){
    wx.getSetting({
      // success (res) {
        
      //   console.log(res.authSetting)
      //   // res.authSetting = {
      //   //   "scope.userInfo": true,
      //   //   "scope.userLocation": true
      //   // }
      // }
      success: res => {
        if(res.authSetting['scope.userInfo']){
          
          wx.getUserInfo({
            success: (res) => {
              this.setData({
                userInfo: res.userInfo
              })
              this._setAuthorized()
            },
          })
        }
      }
    })
  },
  onGetUserInfo(event){
    
    const { userInfo } = event.detail
    this.setData({
      userInfo,
    })
    this._setAuthorized()
  },
  goDetail(event){
    console.log(event)
    const cid = event.detail.cid
    const ctype = event.detail.ctype
    wx.navigateTo({
        url: `/pages/classic-detail/classic-detail?cid=${cid}&ctype=${ctype}`
      })
  },
  
  _setAuthorized(){
    this.setData({
      authorized: true
    })
  },
  _getBookCount(){
    myModule.getBookCount().then(res => {
      
      this.setData({
        count: res.count
      })
    })
  },
  _getFavorClassic(){
    myModule.getFavorClassic().then(res => {
      
      this.setData({
        favorClassic: res
      })
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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