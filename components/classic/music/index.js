// components/classic/music/index.js
import {
  classicBeh
} from '../classic_beh'
Component({
  /**
   * 组件的属性列表
   */
  behaviors: [classicBeh],
  properties: {
    src: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    playing: false,
    playUrl: './image/player@play.png',
    pauseUrl: './image/player@pause.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
