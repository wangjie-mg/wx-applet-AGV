const app=getApp();
Page({

  data: {
    address: [],
  },

  onLoad: function (options) {
  
  },
skip(e){
  wx.navigateTo({
    url: '../upaddress/upaddress?id=' + this.data.address[e.currentTarget.dataset.id]._id,
  })
},
onskip(){
  wx.navigateTo({
    url: '../upaddress/upaddress',
  })
},
  onShow: function () {
    var that = this;
    // wx.getStorage({
    //   key: 'openid',
    //   success(res) {
        const db = wx.cloud.database()
        db.collection('address').where({
          _openid: app.user._openid
        }).get({
          success: res => {
            that.setData({
              address: res.data
            })
          }
        })
      // },
      // fail(res) {
      //   that.setData({
      //     flag: false
      //   })
      // }
    // })
  },
})