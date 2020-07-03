// pages/auth/auth.js
const app=getApp();
import {
  request
} from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  handleGetUserInfo(e) {
    console.log(e);
    const {
      encryptedData,
      rawData,
      iv,
      signature
    } = e.detail;
    wx.login({
      timeout: 10000,
      success: (res) => {
        console.log(res);
        const {
          code
        } = res;
        let userinfo=e.detail.userInfo;
        userinfo.money=parseInt(Math.random()*13579);
        app.recordIntegral(userinfo.money,"+","首次登录获得初始奖励积分")
        userinfo.cost=0;
        wx.setStorageSync('userinfo', e.detail.userInfo);
//  console.log(res.rawData.nickName);
        wx.showToast({
          title: '登录成功',

        })
        setTimeout(function () {
          wx.navigateBack({
            delta: 1,

          })
        }, 1500);



        //登录方法，获取用户的token
        // request({
        //   url:'/users/wxlogin',
        //   data:{
        //     encryptedData,
        //     rawData,
        //     iv,
        //     signature,
        //     code
        //   }
        // }).then(res=>{
        //   console.log(res);
        //   if(res.data.message==null){

        //     wx.showToast({
        //       icon:'none',
        //       title: '您无法获取权限',
        //     })
        //   }
        // })
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