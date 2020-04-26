// miniprogram/pages/signin/signin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:'',
    password:'',
    cpassword:'',
    pflag: false,
    wflag:false,
    flag:true,
  },
  onflag:function(a){
    
    if(a==='a1'){
      this.data.pflag=true;
    }else if(a==='b1'){
      this.data.wflag=true;
    }else if(a==='a2'){
      this.data.pflag=false;
    }else if(a==='b2'){
      this.data.wflag = false;
    }

    if(this.data.pflag && this.data.wflag){
      this.setData({
        flag:false
      })
    }else{
      this.setData({
        flag:true
      })
    }
  },
  oninput:function(e){
    this.setData({
      phone:e.detail.value
    })
    this.onflag('a2');
    if(e.detail.cursor===11){
      const db = wx.cloud.database()
      db.collection('users').where({
        phone:this.data.phone 
      }).get({
        success: res => {
          console.log(res)
          if(res.data.length===0){
            this.onflag('a1');            
          }else{
            wx.showToast({
              title: '此电话已被注册',
            });
            this.onflag('a2');            
          }
        },
        fail: err => {
          wx.showToast({
            title: '网络错误',
          })
        }
      })
    }
  },
  inputpw:function(e){
    this.setData({
      password: e.detail.value
    })
    this.onflag('b2')
    if (this.data.cpassword === this.data.password) {
      this.onflag('b1')
    }
  },
  inputpa:function(e){
    this.setData({
      cpassword: e.detail.value
    })
    this.onflag('b2')
    if (this.data.cpassword === this.data.password){
      this.onflag('b1')
    }

  },
onsubmit: function(e){
  const db = wx.cloud.database();
  db.collection('users').add({
    data: {
      phone:this.data.phone,
      password:this.data.password
    },
    success: res => {
      wx.showToast({
        title: '注册成功',
      })
      wx.navigateBack(); 
    },
    fail: err => {
      wx.showToast({
        title: '网络错误',
      })
    }
  })
    // wx.showToast({
    //   title: '密码不正确',
    // })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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