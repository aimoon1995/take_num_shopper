// app.js
App({
  onLaunch() {
    let that = this;
    
    // 登录
    let openid = that.globalData.token
    console.log(that.globalData.token)
    if(openid===null||openid===undefined){
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          wx.request({
            method: 'POST',
            url: that.globalData.serverUrl+'/moon/take/num/openid/get?code=' + res.code,
            success: function (res) {
              try {
                that.globalData.userInfo = res.data.data
                that.globalData.token = res.data.data.openid
                wx.setStorageSync('token', res.data.data.openid)
              } catch (e) {
              }
            }
          })
        }
      })
    }    
  },
  globalData: {
    userInfo: null,
    tokenKey: 'API_TOKEN',
    token: null,
    serverUrl: 'https://moon.idoge.mobi'
  }
})
