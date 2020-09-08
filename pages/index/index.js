//index.js
//获取应用实例
const app = getApp()
const wxApi = require('../../utils/auth.js')
Page({
  data: {
  },
  // 打开地图
  openMap: function() {
    wxApi.getWxSetting('userLocation').then(()=>{
        // 已经授权或还未授权，下面的代码也可以根据需求提取到公共文件中
      wx.getLocation({
        type: 'wgs84',
        success: res => {
          wx.openLocation({
            latitude: res.latitude,
            longitude: res.longitude,
          })
        },
        fail: err => {
          wx.showToast({
            title: '检查手机定位权限',
            icon: 'none',
            duration: 2000
          })
        }
      })
    })
  },
  // 保存到相册
  writePhotosAlbum: function() {
    wxApi.getWxSetting('writePhotosAlbum').then(()=>{
     // 已经授权或还未授权，下面的代码也可以根据需求提取到公共文件中
      wx.downloadFile({
        url: 'https://imgs.solui.cn/avatar.png',
        success: function(res) {
            wx.saveImageToPhotosAlbum({
                filePath: res.tempFilePath,
                success: function(res) {
                   wx.showToast({
                     title: '保存成功',
                     icon:'none'
                   })
                },
                fail: function(err) {
                  wx.showToast({
                    title: '保存失败',
                    icon:'none'
                  })
                }
            })
        }
      })
    })
  },
  onLoad: function () {
  
  },
})
