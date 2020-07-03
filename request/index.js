
//发送请求的次数
let ajaxTimes=0;
export const request=(params)=>{
  ajaxTimes++;
  //显示loading
  wx.showLoading({
    title: '玩命加载中...',
    mask:true
  })
  //定义公共的接口路径
  const baseUrl="https://api-hmugo-web.itheima.net/api/public/v1";
  return new Promise((resolve,reject)=>{
    wx.request({
      ...params,
      url:baseUrl+params.url,
      success:(res)=>{
        resolve(res)
      },
      fail:(err)=>{
        reject(err)
      },
      complete:()=>{
        ajaxTimes--;
        if(ajaxTimes===0){
          wx.hideLoading({
            success: (res) => {},
          })
        }
       
      }
    })
  })
}