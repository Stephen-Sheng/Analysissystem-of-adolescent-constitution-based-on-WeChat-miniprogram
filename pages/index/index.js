//index.js

Page({
  data: {
    color: "window",
    msg: "Hello, world!",
    flag: true
  },
  //事件处理函数
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
  },
  click: function() {
    if(this.data.flag){
      this.setData({
        color: "window-green",
        msg: "Hello, world!",
        flag: false
      })
      
    }
    else{
      this.setData({
        color: "window",
        msg: "Changed",
        flag: true
      })
    }
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        var latitude = res.latitude // 纬度
        var longitude = res.longitude // 经度
      }
    })
  }
})
