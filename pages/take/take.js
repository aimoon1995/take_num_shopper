// pages/take/take.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    serverUrl: 'https://moon.idoge.mobi',
    permCount:0,
    hairCutCount:0,
    permCountSec:0,
    hairCutCountSec:0,
    name:null,
    mobile:null,
    token:null,
    custNumShow:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    console.log(wx.getStorageSync('token')+"wx.getStorageSync('token')")
    this.setData({
      token:wx.getStorageSync('token')
    })

    this.getRuleNum()
    this.showNumTips()
  },
  
  
  showNumTips:function(){
    let that = this;
    var openId = that.data.token
      // 发送 res.code 到后台换取 openId, sessionKey, unionId
      wx.request({
        method: 'GET',
        url: that.data.serverUrl+'/moon/take/num/type/showNum',
        data: {
          openId:openId
        },
        success: function (res) {
          if (res.data.success) {
            that.setData({
              custNumShow:res.data.msg
             })     
          }
        }
      })
  },



  getRuleNum:function(){
    let that = this;
      // 发送 res.code 到后台换取 openId, sessionKey, unionId
      wx.request({
        method: 'POST',
        url: that.data.serverUrl+'/moon/take/num/type/count',
        success: function (res) {
          try {
           that.setData({
            permCount:res.data.data.permCount,
            hairCutCount:res.data.data.hairCutCount
           })
          } catch (e) {
          }
        }
      })
  },

  clickIcon:function (event) {
    console.log(event.detail.value)
   this.setData({
     name:event.detail.value
   });
  },
  
  nameClear:function (event) {
    console.log(event.detail.value)
   this.setData({
     name:null
   });
  },
  mobClear:function (event) {
    console.log(event.detail.value)
   this.setData({
     mobile:null
   });
  },
  mobClickIcon:function (event) {
    console.log(event.detail.value)
   this.setData({
    mobile:event.detail.value
   });
  },
  permCountChange:function (event) {
   this.setData({
    permCountSec:event.detail
   });
  },
  
  hairCutCountChange:function (event) {
   this.setData({
    hairCutCountSec:event.detail
   });
  },

  check:function name(name,mobile,permCountSec,haircutCountSec) {
    // 检验
    if (name == null || name =="") {
      wx.showToast({
        title: '称呼必填',
        icon: 'error',
        duration: 2000
      })
      return false;
     } else if (mobile == null || mobile == "") {
      wx.showToast({
        title: '手机号必填',
        icon: 'error',
        duration: 2000
      })
      return false;
    } else if (permCountSec == 0 && haircutCountSec == 0) {
      wx.showToast({
        title: '请预约人数',
        icon: 'error',
        duration: 2000
      })
      return false;
    }else{
      var myreg=/^[1][3,4,5,6,7,8,9][0-9]{9}$/;
            if (!myreg.test(mobile)) {
              wx.showToast({
                title: '手机号格式有误',
                icon: 'error',
                duration: 2000
              })
              return false;
            }  else {
             return true;
            }
    }; 
  },
  takeNum:function() {
    let that = this
    var name = this.data.name;
    var mobile = this.data.mobile;
    var permCountSec = this.data.permCountSec;
    var hairCutCountSec = this.data.hairCutCountSec;
    var openId = this.data.token
    var res =this.check(name,mobile,permCountSec,hairCutCountSec);
    if (res == true) {
      wx.request({
        url: this.data.serverUrl+'/moon/take/num/take',
        data: {
          permCount:permCountSec,
          hairCutCount:hairCutCountSec,
          name:name,
          mobile:mobile,
          openId:openId
        },
        method: "get",
        success: function (res) {
          if (res.data.success) {
            
            wx.showToast({
              title: '取号成功，请您等候',
              icon: 'none',
              duration: 2000
            })
            that.getRuleNum()
            that.showNumTips()
          } else {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 2000
            })
          }
        }
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
    let  that = this;

    queryInfo(this.userI);
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