Page({

  /**
   * 页面的初始数据
   */
  data: {
    order:'',
    latitude: '',
    longitude: '',
    markers: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  const that=this;
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
    const db = wx.cloud.database()
    db.collection('order').where({
      _id:options.id
    }).get({
      success: (res) => {
        console.log(res);
        if (res.data.length !== 0) {
          that.setData({
            order:res.data[0]
          })
        }
      }
    })
  },
  skip(){
    wx.navigateTo({
      url: '../result/result?id='+this.data.order._id+'&password='+this.data.order.password,
    })
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

})