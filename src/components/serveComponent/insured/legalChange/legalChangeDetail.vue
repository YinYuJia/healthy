<template>
    <div class="legalChangeDetail">
        <Title :title="'参保信息变更'" :backRouter="'/insuredChange'"></Title>
        <div class="Content">
            <!-- 办事进度 -->
            <WorkProgress :currentStep="currentStep" :progress="arr"></WorkProgress>
            <!-- 办理结果 -->
            <DetailStatus nameWidth="2.2rem"></DetailStatus>
            <!-- 邮递信息 -->
            <div class="MailInfo">
                <div class="InfoLine">
                    <div class="InfoName"><span>单位邮编:</span></div>
                    <div class="InfoText">{{form.AAE007}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>单位地址:</span></div>
                    <div class="InfoText">{{form.AAE006}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>单位电话:</span></div>
                    <div class="InfoText">{{form.AAB005}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>法人代表电话:</span></div>
                    <div class="InfoText">{{form.BKE280}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>专管员姓名1:</span></div>
                    <div class="InfoText">{{form.BKE281}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>专管员电话1:</span></div>
                    <div class="InfoText">{{form.BKE283}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>专管员姓名2:</span></div>
                    <div class="InfoText">{{form.BAC210}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>专管员电话2:</span></div>
                    <div class="InfoText">{{form.BAC212}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>专管员所在部门:</span></div>
                    <div class="InfoText">{{form.BKB225}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>邮箱:</span></div>
                    <div class="InfoText">{{form.AAE005}}</div>
                </div>
                <!-- 进度时间 -->
                <ProgressDate nameWidth="2.2rem"  :replyDate='form.AAE036'  :progressDate='form.BAE019'></ProgressDate>
            </div>
        </div>
        <Success :flag="successFlag"></Success>
        <!-- 底部 -->
        <Footer :btnType="2" v-if="currentStep==1" @backout="backout()" @edit="edit()"></Footer>
    </div>
</template>

<script>
export default {
    data(){
        return{
            currentStep: 1,
            successFlag: 1,
            form:{},
            arr: [
                {step:1,name:'申请'},
                {step:2,name:'受理'},
                {step:3,name:'审核'},
                {step:4,name:'送达'},
                {step:5,name:'办结'}
            ],
        }
    },
    created(){
        if(this.$route.query.param){
            this.successFlag = 2;
        }
        this.request();
        this.request1();
    },
    methods:{
        // 事项进度查询
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
        formatSubmitData(){
            let submitForm ={}
            let LegalPerson = JSON.parse(sessionStorage.getItem("LegalPerson"));
            let name=sessionStorage.getItem('personName')
            let id=sessionStorage.getItem('personId')
            console.log('name',name)
            console.log('id',id)
            submitForm.AGA002 =  "公共服务-00501-004";
            submitForm.AAC003 =LegalPerson.attnName|| name;
            submitForm.BKZ019 =this.$route.query.param||""
            submitForm.AAE135 = LegalPerson.attnIDNo|| id;
            // 请求参数封装
            const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,"1009");
            return params;
        },
        // 信息回显
        request1(){
            let params=this.formatSubmitData1();
            this.$axios.post(this.epFn.ApiUrl()+ '/h5/jy1016/info', params).then((resData) => {
                console.log('返回成功信息',resData)
                //   成功   1000
                if ( resData.enCode == 1000 ) {
                    this.form=resData.LS_DS_15;
                    let address=resData.LS_DS_15.AAE006;
                    this.form.AAE006=address.split('|')[0]+address.split('|')[1]
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
            let name=sessionStorage.getItem('personName')
            let id=sessionStorage.getItem('personId')
            console.log('name',name)
            console.log('id',id)
            submitForm.AGA002 =  "公共服务-00501-004";
            //从进度查询页面进入接收传参
            if(this.$route.query.param){
                submitForm.lx="1";
                submitForm.BKZ019=this.$route.query.param
            }else{
                submitForm.lx="2";
                submitForm.BKZ019="";
            }
            let LegalPerson = JSON.parse(sessionStorage.getItem("LegalPerson"));
            submitForm.AAE135 = LegalPerson.attnIDNo|| id;
            submitForm.AAC003 =LegalPerson.attnName|| name;
            
            // 请求参数封装
            const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,"1016");
            return params;
        },
    }
}
</script>

<style lang="less" scoped>
.legalChangeDetail{
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
                    width: 2.2rem;
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
                    height: 100%;
                    text-align: left;
                    display: flex;
                    position: relative;
                    align-items: center;
                    color: #000;
                }
                &:nth-child(3){
                    height: 1.6rem;
                    .InfoText{
                        height: 1.6rem;
                        textarea{
                            border: none;
                            width: 5rem;
                            line-height: .45rem;
                            color: #000;
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