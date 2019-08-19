<template>
  <div id="app">
    <div class="dataUpload">
      <h3 class="h3Title">根据业务需要，需要您补充提交以下资料</h3>
      <div class="uploadHint">1.统一社会信用代码证</div>
        <div class="detail">图片格式为jpg、png，不大于5M的文件</div>
      <div class="picWrap">
        <div class="uploadBtn"  v-show="picWrap.img1">
          <img :src="picWrap.img1" class="pic" @click="showBigPhoto(picWrap.img1)" />
        </div>
        <div style="display:block;">

        <svg-icon @click="uploadImg('21')" icon-class="serveComponent_upload" />
        </div>
      </div>
      <div class="uploadHint">2.社会保险单位参保信息登记表</div>
        <p class="detail">图片格式为jpg、png，不大于5M的文件</p>
      <div class="picWrap">
        <div class="uploadBtn"  v-show="picWrap.img2">
          <img :src="picWrap.img2" class="pic" @click="showBigPhoto(picWrap.img2)" />
        </div>
        <div>

        <svg-icon @click="uploadImg('22')" icon-class="serveComponent_upload" />
        </div>
      </div>
    </div>
    <div class="box">
      <Footer btnText="确认提交" :canSubmit="canSubmit" @submit="submit()"></Footer>
    </div>
    <PhotoView ref="photo" :imgUrl="imgUrl"></PhotoView>
  </div>
</template>

<script>
export default {
  data () {
    return {
      picWrap: {
        img1: '',
        img2: ''
      },
      imgUrl: '',
      canSubmit: false,
      photoIdList1: '',
      photoIdList2: ''
    }
  },
  created () {
    this.AGA002 = this.$route.query.AGA002 || '确认-00122-002'
  },
  watch: {
    picWrap: {
      handler: function (val) {
        if (this.picWrap.img1 && this.picWrap.img2) {
          this.canSubmit = true
        } else {
          this.canSubmit = false
        }
      },
      deep: true
    }
  },
  methods: {
    // 查看大图
    showBigPhoto (val) {
      this.imgUrl = val
      this.$refs.photo.open()
    },
    uploadImg (index) {
      let This = this
      if (this.$isSdk) {
        dd.ready({
          developer: 'zzxprint',
          usage: [
            'dd.device.notification.chooseImage'
          ],
          remark: '补充材料上传'
        }, function () {
          dd.device.notification.chooseImage({
            onSuccess: function (data) {
              console.log(data)

              if (data.picPath) {
                let submitForm = {}
                // 加入用户名和电子社保卡号
                submitForm.AAC003 = This.$store.state.SET_NATIVEMSG.name || '陈志相'
                submitForm.AAE135 = This.$store.state.SET_NATIVEMSG.idCard || '330327197412201736'
                // 加入子项编码
                submitForm.AGA002 = This.AGA002
                // 加入照片
                submitForm.photoList = data.picPath[0]
                // 类型为附件
                // PTX001  21为统一社会信用代码证  22为社会保险单位参保信息登记表
                submitForm.PTX001 = index
                const params = This.epFn.commonRequsetData(This.$store.state.SET_NATIVEMSG.PublicHeader, submitForm, '2006')
                // 图片上传后台
                This.$axios.post(This.epFn.ApiUrl() + '/h5/jy2006/updPhoto', params).then((resData) => {
                  //   成功   1000
                  if (resData.enCode == 1000) {
                    if (index == '21') {
                      This.picWrap.img1 = data.picPath[0]
                      This.photoIdList1 = resData.photoId
                    } else {
                      This.picWrap.img2 = data.picPath[0]
                      This.photoIdList2 = resData.photoId
                    }
                  } else if (resData.enCode == 1001) {
                    //   失败  1001
                    This.$toast(resData.msg)
                  } else {
                    This.$toast('业务出错')
                  }
                })
              }
            },
            onFail: function (error) {
              this.$toast(error)
              console.log('请求图片失败', error)
            }
          })
        })
      }
    },
    submit () {
      if (this.canSubmit) {
        const submitForm = {
          BKZ019: this.$store.state.REGISTER_INFO.BKZ019 || '',
          photoIdList: this.photoIdList1 + ',' + this.photoIdList2
        }
        const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader, submitForm, '9100-2')
        this.$axios.post(this.epFn.ApiUrl() + '/h5/jy9100/updPhoto', params).then(resData => {
          if (resData.enCode == 1000) {
            this.$router.push({path: '/registerFour'})
          } else if (resData.enCode == 1001) {
          //   失败  1001
            console.log('返回信息失败', resData)
            this.$toast(resData.msg)
          } else {
            this.$toast('业务出错')
          }
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
  #app{
    background: #fff;
    height: 100%;
    position: absolute;
    width: 100%;
  }
  .box {
    position: fixed;
    bottom: .3rem;
    left: .3rem;
    right: .3rem;
    .footer {
      display: flex;
      .btn1 {
        flex: 1;
        background: #FFFFFF;
        border: 1px solid #C9C9C9;
        border-radius: 5px;
        width: 3.45rem;
        height: 1.05rem;
        margin-right: .3rem;
      }

      .btn2 {
        flex: 1;
        background: #1492FF;
        border-radius: 5px;
        width: 3.45rem;
        height: 1.05rem;
      }
    }

  }
  // 资料上传
  .dataUpload {
    background: #fff;
    margin: 0;
    padding: 0.37rem .3rem;
    .h3Title{
      font-weight: normal;
      margin-bottom: 14px;
    }
    .detail{
      color: #999;
      font-size: .28rem;
      text-align: left;
      margin: 10px 0;
       margin-left: .28rem;
    }
    .picWrap {
      display: flex;
      flex-wrap: wrap;
      margin-top: 0.2rem;
      margin-left: .28rem;
      .uploadBtn {
        position: relative;
        height: 1.5rem;
        width: 1.5rem;
        margin: 0.1rem 0.15rem 0 0;
        img {
          height: 100%;
          width: 100%;
        }
        .svg-icon {
          position: absolute;
          height: 0.4rem;
          width: 0.4rem;
          top: -0.2rem;
          right: -0.2rem;
        }
      }
      .svg-icon {
        margin: 0.1rem 0.15rem 0 0;
        height: 1.5rem;
        width: 1.5rem;
      }
    }
    .uploadHint,.h3Title {
      margin-top: 10px;
      font-size: 0.28rem;
      text-align: left;
    }
  }
</style>
