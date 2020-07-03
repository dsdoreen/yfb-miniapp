// pages/cart/cart.js
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
    allChecked: false,
    disable: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  //数量更改函数
  CalcCartNum(e) {
    var that = this;
    const type = e.target.dataset.calctype;
    const cid = e.target.dataset.cartid;
    let cart_copy = this.data.cart;
    let index = cart_copy.findIndex(v => (v.goods_id === cid));
    let cnum = cart_copy[index].num;
    if (type === "sub") {
      if (cnum > 1) {
        cnum--;
      } else {

        wx.showModal({
          title: '提示',
          content: '是否要删除该商品？',
          success(res) {
            if (res.confirm) {
              cart_copy.splice(index, 1);
              that.initCart(cart_copy);
              console.log(cart_copy);
              //改变tabbar数量
              app.initCartNum();
            } else if (res.cancel) {}
          }
        })
      }

    } else if (type === "add") {
      cnum++;
      console.log(cid + "点击了加法")
    }

    cart_copy[index].num = cnum;
    that.initCart(cart_copy);
    //改变tabbar数量
    app.initCartNum();
  },
  //商品列表选择框改变函数
  handleItemChange(e) {
    let id = e.target.dataset.id;
    let cart_copy = this.data.cart;
    cart_copy.forEach(v => {
      if (v.goods_id === id) {
        v.checked = !v.checked;
      }
    })
    this.initCart(cart_copy);

  },
  //全选反选函数
  allChecked() {
    let allChecked = !this.data.allChecked;
    let cart_copy = this.data.cart;
    if (allChecked) {
      //全选选中的时候
      cart_copy.forEach(v => {
        v.checked = true
      })
    } else {
      //全选反选的时候
      cart_copy.forEach(v => {
        v.checked = false
      })
    }
    this.setData({
      allChecked: allChecked
    })
    this.initCart(cart_copy);
  },
  //获取缓存中的数据，并计算价格并存入data和缓存中
  CalcPrice() {
    //获取缓存中的购物车商品列表
    let cart = wx.getStorageSync('cart');
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
      this.setData({
        cart: cart,
        allChecked: allChecked,
        totalPrice: totalprice,
        sum: totalsum,
        disable: false
      })
    } else {
      this.setData({
        allChecked: false,
        disable: true,
        totalPrice: 0,
        sum: 0
      })
    }
  },
  //结算
  handlePay() {
    let {
      address,
      sum
    } = this.data;
    if (sum <= 0) {
      wx.showToast({
        icon: 'none',
        title: '没有选中商品',
      })
    } else if (!address.userName) {
      wx.showToast({
        icon: 'none',
        title: '您还没收货地址',
      })
    } else {
      //跳转到支付页面
      wx.navigateTo({
        url: '/pages/pay/pay',
      })
    }
  },
  //initCart 重新初始化数组的信息
  initCart(cart_copy) {
    this.setData({
      cart: cart_copy
    })
    wx.setStorageSync('cart', cart_copy);
    //重新计算价格
    this.CalcPrice();
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
    let cart = wx.getStorageSync('cart');
    this.setData({
      cart
    })
    //获取缓存里有没有地址栏
    if (wx.getStorageSync('address')) {
      let addressobj = wx.getStorageSync('address');
      addressobj.all = wx.getStorageSync('address').provinceName + wx.getStorageSync('address').cityName + wx.getStorageSync('address').countyName + wx.getStorageSync('address').detailInfo;
      this.setData({
        address: addressobj
      })
    }
    this.CalcPrice();
    app.initCartNum();
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