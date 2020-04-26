Page({

  data: {
    phone:'',
    password:'',
    flag:true,
    aflag:false,
    pflag:false,
  },

  onLoad: function (options) {

  },
  onskip:function(){
    wx.navigateTo({
      url: '../signin/signin',
    })
  },
  oninput:function(e){
    this.setData({
      phone: e.detail.value
    })
      this.onflag(1);
    if (e.detail.cursor === 11){
      this.onflag(2);
    }
  },
  oninputp:function(e){
    this.setData({
      password:e.detail.value
    })
    if(e.detail.cursor!==0){
      this.onflag(4);
    }else{
      this.onflag(3);
    }
  },
  onflag:function(a){
    if(a===1){
      this.data.aflag = false;
    }else if(a===2){
      this.data.aflag =true;
    }else if(a===3){
      this.data.pflag = false;
    }else if(a===4){
      this.data.pflag = true;
    }
    if(this.data.aflag && this.data.pflag){
      this.setData({
        flag: false
      })
    }else{
      this.setData({
        flag: true
      })
    }
  },
  onsubmit:function (e){
    const db = wx.cloud.database()
    db.collection('users').where({
      phone: this.data.phone
    }).get({
      success: res => {
        if (res.data.length !== 0) {
          if(res.data[0].password === this.data.password){
            wx.setStorage({
              key: 'id',
              data: res.data[0]._id,
              success(){
                wx.navigateBack();
              },
              fail(res){
                wx.showToast({
                  icon: 'none',
                  title: '登录错误，请重新登录。',
                });    
              }
            })
          }else{
            wx.showToast({
              icon:'none',
              title: '密码错误',
            });
          }
        } else {
          wx.showToast({
            icon: 'none',
            title: '此电话还未注册',
          });
        }
      },
      fail: err => {
        wx.showToast({
          title: '网络错误',
        })
      }
    })
  },
  
})