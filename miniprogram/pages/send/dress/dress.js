// miniprogram/pages/send/dress/dress.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ondress: {
      title:'填写地点',
      addr: '',
      latitude: '',
      longitude: ''
    },
    name:'',
    phone:'',
    flag:true,
    aflag: false,
    pflag: false,
    dflag:false,
    address:[],
  },
  onLoad: function (options) {
    if(options.title){
      const ondress=this.data.ondress;
        ondress.title=options.title;
        ondress.addr=options.addr;
        ondress.latitude=options.lat;
        ondress.longitude=options.lng;
      this.setData({
        ondress,
        dflag:true,
        flag:false,
        name:options.name,
        phone:options.phone,
      })
    }
    var that = this;
    wx.getStorage({
      key: 'openid',
      success(res) {
        const db = wx.cloud.database()
        db.collection('address').where({
          _openid: res.data
        }).get({
          success: res => {
            that.setData({
              address:res.data
            })
          }
        })
      },
      fail(res) {
        that.setData({
          flag: false
        })
      }
    })
  },
  oninput: function (e) {
    this.setData({
      phone: e.detail.value
    })
    this.onflag(1);
    if (e.detail.cursor === 11) {
      
      const db = wx.cloud.database()
      db.collection('users').where({
        phone: this.data.phone
      }).get({
        success: res => {
          if (res.data.length !== 0) {
            this.onflag(2);
          } else {
            wx.showModal({
              title: '提示',
              content: '此电话的用户尚未注册平台，无法使用平台服务功能。',
            })
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
  oninputp: function (e) {
    this.setData({
      name: e.detail.value
    })
    if (e.detail.cursor !== 0) {
      this.onflag(4);
    } else {
      this.onflag(3);
    }
  },
  onskip(){
    wx.navigateTo({
      url: '../tx-dress/tx-dress?id=2&&dress='+this.data.ondress.title,
    })
  },
  skip(e){
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];
    prevPage.setData({
      ondress: this.data.address[e.currentTarget.dataset.id].ondress,
      name: this.data.address[e.currentTarget.dataset.id].name,
      phone: this.data.address[e.currentTarget.dataset.id].phone,
      flag: true
    })
    wx.navigateBack();
  },
  onflag: function (a) {
    if (a === 1) {
      this.data.aflag = false;
    } else if (a === 2) {
      this.data.aflag = true;
    } else if (a === 3) {
      this.data.pflag = false;
    } else if (a === 4) {
      this.data.pflag = true;
    }
    if (this.data.aflag && this.data.pflag && this.data.dflag) {
      this.setData({
        flag: false
      })
    } else {
      this.setData({
        flag: true
      })
    }
  },
  onsubmit(e){
    const obj = {
      name:this.data.name,
      phone:this.data.phone,
      ondress:this.data.ondress,
    }
    const that=this;
    const db = wx.cloud.database();
    db.collection('address').where(obj).get({
      success: res =>{
        if(res.data.length===0){
          db.collection('address').add({
            data: obj,
            success: res => {
              var pages = getCurrentPages();
              var prevPage = pages[pages.length - 2];
              prevPage.setData({
                ondress: that.data.ondress,
                name: that.data.name,
                phone: that.data.phone,
                flag: true
              })
              wx.navigateBack();
            },
            fail: err => {
              wx.showToast({
                title: '网络错误',
              })
            }
          })
        }
      }
    })
    
  },
})