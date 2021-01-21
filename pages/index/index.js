//index.js

Page({
  data: {
    userInfo: wx.getStorageSync('userInfo'),
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
    // 下拉菜单
    selectShow: false,//控制下拉列表的显示隐藏，false隐藏、true显示
    selectData: ['15:10','15:15','15:20'],//下拉列表的数据
    index: 0
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
  selectTap() {
    this.setData({
      selectShow: !this.data.selectShow
    });
  },
  optionTap(e) {
    let Index = e.currentTarget.dataset.index;//获取点击的下拉列表的下标
    this.setData({
      index: Index,
      selectShow: !this.data.selectShow
    });
  },
  onLaunch: function () {
    
  },
  // onShow: function() {
  //   console.log('Page1 Show');
  // },
  onReady: function() {
    var loginJud = wx.getStorageSync('loginJud');
    var userStorage = wx.getStorageSync('userInfo');
    if(userStorage && loginJud ){
      this.setData({
        userInfo: userStorage
      })
    }
  },
  // onHide: function() {
  //   console.log('Page1 Hide');
  // },
  onUnload: function() {
    console.log('Page1 Unload');
    
  }
})
