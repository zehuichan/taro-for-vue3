export default {
  handleUploadFile(type = 1) {
    const callback = (res) => {
      this.$emit('update:actionVisible', false)
      this.$toast.loading({
        mask: true,
        message: '上传中...'
      })
      const filePaths =
        type === 3 ? res.tempFiles.map((item) => item.path) : res.tempFilePaths
      Promise.all(
        filePaths.map((item) => {
          return Taro.uploadFile({
            url: this.$baseURL + '/simpleUpload',
            filePath: item,
            name: 'file',
            formData: {
              targetPath: this.currentPathArr.join('/')
            },
            header: {
              sessionid: Taro.getStorageSync('sessionId')
            }
          }).then((data) => {
            try {
              const res = JSON.parse(data.data)
              if (res.errCode === 200) {
                const { fileName } = res.data
                this.$notify({
                  type: 'success',
                  message: `上传成功，文件保存为${fileName}`,
                  duration: 2000
                })
                this.$emit('onNeedRefresh')
              } else {
                this.$notify({
                  type: 'success',
                  message: `上传失败，${res.errMsg}`,
                  duration: 2000
                })
              }
            } catch (e) {
              this.$notify({
                type: 'success',
                message: `上传失败，服务端错误`,
                duration: 2000
              })
            }
          })
        })
      ).then(() => {
        this.$toast.clear()
      })
    }
    if (type === 1) {
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success(res) {
          callback(res)
        }
      })
    } else if (type === 2) {
      wx.chooseVideo({
        sourceType: ['album', 'camera'],
        maxDuration: 60,
        camera: 'back',
        success(res) {
          callback(res)
        }
      })
    } else if (type === 3) {
      wx.chooseMessageFile({
        count: 1,
        success(res) {
          callback(res)
        }
      })
    }
  }
}
