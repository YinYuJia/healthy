<template>
  <div class="elseDetail">
    <Title :title="'参保登记'" :backRouter="'/'"></Title>
    <div class="Content">
      <!-- 办事进度 -->
      <WorkProgress :currentStep="currentStep"></WorkProgress>
      <!-- 办理结果 -->
      <DetailStatus nameWidth="1.8rem"></DetailStatus>
      <!-- 邮递信息 -->
      <div class="picWrap">
        <p>1、统一社会信用代码证</p>
        <img :src="img1" alt="">
      </div>
      <div class="picWrap">
        <p>2、社会保险单位参保信息登记表</p>
        <img :src="img2" alt="">
      </div>
    </div>
    <Success :flag="successFlag"></Success>
    <!-- 底部 -->
    <!-- <Footer :btnType="2" v-if="currentStep==1" @backout="backout()" :handleNumber="handleNumber" @edit="edit()"></Footer> -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      currentStep: 1,
      handleNumber: '',
      successFlag: 1,
      img1: '',
      img2: ''
    }
  },
  created () {
    if (this.$route.query.param) {
      this.successFlag = 2
    }
    this.epFn.setTitle('参保登记')
    this.request()
    this.request1()
    
  },
  methods: {
    back () {
      // this.$router.push('/')
    },
    edit () {
      this.$router.push('/elseWhere')
    },
    // 撤销提醒
    backout () {
      this.$messagebox.confirm('确定撤销吗?').then(() => {
        this.$router.push('/Index')
        this.$toast('撤销成功')
      })
    },
    request () {
      let params = this.formatSubmitData()
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
          
        }
      })
    },
    request1 () {
      let params = this.formatSubmitData1()
      this.$axios.post(this.epFn.ApiUrl() + '/h5/jy1016/info', params).then(resData => {
        console.log('返回成功信息', resData);
        //   成功   1000
        if (resData.enCode == 1000) {
          // this.img1=resData.
          this.form = { ...this.form, ...LS };
          console.log('form', this.form);
        } else if (resData.enCode == 1001) {
          //   失败  1001
          this.$toast(resData.msg);
          
        } else {
          this.$toast('业务出错');
          return;
        }
      })
    },
    formatSubmitData () {
      let submitForm = {}
      
      submitForm.BKZ019 = this.$route.query.param || this.$store.state.REGISTER_INFO.BKZ019 || ''
      let LegalPerson = JSON.parse(sessionStorage.getItem("LegalPerson"));
      console.log("LegalPerson",LegalPerson)
      submitForm.AAC003 = LegalPerson.attnName
      submitForm.AAE135 = LegalPerson.attnIDNo

      // 请求参数封装
      const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader, submitForm, '1009')
      return params
    },
    formatSubmitData1 () {
      let submitForm = {}
      let AKC030 = sessionStorage.getItem('AKC030')
      submitForm.AGA002 = '确认-00122-002'
      //从进度查询页面进入接收传参
      if (this.$route.query.param) {
        submitForm.lx = '1'
        submitForm.BKZ019 = this.$route.query.param || this.$store.state.REGISTER_INFO.BKZ019 
      } else {
        submitForm.lx = '2'
        submitForm.BKZ019 = '' || this.$store.state.REGISTER_INFO.BKZ019 ;
      }
      let LegalPerson = JSON.parse(sessionStorage.getItem("LegalPerson"));
      console.log("LegalPerson",LegalPerson)
      submitForm.AAC003 = LegalPerson.attnName
      submitForm.AAE135 = LegalPerson.attnIDNo

      // 请求参数封装
      const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader, submitForm, '1016')
      return params
    }
  }
}
</script>

<style lang="less" scoped>
.picWrap{
  background-color: #fff;
  padding-top: 20px;
  p{
    font-size: .32rem;
    text-align: left;
  }
  img{
    width:100%;
  }
}
</style>
