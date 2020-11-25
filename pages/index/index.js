//index.js

Page({
  data: {
    // userInfo: "test"
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
    analysisDialogText: [{text: '确定'}]
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
  tapAnalysisDialogButton: function() {
    this.setData({
      showAnalysisDialog: false
    })
  },
  onLaunch: function () {
    console.log('Page1 launch');
  },
  onShow: function() {
    console.log('Page1 Show');
  },
  onReady: function() {
    console.log('Page1 Ready');
  },
  onHide: function() {
    console.log('Page1 Hide');
  },
  onUnload: function() {
    console.log('Page1 Unload');
  }
})
