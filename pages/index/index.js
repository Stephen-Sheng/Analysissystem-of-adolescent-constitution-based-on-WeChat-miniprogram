//index.js

Page({
  data: {
    userInfo: '',
    loginJud: '',
    credits: '',
    creditList: [],
    // Tabbar
    list: [{
      "text": "首页",
      "iconPath": "/images/AnalysisImg.png",
      "selectedIconPath": "/images/clickAnalysis.png",
      // dot: true
  },
  {
      "text": "个人中心",
    "iconPath": "/images/centerImg.png",
    "selectedIconPath": "/images/clickCenter.png",
      // badge: 'New'
  }],
    showAnalysisDialog: false,
    analysisDialogText: [{text: '确定'}],
  },
  //事件处理函数
  tabChange (e) {
    console.log('tab change',e);
    wx.redirectTo({
      url: '/pages/advertise/advertise',
    })
  },
  clickAnalysis: function() {
      this.setData({
        showAnalysisDialog:true
      })
  },
  inClickAnalysis: function() {
    wx.redirectTo({
      url: '/pages/analysis/analysis',
    })
  },
  tapAnalysisDialogButton: function() {
    this.setData({
      showAnalysisDialog: false
    })
  },
  onLogin: function() {
    wx.redirectTo({
      url: '../userLogin/userLogin',
    })
  },
  onClickLogout: function() {
    wx.removeStorage({key:'userInfo'});
    wx.removeStorage({
      key: 'userToken',
    })
    wx.setStorage({
      data: false,
      key: 'loginJud',
    })
    this.setData({
      userInfo: '',
      loginJud: false,
    })
    wx.redirectTo({
      url: '../userLogin/userLogin',
    })

  },
  tapFavorite: function() {
    wx.redirectTo({
      url: '../favorite/favorite',
    })
  },
  tapCredits: function() {
    wx.redirectTo({
      url: '../credits/credits',
    })
  },
  tapSport: function() {
    wx.redirectTo({
      url: '../sport/sport',
    })
  },
  onReady: function() {
    var token = wx.getStorageSync('userToken');
    var that = this;
    var loginJud = wx.getStorageSync('loginJud');
    var userInfo = wx.getStorageSync('userInfo');
    if(userInfo && loginJud ){
      this.setData({
        userInfo,
        loginJud,
      })
      wx.request({
        url: 'https://www.sunshineforce.com/app/user/jifen',
        method: "POST",
        data: {token},
        success: function(res){
          that.setData({
            credits: res.data.data.jifen,
            creditList: res.data.data.list
          })
          wx.setStorage({
            data: that.data.credits,
            key: 'credits',
          })
          wx.setStorage({
            data: that.data.creditList,
            key: 'creditList',
          })
        }
      })
    }
    console.log('token', token);
    
  },
})
