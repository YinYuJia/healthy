<template>
  <div class="elseDetail">
    <Title :title="'异地就医备案'" :backRouter="'/elseWhere'"></Title>
    <div class="Content">
      <!-- 办事进度 -->
      <WorkProgress :currentStep="currentStep"></WorkProgress>
      <!-- 办理结果 -->
      <DetailStatus nameWidth="1.8rem"></DetailStatus>
      <!-- 用户基本信息 -->
      <div class="userBaseInfo">
        <div class="infoBox">
          <svg-icon icon-class="payLimit_bg"/>
          <div class="infoName">
            <span class="name">张乐军</span>
            <span class="sex">/先生</span>
          </div>
          <div class="infoAddress">
            <div class="IconImg">
              <svg-icon icon-class="payLimit_compony"/>
            </div>
            <span>浙江网新恩普有限公司</span>
          </div>
          <div class="infoAddress">
            <div class="IconImg">
              <svg-icon icon-class="serveComponent_birthday"/>
            </div>
            <span>1994-10-16</span>
          </div>
        </div>
      </div>
      <!-- 邮递信息 -->
      <div class="MailInfo">
        <div class="InfoLine">
          <div class="InfoName"><span>参保地:</span></div>
          <div class="InfoText">{{AAB301000}}</div>
        </div>
        <div class="InfoLine">
          <div class="InfoName"><span>离开日期:</span></div>
          <div class="InfoText">{{form.AAE030}}</div>
        </div>
        <div class="InfoLine">
          <div class="InfoName"><span>回来日期:</span></div>
          <div class="InfoText">{{form.AAE031}}</div>
        </div>
        <div class="InfoLine">
          <div class="InfoName"><span>前往城市:</span></div>
          <div class="InfoText">{{AAS011000}}</div>
        </div>
        <div class="InfoLine">
          <div class="InfoName"><span>详细地址:</span></div>
          <div class="InfoText"><textarea v-model="form.AAE006" readonly></textarea></div>
        </div>
        <div class="InfoLine">
          <div class="InfoName"><span>申请原因:</span></div>
          <div class="InfoText">{{form.AKC030 | AKC030}}</div>
        </div>
        <div class="InfoLine">
          <div class="InfoName"><span>联系人:</span></div>
          <div class="InfoText">{{form.AAE004 | tuoMin(0,2)}}</div>
        </div>
        <div class="InfoLine">
          <div class="InfoName"><span>联系电话:</span></div>
          <div class="InfoText">{{form.AAE005 | tuoMin(3,4)}}</div>
        </div>
        <!-- 进度时间 -->
        <ProgressDate nameWidth="1.8rem"  :replyDate="form.AAE036"  :progressDate="form.BAE019"></ProgressDate>
      </div>
    </div>
    <Success :flag="successFlag"></Success>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        successFlag: 1,
        AAS011000:"",
        AAB301000:"",
        form: {

          // AAE030: '', //离杭日期
          // AAE031: '', //回杭日期
          // AAS011: '', //参保地省
          // AAE011: '', //参保地市
          // AAQ011: '', //参保地区
          // AAE006: '', //详细地址
          // AKC030: '', //申请原因
          // AAE004: '', //联系人
          // AAE005: '', //手机号码
          // AAS301: '',//申请地省
          // AAB301: '',//申请地市
          // AAQ301: '',//申请地区
          // AGA002:'',
        },
        currentStep:4,
        List:[],
        handleNumber: '',
      }
    },
    created() {
      this.epFn.setTitle('异地就医备案')
      this.request();
      this.request1();
    },
    methods:{
      back(){
        // this.$router.push('/')
      },
      edit(){
        this.$router.push("/elseWhere");
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
              this.$toast("暂无状态信息")
            }
          }else if (resData.enCode == 1001 ) {
            //   失败  1001
            this.$toast(resData.msg);
            return;
          }else{
            this.$toast('业务出错');
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
            // this.form={...this.form,...resData.LS_DS_06}
            // this.List=[...this.List,...resData.LS_DS_06]
            // this.form={...this.form,...this.List[0]}
            let LS=resData.LS_DS_06
            this.form={...this.form,...LS}
            console.log("form",this.form)
            console.log("form1",this.form.AAQ011VALUE)
            console.log("form2",this.form.AAB301VALUE)
            if(this.form.AAQ011VALUE==undefined){
              this.form.AAQ011VALUE="";
            }
            if(this.form.AAE011VALUE == undefined){
              this.form.AAE011VALUE="";
            }
            this.form.AAE030=this.util.NumberToDate(this.form.AAE030)
            this.form.AAE031=this.util.NumberToDate(this.form.AAE031)
            this.AAS011000=this.form.AAS011VALUE+this.form.AAE011VALUE+this.form.AAQ011VALUE
            this.AAB301000=this.form.AAS301VALUE+this.form.AAB301VALUE
            this.handleNumber = resData.LS_DS_06.BKZ019
          }else if (resData.enCode == 1001 ) {
            //   失败  1001
            this.$toast(resData.msg);
            return;
          }else{
            this.$toast('业务出错');
            return;
          }
        })
      },
      formatSubmitData(){
        let submitForm = {}
        console.log(submitForm)
        let AKC030=sessionStorage.getItem('AKC030')
        console.log("申请原因",AKC030)
        if(AKC030=='1'){
          console.log(1)
          submitForm.AGA002="确认-00253-013-01";
        }else if(AKC030=='2'){
          console.log(2)
          submitForm.AGA002="确认-00253-013-02";
        }else if(AKC030=='3'){
          console.log(3)
          submitForm.AGA002="确认-00253-013-04";
        }else if(AKC030=='4'){
          console.log(4)
          submitForm.AGA002="确认-00253-013-03";
        }else if(AKC030=='5'){
          console.log(5)
          submitForm.AGA002="确认-00253-013-04";
        }
        // submitForm.AGA002 =  "330800253013";
        submitForm.BKZ019=this.$route.query.param||""
        // 加入用户名和电子社保卡号
        if (this.$store.state.SET_NATIVEMSG.name !== undefined ) {
          submitForm.AAC003 = this.$store.state.SET_NATIVEMSG.name;
          submitForm.AAE135 = this.$store.state.SET_NATIVEMSG.idCard;
        }else {

          this.$toast("未获取到人员基本信息");
        }

        // 请求参数封装
        const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,"1009");
        return params;
      },
      formatSubmitData1(){
        let submitForm = {}
        let AKC030=sessionStorage.getItem('AKC030')
        console.log("申请原因",AKC030)
        if(AKC030=='1'){
          console.log(1)
          submitForm.AGA002="确认-00253-013-01";
        }else if(AKC030=='2'){
          console.log(2)
          submitForm.AGA002="确认-00253-013-02";
        }else if(AKC030=='3'){
          console.log(3)
          submitForm.AGA002="确认-00253-013-04";
        }else if(AKC030=='4'){
          console.log(4)
          submitForm.AGA002="确认-00253-013-03";
        }else if(AKC030=='5'){
          console.log(5)
          submitForm.AGA002="确认-00253-013-04";
        }
        // submitForm.AGA002 =  "330800253013";
        //从进度查询页面进入接收传参
        if(this.$route.query.param){
          submitForm.lx="1";
          submitForm.BKZ019=this.$route.query.param
        }else{
          submitForm.lx="2";
          submitForm.BKZ019="";
        }
        // 加入用户名和电子社保卡号
        if (this.$store.state.SET_NATIVEMSG.name !== undefined ) {
          submitForm.AAC003 = this.$store.state.SET_NATIVEMSG.name;
          submitForm.AAE135 = this.$store.state.SET_NATIVEMSG.idCard;
        }else {

          this.$toast("未获取到人员基本信息");
        }

        // 请求参数封装
        const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,"1016");
        return params;
      }
    }
  }
</script>


<style lang="less" scoped>
  .elseDetail{
    width: 100%;
    .Content{
      margin-bottom: 1.4rem;
      // 用户基本信息
      .userBaseInfo{
        margin-top: .15rem;
        height: 3rem;
        width: 7.5rem;
        background: #fff;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        position: relative;
        z-index: -2;
        .infoBox{
          font-size: .3rem;
          position: relative;
          height: 100%;
          width: 7rem;
          padding: 0 .15rem;
          color: #ffffff;
          border-radius: 0.05rem;
          display: flex;
          flex-direction: column;
          // align-items: left;
          .svg-icon{
            display: block;
            width:100%;
            height: 100%;
            position: absolute;
            left:0;
            z-index: -1;
          }
          .infoName{
            width: 5rem;
            height: .5rem;
            text-align: left;
            margin-top: .35rem;
            margin-left: .2rem;
            .name{
              font-size: .4rem;
            }
            .sex{
              font-size: .24rem;
            }
          }
          .infoAddress{
            margin-top: .2rem;
            width: 5rem;
            text-align: left;
            padding-left: .3rem;
            span{
              line-height:.4rem;
              height: .4rem;
              font-size: .24rem;
            }
            .IconImg{
              width: .4rem;
              height: .4rem;
              display: inline-block;

              .svg-icon{
                padding-left: .3rem;
                display:block;
                width: .4rem;
                height: .4rem;

              }
            }
          }
          .infoMessage{
            display: flex;
            justify-content: space-around;
            height: 1.8rem;
            .birth{
              display: flex;
              flex-direction: column;
              .infoMessageBirth{
                height: .8rem;
                line-height: .8rem;
              }
              .infoMessageText{
                font-size: .24rem;
              }
            }
            .work{
              .infoMessageWork{
                height: .8rem;
                line-height: .8rem;
              }
              .infoMessageText{
                font-size: .24rem;
              }
            }
          }
        }
      }
      .MailInfo{
        width: 100%;
        padding: 0 .3rem;
        margin-top: .15rem;
        background: white;
        .InfoLine{
          height: 1.2rem;
          position: relative;
          font-size: .28rem;
          display: flex;
          border-bottom: .01rem solid #D5D5D5;
          .InfoName{
            width: 1.8rem;
            line-height: 1.2rem;
            text-align: left;
            span{
              height: .6rem;
              line-height: .6rem;
              color: #666;
              letter-spacing: 0;
            }
          }
          .InfoText{
            width: 5.1rem;
            color: #000;
            line-height: 1.2rem;
            display: flex;
            position: relative;
            align-items: center;
          }
          &:nth-child(5){
            height: 1.6rem;
            .InfoText{
              height: 1.6rem;
              textarea{
                border: none;
                color: #000;
                width: 5rem;
                line-height: .45rem;
              }
            }
          }
          &:last-child{
            border-bottom: none;
          }
        }
      }
    }
  }
</style>
