// miniprogram/pages/home/upaddress/upaddress.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ondress: {
      title: '填写地点',
      addr: '',
      latitude: '',
      longitude: ''
    },
    name:'',
    value:'',
    flag:true,
    aflag: false,
    pflag: false,
    dflag: false,
    id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.id){
      const that = this;
      const db = wx.cloud.database();
      db.collection('address').where({
        _id:options.id
      }).get({
        success: res => {
          if (res.data.length !== 0) {
            that.setData({
              ondress:res.data[0].ondress,
              name:res.data[0].name,
              phone:res.data[0].phone,
              flag:false,
              dflag:true,
              aflag:true,
              pflag:true,
              id:options.id
            })            
          }
      }
    })
    }

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
  onskip() {
    wx.navigateTo({
      url: '../../send/tx-dress/tx-dress?dress=' + this.data.ondress.title,
    })
  },
onsubmit(){
  const obj = {
    name: this.data.name,
    phone: this.data.phone,
    ondress: this.data.ondress,
  }
  const that = this;
  const db = wx.cloud.database();

  if(this.data.id){
    db.collection('address').where(obj).get({
      success: res => {
        if (res.data.length === 0) {
          db.collection('address').doc(that.data.id).update({
            data: obj,
            success: res => {
              wx.navigateBack();
            },
            fail: err => {
              wx.showToast({
                title: '网络错误',
              })
            }
          })
        } else {
          wx.showToast({
            title: '未修改信息。'
          })
        }
      }
    })
  }else{
    db.collection('address').add({
      data: obj,
      success: res => {
        wx.navigateBack();
      },
      fail: err => {
        wx.showToast({
          title: '网络错误',
        })
      }
      })
  }
},
})