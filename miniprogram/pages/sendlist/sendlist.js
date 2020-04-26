const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentIndex: 0,
    firstList: null,
    secondList: null,
    flag:false,
  },
  pagechange: function (e) {
    if ("touch" === e.detail.source) {
      this.setData({
        currentIndex: e.detail.current
      })
    }
  },
  titleClick: function (e) {
      this.setData({
        currentIndex: e.currentTarget.dataset.idx
      })
  },

  onLoad: function (options) {
    this.setData({
      currentIndex: options.id
    })

    var that = this;
    // wx.getStorage({
    //   key: 'openid',
    //   success(res) {

        const db = wx.cloud.database()
        db.collection('order').where({
          _openid: app.user._openid
        }).get({
          success: res => {
            if(res.data.length !==0){
              that.setData({
                firstList: res.data
              })
            }
          }
        })
    //   }
    // })
    // const db = wx.cloud.database()
    db.collection('order').where({
      phone:app.user.phone
    }).get({
      success:res =>{
        // console.log(res);
        if(res.data.length !== 0 ){
          this.setData({
            secondList: res.data
          })
        }
      }
    })
    // console.log(app.user)

    // const db = wx.cloud.database()
    // db.collection('order').where({
    //   flag: false,
    // }).update({
    //   data: {
    //     flag:true
    //   },
    //   success:res =>{
    //     console.log(res);
    //   }
    // })
    db.collection('order').where({
      phone: app.user.phone,
      flag: false,
    }).get({
      success: res => {
        const db = wx.cloud.database()
        for (let i = 0; i < res.data.length; i++) {
          db.collection('order').doc(res.data[i]._id).update({
            data: {
              flag: true,
            }, success: res => {
              console.log(res);
            }
          })
        }
      }
    })

    
  }, 
  onskip(e){
    if(this.data.currentIndex == 0){
      wx.navigateTo({
        url: './content/content?id='+this.data.firstList[e.currentTarget.dataset.id]._id,
      });
    }else if(this.data.currentIndex == 1){
      wx.navigateTo({
        url: './content/content?id='+this.data.secondList[e.currentTarget.dataset.id]._id,
      });
    }
  },
  onShow: function () {

  },
  skip(){
    this.setData({
      flag:!this.data.flag
    })
  },
  skips(e){
    wx.navigateTo({
      url: './result/result?id=' + this.data.secondList[e.currentTarget.dataset.id]._id + '&password=' + this.data.secondList[e.currentTarget.dataset.id].password,
    })
  },
  onskipa(){
    wx.redirectTo({
      url: '../home/home',
    })
  },
  onskipb(){
    wx.navigateTo({
      url: '../sendrecord/sendrecord',
    })
  },
  onskipc(){
    wx.navigateTo({
      url: '../receivedrecord/receivedrecord',
    })
  }

})