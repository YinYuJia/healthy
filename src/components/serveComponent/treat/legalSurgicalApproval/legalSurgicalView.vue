<template>
    <div class="natureApprovalDetail">
        <Title :title="'计划外生育'" :backRouter="'/indexInfoList'"></Title>
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
            </div>
            <div class="infoType" v-if="type == '02'">
                <div class="infoBox">
                    <div class="infoTitle">纸质发票提交方式：</div>
                    <div class="infoTitle">{{form.BKE200}}</div>
                </div>
                <div class="invoiceList" v-for="(item,index) in form.photoList" :key="index">
                    <div class="infoLine">
                        <div class="infoName"><span>发票号</span></div>
                        <div class="infoText" @click="showBigPhoto(item.BKE554)"><span class="active">{{item.BKE100}}</span></div>
                    </div>
                    <div class="infoLine">
                        <div class="infoName"><span>发票金额</span></div>
                        <div class="infoText"><span>{{item.AKC264}}</span></div>
                    </div>
                    <div class="infoLine">
                        <div class="infoName"><span>发票日期</span></div>
                        <div class="infoText"><span>{{item.AAE036}}</span></div>
                    </div>
                </div>
            </div>
            <div class="upload">
                <div class="infoTitle">附件：</div>
                <div class="infoTitle">1.《生育保险待遇申请表》</div>
                <div class="dataUpload">
                    <div class="picWrap">
                        <img :src="form.applicationFormUrl" @click="showBigPhoto(form.applicationFormUrl)"/>
                    </div>
                </div>
                <div v-if="type != '03'">
                    <div class="infoTitle">2.从确认怀孕开始（末次月经）时间的病历复印件</div>
                    <div class="dataUpload">
                        <div class="picWrap">
                            <img :src="form.menstruationUrl" @click="showBigPhoto(form.menstruationUrl)"/>
                        </div>
                    </div>
                </div>
                <div v-if="type != '03'">
                    <div class="infoTitle">3.医疗助产机构出具的流产或引产时间证明复印件</div>
                    <div class="dataUpload">
                        <div class="picWrap">
                            <img :src="form.abortionUrl" @click="showBigPhoto(form.abortionUrl)"/>
                        </div>
                    </div>
                </div>
                <div v-if="type == '02'">
                    <div class="infoTitle">4.结婚证复印件</div>
                    <div class="dataUpload">
                        <div class="picWrap">
                            <img :src="form.marriageCertificateUrl" @click="showBigPhoto(form.marriageCertificateUrl)"/>
                        </div>
                    </div>
                </div>
                <div v-if="type == '02'">
                    <div class="infoTitle">5.医疗诊断证明书、出院小结及住院费用明细汇总清单（需要医院盖章）复印件一份</div>
                    <div class="dataUpload">
                        <div class="picWrap">
                            <img :src="item.PUL002" style="height: 1.5rem; width: 1.5rem" v-for="(item,index) in form.expensesUrl" :key="index" @click="showBigPhoto(item.PUL002)"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <PhotoView ref="photo" :imgUrl="imgUrl"></PhotoView>
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
            form1:{},
            type: '',
            form: {},
            imgUrl: ''
        }
    },
    created () {
        if(this.$route.query.params) {
            this.type = this.$route.query.params.type;
        }
        if(this.$route.query.param){
            this.successFlag = 2;
            this.type = this.$route.query.AGA002.split('-').pop();
            console.log("flag---", this.type)
        }
        this.request();
        this.request1();
    },
    methods:{
        // 查看大图
        showBigPhoto(val){
            this.imgUrl = val;
            this.$refs.photo.open();
        },
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
            this.form={...this.form,...resData.LS_DS_19}
            let LS=resData.LS_DS_19
            this.form={...this.form,...LS}
            if(this.form.BKE200 != '') {
                        if(this.form.BMC220 == '1'){
                        this.form.BKE200 = '邮寄'
                        } else if (this.form.BMC220 == '2') {
                            this.form.BKE200 = '自送'
                        }
                    }
            this.form.BMC131 = this.util.NumberToDate(this.form.BMC131)
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
                        console.log('返回成功信息',resData)
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
        if(sessionStorage.getItem("SURGICAL_AMC029") != null){
          if(this.type=='01'){
            submitForm.AGA002 =  "给付-00142-002-01";
          }else if(this.type=='02'){
            submitForm.AGA002 =  "给付-00142-002-02";
          }else if(this.type=='03'){
            submitForm.AGA002 =  "给付-00142-002-03";            
          }
        }
        if(this.$route.query.param) {
            submitForm.BKZ019 = this.$route.query.param
        } else {
            submitForm.BKZ019 = sessionStorage.getItem("SURGICAL_BKZ019");
        }
        submitForm.AAE135 = legalPerson.attnIDNo;//经办人证件号码
        submitForm.AAC003 = legalPerson.attnName
        // 请求参数封装
        const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,"1009");
        return params;
      },
      formatSubmitData1(){
        let submitForm ={}
        let legalPerson=JSON.parse(sessionStorage.getItem("LegalPerson"))
        if(sessionStorage.getItem("SURGICAL_AMC029")!=null){
          let AGA002=this.type;//判断孙项编码
          if(AGA002=='01'){
            submitForm.AGA002 =  "给付-00142-002-01";
          }else if(AGA002=='02'){
            submitForm.AGA002 =  "给付-00142-002-02";
          }else if(AGA002=='03'){
            submitForm.AGA002 =  "给付-00142-002-03";            
          }
        }

        //从进度查询页面进入接收传参
        if(this.$route.query.param){
          submitForm.lx="1";
          submitForm.BKZ019=this.$route.query.param
        }else{
          submitForm.lx="2";
          submitForm.BKZ019=sessionStorage.getItem("SURGICAL_BKZ019");
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
                    color: #000;
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
        .infoType {
            background-color: #FFF;
            width: 100%;
            margin-top: .15rem;
            .infoBox {
                display: flex;
                justify-content: space-between;
                width: 100%;
                border-bottom: 1px solid #ddd;
                
                .infoTitle {
                    font-size: .28rem;
                    text-align: left;
                    margin-top: .2rem;
                    margin-left: .3rem;
                    height: 1rem;
                    padding-right: .2rem;
                    line-height: 1rem;
                }
            }
                    // 发票列表
            .invoiceList{
                height: 2.4rem;
                padding: .42rem 0;
                border-bottom: 1px solid #DDD;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                position: relative;
                &:last-child{
                    border-bottom: none;
                }
                .infoLine{
                    font-size: .28rem;
                    display: flex;
                    .infoName{
                        width: 1.5rem;
                        text-align: left;
                        padding-left: .2rem;
                        span{
                            color: #666666;
                            letter-spacing: 0;
                        }
                    }
                    .infoText{
                        span{
                            color: #000000;
                            letter-spacing: 0;
                        }
                        .active{
                            color: #1492FF;
                        }
                    }
                }
            }
        }
        .upload {
            margin-top: .15rem;
            padding-top: .37rem;
            background-color: #FFF;
            width: 100%;
            .infoTitle {
                font-size: .28rem;
                text-align: left;
                margin-top: .2rem;
                margin-left: .3rem;
            }
            .dataUpload{
            background: #FFF;
            //margin: 0 0 1.4rem 0;
            padding: .37rem .4rem;
            .picWrap{
                height: 1.5rem;
                width: 1.5rem;
                margin-right: .25rem;
                margin-top: .1rem;
                position: relative;
                &:last-child{
                    display: flex;
                    //flex-wrap: wrap;
                }
                    img{
                        height: 100%;
                        width: 100%;
                        margin-right: .15rem;
                        flex-shrink: 0
                    }
                }
            }
        }
    }
}
</style>