const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: [],
    cart: {},
    //总数量
    sum: 0,
    //总价格
    totalPrice: 0,
    userinfo: []
  },
  Type: '',
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let type = options.type;
    this.Type = type;
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

  //获取缓存中的数据，并计算价格并存入data和缓存中
  CalcPrice() {
    var that = this;
    let cart = {};
    //获取缓存中的购物车商品列表
    if (this.Type === 'buynow') {
      cart = wx.getStorageSync('buy_now');
    } else {
      cart = wx.getStorageSync('cart').filter(v => v.checked);
    }
    //总价格 总数量
    let totalprice = 0;
    let totalsum = 0;
    if (cart.length != 0) {
      let allChecked = true;
      cart.forEach(v => {
        if (v.checked) {
          totalprice += v.goods_price * v.num;
          totalsum += v.num;
        } else {
          allChecked = false;
        }
      })
      that.setData({
        cart: cart,
        totalPrice: totalprice,
        sum: totalsum
      })
    } else {
      that.setData({
        totalPrice: 0,
        sum: 0
      })
    }
  },
  //点击支付按钮创建订单信息
  handleOrderPay() {
    let that = this;
    let userinfo = wx.getStorageSync('userinfo');
    if (!userinfo) {
      wx.navigateTo({
        url: '/pages/auth/auth'
      });

    } else {
      let userinfo = this.data.userinfo;
      let money = userinfo.money;
      let price = this.data.totalPrice;
      if (money >= price) {
        money -= price;
        userinfo.cost += price;
        userinfo.money = money;
        this.setData({
          userinfo
        })
        let oldcart = {};
        //获取缓存中的购物车商品列表
        let cart = [];
        if (that.Type === 'buynow') {
          oldcart = wx.getStorageSync('buy_now');
          cart = oldcart;
          let orders = [];
          //把已付款的信息缓存到订单列表中
          if (wx.getStorageSync('orders')) {
            let ordersync = wx.getStorageSync('buy_now');
            ordersync.money = ordersync.num * ordersync.goods_price;
            orders = ordersync;
          } else {
            wx.setStorageSync('orders', [])
          }
          orders.push(cart[0]);
          orders.money = orders.goods_price * orders.num;
          wx.setStorageSync('orders', orders);
          app.recordIntegral(orders.money, "-", "兑换商品支出");
        } else {
          oldcart = wx.getStorageSync('cart').filter(v => v.checked);
          cart = oldcart.filter(v => v.checked);
          //把已付款的信息缓存到订单列表中
          var orderArrary_temp = [];
          var orders_temp = wx.getStorageSync('orders');
          if (orders_temp != undefined && orders_temp != "") {
            orders_temp.push(cart[0]);
           
          } else {

            orders_temp = [cart[0]];
           
          }

          orders_temp[(orders_temp.length) - 1].money = cart[0].goods_price * cart[0].num;
          orderArrary_temp=orders_temp;
          wx.setStorageSync('orders', orderArrary_temp);
          app.recordIntegral(orders_temp[(orders_temp.length) - 1].money, "-", "兑换商品支出");
        }



        //删除缓存中的已付款的商品信息
        oldcart.map((v, i) => {
          cart.forEach((cv, ci) => {
            if (v.goods_id === cv.goods_id) {
              oldcart.splice(i, 1);
            }
          })
        })

        wx.setStorageSync('userinfo', userinfo);

        if (that.Type != 'buynow') {
          wx.setStorageSync('cart', oldcart)
        } else {
          wx.setStorageSync('buy_now', {})
        }
        wx.showToast({
          title: '购买成功',
        });
        setTimeout(function () {
          wx.redirectTo({

            url: '/pages/order/order',
          })
          that.setData({
            cart: []
          })
        }, 1500)

      } else {
        wx.showToast({
          icon: 'none',
          title: '余额不足!',
        });
        setTimeout(function () {
          wx.navigateBack({
            delta: 1,
            success: (res) => {},
            fail: (res) => {},
            complete: (res) => {},
          })
        }, 1500)
      }

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
    var that = this;
    //获取缓存里有没有地址栏
    if (wx.getStorageSync('address')) {
      let addressobj = wx.getStorageSync('address');
      addressobj.all = wx.getStorageSync('address').provinceName + wx.getStorageSync('address').cityName + wx.getStorageSync('address').countyName + wx.getStorageSync('address').detailInfo;
      that.setData({
        address: addressobj
      })
    }
    let userinfo = wx.getStorageSync('userinfo');
    that.setData({
      userinfo
    })
    that.CalcPrice();
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