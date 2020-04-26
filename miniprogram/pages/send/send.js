const app=getApp();
Page({
  data: {
    wieghtdata: ['0~3公斤', '3~5公斤', '5~10公斤'],
    weight:'请选择',
    text:'请填写',
    btext:"物品描述,留言等",
    latitude: '',
    longitude: '',
    indress:{
      title: '',
      addr: '',
      latitude: '',
      longitude: ''
    },
    ondress: {
      title: '',
      addr: '',
      latitude: '',
      longitude: ''
    },
    name:'',
    phone:'',
    flag: false,
    xflag: false,
    bflag:false,
    wflag:false,
    polyline: [{
      points: [],
      color: "#FD4D01AA",
      width: 4,
    }],
    markers: [],
    oldmar:[],
    distance:'',
    money:0,
  },

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
    app.qqmapsdk.reverseGeocoder({
      success: function (res) {
        const indress = that.data.indress;
        indress.title = res.result.formatted_addresses.recommend;
        indress.addr = res.result.address;
        indress.latitude = res.result.location.lat;
        indress.longitude = res.result.location.lng;
        const obj={
          iconPath: "./tqj.png",
          id: 0,
          latitude: res.result.location.lat,
          longitude: res.result.location.lng,
          width: 40,
          height: 40
        },
        oldmar = that.data.oldmar;
        oldmar.push(obj);
        that.setData({
          oldmar,
          indress,
        })
      },
      fail: function (error) {
        console.error(error);
      }
    })
  },
  
  onShow:function(){
    var that=this;
    if(this.data.flag){
      app.qqmapsdk.calculateDistance({
        from: {
          latitude: this.data.indress.latitude,
          longitude: this.data.indress.longitude
        } || '', 
        to: [{
          latitude:this.data.ondress.latitude,
          longitude: this.data.ondress.longitude
        }], 
        success: function (res) {
          const long = JSON.stringify(res.result.elements[0].distance / 1000),
                oldmar = that.data.oldmar,
                obj = {
                  iconPath: "./tsj.png",
                  id: 1,
                  latitude: that.data.ondress.latitude,
                  longitude: that.data.ondress.longitude,
                  width: 40,
                  height: 40,
                  callout: {
                    content: "距离" + long + "公里",
                    color: "#555",
                    height: 60,
                    padding: 10,
                    fontSize: 14,
                    display: "ALWAYS",
                    bgColor: '#fff',
                  }
                };
          oldmar[1]=obj
          that.setData({
            distance: long,
            markers: oldmar
          });
        },
        fail: function (error) {
          console.error(error);
        },
      });
      const polyline = this.data.polyline,
            oj1={
              longitude: this.data.indress.longitude,
              latitude: this.data.indress.latitude,
            },
            oj2={
              longitude: this.data.ondress.longitude,
              latitude: this.data.ondress.latitude,
            };
      polyline[0].points[0]=oj1;
      polyline[0].points[1]=oj2;
      this.setData({
        polyline,
      })
      const mapCtx = wx.createMapContext('map');
      mapCtx.includePoints({
        padding: [100, 80, 100, 80],
        points: this.data.polyline[0].points
      })
    }
  },
  onskip(){
    if(this.data.flag){
      wx.navigateTo({
        url: './dress/dress?name=' + this.data.name + '&phone=' + this.data.phone + '&title=' + this.data.ondress.title + '&addr=' + this.data.ondress.addr + '&lat=' + this.data.ondress.latitude + '&lng=' + this.data.ondress.longitude,
      })
    }else{
      wx.navigateTo({
        url: './dress/dress',
      })
    }
  },
  skip(){
    wx.navigateTo({
      url: './tx-dress/tx-dress?id=1&dress='+this.data.indress.title,
    })
  },
  ontext(res) {
    wx.navigateTo({
      url: 'input-textarea/input-textarea?id=' + res.currentTarget.dataset.id,
    })
  },
  onweight(){
    const that=this;
    wx.showActionSheet({
      itemList: this.data.wieghtdata,
      success: function (res) {
        const weight=that.data.wieghtdata[res.tapIndex]
        that.setData({
          weight,
          wflag:true,
        })
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })  
  },
  onsubmit(){
    if (this.data.wflag && this.data.xflag){
      var cl = '';
      const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      const numPossible = possible.length;	
      const a = new Date;

      for (let i = 0; i < 8; i++) {
        cl += possible.charAt((Math.random() * numPossible) | 0);
      }

      const obj={
        indress:this.data.indress,
        ondress:this.data.ondress,
        text:this.data.text,
        weight:this.data.weight,
        remark:this.data.btext,
        name:this.data.name,
        phone:this.data.phone,
        password:cl,
        money:0,
        time:a.toLocaleString(),
        flag:false,
      } 
      const db = wx.cloud.database();
      db.collection('order').add({
        data: obj,
        success: res => {
          wx.showToast({
            title: '成功',
          })

          // wx.redirectTo({
          //   url: './result/result?p='+cl,
          // })

          wx.navigateBack();
        },
        fail: err => {
          wx.showToast({
            title: '网络错误',
          })
        }
      })
    }else{
      wx.showToast({
        title: '请填写物品信息和重量',
      })
    }
  },
})