// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //存放tabs的标签数据
    tabs: [{
        id: 0,
        value: '全部订单',
        isActive: true

      },
      {
        id: 1,
        value: '待收货订单',
        isActive: false

      },
      {
        id: 2,
        value: '退款/退货',
        isActive: false

      }
    ],
    orderList: [],
    // 订单类型
    type:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.type){
      this.setData({
        type:options.type
      })
    }
   
    const tabs=this.data.tabs;
    tabs.forEach((v,i)=>{
      if(v.id==this.data.type){
        v.isActive=true
      }else{
        v.isActive=false
      }
    })
    this.setData({
      tabs
    })
  },
  //父组件在子组件bind后面要触发的事件名
  handleTabsItemChange(e) {
    // console.log(e)
    //获取传过来的索引
    const index = e.detail;
    //修改源数组
    let tabs = this.data.tabs;


    tabs.forEach((v, i) => {
      if (i == index) {
        v.isActive = true
      } else {
        v.isActive = false
      }
    })
    this.setData({
      tabs: tabs
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
    //获取订单
    let orders = wx.getStorageSync('orders');
    this.setData({
      orderList: orders
    })

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