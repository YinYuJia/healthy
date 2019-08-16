<template>
  <div id="app">
    <div class="picWrap">
      <img :src="reportImg" class="reportImgClass" alt />
    </div>
    <div class="tips">
      <p>
        <i class="el-icon-warning" style="color:#05AEF0"></i>温馨提示
      </p>
      <p>请下载该登记表，并于敲章后重新上传。</p>
    </div>
    <div class="box">
      <div class="footer">
        <mt-button class="btn1" type="default" @click="downReport">下载登记表</mt-button>
        <mt-button class="btn2" type="primary" @click="goUpload">上传附件</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import { MessageBox } from 'mint-ui'
export default {
  data () {
    return {
      reportImg: '',
        pdfUrl: ''
    }
  },
  created () {
    if (this.$route.query.isEdit) {
      MessageBox({
        title: '提示',
        message: '您已修改信息，请重新下载登记表'
      })
    }
    console.log(this.$store.state.REGISTER_INFO)
    this.reportImg = this.$store.state.REGISTER_INFO.imgUrl
    console.log("链接",this.$store.state.REGISTER_INFO.pdfUrl)
  },
  methods: {
    goUpload () {
      this.$router.push({ path: '/registerThree' })
    },
    downReport () {
            
            let _this = this;
            console.log(2222)
            var u = navigator.userAgent;
            var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            console.log("是否为苹果设备",isiOS);
            if ( isiOS ) {

                window.location.href = _this.pdfUrl

            }else{
                
                window.location.href = _this.pdfUrl

                // dd.ready({
                // developer: 'daip@dtdream.com',
                // usage: [
                //     'dd.biz.util.openLink',
                // ],
                // remark: '描述业务场景'
                // }, function() {
                //     dd.biz.util.openLink({
                //         url: _this.pdfUrl,
                //         onSuccess: function(data) {},
                //         onFail: function(error) {}
                //     })
                // })
            }
    }
  }
}
</script>

<style scoped lang="less">
#app {
  background: #fff;
  height: 100%;
  position: absolute;
  width: 100%;
  margin-bottom:  1.65rem;
}
.picWrap {
  // height: 12rem;
}
.reportImgClass{
  width: 100%;
}
.tips {
  font-size: 0.24rem;
  text-align: left;
  color: #000;
  line-height: 2;
  margin-left: 30px;
  font-family: PingFangSC-Regular;
  opacity: 0.45;
}
.box {
  position: fixed;
  bottom: 0.3rem;
  left: 0.3rem;
  right: 0.3rem;
  .footer {
    display: flex;
    .btn1 {
      flex: 1;
      background: #ffffff;
      border: 1px solid #c9c9c9;
      border-radius: 5px;
      width: 3.45rem;
      height: 1.05rem;
      margin-right: 0.3rem;
    }

    .btn2 {
      flex: 1;
      background: #1492ff;
      border-radius: 5px;
      width: 3.45rem;
      height: 1.05rem;
    }
  }
}
</style>
