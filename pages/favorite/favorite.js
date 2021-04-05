// pages/favorite.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: '',
    favList: [],
    favLength: 0

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var token = wx.getStorageSync('userToken');
    var that = this;
    wx.request({
      url: 'https://www.sunshineforce.com/app/user/shoucang',
      method: "POST",
      data:{token},
      success: function(res){
        var resData = res.data;
        if(resData.sta === 200){
          that.setData({
            favList: resData.data,
            favLength: resData.data.length
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var user = wx.getStorageSync('userInfo').name;
    this.setData({user});
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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