<template>
    <div class="familyDetail">
        <Title :title="'家庭共济备案'" :backRouter="'/familyAid'"></Title>
        <div class="Content">
            <!-- 事项进度 -->
            <WorkProgress :currentStep="currentStep" :progress="arr"></WorkProgress>
            <!-- 办理结果 -->
            <DetailStatus nameWidth="2.5rem"></DetailStatus>
            <!-- 回显信息 -->
            <div class="MailInfo">
                <div class="InfoLine">
                    <div class="InfoName"><span>参保地:</span></div>
                    <div class="InfoText">{{AAB301000}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>被授权人姓名:</span></div>
                    <div class="InfoText">{{form.BAC003 |tuoMin(0,2)}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>被授权人身份证:</span></div>
                    <div class="InfoText">{{form.BAC002 | tuoMin(1,1)}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>绑定关系:</span></div>
                    <div class="InfoText">{{form.AAE144 | relationship}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>开始日期:</span></div>
                    <div class="InfoText">{{form.AAE030}}</div>
                </div>
                <!-- 进度时间 -->
                <ProgressDate nameWidth="2.5rem"  :replyDate="form.AAE036"  :progressDate="form.BAE019"></ProgressDate>
            </div>
            <!-- 补充材料 -->
            <div v-if="needComplete" class="CompleteInfo">
                <div class="CompleteTitle">根据业务需要，需要您补充提交以下资料</div>
                <div class="CompleteLine">1.的地区为好的气温很低了我点击领取我的灵魂的分开始整理的积分</div>
                <div class="CompleteLine">2.等会我的文件的路径刷卡机的</div>
            </div>
        </div>
        <Success :flag="successFlag"></Success>
        <!-- 底部 -->
        <Footer :btnType="2" v-if="currentStep==1" @backout="backout()" :handleNumber="handleNumber" @edit="edit()"></Footer>
    </div>
</template>

<script>
export default {
    data() {
      return {            
        AAB301000:'',
        form: {
            BAC003: '', //被授权人姓名
            BAC002: '', //被授权人身份证
            AAE144: '',//绑定关系
            AAE030: '', //开始日期
            AAS301:"",//参保地省
            AAB301:"",//参保地市
            AAQ301:"",//参保地区
            BKZ019:""//经办编号
        },
        List:[],
        currentStep:1,
        handleNumber:'',
        arr: [
            {step:1,name:'申请'},
            {step:2,name:'受理'},
            {step:3,name:'办结'},
            {step:4,name:'送达'}
        ],
        successFlag: 1,
      }
    },
    created(){
        if(this.$route.query.param){
            this.successFlag = 2;
        }
        this.epFn.setTitle('家庭共济备案')
        this.request();
        this.request1();
        /*if (window.history && window.history.pushState) {
            history.pushState(null, null, document.URL);
            window.addEventListener('popstate', this.back, false);//false阻止默认事件
        }*/
    },
    /*destroyed(){
        window.removeEventListener('popstate', this.back, false);//false阻止默认事件
    },*/
    methods:{
        back(){
            // this.$router.push('/')
        },
        edit(){
            this.$router.push("/familyAid");
        },
        // 撤销提醒
        backout(){
            this.$messagebox.confirm('确定撤销吗?').then(() => {
                this.$router.push('/Index');
                this.$toast('撤销成功');
            });
        },
        // 补充材料
        complete(){
            //补充材料数组
            let LS_DS = [
                {BKE262: '1',BKE265: '身份证',BKE266: '身份证复印件'},
                {BKE262: '2',BKE265: '参保凭证',BKE266: ''},
                {BKE262: '3',BKE265: '户口本',BKE266: '户口本复印件'}
            ];
            this.$router.push({
                path: "/CompleteUpload",
                query: {
                    list: LS_DS,
                    BKZ019: this.$route.query.param||"",
                    AGA002: '确认-00253-023',
                    route: 'familyDetail'
                }
            });
        },
        request(){
            let params=this.formatSubmitData();
            this.$axios.post(this.epFn.ApiUrl()+ '/h5/jy1009/getRecord', params).then((resData) => {
                console.log('返回成功信息',resData)
                //   成功   1000
                if ( resData.enCode == 1000 ) { 
                    if (resData.LS_DS.length > 0 ) {
                       this.currentStep = Number(resData.LS_DS[0].BOD037)
                       if(this.currentStep==5){
                           this.currentStep=4
                       }else if(this.currentStep==4){
                           this.currentStep=3
                       } 
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
            this.$axios.post(this.epFn.ApiUrl() + '/h5/jy1016/info', params).then((resData) => {
                console.log('返回成功信息',resData)
                //   成功   1000
                if ( resData.enCode == 1000 ) {  
                    console.log(Object.keys(resData.LS_DS_11).length);
                    if (Object.keys(resData.LS_DS_11).length > 0) {
                        let LS=resData.LS_DS_11
                        this.form={...this.form,...LS}
                        this.handleNumber = this.form.BKZ019;
                        console.log("form",this.form)
                        this.AAB301000=this.form.AAS301VALUE+this.form.AAB301VALUE
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
        formatSubmitData(){
            let submitForm = {}
            console.log(submitForm)
            submitForm.AGA002 =  "确认-00253-023";
            // submitForm.AGA002 =  "330800253023";
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
                submitForm.AGA002 =  "确认-00253-023";
                // submitForm.AGA002 =  "330800253023";
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
.familyDetail{
    width: 100%;
    .Content{
        margin-bottom: 1.4rem;
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
                    width: 2.5rem;
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
                    width: 4.5rem;
                    color: #000;
                    line-height: 1.2rem;
                    display: flex;
                    position: relative;
                    align-items: center;
                }
                &:last-child{
                    border-bottom: none;
                }
            }
        }
        // 补充材料
        .CompleteInfo{
            width: 100%;
            padding: .2rem .3rem .4rem .3rem;
            margin-top: .15rem;
            background: white;
            .CompleteTitle{
                font-size: .28rem;
                letter-spacing: 0;
                text-align: left;
            }
            .CompleteLine{
                padding: .2rem 0 .1rem 0;
                text-align: left;
                font-size: .28rem;
                letter-spacing: 0;
            }
        }
    }
}
</style>