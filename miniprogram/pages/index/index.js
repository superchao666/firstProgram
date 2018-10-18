//index.js
const app = getApp()
const moment = require('moment-with-locales.js')
Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    lastTime:'',
    counts:0,
  },

  onLoad: function() {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          const db=wx.cloud.database();
          db.collection("userInfo").where({
            _openid:this.data.openid
          }).get({
            success:res2=>{
              console.log(res2);
              this.setData({
                lastTime: res2.data[0].loginDate,
                counts: res2.data.length
              });
              console.log(this.data.counts);
            }
          })
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
              //this.checkUserInfo(res);
              var time = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
              //data.userInfo["loginDate"] = time;
              res.userInfo['loginDate'] = time;
              console.log(this.data.counts);
              //if (this.data.counts==0){
              //  this.saveUSerInfo(res);
              //}else{
               // this.updUserInfo(res);
              //}
              this.checkUserInfo(res);
            }
          })
        }
      }
    })
  },

  //保存用户信息
  checkUserInfo:function(data){
    const db=wx.cloud.database();
    db.collection("userInfo").where({
      _openid:this.data.openid
    }).count({
      success: res => {
        var time = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
        //data.userInfo["loginDate"] = time;
        data.userInfo['loginDate']=time;
        if(res.total==0){
          this.saveUSerInfo(data);
        }else{
          this.updUserInfo(data);
        }
      }
    })

  },
  saveUSerInfo:function(data){
    const db=wx.cloud.database();
    db.collection("userInfo").add({
      data:data.userInfo,
      success : res=>{
        console.log("添加成功");
        console.log(res.errMsg);
      }
    }
    )
  },
  updUserInfo:function(data){
    console.log(data.userInfo);
    const db=wx.cloud.database();
    db.collection("userInfo").doc(data.userInfo).update({
      success:res=>{
        console.log(res);
      }
    })

  },
  onGetUserInfo: function(e) {
    console.log(e);
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  onGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.navigateTo({
          url: '../userConsole/userConsole',
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },

  // 上传图片
  doUpload: function () {
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {

        wx.showLoading({
          title: '上传中',
        })

        const filePath = res.tempFilePaths[0]
        
        // 上传图片
        const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)

            app.globalData.fileID = res.fileID
            app.globalData.cloudPath = cloudPath
            app.globalData.imagePath = filePath
            
            wx.navigateTo({
              url: '../storageConsole/storageConsole'
            })
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })

      },
      fail: e => {
        console.error(e)
      }
    })
  },

})
