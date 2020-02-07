// components/classic-preview/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    favor: Object
  },

  /**
   * 组件的初始数据100 电影 200 音乐 300 句子 400 书籍
   */
  data: {
    types: {
      100: '电影',
      200: '音乐',
      300: '句子',
      400: '书籍'
    }
  },
  // attached(){
  //   console.log(this.properties.favor.type)
  // },
  /**
   * 组件的方法列表
   */
  methods: {
   
    onDetail(event){
      const cid = this.properties.favor.id
      const ctype = this.properties.favor.type
      
      this.triggerEvent('detail',{cid,ctype},{})
    }
  }
})
