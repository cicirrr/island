// components/episode/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index: Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    year: '',
    month: ''
  },
  attached(){
    this._getDate();
  },
 
  /**
   * 组件的方法列表
   */
  methods: {
    _getDate(){
      const date = new Date()
      const months  = ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月']
      this.setData({
        month: months[date.getMonth()],
        year: date.getFullYear()
      })
    },
  }
})
