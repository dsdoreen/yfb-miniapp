// pages/user/user.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{
      cost:0,
      money:0
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 登录回调函数
  handleGetUserInfo(e) {
    var that=this;
    wx.showLoading({
      title: '登录中...',
    })

    let userinfo = e.detail.userInfo;
    userinfo.money = parseInt(Math.random() * 13695);
    app.recordIntegral(userinfo.money,"+","首次登录获得初始奖励积分");
    userinfo.cost=0;
    setTimeout(function () {
      wx.setStorageSync('userinfo', userinfo);
      if(userinfo.nickName){
        that.setData({
          userInfo:userinfo
        })
      }
      wx.hideLoading();
    }, 1000)


  },
  //点击获取收货地址
  handleChooseAdrs() {
    var address;

    //获取用户对小程序所授予的 获取地址权限状态 scope
    //假设用户点击获取地址的提示框，确定 authSetting scope.address  scope值true 直接调用收货地址
    //假设用户点击获取收货地址的提示框 取消
    //scope值 false
    //诱导用户自己打开授权设置页面（wx.opensetting）当用户重新给予
    //获取地址权限的权限 

    wx.getSetting({
      success: (result) => {
        const scopeAddress = result.authSetting["scope.address"];
        if (scopeAddress === true || scopeAddress === undefined) {
          wx.chooseAddress({
            success: (res) => {
              console.log(res)
              wx.setStorageSync('address', res)
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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let userinfo=wx.getStorageSync('userinfo');
    if(userinfo.nickName){
      this.setData({
        userInfo:userinfo
      })
    }
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