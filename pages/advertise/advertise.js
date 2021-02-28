Page({

  data: {
    background: [{title:'图一',url:'https://www.sunshineforce.com/public/uploads/2018-04-04/5ac48781595af.jpg'}, 
    {title:'图二',url:'https://www.sunshineforce.com/public/uploads/2018-03-20/5ab0dc16d1990.jpg'}, 
    {title:'图三',url:'https://www.sunshineforce.com/public/uploads/2018-03-09/5aa22dfa6433d.jpg'},
    {title:'图四',url:'https://www.sunshineforce.com/public/uploads/2020-05-08/5eb508d4d2391.png'}],
    vertical: false,
    interval: 4000,
    duration: 1000,
    bannerCurrent: 0,
    Hei:"200"    
  },
  
//轮播current切换监听事件
bannerChange: function(e){
  console.log("监听轮播事件",e);
  this.setData({
    bannerCurrent: e.detail.current
  })
},


  imgH:function(e){
    var winWid = wx.getSystemInfoSync().windowWidth;         //获取当前屏幕的宽度
    var imgh=e.detail.height;　　　　　　　　　　　　　　　　//图片高度
    var imgw=e.detail.width;
    var swiperH=winWid*imgh/imgw + "px"　　　　　　　　　　//等比设置swiper的高度。  即 屏幕宽度 / swiper高度 = 图片宽度 / 图片高度    ==》swiper高度 = 屏幕宽度 * 图片高度 / 图片宽度
    this.setData({
        Hei:swiperH　　　　　　　　//设置高度
    })
},

  intervalChange(e) {
    this.setData({
      interval: e.detail.value
    })
  },

  durationChange(e) {
    this.setData({
      duration: e.detail.value
    })
  }
})