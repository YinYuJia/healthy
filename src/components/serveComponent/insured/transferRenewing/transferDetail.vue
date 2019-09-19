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
                <h2 class="InfoTitle">转移信息</h2>
                <!-- 进度时间 -->
                <ProgressDate nameWidth="2rem"  :replyDate="form.AAE036"  :progressDate="form.BAE019"></ProgressDate>
                <div class="InfoLine">
                    <div class="InfoName"><span>转出地:</span></div>
                    <div class="InfoText"><span>{{form.AAC027VALUE}}</span></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>转入地:</span></div>
                    <div class="InfoText" v-if="isOutsideProvince"><span>浙江省省本级</span></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>手机号码:</span></div>
                    <div class="InfoText"><span>{{form.AAE005 | tuoMin(3,4)}}</span></div>
                </div>
            </div>
            <div class="RemainInfo" v-if="isOutsideProvince">
                <div class="MailInfo">
                    <h2 class="InfoTitle">基本信息</h2>
                    <div class="InfoLine">
                        <div class="InfoName"><span>联系电话:</span></div>
                        <div class="InfoText"><span>{{form.AAC067 | tuoMin(3,4)}}</span></div>
                    </div>
                    <div class="InfoLine">
                        <div class="InfoName"><span>户籍地址:</span></div>
                        <div class="InfoText"><span>{{form.AAC010}}</span></div>
                    </div>
                    <div class="InfoLine">
                        <div class="InfoName"><span>户籍类型:</span></div>
                        <div class="InfoText"><span>{{form.AAC009 | AAC009}}</span></div>
                    </div>
                    <div class="InfoLine">
                        <div class="InfoName"><span>联系地址:</span></div>
                        <div class="InfoText"><span>{{form.AAE006L}}</span></div>
                    </div>
                    <div class="InfoLine">
                        <div class="InfoName"><span>邮政编码:</span></div>
                        <div class="InfoText"><span>{{form.AAE007}}</span></div>
                    </div>
                </div>
                <div class="MailInfo">
                    <h2 class="InfoTitle">转出地社保经办机构信息</h2>
                    <div class="InfoLine">
                        <div class="InfoName"><span>机构名称:</span></div>
                        <div class="InfoText"><span>{{form.AAS027VALUE}}{{form.AAC027VALUE}}{{form.AAB027VALUE}}{{form.AKC328}}</span></div>
                    </div>
                    <div class="InfoLine">
                        <div class="InfoName"><span>联系人:</span></div>
                        <div class="InfoText"><span>{{form.AAE004}}</span></div>
                    </div>
                    <div class="InfoLine">
                        <div class="InfoName"><span>联系电话:</span></div>
                        <div class="InfoText"><span>{{form.AAE005 | tuoMin(3,4)}}</span></div>
                    </div>
                    <div class="InfoLine">
                        <div class="InfoName"><span>联系地址:</span></div>
                        <div class="InfoText"><span>{{form.AAE006}}</span></div>
                    </div>
                    <div class="InfoLine">
                        <div class="InfoName"><span>邮政编码:</span></div>
                        <div class="InfoText"><span>{{form.AKC330}}</span></div>
                    </div>
                </div>
                <div class="MailInfo">
                    <h2 class="InfoTitle">参保信息</h2>
                    <div class="InfoLine">
                        <div class="InfoName"><span>开始时间:</span></div>
                        <div class="InfoText"><span>{{form.AAE030}}</span></div>
                    </div>
                    <div class="InfoLine">
                        <div class="InfoName"><span>结束时间:</span></div>
                        <div class="InfoText"><span>{{form.AAE031}}</span></div>
                    </div>
                    <div class="InfoLine">
                        <div class="InfoName"><span>医保类型:</span></div>
                        <div class="InfoText"><span>{{form.ACC002 | ACC002}}</span></div>
                    </div>
                    <div class="InfoLine">
                        <div class="InfoName"><span>累计缴费月份:</span></div>
                        <div class="InfoText"><span>{{form.BAB459}}</span></div>
                    </div>
                </div>
            </div>
        </div>
        <Success :flag="successFlag"></Success>
    </div>
</template>

<script>
export default {
    data(){
        return{
            isOutsideProvince: false, //是否为省外接续
            form:{},
            arr:[
                {step:1,name:'收件'},
                {step:2,name:'受理'},
                {step:3,name:'转移'},
                {step:4,name:'办结'},
            ],
            currentStep:1,
            successFlag: 1,
        }
    },
    created(){
        if(this.$route.query.param){
            this.successFlag = 2;
        }
        this.epFn.setTitle('医保转移接续')
        this.request();
        this.request1();
    },
    methods:{
        request(){
            let submitForm ={}
            submitForm.AGA002 =  "公共服务-00512-002";
            if(this.$route.query.param){
                submitForm.BKZ019=this.$route.query.param
            }else{
                submitForm.BKZ019=sessionStorage.getItem('BKZ019');
            }
            // 加入用户名和电子社保卡号
            submitForm.AAC003 = this.$store.state.SET_NATIVEMSG.name;
            submitForm.AAE135 = this.$store.state.SET_NATIVEMSG.idCard;
            // 请求参数封装
            const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,"1009");
            this.$axios.post(this.epFn.ApiUrl()+ '/h5/jy1009/getRecord', params).then((resData) => {
                console.log('返回成功信息1009',resData)
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
            let submitForm = {
                AGA002: "公共服务-00512-002",
                AAC003: this.$store.state.SET_NATIVEMSG.name,
                AAE135: this.$store.state.SET_NATIVEMSG.idCard
            }
            //从进度查询页面进入接收传参
            if(this.$route.query.param){
                submitForm.lx="1";
                submitForm.BKZ019=this.$route.query.param
            }else{
                submitForm.lx="2";
                submitForm.BKZ019=sessionStorage.getItem('BKZ019');
            }
            // 请求参数封装
            const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,"1016");
            this.$axios.post(this.epFn.ApiUrl()+ '/h5/jy1016/info', params).then((resData) => {
                console.log('返回成功信息1016 ',resData)
                //   成功   1000
                if ( resData.enCode == 1000 ) {
                    if(resData.type == '1'){
                        this.isOutsideProvince = true;
                        this.form = resData.LS_DS_21;
                    }else{
                        this.form = resData.LS_DS_07;
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
            padding: .33rem .2rem 0;
            background: white;
            /deep/ .progressTime{
                border-bottom: .01rem solid #D5D5D5;
            }
            .InfoTitle{
                font-size: .32rem;
                text-align: left;
                color: #000000;
                letter-spacing: 0;
            }
            .InfoLine{
                position: relative;
                display: flex;
                font-size: .28rem;
                padding: .44rem 0;
                border-bottom: .01rem solid #D5D5D5;
                .InfoName{
                    width: 2rem;
                    text-align: left;
                    flex-shrink: 0;
                    span{
                        line-height: .4rem;
                        color: #666;
                        letter-spacing: 0;
                    }
                }
                .InfoText{
                    height: auto;
                    width: 100%;
                    letter-spacing: 0;
                    display: flex;
                    position: relative;
                    align-items: center;
                    span{
                        height: auto;
                        width: 100%;
                        line-height: .4rem;
                        color: #000;
                        letter-spacing: 0;
                        text-align: left;
                    }
                }
                &:last-child{
                    border-bottom: none;
                }
            }
        }
        .RemainInfo{
            .MailInfo{
                margin-top: .15rem;
            }
        }
    }
}
</style>
