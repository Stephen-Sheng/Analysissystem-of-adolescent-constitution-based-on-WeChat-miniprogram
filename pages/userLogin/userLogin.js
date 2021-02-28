// pages/userLogin/userLogin.js
import lmd5 from '../../utils/MD5'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneNum:'',
    pwd:'',
    md5_pwd:'',
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    loginInfo:'',
    loginJud: false,
    code:'',
    token:'',

  },

  bindPhoneInput: function (e) {
    var value = e.detail.value; //获取输入的内容
    this.setData({
      phoneNum:value,//改变page--data中phoneNum的值
    })
  },
  bindPwdInput: function (e) {
    var value = e.detail.value; //获取输入的内容
    this.setData({
      pwd:value,//改变page--data中phoneNum的值
    })
  },
  bindGetUserInfo (e) {
    console.log(e.detail.userInfo)
  },
  submitAcc: function () {
    var that = this;
    var pwd_copy = that.data.pwd;
    that.setData({
      md5_pwd: lmd5.hex_md5(pwd_copy)
    })
    if(that.data.phoneNum.length ==0 || that.data.pwd.length ==0){//校验非空
      wx.showToast({  //弹框提示
        icon: 'none',
        title: '用户名或密码不能为空！',
        duration: 2000,
      })
    }else {
      var timestamp = Math.round(new Date().getTime()/1000);
      wx.request({  //向后台发送请求
        url: 'https://www.sunshineforce.com/app/tourist/login',
        method: "POST",
        data: {
          phone: that.data.phoneNum, //this.data.phoneNum 代表你data中phoneNum的值
          password: lmd5.hex_md5(that.data.md5_pwd + timestamp),
          times: timestamp
        },
        success: function (res) {
           //res为后台返回给前端的数据
          that.setData({
            loginInfo: res.data.sta 
          })
          if(that.data.loginInfo == 200){ //如果返回的code为200，代表用户名密码验证成功
            that.setData({
              token: res.data.data.token,  
            })
            wx.setStorageSync('userToken', that.data.token);
            console.log(that.data.token);
            wx.showToast({
              title: '登录成功',
            })
            that.setData({
              loginJud: true 
            })
            wx.setStorageSync('loginJud', that.data.loginJud); //保存userId至本地，以便随时调用
            wx.getSetting({
              success:(res) => {
                // 判断用户权限
                if (res.authSetting['scope.userInfo'] == undefined)
                {
                  // 如果未开启权限
                  wx.authorize({
                    scope: 'scope.userInfo',
                    success:() => {
                      // 用户点击确定后执行此处代码。跳转页面
                      wx.redirectTo({
                        url: '../index/index',
                      })
                    }
                  })
                }
                // 若用户已开启权限，直接跳转页面。
                else
                {
                  wx.getUserInfo({
                    success: function(res){
                      wx.setStorageSync('userInfo', res.userInfo);
                      wx.redirectTo({
                        url: '../index/index',
                      })
                    }
                  });
                }
              }
            })
          }else{
            that.setData({
              pwd: ''
            })
            wx.showToast({
              icon: 'none',
              title: '用户名或密码错误',
            })
          }
 
        }
      })
    }
  },
})