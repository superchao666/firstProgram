//app.js
App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }

    this.globalData = {}

    this.AppMusic = wx.createInnerAudioContext();
    this.AppMusic.autoplay = true;
    this.AppMusic.loop = true;
    this.AppMusic.onPlay(() => {
      console.log('开始播放')
  }) 
  this.AppMusic.onError((res) => {
        console.log(res.errMsg)
        console.log(res.errCode)
      })

  }
})
