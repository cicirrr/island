// components/like/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    likeCount: Number,
    likeStatus: Boolean,
    showing: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    likeUrl: './image/like.png',
    unlikeUrl: './image/like@dis.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onToggleLike(event){
      const likeStatus = !this.properties.likeStatus;
      const likeCount = this.properties.likeCount;
      this.setData({
        likeCount: likeStatus? likeCount + 1 : likeCount - 1,
        likeStatus
      })
      this.triggerEvent('toggleLike',{likeStatus},{})
    }

  }
})
