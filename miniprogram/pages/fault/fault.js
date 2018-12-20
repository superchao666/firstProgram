// miniprogram/pages/fault/fault.js
const app = getApp();
var animation = wx.createAnimation({})
var i=1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
      message:'',
      dontAngle:false,
      textColor:['blue','red','grey','green'],
      count:1,
      innerAudioContext:'',
      timmer:'',
      tex:':对不起，我错了！以后不惹你生气了 \n',
      donghua: true,
      left1: Math.floor(Math.random() * 305 + 1),
      left2: Math.floor(Math.random() * 305 + 1),
      left3: Math.floor(Math.random() * 305 + 1),
      left4: Math.floor(Math.random() * 305 + 1),
      left5: Math.floor(Math.random() * 305 + 1),
      left6: Math.floor(Math.random() * 305 + 1),
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.AppMusic.seek(60);
    app.AppMusic.src = "http://bd.kuwo.cn/yinyue/650120?from=baidu";
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.showMessage();
    this.playMusic();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //this.donghua();
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

  showMessage:function(){
    var self=this;
    //if (!this.data.dontAngle) {
      this.data.timmer=setTimeout(function(){
        self.setData({
          message: self.data.message + '\t\t' + self.data.count+self.data.tex,
          count:self.data.count+1
        });
        self.showMessage();
      },1000);
    this.pageScrollToBottom();
    if (!this.data.dontAngle) {
      
    }
    //}
  },
  setmessage:function(){
    //clearTimeout(this.data.timmer);
    this.setData({
      message: this.data.message + '对不起，我错了！以后不惹你生气了      '
    });
    //this.showMessage();
  },
  dontAng:function(){
    this.donghua();
    if(!this.data.dontAngle){
      this.setData({
        dontAngle:true,
        message:'',
        tex:':我以后好好对你！ \n',
        count:1
      })
      wx.getUserInfo({
        success: res => {
          const db = wx.cloud.database();
          db.collection("fault").add({
            data: {
              name: res.userInfo.nickName,
              mes: '不生气了，我也爱你'
            },
            success: res => {
              console.log("添加成功");
            }
          })
        }
      })
    }
    

    if (this.data.innerAudioContext.paused){
      this.data.innerAudioContext.src = 'http://isure.stream.qqmusic.qq.com/C400002NsXRj09nTah.m4a?guid=8305701899&vkey=0885E23C0FCAE6EC31D841B642A772A21D9CBF35503B16A33ADED9489C17B46980B008E9519EE8F0A9DF9ABA611EDAF633D1EF80BAA90111&uin=0&fromtag=66';
      
      this.data.innerAudioContext.startTime = 63;
      this.data.innerAudioContext.play();
      this.data.innerAudioContext.loop = true;
    }else{
      this.data.innerAudioContext.pause();
    }

    //this.setData({
    //  message: this.data.message+'我以后好好对你！'
    //})
    console.log(this.data.message);
  },
  playMusic:function(){
    /*const musicData=-wx.getBackgroundAudioManager();
    musicData.title='I Love You';
    musicData.epname ='I Love You';
    musicData.signer='超哥';
    musicData.src ="http://bd.kuwo.cn/yinyue/650120?from=baidu";*/
    this.data.innerAudioContext=wx.createInnerAudioContext();
    this.data.innerAudioContext.autoplay = true;
    
    this.data.innerAudioContext.src ="https://m10.music.126.net/20181029110909/8f7c3d95be82723a95ea4d337e4d62a8/ymusic/87a8/5b78/11fa/6822cc7e1904dd7847287173a0853791.mp3"
    

    
    this.data.innerAudioContext.loop=false;
    //this.data.innerAudioContext.onPlay();
    this.data.innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })

},
  
  donghua: function () {
    var self=this;
    setTimeout(function () {
      animation.translateY(604).step({ duration: 4000 })
      this.setData({
        ["animationData" + i]: animation.export()
      })
      i++;
    }.bind(this), 500)
    if (i < 7) {
      setTimeout(function () {
        this.donghua()
      }.bind(this), 500)
    } else {
      console.log(22)
      setTimeout(function () {
        this.setData({
          donghua: false
        })
        //self.initDonghua();
      }.bind(this), 6500)
    }
  },
  initDonghua: function () {
    this.setData({
      donghua: true,
      i:1,
      left1: Math.floor(Math.random() * 305 + 1),
      left2: Math.floor(Math.random() * 305 + 1),
      left3: Math.floor(Math.random() * 305 + 1),
      left4: Math.floor(Math.random() * 305 + 1),
      left5: Math.floor(Math.random() * 305 + 1),
      left6: Math.floor(Math.random() * 305 + 1),
    });
    this.donghua();
},
  pageScrollToBottom: function () {
    wx.createSelectorQuery().select('#outer').boundingClientRect(function (rect) {
      //console.log(rect);
      // 使页面滚动到底部
      wx.pageScrollTo({
        scrollTop: rect.bottom
      })
    }).exec()
  },









},

)