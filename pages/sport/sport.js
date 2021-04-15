// pages/sport/sport.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sportTime: [],
    newSportTime: [],
    calendarData: {},
    sportDay: [],
  },
  getCalendarData(e) { // 监听日历数据
    console.log(e.detail)
    this.setData({calendarData: e.detail},()=>{
      if(this.data.newSportTime !== []){
        this.findSportDay(this.data.newSportTime)
      }
    });
},
  findSportDay(newSportTime) {
    let item = [];
        for(let i=0;i<newSportTime.length;i++){
          if(newSportTime[i][0]==this.data.calendarData.currentYear){
            if(newSportTime[i][1]==this.data.calendarData.currentMonth){
              for(let j=0;j<this.data.calendarData.allArr.length;j++){
                if(this.data.calendarData.allArr[j].month === 'current' && newSportTime[i][2]==this.data.calendarData.allArr[j].date){
                  item.push(this.data.calendarData.allArr[j].date);
                }
              }
            }
          }
        }
        console.log(item);
        wx.setStorageSync('sportDay', item);
        this.selectComponent('#calendar_1').freshData();

  },
  changeTime(){
      let newSportTime = [];
      for(let i=0;i<this.data.sportTime.length;i++){
        let newStr = this.data.sportTime[i].split("-");
        newSportTime[i] = newStr;
      }
      this.setData({newSportTime},this.findSportDay(newSportTime));
      
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
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
        
        for(let i=0;i<resData.length;i++){
          let item = resData[i].time;
          sportTime.push(item);
        }
        that.setData({sportTime},that.changeTime); 
      }
    })
  },

})