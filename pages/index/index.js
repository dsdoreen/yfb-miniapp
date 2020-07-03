//0 引入 用来发送请求的 方法 记得需要把路径补全
import {request} from "../../request/index.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //轮播图数组
    swiperList:[],
    //分类导航数据
    cateList:[],
    //商品楼层信息
    floorList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSwiperList();
    this.getCateList();
    this.getFloorList();
  },
  //获取轮播图列表
  getSwiperList(){
    //这里要对this有个声明，要不然方法里this会被污染
    var that = this;
    //1.发送异步请求，获取轮播图数据
    request({
      url: "/home/swiperdata"
    }).then(res => {
      //给data中的数据赋值
      that.setData({
        swiperList: res.data.message
      })
    })
    //如果还需要调用很多接口，继续在此处.then()就好了
  },
  //获取分类导航列表
  getCateList() {
    //这里要对this有个声明，要不然方法里this会被污染
    var that = this;
    //1.发送异步请求，获取轮播图数据
    request({
      url: "/home/catitems"
    }).then(res => {
      //给data中的数据赋值
      that.setData({
        cateList: res.data.message
      })
    })
    //如果还需要调用很多接口，继续在此处.then()就好了
  },
  //获取商品楼层数据
  getFloorList() {
    //这里要对this有个声明，要不然方法里this会被污染
    var that = this;
    //1.发送异步请求，获取轮播图数据
    request({
      url: "/home/floordata"
    }).then(res => {
      let floor=res.data.message;
      floor.forEach((v,i)=>{
        floor[i].product_list.forEach((cv,vi)=>{
          floor[i].product_list[vi].navigator_url= (floor[i].product_list[vi].navigator_url).replace("/pages/goods_list?","/pages/goods_list/goods_list?")
          floor[i].product_list[vi].navigator_url= (floor[i].product_list[vi].navigator_url).substring((floor[i].product_list[vi].navigator_url).length-1,1)
        })
      //  let ii= floor[i].product_list.map(v=>(v.navigator_url).replaceAll("om", "en"));
        // console.log(ii)
      })
      console.log(floor)
      //给data中的数据赋值
      that.setData({
        floorList: floor
      })
    })
    //如果还需要调用很多接口，继续在此处.then()就好了
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