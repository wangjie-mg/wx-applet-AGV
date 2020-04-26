// miniprogram/pages/send/tx-dress/tx-dress.js
// const app =getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    suggestion:[],
    backfill:'',
    back:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      back:options.dress,
      id:options.id
    })
  },
  onskip(e){
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];
    if(this.data.id == 2){
      prevPage.setData({
        ondress: this.data.suggestion[e.currentTarget.dataset.id],
        dflag: true
      })
    }else{
      const obj = [{
        iconPath: "./tqj.png",
        id: 0,
        latitude: this.data.suggestion[e.currentTarget.dataset.id].latitude,
        longitude: this.data.suggestion[e.currentTarget.dataset.id].longitude,
        width: 40,
        height: 40
      }];
      prevPage.setData({
        oldmar:obj,
        indress: this.data.suggestion[e.currentTarget.dataset.id]
      })
    }
      
    wx.navigateBack();
  },
  backfill: function (e) {
    var id = e.currentTarget.id;
    for (var i = 0; i < this.data.suggestion.length; i++) {
      if (i == id) {
        this.setData({
          backfill: this.data.suggestion[i].title
        });
      }
    }
  },

  getsuggest: function (e) {
    var _this = this;
    app.qqmapsdk.getSuggestion({
      keyword: e.detail.value, 
      region:'西安',
      success: function (res) {
        var sug = [];
        for (var i = 0; i < res.data.length; i++) {
          sug.push({ 
            title: res.data[i].title,
            addr: res.data[i].address,
            latitude: res.data[i].location.lat,
            longitude: res.data[i].location.lng
          });
        }
        _this.setData({ 
          suggestion: sug
        });
      },
      fail: function (error) {
        console.error(error);
      }
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