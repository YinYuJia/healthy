<template>
    <div id="app">
		<div class="picWrap"><img src="" alt=""></div>
		<div class="tips">
      <p><i class="el-icon-warning" style="color:#05AEF0"></i>温馨提示</p>
			<p>请下载该登记表，并于敲章后重新上传。</p>
		</div>
      <div class="box">
        <div class="footer">
          <mt-button class="btn1" type="default">下载登记表</mt-button>
          <mt-button class="btn2" type="primary" @click="goUpload">上传登记表</mt-button>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  methods: {
    goUpload() {
      this.$router.push({path:'/registerThree'})
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
.picWrap{
	height: 5rem;
}
.tips{
	font-size: .24rem;
	text-align: left;
	color: #000;
	line-height: 2;
  margin-left: 30px;
  font-family: PingFangSC-Regular;
  opacity: 0.45;
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
</style>
