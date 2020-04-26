const app = getApp()

Page({
  data: {
    latitude:'',
    longitude:'',
    markers: [],
    phone:'',
    tell:'',
    length:'',
    flag:true,
    aflag:false,
    navHeight:'',
    navTop:'',
  },

  onLoad: function() {
    var that = this;
    let menu = wx.getMenuButtonBoundingClientRect();
    wx.getSystemInfo({
      success: function(res) {
        let statusBarHeight = res.statusBarHeight;
        let navTop = menu.top;
        let navHeight = menu.height+navTop - statusBarHeight;
        that.setData({
          navHeight: navHeight,
          navTop: menu.top,
        })
      },
    })
  },
  
  onShow:function(){
    var that = this;
    wx.getStorage({
      key: 'id',
      success(res) {
        const db = wx.cloud.database()
        db.collection('users').where({
          _id: res.data
        }).get({
          success: res => {
            if (res.data.length !== 0) {
              app.user=res.data[0];
              let tel=res.data[0].phone;
              let tell=tel.replace(tel.substring(3, 7), "****")
              that.setData({
                phone:tell,
                flag: true,
              })
              const db = wx.cloud.database()
              db.collection('order').where({
                phone:tel,
                flag:false,
              }).get({
                success: (res) =>{
                  if(res.data.length!==0){
                    that.setData({
                      length:res.data.length,
                      aflag:true
                    })
                  }else{
                    that.setData({
                      length:0,
                      aflag:false
                    })
                  }
                }
              })
            } else {
              that.setData({
                flag: false
              })
            }
          }
        })
      },
      fail(res){
        that.setData({
          flag: false
        })
      }
    })
    wx.getLocation({
      type: 'gcj02',
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        that.setData({
          latitude,
          longitude,
        })
      }
    })
  },
  skip(){
    wx.navigateTo({
      url: '../login/login',
    })
  },
  skipa(){
    if(this.data.flag){
      wx.navigateTo({
        url: '../send/send',
      })

    }else{
      wx.navigateTo({
        url: '../login/login',
      })
    }
  },
  skipb(){
    if(this.data.flag){
      wx.navigateTo({
        url: '../sendlist/sendlist?id=1',
      })
    }else{
      wx.navigateTo({
        url: '../login/login',
      })
    }
  },
  skipc() {
    if (this.data.flag) {
      wx.navigateTo({
        url: '../home/home',
      })
    } else {
      wx.navigateTo({
        url: '../login/login',
      })
    }
  },
  skipd(){
    wx.navigateTo({
      url: '../sendlist/sendlist?id=0',
    })
  },
})