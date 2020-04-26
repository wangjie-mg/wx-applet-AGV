
Page({

  data: {
    phone:'',
  },
  
  onLoad: function (options) {
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
              let tel = res.data[0].phone;
              let tell = tel.replace(tel.substring(3, 7), "****")
              that.setData({
                phone: tell,
              })
            }
          }
        })
      }
    })
  },

  onout(){
    wx.showModal({
      title: '提示',
      content: '是否退出登录',
      success(res) {
        if (res.confirm) {
          // console.log('用户点击确定')
          wx.removeStorage({
            key: 'id',
            success: function(res) {
              wx.navigateBack()
            },
            fail:function(){
              wx.showToast({
                title: '退出失败',
              })
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  onskipa(){
    wx.navigateTo({
      url: './address/address',
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