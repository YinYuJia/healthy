<template>
    <div class="natureApprovalDetail">
        <Success :flag="successFlag"></Success>
    </div>
</template>

<script>
export default {
    data () {
        return {
            successFlag:1,
            currentStep:1,
            form:{}
        }
    },
    created () {
        if(this.$route.query.param){
            this.successFlag = 2;
        }
        this.request();
        this.request1();
    },
    methods:{
      revoke(){
        this.$router.push('/legalPerson')
      },
      request(){
        let params=this.formatSubmitData();
        this.$axios.post(this.epFn.ApiUrl()+ '/h5/jy1009/getRecord', params).then((resData) => {
          console.log('返回成功信息',resData)
          //   成功   1000
          if ( resData.enCode == 1000 ) {
            if (resData.LS_DS.length > 0 ) {
              this.currentStep = Number(resData.LS_DS[0].BOD037)
            }else{
                  this.$toast('暂无状态信息')
            }
          }else if (resData.enCode == 1001 ) {
            //   失败  1001
                this.$toast(resData.msg)
            return;
          }else{
                this.$toast('业务出错')
            return;
          }
        })
      },
      request1(){
        let params=this.formatSubmitData1();
        this.$axios.post(this.epFn.ApiUrl()+ '/h5/jy1016/info', params).then((resData) => {
          console.log('返回成功信息',resData)
          //   成功   1000
          if ( resData.enCode == 1000 ) {
            this.form={...this.form,...resData.LS_DS_18}
            let LS=resData.LS_DS_18
            this.form={...this.form,...LS}
            this.request2()
            console.log("form",this.form)
          }else if (resData.enCode == 1001 ) {
            //   失败  1001
                this.$toast(resData.msg)
                return;
          }else{
                this.$toast('业务出错')
                return;
          }
        })
      },
      formatSubmitData(){
        let submitForm ={}
        let legalPerson=JSON.parse(sessionStorage.getItem("LegalPerson"))
        if(this.getSession('NATURE_AMC029')!=null){
          let AGA002=this.getSession('NATURE_AMC029');//判断孙项编码
          if(AGA002=='01'){
            submitForm.AGA002 =  "给付-00142-001-01";
          }else if(AGA002=='02'){
            submitForm.AGA002 =  "给付-00142-001-02";
          }else if(AGA002=='03'){
            submitForm.AGA002 =  "给付-00142-001-03";            
          }
        }
        //测试用
        let form={}
        form=This.$store.state.SET_NATUREAPPROVAL
        if(form.AMC029=='01'){
            submitForm.AGA002 ='给付-00142-001-01'//平产
        }else if(form.AMC029=='02'){
            submitForm.AGA002 = '给付-00142-001-02'//剖宫产
        }else if(form.AMC029=='03'){
            submitForm.AGA002 = '给付-00142-001-03'//助娩产
        }
        
        
        
        submitForm.BKZ019=this.$route.query.param||this.getSession('NATURE_BKZ019')
        submitForm.AAE135 = legalPerson.attnIDNo;//经办人证件号码
        submitForm.AAC003 = legalPerson.attnName
        // 请求参数封装
        const params = this.epFn.commonRequsetData(submitForm,"1009");
        return params;
      },
      formatSubmitData1(){
        let submitForm ={}
        let legalPerson=JSON.parse(sessionStorage.getItem("LegalPerson"))
        if(this.getSession('NATURE_AMC029')!=null){
          let AGA002=this.getSession('NATURE_AMC029');//判断孙项编码
          if(AGA002=='01'){
            submitForm.AGA002 =  "给付-00142-001-01";
          }else if(AGA002=='02'){
            submitForm.AGA002 =  "给付-00142-001-02";
          }else if(AGA002=='03'){
            submitForm.AGA002 =  "给付-00142-001-03";            
          }
        }
        //测试用
        let form={}
        form=This.$store.state.SET_NATUREAPPROVAL
        if(form.AMC029=='01'){
            submitForm.AGA002 ='给付-00142-001-01'//平产
        }else if(form.AMC029=='02'){
            submitForm.AGA002 = '给付-00142-001-02'//剖宫产
        }else if(form.AMC029=='03'){
            submitForm.AGA002 = '给付-00142-001-03'//助娩产
        }

        //从进度查询页面进入接收传参
        if(this.$route.query.param){
          submitForm.lx="1";
          submitForm.BKZ019=this.$route.query.param
        }else{
          submitForm.lx="2";
          submitForm.BKZ019=this.getSession('NATURE_BKZ019');
        }
        submitForm.AAE135 = legalPerson.attnIDNo;//经办人证件号码
        submitForm.AAC003 = legalPerson.attnName
        // 请求参数封装
        const params = this.epFn.commonRequsetData(submitForm,"1016");
        return params;
      },
    }
}
</script>

<style lang="less" scoped>

</style>