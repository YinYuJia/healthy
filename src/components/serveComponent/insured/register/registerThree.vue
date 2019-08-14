<template>
  <div id="app">
    <div class="picWrap"><img src="" alt=""></div>
    <div class="box">
      <div class="footer">
        <mt-button class="btn1" type="default">重新上传</mt-button>
        <mt-button class="btn2" type="primary" @click="submit">立即提交</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      submit() {
        this.$router.push({path: '/registerFour'})
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
