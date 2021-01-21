//index.js

Page({
  data: {
    userInfo: wx.getStorageSync('userInfo'),
    loginJud: wx.getStorageSync('loginJud'),
    // Tabbar
    list: [{
      "text": "分析",
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
      url: '/pages/analysis/analysis',
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
    wx.removeStorageSync('userInfo');
    this.setData({
      userInfo: '',
      loginJud: false,
    })
    wx.redirectTo({
      url: '../userLogin/userLogin',
    })

  },
  onReady: function() {
    var loginJud = wx.getStorageSync('loginJud');
    var userStorage = wx.getStorageSync('userInfo');
    if(userStorage && loginJud ){
      this.setData({
        userInfo: userStorage
      })
    }
  },
})
