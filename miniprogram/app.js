//app.js
var QQMapWX = require('./lib/qqmap-wx-jssdk.js');
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: 'wlcar-9k4on',
        traceUser: true,
      })
    }
    this.qqmapsdk = new QQMapWX({
      key: 'O4RBZ-2Z63P-7BZDH-LV5YV-KVLXV-JKFXI'
    });
  },
  qqmapsdk:{},
  user:{}
})
