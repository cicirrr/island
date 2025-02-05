// components/tag/index.js
Component({
  /**
   * 组件的属性列表
   */
  // externalClasses: ['my-class'],
  properties: {
    content: String,
    nums: Number
  },
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPost(event){
      const content = this.properties.content
      this.triggerEvent('post',{content},{})
    }
  }
})
