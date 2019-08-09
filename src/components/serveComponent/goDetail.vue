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
      this.detailList.createTime.time = this.util.formatDate(new Date(date), "MM-dd hh:mm")
    },
    methods: {

    }
  }
</script>

<style lang="less" scoped>
    .content {
      width: 100%;
      background-color: white;
      .title {
        background-color: white;
        text-align: center;
        color: black;
        font-size: .6rem;
        padding-top: .4rem;
        padding-bottom: .4rem;
        font-weight: 700;
        margin-bottom: .4rem;
      }
      .time {
        font-size: .3rem;
        text-align: left;
        padding-left: .3rem;
        padding-top: .4rem;
        color: #888;
      }
    }
</style>
