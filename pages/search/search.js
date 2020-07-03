// pages/search/search.js
import {
  request
} from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //搜索结果
    seresList: [],
    //是否显示取消按钮
    isShowCancel: false,
    //搜索的内容
    inputValue: '',
    //是否搜索结果为空
    isShowEmpty:true

  },
  //防抖id
  TimeId: -1,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  handleInput(e) {
    const {
      value
    } = e.detail;
    if (!value.trim()) {
      this.setData({
        isShowCancel:false
      })
      return;
    } else {
      this.setData({
        isShowCancel:true
      })
      //防抖设置
      clearTimeout(this.TimeId);
      this.TimeId = setTimeout(() => {
        this.qsearch(value);
      }, 1000)

    }
  },
  //取消搜索结果
  handleClear() {
    //防抖设置
    clearTimeout(this.TimeId);
   
    this.setData({
      seresList: [],
      isShowCancel:false,
      inputValue:'',
      isShowEmpty:true
    })
  },
  //qsearch请求查询数据
  qsearch(value) {
    const that = this;
    request({
      url: '/goods/qsearch',
      data: {
        query: value
      }
    }).then(res => {
      // console.log(res.data.message);
      if(res.data.message){
      that.setData({
        seresList: res.data.message,
        isShowEmpty:false
      })
    }
    else{
      that.setData({
        isShowEmpty:true
      })
    }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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