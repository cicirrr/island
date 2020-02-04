// components/navi/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: String,
    latest: Boolean,
    first: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    leftDisUrl: './image/triangle.dis@left.png',
    leftUrl: './image/triangle@left.png',
    rightDisUrl: './image/triangle.dis@right.png',
    rightUrl: './image/triangle@right.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPrevious(event){
      this.triggerEvent('previous','previous',{})
    },
    onNext(event){
      this.triggerEvent('next','next',{})
    }
  }
})
