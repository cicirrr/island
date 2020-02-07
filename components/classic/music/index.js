// components/classic/music/index.js
import {
  classicBeh
} from '../classic_beh'
const mPlayer = wx.getBackgroundAudioManager()
Component({
  /**
   * 组件的属性列表
   */
  behaviors: [classicBeh],
  properties: {
    src: String,
    title: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    playing: false,
    playUrl: './image/player@play.png',
    pauseUrl: './image/player@pause.png'
  },
  attached() {
    this._recoverStatus()
    this._monitorPlay()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onTogglePlay(event) {
      const playing = this.data.playing
      if (!playing) {
        mPlayer.title = this.properties.title
        mPlayer.src = this.properties.src
        this.setData({
          playing: true
        })
      } else {
        if (mPlayer.src == this.properties.src) {
          mPlayer.pause()

          this.setData({
            playing: false
          })
        }
      }

    },
    _recoverStatus() {
      if (mPlayer.paused) {
        this.setData({
          playing: false
        })
        return
      }
      if (mPlayer.src == this.properties.src) {
        this.setData({
          playing: true
        })

      }
    },
    _monitorPlay() {

      mPlayer.onPause(() => {
        // this.setData({
        //   playing: false
        // })
        this._recoverStatus()
      })
      mPlayer.onEnded(() => {
        // this.setData({
        //   playing: false
        // })
        this._recoverStatus()
      })
      mPlayer.onStop(() => {

        // this.setData({
        //   playing: false
        // })
        this._recoverStatus()
      })
      mPlayer.onPlay(() => {
        // this.setData({
        //   playing: true
        // })
        this._recoverStatus()
      })
    }
  }
})