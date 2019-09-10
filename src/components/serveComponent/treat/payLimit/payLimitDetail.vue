<template>
    <div class="payLimitDetail">
        <Title :title="'缴费年限核定'" :backRouter="'/payLimit'"></Title>
        <WorkProgress :currentStep="currentStep" :progress="arr"></WorkProgress>
        <div class="Content">
            <!-- 基本信息 -->
            <!-- <UserBaseInfo></UserBaseInfo> -->
            <!-- 列表信息 -->
            <div class="userBaseInfo">
                <div class="infoBox">
                    <svg-icon icon-class="payLimit_bg"/>
                    <div class="infoName">
                        <span class="name">{{form.AAC003}}</span>
                        <span class="sex">/{{form.AAC004|AAC004}}</span>
                    </div>
                    <div class="infoAddress">
                        <div class="IconImg">
                            <svg-icon icon-class="payLimit_compony"/>
                        </div>
                        <span>{{form.AAB004}}</span>
                    </div>
                    <div class="infoMessage">
                        <div class="birth">
                            <div class="infoMessageBirth">{{form.AAC006}}</div>
                            <div class="infoMessageText">出生日期</div>
                        </div>
                        <div class="work">
                            <div class="infoMessageWork">{{form.AAC007}}</div>
                            <div class="infoMessageText">参加工作时间</div>
                        </div>
                    </div>

                </div>
            </div>
            <div class="ReportInfo">
                <div class="InfoLine">
                    <div class="InfoName"><span>连续工龄:</span></div>
                    <div class="InfoText">
                        {{form.BKE703}}年{{form.BKE704}}月
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>视作缴费年限</span></div>
                    <div class="InfoText">{{form.AKC412}}个月</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>退休工资</span></div>
                    <div class="InfoText">{{form.AAE041}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>提前退休类别</span></div>
                    <div class="InfoText">{{form.BKE810|BKE810}}</div>                      
                </div>
            </div>
            <div class="simpleNote" v-for="(item,index) in form.LS_DS" :key=index >
                <div class="InfoTitle">
                    <div class="InfoName"><span>简历{{index+1}}</span></div>
                    <div class="InfoText">
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>时间:</span></div>
                    <div class="InfoText">
                        {{item.AKC421}}
                    </div>
                </div>
                
                <div class="InfoLine">
                    <div class="InfoName"><span>单位:</span></div>
                    <div class="InfoText">{{item.AKC422}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>职位:</span></div>
                    <div class="InfoText">{{item.AKC424}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>证明人:</span></div>
                        <div class="InfoText">{{item.AKC425}}</div>                   
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>处分:</span></div>
                        <div class="InfoText">{{item.AKC423|AKC423}}</div>           
                </div>
            </div>
            <div class="upLoad">
                <div class="upLoadTitle">附件信息:</div>        
                    <div class="caseInfo" v-if="ifShow">
                        <div class="infoName">1.浙江省机关事业养老待遇计发(预发)表</div>
                        <div class="photoBox">
                            <div class="picWrap">
                                <div class="uploadBtn" v-for="(item,index) in picList" :key="index">
                                    <img :src="item" class="pic" @click="showBigPhoto(item)" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="!ifShow">
                        <div class="caseInfo">
                            <div class="infoName">1.浙江省职工退休、退职审批表</div>
                            <div class="photoBox">
                                <div class="picWrap">
                                        <img :src="picList[0]" class="pic" @click="showBigPhoto(item)" />
                                </div>
                            </div>
                        </div>
                        <div class="caseInfo">
                            <div class="infoName">2.退休人员养老金预核发证明或退休人员养老金核定表</div>
                            <div class="photoBox">
                                <div class="picWrap">
                                        <img :src="picList[1]" class="pic" @click="showBigPhoto(item)" />
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
        <PhotoView ref="photo" :imgUrl="imgUrl"></PhotoView>
        <Success :flag="successFlag"></Success>
        <!-- 底部 -->
        <Footer :btnType="2" v-if="currentStep==1" @backout="backout()" :handleNumber="handleNumber" @edit="edit()"></Footer>
    </div>
</template>

<script>
export default {
    data() { 
        return {
            form: {},
            currentStep:1,
            handleNumber:'',
            arr: [
                {step:1,name:'申请'},
                {step:2,name:'受理'},
                {step:3,name:'审核'},
                {step:4,name:'办结'}
            ],
            picList:[],
            imgUrl: '',
            successFlag: 1,
            ifShow:false
        }
    },
    created () {
        if(this.$route.query.param){
            this.successFlag = 2;
        }
        this.epFn.setTitle('缴费年限核定')
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
            this.$router.push("/payLimit");
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
                console.log('1009返回成功信息',resData)
                //   成功   1000
                if ( resData.enCode == 1000 ) {  
                    // console.log("resData.LS_DS.length",resData.LS_DS.length)
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
            // 封装数据
            let params=this.formatSubmitData1();
            this.$axios.post(this.epFn.ApiUrl() + '/h5/jy1016/info', params).then((resData) => {
                console.log('返回成功信息',resData)
                //   成功   1000
                if ( resData.enCode == 1000 ) {  
                    console.log(Object.keys(resData.LS_DS_13).length);
                    if (Object.keys(resData.LS_DS_13).length > 0) {
                        let LS=resData.LS_DS_13
                        this.form={...this.form,...LS}
                        this.handleNumber = this.form.BKZ019;
                        this.picList = []
                        if(resData.LS_DS_13.fileList.length==1){
                            this.ifShow=true;
                        }else{
                            this.ifShow=false
                        }
                        for(let i=0;i<resData.LS_DS_13.fileList.length;i++){
                            this.picList.push(resData.LS_DS_13.fileList[i].PUL002) 
                        }

                        console.log('我要的数据1111111',this.picList);
                        console.log("form",this.form)
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
                let LegalPerson = JSON.parse(sessionStorage.getItem("LegalPerson"));
                submitForm.AGA002 =  "确认-00123-004";
                // submitForm.AGA002 =  "330800123004";
                // 加入用户名和电子社保卡号
                submitForm.BKZ019=this.$route.query.param||""
                console.log('接收到的身份证号',sessionStorage.getItem('payLimitAAE135'))
                if(sessionStorage.getItem('payLimitAAE135')!=null){
                submitForm.AAE135=sessionStorage.getItem('payLimitAAE135')
                }else{
                    let LegalPerson = JSON.parse(sessionStorage.getItem("LegalPerson"));
                    console.log("LegalPerson",LegalPerson)
                    submitForm.AAC003 = LegalPerson.attnName
                    submitForm.AAE135 = LegalPerson.attnIDNo
                }
                // 请求参数封装
                const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,"1009");
                return params;
        },
        formatSubmitData1(){
                let submitForm = {}
                let LegalPerson = JSON.parse(sessionStorage.getItem("LegalPerson"));
                submitForm.AGA002 =  "确认-00123-004";
                //从进度查询页面进入接收传参
                if(this.$route.query.param){
                    submitForm.lx="1";
                    submitForm.BKZ019=this.$route.query.param
                }else{
                    submitForm.lx="2";
                    submitForm.BKZ019="";
                }
                console.log('接收到的身份证号',sessionStorage.getItem('payLimitAAE135'))
                if(sessionStorage.getItem('payLimitAAE135')!=null){
                submitForm.AAE135=sessionStorage.getItem('payLimitAAE135')
                }else{
                    let LegalPerson = JSON.parse(sessionStorage.getItem("LegalPerson"));
                    console.log("LegalPerson",LegalPerson)
                    submitForm.AAC003 = LegalPerson.attnName
                    submitForm.AAE135 = LegalPerson.attnIDNo
                }
            
            // 请求参数封装
            const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,"1016");
            return params;
        },
    }
}
</script>


<style lang="less" scoped>
.payLimitDetail {
    .Content {
        height: 100%;
        margin-bottom: 1.4rem;
        .SearchContent {
                height: 1.18rem;
                width: 7.5rem;
                background: #fff;
                display: flex;
                justify-content: center;
                align-items: flex-end;
            .SearchBox {
                position: relative;
                height: 0.8rem;
                width: 7rem;
                padding: 0 0.15rem;
                border: 0.01rem solid #1492ff;
                border-radius: 0.05rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
            .svg-icon {
                height: 0.5rem;
                width: 0.5rem;
            }
            .InputContent {
                height: 0.49rem;
                width: 4.1rem;
                font-size: 0.26rem;
                border: none;
                &::placeholder {
                color: #c9c9c9;
                }
            }
            .deleteIcon{
                height: .4rem;
                width: .4rem;
                position: absolute;
                right: 1.2rem;
            }
            .SearchBtn {
                height: 0.49rem;
                width: 0.99rem;
                margin-left: .2rem;
                background: #1492ff;
                border-radius: 0.04rem;
                color: white;
                font-size: 0.26rem;
                line-height: 0.49rem;
                letter-spacing: 0;
            }
            }
        }
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
                align-items: left;
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
        .simpleNote{
            margin-top: .3rem;
            height:100%;
            width: 7.5rem;
            padding: 0 .3rem;
            background: white;
            &:last-child{
                margin-bottom: 1.4rem;
            }
            .InfoTitle{
                height: .8rem;
                line-height: .8rem;
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
                        font-family: MicrosoftYaHei;
                        font-size: .36rem;
                        color: #1492FF;
                        letter-spacing: 0; 
                    }
                }
                .InfoText {
                    margin-left: .2rem;
                    width: 4.6rem;
                    opacity: 0.85;
                    line-height: .8rem;
                    display: flex;
                    position: relative;
                    align-items: center;
                    .svg-icon-delete{
                        display: inline-block;
                        width: .6rem;
                        height: .6rem;
                    }
                }
                &:last-child {
                    border-bottom: none;
                }
            }
            .InfoLine {
                height: 1rem;
                line-height: 1rem;
                position: relative;
                font-family: PingFangSC-Regular;
                font-size: .3rem;
                display: flex;
                justify-content: space-between;
                border-bottom: .01rem solid #D5D5D5;
                padding-top: .01rem 0;
                &:last-child {
                    border-bottom: none;
                }
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
                    width: 4.6rem;
                    margin-left: .2rem;
                    opacity: 0.85;
                    line-height: 1rem;
                    display: flex;
                    position: relative;
                    align-items: center;
                    input {
                        width: 4rem;
                        height: .6rem;
                        opacity: 0.85;
                        font-family: PingFangSC-Regular;
                        font-size: .3rem;
                        color: #000000;
                        letter-spacing: 0;
                        text-align: right;
                        border: none;
                    }
                }

            }
        }
        .upLoad{
            height: 100%;
            background: #fff;
            margin-top: .3rem;
            .upLoadTitle{
                padding-top: .3rem;
                padding-left: .3rem;
                font-size: .36rem;
                text-align: left;
                background: #ffffff;
            }
            .caseInfo{
                height: 100%;
                background: #FFF;
                padding: 0 .3rem;
                // margin-top: .3rem;
                .infoName{
                    // height: 1.07rem;
                    // line-height: 1.07rem;
                    margin-top: .1rem;
                    height: .8rem;
                    line-height: .8rem;
                    text-align: left;
                    font-size: .3rem;
                    color: #000000;
                    letter-spacing: 0;
                }
                .photoBox{
                    text-align: left;
                    .svg-icon{
                        height: 1.5rem;
                        width: 1.5rem;
                    }
                    .pic{
                        width:100%;
                        height:100%;
                    }
                }
            }
        }
    }
}
</style>

<style>
    .payLimit .el-date-editor.el-input,
    .el-date-editor.el-input__inner {
        width: 160px;
    }
    .payLimit .el-input__prefix,
    .el-input__suffix {
        display: none;
    }
    .payLimit .el-input__inner {
        border: none;
        text-align: right;
        padding-right: 0;
        padding-left: 0;
    }
</style>