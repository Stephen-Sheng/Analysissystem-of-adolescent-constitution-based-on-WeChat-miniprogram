// pages/sport/sport.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sportTime: [],
    newSportTime: [],
  },
  getCalendarData(e) { // 监听日历数据
    console.log(e.detail)
},
  changeTime(){
      var newSportTime = [];
      for(var i=0;i<this.data.sportTime.length;i++){
        var newStr = this.data.sportTime[i].split("-");
        newSportTime[i] = newStr;
      }
      this.setData({newSportTime});
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var token = wx.getStorageSync('userToken');
    var that = this;
    wx.request({
      url: 'https://www.sunshineforce.com/app/user/getSportSketch',
      method: "GET",
      data:{
        token,
        month:`${new Date().getFullYear()}-${new Date().getMonth()}`
      },
      success: function(res){
        var resData = res.data.data;
        var sportTime = [];
        
        for(var i=0;i<resData.length;i++){
          var item = resData[i].time;
          sportTime.push(item);
        }
        that.setData({sportTime},that.changeTime); 
      }
    })
  },

})