import {
  request
} from "../../request/index.js"

// pages/category/category.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    //左侧菜单使用
    LeftMenus: [],
    // 右侧区域使用
    RightCont: [],
    //当前选中索引
    CurIndex: 0,
    //scrolltop的位置
    ScrollTop:0
  },
  // 全部分类数据
  CateGorys: [],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    //使用本地存储,获取本地存储的数据
    const Cates = wx.getStorageSync('cates');
    //判断是否存在
    if (!Cates) {
      //不存在再进行获取数据
      this.getCateGoryData();
      console.log("第一次请求数据");
    } else {
      //存在本地存储时，先判断下时间戳是否过期 可自定义过期时间 1分钟或5分钟
      if (Date.now() - Cates.time > 1000 * 60) {
        //重新发送请求
        this.getCateGoryData();
        console.log("过期，重新请求");
      } else {
        //可以使用旧的数据
        this.CateGorys = Cates.data;
        //初始化数据
        this.InitData();
        console.log("可以使用旧的数据");
      }


    }
  },
  //切换分类
  changeCate(e) {
    this.setData({
      CurIndex: e.currentTarget.dataset.index
    })
    //初始化数据
    this.InitData();

  

  },
  // 获取分类数据
  getCateGoryData() {
    var that = this;
    request({
      url: "/categories"
    }).then(res => {
      that.CateGorys = res.data.message;
      //此处把接口的数据存入到本地存储中
      wx.setStorageSync('cates', {
        time: Date.now(),
        data: that.CateGorys
      })
      //初始化数据
      that.InitData();

    })
  },
  //初始化数据
  InitData() {
    var that = this;
    let leftdata = [];
    let rightdata = [];
    let curindex = that.data.CurIndex;
    for (var i = 0; i < that.CateGorys.length; i++) {
      leftdata.push({
        id: that.CateGorys[i].cat_id,
        name: that.CateGorys[i].cat_name
      })

    }

    rightdata = that.CateGorys[curindex].children;
     //重新设置 右侧内容scroll-view距离顶部的距离 ScrollTop:0
    that.setData({
      LeftMenus: leftdata,
      ScrollTop:0,
      RightCont: rightdata
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