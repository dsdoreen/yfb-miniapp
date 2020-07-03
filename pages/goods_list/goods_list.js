import {
  request
} from '../../request/index'
// pages/goods_list/goods_list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //存放tabs的标签数据
    tabs: [{
        id: 0,
        value: '综合',
        isActive: true

      },
      {
        id: 1,
        value: '销量',
        isActive: false

      },
      {
        id: 2,
        value: '价格',
        isActive: false

      }
    ],
    //商品列表数据
    goodsList: [],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.QueryParmas.cid = options.cid||'';
   
    this.QueryParmas.query=options.query||'';
    
     //关闭加载中显示
     wx.hideLoading();
    this.getGoodsListData();
  },
  //链接中传过来的值
  QueryParmas: {
    query: '',
    cid: '',
    //当前页面
    pagenum: 1,
    //一页显示多少条数据
    pagesize: 10
  },
  totalPages:1,
  //获取商品列表数据
  getGoodsListData() {
    var that=this;
    console.log(this.QueryParmas);
    request({
      url: '/goods/search',
      data: that.QueryParmas
    }).then(res => {
        console.log(res.data.message.goods)
      //获取总条数
      let totalnum=res.data.message.total;
      //计算总页数
      that.totalPages=Math.ceil(totalnum/that.QueryParmas.pagesize);
      //拼接数组
      that.setData({
        goodsList:[...that.data.goodsList,...res.data.message.goods]
      })

     
      //关闭下拉刷新显示
      wx.stopPullDownRefresh();

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
    //用户上拉触底后
    //判断还有没有下一页
    if(this.QueryParmas.pagenum<this.totalPages){
     
      this.QueryParmas.pagenum++;
      this.getGoodsListData();
    }
    else{
      wx.showToast({
        icon:'none',
        title: '没有更多了哦～',
      })
    }

  },
  /**
   * 下拉刷新，重新发送请求
   */
  onPullDownRefresh:function(){
    // console.log("下拉了")
    //重置数据信息
    this.setData({
      goodsList:[]
    })
    //当前页数改成1
    this.QueryParmas.pagenum=1;
    //重新获取第一页数据
    this.getGoodsListData();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})