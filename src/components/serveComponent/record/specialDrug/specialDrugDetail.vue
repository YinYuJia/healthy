<template>
    <div class="specialDrugDetail">
        <Title :title="'特治特药备案'" :backRouter="'/specialDrug'"></Title>
        <div class="Content">
            <!-- 办事进度 -->
            <WorkProgress :currentStep="currentStep" :progress="arr"></WorkProgress>
            <!-- 办理结果 -->
            <DetailStatus nameWidth="2rem"></DetailStatus>
            <!-- 列表信息 -->
            <div class="ListInfo">
                <div class="InfoLine">
                    <div class="InfoName"><span>参保地:</span></div>
                    <div class="InfoText">{{AAB301000}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>就诊机构:</span></div>
                    <div class="InfoText">{{form.AKB020VALUE}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>项目类型:</span></div>
                    <div class="InfoText">{{form.BKE253VALUE}}</div>
                </div>
                <div class="InfoLine" v-if="showTreat">
                    <div class="InfoName"><span>康复疗程:</span></div>
                    <div class="InfoText">{{form.BKE239|BKE239}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>特治特药类型:</span></div>
                    <div class="InfoText">{{form.BKE228VALUE}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>疾病名称:</span></div>
                    <div class="InfoText">{{form.AKA121}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>用药时期:</span></div>
                    <div class="InfoText">{{form.BKE248VALUE}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>项目名称:</span></div>
                    <div class="InfoText">{{form.AKE002}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>剂量:</span></div>
                    <div class="InfoText">{{form.AKA071}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>数量:</span></div>
                    <div class="InfoText">{{form.AKC226}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>开始日期:</span></div>
                    <div class="InfoText">{{form.AAE030}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>结束日期:</span></div>
                    <div class="InfoText">{{form.AAE031}}</div>
                </div>
                <!-- 进度时间 -->
                <ProgressDate nameWidth="2rem"  :replyDate="form.AAE036"  :progressDate="form.BAE019"></ProgressDate>
            </div>
            <!-- 回显图片 -->
            <div class="PhotoInfo">
                <!-- <div class="infoName">特治特药备案表（医院盖章）</div> -->
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
        <PhotoView ref="photo" :imgUrl="imgUrl"></PhotoView>
        <Success :flag="successFlag"></Success>
        <!-- 补齐材料提交 -->
        <Footer v-if="workStatus=='22'" @submit="complete()" btnText="补充材料" :canSubmit="true"></Footer>
        <!-- 底部 -->
        <Footer :btnType="2" v-if="currentStep==1" @backout="backout()" :handleNumber="handleNumber" @edit="edit()"></Footer>
    </div>
</template>

<script>
export default {
    data(){
        return{
            imgUrl:'',
            form: {
                canbao: "",
                AAS301: "", //参保地
                AAB301: "", //参保地
                AAQ301: "", //参保地
                AKB020: "", //就诊机构
                BKE253: "", //项目类型
                BKE228: "", //特药特治类型
                AKA120: "", //疾病编码
                AKA121: "", //疾病名称
                BKE248: "", //用药时期
                AKE001: "", //项目编码
                AKE002: "", //项目名称
                AKA071: "", //单位剂量
                AKC226: "", //数量
                BKE249: "", //备案剂量
                AKA069: "", //自理比例
                BKE250: "", //累计备案剂量
                BKE251: "", //剩余备案剂量
                BKE252: "", //实际使用量
                AKB063: "", //备案天数
                AAE030: "", //开始日期
                AAE031: "", //结束日期
                AKB020Name:"",//就诊机构名称
                AKB020VALUE:"",
                BKE239:""
            },
            AAB301000: "",
            arr: [
                {step:1,name:'申请'},
                {step:2,name:'受理'},
                {step:3,name:'办结'},
                {step:4,name:'送达'}
            ],
            currentStep:1,
            handleNumber:'',
            List:[],
            successFlag: 1,
            picList: [],
            workStatus: '', //办件状态，02受理，22需补齐，06已补正
            completeList: [], //补充材料清单
            showTreat:false
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
        this.epFn.setTitle('特治特药备案')
        // this.form = this.$store.state.SET_SPECIAL_DRUG;
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
                console.log('返回成功信息',resData)
                //   成功   1000
                if ( resData.enCode == 1000 ) {
                    if (resData.LS_DS.length > 0 ) {
                       this.currentStep = Number(resData.LS_DS[0].BOD037);
                       this.workStatus = resData.LS_DS[0].BOD038;
                        //  获取补充材料
                       if(this.workStatus == '22'){
                           this.getCompleteInfo();
                       }
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
        formatSubmitData(){
                let submitForm = {}
                console.log(submitForm)
                let BKE253=sessionStorage.getItem('BKE253')
                console.log("BKE253",BKE253)
                if(BKE253=="1"){   
                    submitForm.AGA002 =  "确认-00253-003-02";
                }else if(BKE253=='2'){
                    submitForm.AGA002 =  "确认-00253-003-01";
                }
                // submitForm.AGA002 =  "330800253003";
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
        request1(){

            let params=this.formatSubmitData1();
            this.$axios.post(this.epFn.ApiUrl() + '/h5/jy1016/info', params).then((resData) => {
                console.log('返回成功信息',resData)
                //   成功   1000
                if ( resData.enCode == 1000 ) {  
                    // this.form={...this.from,...resData.LS_DS_12}
                    let LS=resData.LS_DS_12
                    this.form={...this.form,...LS}
                    console.log("form",this.form)
                    if(this.form.BKE239!=''){
                        this.showTreat=true;
                    }else{
                        this.showTreat=false;
                    }
                    this.AAB301000=this.form.AAS301VALUE+this.form.AAB301VALUE
                    this.form.AAE030=this.util.NumberToDate(this.form.AAE030)
                    this.form.AAE031=this.util.NumberToDate(this.form.AAE031)
                    this.handleNumber = resData.LS_DS_12.BKZ019
                    this.picList = []
                    
                    for(let i=0;i<resData.LS_DS_12.photoList.length;i++){
                        this.picList.push(resData.LS_DS_12.photoList[i].PUL002)
                        
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
        formatSubmitData1(){
                let submitForm = {}
                let BKE253=sessionStorage.getItem('BKE253')
                console.log("BKE253",BKE253)
                if(BKE253=="1"){   
                    submitForm.AGA002 =  "确认-00253-003-02";
                }else if(BKE253=='2'){
                    submitForm.AGA002 =  "确认-00253-003-01";
                }
                // submitForm.AGA002 =  "330800253003";
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
                console.log("补充材料",resData);
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
                    route: '/specialDrugDetail'
                }
            });
        },
    }
}
</script>

<style lang="less" scoped>
.specialDrugDetail{
    width: 100%;
    .Content{
        margin-bottom: 1.4rem;
        .ListInfo{
            width: 100%;
            padding: 0 .3rem;
            background: white;
            .InfoLine{
                height: 1.2rem;
                position: relative;
                font-size: .28rem;
                display: flex;
                border-bottom: .01rem solid #D5D5D5;
                .InfoName{
                    width: 2rem;
                    text-align: left;
                    line-height: 1.2rem;
                    span{
                        height: .4rem;
                        line-height: .4rem;
                        letter-spacing: 0;
                        color: #666;
                    }
                }
                .InfoText{
                    width: 5rem;
                    display: flex;
                    position: relative;
                    align-items: center;
                    text-align: left;
                    line-height: .4rem;
                    color: #000;
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
}
</style>