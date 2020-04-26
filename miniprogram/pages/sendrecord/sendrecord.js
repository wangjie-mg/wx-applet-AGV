const app =getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    firstList:null,
  },

 
  onLoad: function (options) {
    const that=this;
    const db = wx.cloud.database()
    db.collection('order').where({
      _openid: app.user._openid
    }).get({
      success: res => {
        if (res.data.length !== 0) {
          that.setData({
            firstList: res.data
          })
        }
      }
    })
  },
  onskip(e) {
    wx.navigateTo({
      url: '../sendlist/content/content?id=' + this.data.firstList[e.currentTarget.dataset.id]._id,
    });
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