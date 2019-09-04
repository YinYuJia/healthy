<template>
    <div class="natureApprovalDetail">
        <Title :title="'计划内生育'" :backRouter="'/indexInfoList'"></Title>
        <div class="Content">
            <WorkProgress :currentStep="currentStep"></WorkProgress>
            <UserInfoPad  :userInfo="form1"></UserInfoPad>
            <div class="ReportInfo">
                <div class="InfoLine">
                    <div class="InfoName"><span>申请时间:</span></div>
                    <div class="InfoText">{{form.AAE036}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>进度时间:</span></div>
                    <div class="InfoText">{{form.BAE019}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>生育类型:</span></div>
                    <div class="InfoText">{{form.AMC029|AMC029}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>生育日期:</span></div>
                    <div class="InfoText">{{form.BMC131}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>胎儿数:</span></div>
                    <div class="InfoText">{{form.AMC028}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>胎次:</span></div>
                    <div class="InfoText">{{form.AMC031}}</div>                      
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>其中死胎:</span></div>
                    <div class="InfoText">{{form.BMC046}}</div>                      
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>实际发生费用:</span></div>
                    <div class="InfoText">{{form.BMC211}}</div>                      
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>实际住院天数:</span></div>
                    <div class="InfoText">{{form.BMC033}}</div>                      
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>是否晚育:</span></div>
                    <div class="InfoText">{{form.AMC027|AMC027}}</div>                      
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>准生证号:</span></div>
                    <div class="InfoText">{{form.BMC035}}</div>                      
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>出生证编号:</span></div>
                    <div class="InfoText">{{form.AMC022}}</div>                      
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>出生证编号:</span></div>
                    <div class="InfoText">{{form.BMC065}}</div>                      
                </div>
            </div>
        </div>
        <Success :flag="successFlag"></Success>
    </div>
</template>

<script>
export default {
    data () {
        return {
            successFlag:1,
            currentStep:1,
            form:{},
            form1:{}
        }
    },
    created () {
        if(this.$route.query.param){
            this.successFlag = 2;
        }
        this.epFn.setTitle('计划内生育')
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
      //请求基础信息
      request2(){
            let params=this.formatSubmitData2();
            this.$axios.post(this.epFn.ApiUrl()+ '/h5/jy9109/getRecord', params).then((resData) => {
                //   成功   1000
                    if ( resData.enCode == 1000 ) {
                        console.log('返回成功信息113',resData)
                        this.form1=resData.LS_DS[0]
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
        if(sessionStorage.getItem('NATURE_AMC029')!=null){
          let AGA002=sessionStorage.getItem('NATURE_AMC029');//判断孙项编码
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
        form=this.$store.state.SET_NATUREAPPROVAL
        if(form.AMC029=='01'){
            submitForm.AGA002 ='给付-00142-001-01'//平产
        }else if(form.AMC029=='02'){
            submitForm.AGA002 = '给付-00142-001-02'//剖宫产
        }else if(form.AMC029=='03'){
            submitForm.AGA002 = '给付-00142-001-03'//助娩产
        }
        
        
        
        submitForm.BKZ019=this.$route.query.param||sessionStorage.getItem('NATURE_BKZ019')
        submitForm.AAE135 = legalPerson.attnIDNo;//经办人证件号码
        submitForm.AAC003 = legalPerson.attnName
        // 请求参数封装
        const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,"1009");
        return params;
      },
      formatSubmitData1(){
        let submitForm ={}
        let legalPerson=JSON.parse(sessionStorage.getItem("LegalPerson"))
        if(sessionStorage.getItem('NATURE_AMC029')!=null){
          let AGA002=sessionStorage.getItem('NATURE_AMC029');//判断孙项编码
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
        form=this.$store.state.SET_NATUREAPPROVAL
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
          submitForm.BKZ019=sessionStorage.getItem('NATURE_BKZ019');
        }
        submitForm.AAE135 = legalPerson.attnIDNo;//经办人证件号码
        submitForm.AAC003 = legalPerson.attnName
        // 请求参数封装
        const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,"1016");
        return params;
      },
      formatSubmitData2(){
        let submitForm = {}
        submitForm.AAC002 = this.form.AAC002;
        // 请求参数封装
        const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,"9109");
        return params;
      }
    }
}
</script>

<style lang="less" scoped>
.natureApprovalDetail{
    .Content{
        height: 100%;
        margin-bottom: 1.4rem;
        .ReportInfo {
            height: 100%;
            width: 7.5rem;
            padding: 0 .3rem;
            background: white;
            .InfoLine {
                height: 1rem;
                position: relative;
                font-family: PingFangSC-Regular;
                font-size: .3rem;
                display: flex;
                justify-content: space-between;
                border-bottom: .01rem solid #D5D5D5;
                .InfoName {
                    width: 2.3rem;
                    opacity: 0.85;
                    line-height: 1rem;
                    text-align: left;
                    span {
                        height: .6rem;
                        line-height: .6rem;
                        color: #000000;
                        letter-spacing: 0;
                    }
                }
                .InfoText {
                    margin-left: .2rem;
                    width: 4.6rem;
                    opacity: 0.85;
                    line-height: 1rem;
                    display: flex;
                    position: relative;
                    align-items: center;
                }
                &:last-child {
                    border-bottom: none;
                }
            }
        }
    }
}
</style>