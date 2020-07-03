// pages/goods_detail/goods_detail.js
import {request} from '../../request/index'
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods_id:0,
    goods_details:{},
    address:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取商品id
    this.setData({
      goods_id:options.goods_id
    })
    //调用获取信息方法
    this.getGoodsDetails(options.goods_id);
  },
  //获取商品详细信息
  getGoodsDetails(goods_id){
    request({
      url:'/goods/detail',
      data:{goods_id}
    }).then(res=>{
    //  console.log(res);
      this.setData({
        goods_details:{
          goods_id:res.data.message.goods_id,
          goods_name:res.data.message.goods_name,
          goods_price:res.data.message.goods_price,
          //iphone 部分手机不支持.webp 自己临时替换
          goods_introduce:res.data.message.goods_introduce.replace(/\.webp/g,'.jpg'),
          pics:res.data.message.pics,
        }
      })
    })
  },
  //点击查看大图
  handlePrevewImg(e){
    const urls=this.data.goods_details.pics.map(v=>v.pics_mid);
    wx.previewImage({
      current: e.target.dataset.curimg, // 当前显示图片的http链接
      urls: urls // 需要预览的图片http链接列表
    })
  },
  //加入购物车
  handleCartAdd(){
    //获取缓存 购物车中的数组
    let cart=wx.getStorageSync('cart')||[];
    //判断当前商品存不存在于购物车中
    let index=cart.findIndex(v=>v.goods_id===this.data.goods_details.goods_id);
    if(index===-1){
      //不存在的话，添加进购物车
      this.data.goods_details.num=1;
      this.data.goods_details.checked=false;
      cart.push(this.data.goods_details);
      
    }
    else{
      //已经存在，num++
      cart[index].num++;
    }
    wx.setStorageSync('cart', cart);
    wx.showToast({
      title: '加入购物车成功！',
      icon:'success',
      mask:true,
    })
     //改变tabbar数量
     app.initCartNum();

 
  },
  //立即兑换
  handleBuyNow(){
    var that=this;
    let {
      address
    } = this.data;
    if (!address.userName) {
     
      wx.showModal({
        cancelColor: '#000',
        title:'提示',
        content:'请先填写您的收货地址',
        success:function(){
          wx.getSetting({
            success: (result) => {
              const scopeAddress = result.authSetting["scope.address"];
              if (scopeAddress === true || scopeAddress === undefined) {
                wx.chooseAddress({
                  success: (res) => {
                    console.log(res);
                    wx.setStorageSync('address', res);
                    that.setData({
                      address:res
                    })
                  },
                })
      
              } else {
                wx.openSetting({
                  success: (re) => {
                    wx.chooseAddress({
                      success: (r) => {
                        wx.setStorageSync('address', r)
                      },
                    })
      
                  }
                })
              }
      
            }
          })
        },
        showCancel:true,

      })
    } else {
      let carts=[];
      let goods=this.data.goods_details;
      goods.num=1;
      goods.checked=true;
      goods.money=goods.num*goods.goods_price;
      carts.push(goods);
     
      wx.setStorageSync('buy_now', carts)
      // console.log(carts);
      //跳转到支付页面
      wx.navigateTo({
        url: '/pages/pay/pay?type=buynow',
      })

    }
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
   let adrs= wx.getStorageSync('address');
   this.setData({
     address:adrs
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