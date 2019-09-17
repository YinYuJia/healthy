<template>
    <div class="changeDetail">
        <Title :title="'医保转移接续'" :backRouter="'/transferRenewing'"></Title>
        <div class="Content">
            <!-- 办事进度 -->
            <WorkProgress :currentStep="currentStep" :progress=arr ></WorkProgress>
            <!-- 办理结果 -->
            <DetailStatus></DetailStatus>
            <!-- 邮递信息 -->
            <div class="MailInfo">
                <div class="InfoLine">
                    <div class="InfoName"><span>转出地:</span></div>
                    <div class="InfoText">{{AAA027000}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>转入地:</span></div>
                    <div class="InfoText">{{AAB301000}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>手机号码:</span></div>
                    <div class="InfoText">{{form.AAE005 | tuoMin(3,4)}}</div>
                </div>
                <!-- 进度时间 -->
                <ProgressDate  :replyDate="form.AAE036"  :progressDate="form.BAE019"></ProgressDate>
            </div>
            <div class="settlement">
                <div class="infoName">转移变更表</div>
                <div class="photoBox">
                     <div class="picWrap">
                        <div class="uploadBtn">
                            <img :src="settlement" class="pic" @click="showBigPhoto(settlement)" />
                            <!-- <a href='static\pdf\web\viewer.html?file=http%3a%2f%2fybj.zjzwfw.gov.cn%3a10540%2fopenapiApp%2fdownload%3fkey%3dbizamt%2frdm%2f1567674102729W6y.pdf'>点我111111</a> -->
                            <!-- <iframe src="static\pdf\web\compressed.tracemonkey-pldi-09.pdf" width="100%" height="100%"></iframe> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Success :flag="successFlag"></Success>
        <PhotoView ref="photo" :imgUrl="imgUrl"></PhotoView>
        <!-- 底部 -->
        <Footer :btnType="2" v-if="currentStep==1" @backout="backout()" @edit="edit()" :handleNumber="handleNumber"></Footer>
    </div>
</template>
<script>
export default {
    data(){
        return{
            AAA027000: '', //转出地
            AAB301000: '', //转入地
            form:{},
            arr:[
                {step:1,name:'收件'},
                {step:2,name:'受理'},
                {step:3,name:'转移'},
                {step:4,name:'办结'},
            ],
            currentStep:1,
            handleNumber:'',
            List:[],
            successFlag: 1,
            settlement:'',
            imgUrl:'',
        }
    },
    created(){
        if(this.$route.query.param){
            this.successFlag = 2;
        }
        this.epFn.setTitle('医保转移接续')
        // this.form = this.$store.state.SET_TRANSFERRENEWING_OPERATION;
        this.request();
        this.request1();
        this.request2()
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
            this.$router.push('/transferRenewing');
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
                    console.log(1)
                    console.log("RESDATA",resData.LS_DS_07)
                    let LS=resData.LS_DS_07
                    this.form={...this.form,...LS}
                    console.log("form",this.form)
                    if(this.form.AAQ027VALUE==undefined){
                        this.AAA027000=this.form.AAS027VALUE+this.form.AAA027VALUE
                    }else{
                        this.AAA027000=this.form.AAS027VALUE+this.form.AAA027VALUE+this.form.AAQ027VALUE
                    }
                    if(this.form.AAQ301VALUE==undefined){
                        this.AAB301000=this.form.AAS301VALUE+this.form.AAB301VALUE
                    }else{
                        this.AAB301000=this.form.AAS301VALUE+this.form.AAB301VALUE+this.form.AAQ301VALUE
                    }
                    this.handleNumber = resData.LS_DS_07.BKZ019
                    // this.$toast("提交成功");
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
        request2(){
            let params={};
            params.AGA001='190830990021690138051'||sessionStorage.getItem('transferRenewingBKZ019');
            this.$axios.post(this.epFn.ApiUrl()+ '/H5/jy7108/info', params).then((resData) => {
                console.log('返回成功信息11!',resData)
                //   成功   1000
                if ( resData.enCode == 1000 ) { 
                    this.settlement=resData.LS_DS[1].BKE554;
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
            // submitForm.AGA002 =  "331400512001";
            submitForm.AGA002 =  "公共服务-00512-002";
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
            console.log(submitForm)
                // submitForm.AGA002 =  "331400512001";
                submitForm.AGA002 =  "公共服务-00512-002";
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
    }
}
</script>

<style lang="less" scoped>
.changeDetail{
    width: 100%;
    .Content{
        margin-bottom: 1.4rem;
        .MailInfo{
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
                    width: 1.5rem;
                    line-height: 1.2rem;
                    text-align: left;
                    span{
                        height: .6rem;
                        line-height: .6rem;
                        letter-spacing: 0;
                        color: #666;
                    }
                }
                .InfoText{
                    line-height: 1.2rem;
                    display: flex;
                    position: relative;
                    align-items: center;
                    color: #000;
                }
                &:last-child{
                    border-bottom: none;
                }
            }
        }
        .settlement{
            height:100%;
            background: #FFF;
            padding: 0 .3rem;
            margin-top: .3rem;
            .infoName{
                position: relative;
                height: .28rem;
                line-height:.28rem;
                text-align: left;
                font-size: .28rem;
                top:.37rem;
                color: #000000;
                letter-spacing: 0;
            }
            .photoBox{
                position: relative;
                text-align: left;
                top: .32rem;
                .picWrap{
                    display: flex;
                    flex-wrap: wrap;
                    margin-top: .2rem;
                    .uploadBtn{
                        position: relative;
                        height: 100%;
                        width: 100%;
                        margin:  .15rem 0 0;
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
            }
        }
    }
}
</style>
