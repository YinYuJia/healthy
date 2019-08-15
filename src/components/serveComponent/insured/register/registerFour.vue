<template>
  <div class="elseDetail">
    <Title :title="'参保登记'" :backRouter="'/'"></Title>
    <div class="Content">
      <!-- 办事进度 -->
      <WorkProgress :currentStep="currentStep"></WorkProgress>
      <!-- 办理结果 -->
      <DetailStatus nameWidth="1.8rem"></DetailStatus>
      <!-- 邮递信息 -->
      
    </div>
    <Success :flag="successFlag"></Success>
    <!-- 底部 -->
    <!-- <Footer :btnType="2" v-if="currentStep==1" @backout="backout()" :handleNumber="handleNumber" @edit="edit()"></Footer> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentStep: 1,
      handleNumber: '',
      successFlag: 1
    };
  },
  created() {
    if (this.$route.query.param) {
      this.successFlag = 2;
    }
    this.epFn.setTitle('参保登记');
    this.request();
    this.request1();
    
  },
  methods: {
    back() {
      // this.$router.push('/')
    },
    edit() {
      this.$router.push('/elseWhere');
    },
    // 撤销提醒
    backout() {
      this.$messagebox.confirm('确定撤销吗?').then(() => {
        this.$router.push('/Index');
        this.$toast('撤销成功');
      });
    },
    request() {
      let params = this.formatSubmitData();
      this.$axios.post(this.epFn.ApiUrl() + '/h5/jy1009/getRecord', params).then(resData => {
        console.log('返回成功信息', resData);
        //   成功   1000
        if (resData.enCode == 1000) {
          if (resData.LS_DS.length > 0) {
            this.currentStep = Number(resData.LS_DS[0].BOD037);
          } else {
            this.$toast('暂无状态信息');
          }
        } else if (resData.enCode == 1001) {
          //   失败  1001
          this.$toast(resData.msg);
          return;
        } else {
          this.$toast('业务出错');
          return;
        }
      });
    },
    request1() {
      let params = this.formatSubmitData1();
      this.$axios.post(this.epFn.ApiUrl() + '/h5/jy1016/info', params).then(resData => {
        console.log('返回成功信息', resData);
        //   成功   1000
        if (resData.enCode == 1000) {
          // this.form={...this.form,...resData.LS_DS_06}
          // this.List=[...this.List,...resData.LS_DS_06]
          // this.form={...this.form,...this.List[0]}
          let LS = resData.LS_DS_06;
          this.form = { ...this.form, ...LS };
          console.log('form', this.form);
          console.log('form1', this.form.AAQ011VALUE);
          console.log('form2', this.form.AAB301VALUE);
          if (this.form.AAQ011VALUE == undefined) {
            this.form.AAQ011VALUE = '';
          }
          if (this.form.AAE011VALUE == undefined) {
            this.form.AAE011VALUE = '';
          }
          this.form.AAE030 = this.util.NumberToDate(this.form.AAE030);
          this.form.AAE031 = this.util.NumberToDate(this.form.AAE031);
          this.AAS011000 = this.form.AAS011VALUE + this.form.AAE011VALUE + this.form.AAQ011VALUE;
          this.AAB301000 = this.form.AAS301VALUE + this.form.AAB301VALUE;
          this.handleNumber = resData.LS_DS_06.BKZ019;
        } else if (resData.enCode == 1001) {
          //   失败  1001
          this.$toast(resData.msg);
          return;
        } else {
          this.$toast('业务出错');
          return;
        }
      });
    },
    formatSubmitData() {
      let submitForm = {};
      console.log(submitForm);
      let AKC030 = sessionStorage.getItem('AKC030');
      console.log('申请原因', AKC030);
      if (AKC030 == '1') {
        console.log(1);
        submitForm.AGA002 = '确认-00253-013-01';
      } else if (AKC030 == '2') {
        console.log(2);
        submitForm.AGA002 = '确认-00253-013-02';
      } else if (AKC030 == '3') {
        console.log(3);
        submitForm.AGA002 = '确认-00253-013-04';
      } else if (AKC030 == '4') {
        console.log(4);
        submitForm.AGA002 = '确认-00253-013-03';
      } else if (AKC030 == '5') {
        console.log(5);
        submitForm.AGA002 = '确认-00253-013-04';
      }
      // submitForm.AGA002 =  "330800253013";
      submitForm.BKZ019 = this.$route.query.param || '';
      // 加入用户名和电子社保卡号
      if (this.$store.state.SET_NATIVEMSG.name !== undefined) {
        submitForm.AAC003 = this.$store.state.SET_NATIVEMSG.name;
        submitForm.AAE135 = this.$store.state.SET_NATIVEMSG.idCard;
      } else {
        this.$toast('未获取到人员基本信息');
      }

      // 请求参数封装
      const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader, submitForm, '1009');
      return params;
    },
    formatSubmitData1() {
      let submitForm = {};
      let AKC030 = sessionStorage.getItem('AKC030');
      console.log('申请原因', AKC030);
      if (AKC030 == '1') {
        console.log(1);
        submitForm.AGA002 = '确认-00253-013-01';
      } else if (AKC030 == '2') {
        console.log(2);
        submitForm.AGA002 = '确认-00253-013-02';
      } else if (AKC030 == '3') {
        console.log(3);
        submitForm.AGA002 = '确认-00253-013-04';
      } else if (AKC030 == '4') {
        console.log(4);
        submitForm.AGA002 = '确认-00253-013-03';
      } else if (AKC030 == '5') {
        console.log(5);
        submitForm.AGA002 = '确认-00253-013-04';
      }
      // submitForm.AGA002 =  "330800253013";
      //从进度查询页面进入接收传参
      if (this.$route.query.param) {
        submitForm.lx = '1';
        submitForm.BKZ019 = this.$route.query.param;
      } else {
        submitForm.lx = '2';
        submitForm.BKZ019 = '';
      }
      // 加入用户名和电子社保卡号
      if (this.$store.state.SET_NATIVEMSG.name !== undefined) {
        submitForm.AAC003 = this.$store.state.SET_NATIVEMSG.name;
        submitForm.AAE135 = this.$store.state.SET_NATIVEMSG.idCard;
      } else {
        this.$toast('未获取到人员基本信息');
      }

      // 请求参数封装
      const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader, submitForm, '1016');
      return params;
    }
  }
};
</script>


<style lang="less" scoped>
.elseDetail {
  width: 100%;
  .Content {
    margin-bottom: 1.4rem;
    .MailInfo {
      width: 100%;
      padding: 0 0.3rem;
      margin-top: 0.15rem;
      background: white;
      .InfoLine {
        height: 1.2rem;
        position: relative;
        font-size: 0.28rem;
        display: flex;
        border-bottom: 0.01rem solid #d5d5d5;
        .InfoName {
          width: 1.8rem;
          line-height: 1.2rem;
          text-align: left;
          span {
            height: 0.6rem;
            line-height: 0.6rem;
            color: #666;
            letter-spacing: 0;
          }
        }
        .InfoText {
          width: 5.1rem;
          color: #000;
          line-height: 1.2rem;
          display: flex;
          position: relative;
          align-items: center;
        }
        &:nth-child(5) {
          height: 1.6rem;
          .InfoText {
            height: 1.6rem;
            textarea {
              border: none;
              color: #000;
              width: 5rem;
              line-height: 0.45rem;
            }
          }
        }
        &:last-child {
          border-bottom: none;
        }
      }
    }
  }
}
</style>