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
    let currYear = this.data.calendarData.currentYear;
    let currMonth = this.data.calendarData.currentMonth;
    let allArr = this.data.calendarData.allArr;
    for(let i=0;i<newSportTime.length;i++){
      if(newSportTime[i][0] == currYear){
        if(newSportTime[i][1] == currMonth){
          for(let j=0;j < allArr.length;j++){
            if(allArr[j].month === 'current' && newSportTime[i][2]==allArr[j].date){
              item.push(allArr[j].date);
            }
          }
        }
      }
    }
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
  onReady: function () {
    let token = wx.getStorageSync('userToken');
    let that = this;
    wx.request({
      url: 'https://www.sunshineforce.com/app/user/getSportSketch',
      method: "GET",
      data:{
        token,
        month:`${new Date().getFullYear()}-${new Date().getMonth()}`
      },
      success: function(res){
        let resData = res.data.data;
        let sportTime = [];
        for(let i=0;i<resData.length;i++){
          let item = resData[i].time;
          sportTime.push(item);
        }
        that.setData({sportTime},that.changeTime); 
      }
    })
  },

})