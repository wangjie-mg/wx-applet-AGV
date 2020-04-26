Page({

  
  data: {
    id:'',
  },
  onLoad: function (options) {
    this.setData({
      id:options.id
    })
  },
  onsubmit:function(e){
    if (e.detail.value.textarea===''){
      return;
    }
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];  
    if(this.data.id==="1"){
      prevPage.setData({
        text:e.detail.value.textarea,
        xflag:true
      })
    }else{
      prevPage.setData({
        btext: e.detail.value.textarea,
        bflag:true
      })
    }
    wx.navigateBack(); 
    },
})