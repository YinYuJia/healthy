<template>
    <div class="turnDetail">
        <Title :title="'转外就医备案'" :backRouter="'/turnOut'"></Title>
        <div class="Content">
            <!-- 办事进度 -->
            <WorkProgress :currentStep="currentStep"></WorkProgress>
            <!-- 办理结果 -->
            <DetailStatus nameWidth="1.8rem"></DetailStatus>
            <!-- 办事信息 -->
            <div class="MailInfo">
                <div class="InfoLine">
                    <div class="InfoName"><span>参保地:</span></div>
                    <div class="InfoText">{{AAS027000}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>开始日期:</span></div>
                    <div class="InfoText">{{form.AAE030}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>结束日期:</span></div>
                    <div class="InfoText">{{form.AAE031}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>转出医院:</span></div>
                    <div class="InfoText">{{form.AKB020VALUE}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>转往地市:</span></div>
                    <div class="InfoText">{{AAB301000}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>疾病名称:</span></div>
                    <div class="InfoText">{{form.AKA121}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>就诊疗程:</span></div>
                    <div class="InfoText">{{form.BKE255 | medicaladvice }}</div>
                </div>
                <!-- 进度时间 -->
                <ProgressDate nameWidth="1.8rem"  :replyDate="form.AAE036"  :progressDate="form.BAE019"></ProgressDate>
            </div>
            <!-- 回显图片 -->
            <div class="PhotoInfo">
                <!-- <div class="infoName">《基本医疗保险参保人员转外就医备案表》（医院盖章）</div> -->
                <div class="photoBox">
                    <div class="picWrap">
                        <div class="uploadBtn" v-for="(item,index) in picList" :key="index">
                            <img :src="item" @click="showBigPhoto(item)" class="pic" />
                        </div>
                    </div>
                </div>
            </div>
            <!-- 补充材料 -->
            <div v-if="workStatus=='22'" class="CompleteInfo">
                <div class="CompleteTitle">根据业务需要，需要您补充提交以下资料</div>
                <div class="CompleteLine" v-for="(item,index) in completeList" :key="index">
                    {{item.BKE265}}
                    <span v-if="item.BKE266!=''">（{{item.BKE266}}）</span>
                    <!-- <span v-if="workStatus=='06'" style="color:#1492FF">已补充</span>23 -->
                </div>
            </div>
            <div v-if="workStatus=='06'" class="CompleteInfo">
                <div class="CompleteLine" style="color:#1492FF">材料已补充</div>
            </div>
        </div>
        <Success :flag="successFlag"></Success>
        <PhotoView ref="photo" :imgUrl="imgUrl"></PhotoView>
        <!-- 补齐材料提交 -->
        <Footer v-if="workStatus=='22'" @submit="complete()" btnText="补充材料" :canSubmit="true"></Footer>
        <!-- 底部 -->
        <Footer :btnType="2" v-if="currentStep==1" @backout="backout()" :handleNumber="handleNumber" @edit="edit()"></Footer>
    </div>
</template>

<script>
export default {
    data() {
      return {            
        AAS027000:"",//参保地
        AAB301000: "",//转往地市
        form: {
            // AAE030: '', //开始日期
            // AAE031: '', //结束日期
            // AKA121: '',//疾病名称
            // BKE255: '', //就诊疗程
            // BKZ019:""
        },
        currentStep:1,
        handleNumber:'',
        List:[],
        successFlag: 1,
        picList: [],
        imgUrl: '',
        workStatus: '', //办件状态，02受理，22需补齐，06已补正
        completeList: [], //补充材料清单
      }
    },
    created(){
        if(this.$route.query.param){
            this.successFlag = 2;
        }
        if(this.$route.query.param && this.$route.query.showSuccess){
            console.log("从补充材料进入");
            this.successFlag = 1;
        }
        this.epFn.setTitle('转外就医备案')
        // this.form = this.$store.state.SET_TURNOUT_OPERATION;
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
        // 查看大图
        showBigPhoto(val){
            this.imgUrl = val;
            this.$refs.photo.open();
        },
        back(){
            // this.$router.push('/')
        },
        edit(){
            this.$router.push("/turnOut");
        },
        // 撤销提醒
        backout(){
            this.$messagebox.confirm('确定撤销吗?').then(() => {
                this.$router.push('/Index');
                this.$toast('撤销成功');
            });
        },
        request(){
            let params=this.formatSubmitData();
            this.$axios.post(this.epFn.ApiUrl()+ '/h5/jy1009/getRecord', params).then((resData) => {
                console.log('返回成功信息1009',resData)
                //   成功   1000
                if ( resData.enCode == 1000 ) {  
                    if (resData.LS_DS.length > 0 ) {
                       this.currentStep = Number(resData.LS_DS[0].BOD037);
                       this.workStatus = resData.LS_DS[0].BOD038;
                        //  获取补充材料
                       if(this.workStatus == '22'){
                           this.getCompleteInfo();
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
            this.$axios.post(this.epFn.ApiUrl()+ '/h5/jy1016/info', params).then((resData) => {
                console.log('返回成功信息',resData)
                // this.form={...this.form,...resData.LS_DS_09 }
                let LS=resData.LS_DS_09
                this.form={...this.form,...LS}
                console.log("form1",this.form.AAS027VALUE)
                console.log("form2",this.form.AAB027VALUE)
                console.log("form3",this.form.AAQ027VALUE)

                if(this.form.AAQ027VALUE==undefined){
                    this.form.AAQ027VALUE='';
                } 
                console.log(typeof(this.form.AAE030))
                // this.form.AAE030=this.util.NumberToDate(this.form.AAE030)
                // this.form.AAE031=this.util.NumberToDate(this.form.AAE031)
                
                if(this.form.AAB027VALUE==undefined){
                    this.form.AAB027VALUE=""
                }
                if(this.form.AAQ301VALUE==undefined){
                    this.form.AAQ301VALUE=""
                }
                this.AAS027000=this.form.AAS301VALUE+this.form.AAB301VALUE//参保地
                this.AAB301000=this.form.AAS027VALUE+this.form.AAB027VALUE+this.form.AAQ027VALUE//转往地市
                this.handleNumber = resData.LS_DS_09.BKZ019
                this.picList = []
                
                for(let i=0;i<resData.LS_DS_09.photoList.length;i++){
                    this.picList.push(resData.LS_DS_09.photoList[i].PUL002)
                    
                }
                //   成功   1000
                if ( resData.enCode == 1000 ) {  
 
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
            let submitForm ={}
            console.log(submitForm)
            submitForm.AGA002 =  "确认-00253-002";
             // submitForm.AGA002 =  "330800253002";
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
                let submitForm ={}
                submitForm.AGA002 =  "确认-00253-002";
                // submitForm.AGA002 =  "330800253002";
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
        },
        // 获取补充材料
        getCompleteInfo(){
            let submitForm = {BKZ019: this.$route.query.param || ""};
            const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,"1029");
            this.$axios.post(this.epFn.ApiUrl()+ '/h5/jy1029/expenseAccount', params).then((resData) => {
                //   成功   1000
                if ( resData.enCode == 1000 ) {
                    this.completeList = resData.LS_DS1;
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
        // 补充材料
        complete(){
            this.$router.push({
                path: "/CompleteUpload",
                query: {
                    list: this.completeList,
                    BKZ019: this.$route.query.param,
                    AGA002: this.$route.query.AGA002,
                    route: '/turnDetail'
                }
            });
        },
    }
}
</script>


<style lang="less" scoped>
.turnDetail{
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
                    text-align: left;
                    display: flex;
                    position: relative;
                    align-items: center;
                }
                &:last-child{
                    border-bottom: none;
                }
            }
        }
        // 回显图片
        .PhotoInfo{
            background: #FFF;
            padding: 0 .3rem;
            margin-top: .3rem;
            .infoName{
                padding: .1rem 0;
                text-align: left;
                font-size: .28rem;
                color: #000000;
                letter-spacing: 0;
            }
            .photoBox{
                text-align: left;
                .picWrap{
                    display: flex;
                    flex-wrap: wrap;
                    padding: .3rem 0;
                    .uploadBtn{
                        position: relative;
                        height: 1.5rem;
                        width: 1.5rem;
                        margin: .1rem;
                        img{
                            height: 100%;
                            width: 100%;
                        }
                        .svg-icon{
                            position: absolute;
                            height: .4rem;
                            width: .4rem;
                            top: -0.2rem;
                            right: -0.2rem;
                        }
                    }
                    .svg-icon{
                        margin: .1rem .15rem 0 0;
                        height: 1.5rem;
                        width: 1.5rem;
                    }
                }
                .svg-icon{
                    height: 1.5rem;
                    width: 1.5rem;
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
    /deep/.Footer .active {
        position: fixed;
        bottom: 0;
    }
}
</style>