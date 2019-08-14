<template>
  <div>
    <div class="content">
      <div class="title">
        {{detailList.name}}
      </div>
      <div class="time">
        {{detailList.createTime.time}}
      </div>
      <div class="synopsis ql-container ql-snow">
        <div class="ql-editor" v-html="detailList.synopsis">{{detailList.synopsis}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        id: '',
        detailList: []
      }
    },
    created() {
      this.detailList = this.$route.query.param;
      let date = this.$route.query.param.createTime.time;
      console.log("content:", this.detailList);
      this.detailList.createTime.time = this.util.formatDate(new Date(date), "MM-dd hh:mm:ss")
    },
    methods: {

    }
  }
</script>

<style lang="less" scoped>
    .content {
      width: 100%;
      height: 100%;
      background-color: white;
      .title {
        height: auto;
        background-color: white;
        /*padding-top: .4rem;
        padding-bottom: .4rem;*/
        margin-bottom: .4rem;
        font-family: PingFangSC-Semibold;
        font-size: 24px;
        color: #333333;
        letter-spacing: -0.0043rem;
        text-align: justify;
        padding: .4rem;
      }
      .time {
        font-size: .3rem;
        text-align: left;
        padding-left: .3rem;
        color: #888;
      }
      .ql-editor {
        font-size: .38rem;
        padding: .2rem;
      }
    }
  /deep/.ql-editor img{
    width: 100%;
  }
</style>
