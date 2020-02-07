
const pagination = Behavior({
  data: {
    dataArray: [],
    total: null,
    noResult: false,
    loading: false
  },
  methods: {
    setMoreData(dataArray){
      const tempArray = this.data.dataArray.concat(dataArray)
      this.setData({
        dataArray: tempArray
      })
    },
    getCurrentCount(){
      
      return this.data.dataArray.length
    },
    setTotal(total){
      this.data.total = total
      if(!total){
        this.setData({
          noResult: true
        })
      }
    },
    hasMore(){
      
      return this.getCurrentCount() >=this.data.total ? false : true
    },
    isLocked(){
      return this.data.loading
    },
    lock(){
      this.setData({
        loading: true
      })
    },
    unLock(){
      this.setData({
        loading: false
      })
    },
    initialize(){
      this.setData({
        dataArray: [],
        q: '',
        loading: false
      })
    }
  }
})
export {
  pagination
}