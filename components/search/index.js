import {
  Keywords
} from '../../modules/keywords_module'
import {
  BookModule
} from '../../modules/book_module'

const keywords = new Keywords()
const bookModule = new BookModule()

import {
  pagination
} from '../behaviours/pagination'

// components/search/index.js
Component({
  /**
   * 组件的属性列表
   */
  behaviors: [pagination],
  properties: {
    bottom: {
      type: String,
      observer: 'loadMore'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    hot: [],
    showing: false,// 显示搜索结果
    // dataArray: [],
    history: [],
    q: '',// 输入框文本
    loading: false,
    // hasMore: true,
    loadingCenter: false
    
  },
  attached(options){
    this._getHotWords()
    this._getHistory()
    
  },
  
  /**
   * 组件的方法列表
   */
  methods: {
    onCancel(event){
      this.triggerEvent('cancel',{},{})
      this.initialize()
      this.setData({
        loadingCenter: false
      })
    },
    onSearch(event){
      const q = event.detail.value || event.detail.content
      if(!q){
        return
      }
      this.setData({
        q
      })   
      this._showResult()
      this._showLoadingCenter()
      bookModule.searchBook(q).then(res => {
        
        this.setTotal(res.total)
        this.setMoreData(res.books)
        this._hideLoadingCenter()
      })
      keywords.addToHistory(q)
    },
    closeResult(event){
      this.initialize()
      this._hideResult()
    },
    loadMore(){
      
      if(!this.data.q){
        return
      }
      if(this.isLocked()){
        return
      }
      if(this.hasMore()){
        this.lock()
        bookModule.searchBook(this.data.q,this.getCurrentCount()).then(res => {
          this.setMoreData(res.books)     
          this.unLock()
        }, () => {
          this.unLock()
        })
      }
    },
    _getHotWords(){
      keywords.getHotKeyWords().then(res => {      
        this.setData({
          hot: res.hot
        })
      })
    },
    
    _getHistory(){
      const history = keywords.getHistory()
      this.setData({
        history
      })
    },
    _showResult(){
      this.setData({
        showing: true
      })
    },
    _hideResult(){
      this.setData({
        showing: false
      })
    },
    _showLoadingCenter(){
      this.setData({
        loadingCenter: true
      })
    },
    _hideLoadingCenter(){
      this.setData({
        loadingCenter: false
      })
    }
  }
})
