<template>
    <div class="legalChange">
        <Title :title="'参保信息变更'" :backRouter="'/'"></Title>
        <SelectCity
            :type="3"
            ref="cityPicker"
            :jy9028='true'
            @confirm="chooseCity"
            >
        </SelectCity>
        <div class="Content">
            <!-- 基本信息 -->
            <UserBaseInfo></UserBaseInfo>
            <!-- 变更信息 -->
            <div class="ChangeInfo">
                <div class="InfoLine">
                    <div class="InfoName"><span>单位邮编：</span></div>
                    <div class="InfoText"><input v-model="form.AAE007" type="tel" maxlength="6" placeholder="请输入"></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>单位地址：</span></div>
                    <div class="InfoText"><input v-model="params.address" @click="openCityPicker" type="text" placeholder="请选择" readonly><svg-icon icon-class="serveComponent_arrowRight"></svg-icon></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>地址详情：</span></div>
                    <div class="InfoText"><textarea v-model="params.detailAddress" placeholder="请输入"></textarea></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>单位电话：</span></div>
                    <div class="InfoText"><input v-model="form.AAB005" type="tel" maxlength="11" placeholder="请输入"></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>法人代表电话：</span></div>
                    <div class="InfoText"><input v-model="form.BKE280" type="tel" maxlength="11" placeholder="请输入"></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>专管员姓名1：</span></div>
                    <div class="InfoText"><input v-model="form.BKE281" type="text" placeholder="请输入"></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>专管员电话1：</span></div>
                    <div class="InfoText"><input v-model="form.BKE283" type="tel" maxlength="11" placeholder="请输入"></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>专管员姓名2：</span></div>
                    <div class="InfoText"><input v-model="form.BAC210" type="text" placeholder="请输入"></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>专管员电话2：</span></div>
                    <div class="InfoText"><input v-model="form.BAC212" type="tel" maxlength="11" placeholder="请输入"></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>专管员所在部门：</span></div>
                    <div class="InfoText"><input v-model="form.BKB225" type="text" placeholder="请输入"></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>邮箱：</span></div>
                    <div class="InfoText"><input v-model="form.AAE005" type="text" maxlength="20" placeholder="请输入"></div>
                </div>
            </div>
        </div>
        <!-- 办事指南 -->
        <!-- <GuideIcon AGA002="331400501005"></GuideIcon> -->
        <!-- 按钮 -->
        <Footer :canSubmit='canSubmit' @submit="submit()"></Footer>
        <!-- 法人绑定 -->
        <Binding :flag="bindingFlag"></Binding>
    </div>
</template>

<script>
export default {
    data(){
        return{
            form:{
                AAB001: '', //单位编码
                AAE007: '', //单位邮编
                AAE006: '', //单位地址
                AAB005: '', //单位电话
                BKE280: '', //法人电话
                BKE281: '', //专管员姓名
                BKE283: '', //专管员电话
                BKB225: '', //专管员部门
                AAE005: '', //单位邮箱
                BKZ019: '', //经办编号暂为空
                AAB301: '',  //统筹区

            },
            AAB001:"",//单位编号
            params:{
                address: '', //选择的地址
                detailAddress: '', //详细地址    
            },
            canSubmit: false,
            bindingFlag: false,
        }
    },
    watch:{
        form:{
            handler: function(val) {
              // if(val.AAE007 != '' && val.address != '' && val.detailAddress != '' && val.AAB005 != ''
                if(val.AAE007 != '' && val.detailAddress != '' && val.AAB005 != ''
                    && val.BKE280 != '' && val.BKE281 != '' && val.BKE283 != '' && val.BKB225 != '' && val.AAE005 != ''){
                    this.canSubmit = true;
                }else{
                    this.canSubmit = false;
                }
            },
            deep:true
        },
        params:{
            handler:function(val){
                if(val.address!=''&&val.detailAddress!=''){
                    this.form.AAE006=val.address+val.detailAddress;
                }
            },
            deep:true
        }
    },
    created(){
        this.checkJump();
        let user = JSON.parse(sessionStorage.getItem("LegalPerson"));
        this.form.AAB301=user.xzqh;
        // this.requset2();
        // this.requset1();
    },
    methods:{
        // 跳转前检查用户是否法人绑定
        checkJump(){
            let user = JSON.parse(sessionStorage.getItem("LegalPerson"));
            let params = {
                OTHERINFO: user.userId
            }
            this.$axios.post(this.epFn.ApiUrl() + "/H5/jy9102/distanceHospital", params).then((resData) => {
                console.log('绑定',resData)
                if(resData.enCode == 1000){
                    if(resData.LS_DS[0].USEGUL == '1'){
                        this.bindingFlag = false;
                    }else{
                        this.bindingFlag = true;
                    }
                }else if (resData.enCode == 1001 ) {
                    //   失败  1001
                    this.bindingFlag = true;
                    console.log('显示',this.bindingFlag);
                }else{
                    this.$toast('业务出错');
                    this.bindingFlag = true;
                    return false;
                }
            })
        },
        // 选择城市
        openCityPicker(){
            this.$refs.cityPicker.open();
        },
        chooseCity(val){
            this.params.address= val.name;
            console.log("address",this.params.address)
        },
        // 提交
        submit(){
            console.log(1111)
            console.log(this.canSubmit)
            if(this.canSubmit == false){
                return false;
            }else{
                // 检验邮箱格式
                if(!this.util.checkMail(this.form.AAE005)){
                    this.$toast("邮箱格式不正确");
                    return false;
                }
                let params = this.formatSubmitData();
                console.log("params",params)
                this.$axios.post(this.epFn.ApiUrl()+ '/h5/jy1035/getRecord', params).then((resData) => {
                    //   成功   1000
                    if ( resData.enCode == 1000 ) {
                      console.log('返回信息成功',resData)
                      this.$router.push({path: '/legalChangeDetail'});
                    }else if (resData.enCode == 1001 ) {
                    //   失败  1001
                      console.log('返回信息失败',resData)
                      this.$toast(resData.msg);
                        return;
                    }else{
                        this.$toast('业务出错');
                        return;
                    }
                })
            }
            // this.$router.push('/legalChangeDetail');
        },
        requset1(a){
                // 封装数据
                let params = this.formatSubmitData1(a);
                // 开始请求
                this.$axios.post(this.epFn.ApiUrl()+ '/H5/jy9029/9029', params).then((resData) => {
                    //   成功   1000
                    if ( resData.enCode == 1000 ) {
                      console.log('返回信息成功',resData)
                      this.form=resData.LS_DS[0];
                    //   if(isNaN(this.form.AAE006)){
                    //       this.form.AAE006=''
                    //   }
                      console.log("form",this.form)
                    }else if (resData.enCode == 1001 ) {
                    //   失败  1001
                      console.log('返回信息失败',resData)
                      this.$toast(resData.msg);
                        return;
                    }else{
                        this.$toast('业务出错');
                        return;
                    }
                })
        },
        requset2(){
                let params = this.formatSubmitData2();
                // 开始请求
                console.log('parmas------',params)
                this.$axios.post(this.epFn.ApiUrl()+ '/H5/jy7610/getRecord', params).then((resData) => {
                    console.log('返回成功信息',resData)
                    //   成功   1000
                    if ( resData.enCode == 1000 ) {
                        console.log("LS_DS",resData)
                        this.AAB001=resData.LS_DS[0].AAB001;
                        console.log("AAB001",resData.LS_DS[0].AAB001)
                        // console.log('form1',this.form1)
                        this.requset1(resData.LS_DS[0].AAB001)
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
            let submitForm = Object.assign({},this.form);
            // 加入用户名和电子社保卡号
            if (this.$store.state.SET_NATIVEMSG.name !== undefined ) {
                submitForm.AAC003 = this.$store.state.SET_NATIVEMSG.name;
                submitForm.AAE135 = this.$store.state.SET_NATIVEMSG.idCard;
            }else {
                submitForm.AAC003=sessionStorage.getItem('userName');
                submitForm.AAE135=sessionStorage.getItem('idCard');
            }
                submitForm.AAB301=sessionStorage.getItem("GinsengLandCode");//统筹区
                submitForm.BKE520='1'
            // 请求参数封装
            const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,"1035");
            return params;
        },
        formatSubmitData1(a){
            let submitForm = {};
            // 加入用户名和电子社保卡号
            submitForm.AAB001=a;
            // 请求参数封装
            const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,"9029");
            return params;
        },
        formatSubmitData2(){
            let submitForm = {};
            // 加入用户名和电子社保卡号
            if (this.$store.state.SET_NATIVEMSG.name !== undefined ) {
                submitForm.AAC002 = this.$store.state.SET_NATIVEMSG.idCard;
            }else {
                submitForm.AAC002=submitForm.AAE135=sessionStorage.getItem('idCard');
                
            }
            // 请求参数封装
            const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,"7610");
            return params;
        },
    }
}
</script>

<style lang="less" scoped>
.legalChange{
    width: 100%;
    .Content{
        height: 100%;
        margin-bottom: 1.4rem;
        .ChangeInfo{
            width: 100%;
            padding: 0 .3rem;
            background: white;
            .InfoLine{
                height: 1.2rem;
                position: relative;
                font-family: PingFangSC-Regular;
                font-size: .3rem;
                display: flex;
                justify-content: space-between;
                border-bottom: .01rem solid #D5D5D5;
                .InfoName{
                    opacity: 0.85;
                    line-height: 1.2rem;
                    span{
                        height: .6rem;
                        line-height: .6rem;
                        color: #000000;
                        letter-spacing: 0;
                    }
                }
                .InfoText{
                    opacity: 0.85;
                    line-height: 1.2rem;
                    display: flex;
                    position: relative;
                    align-items: center;
                    input{
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
                &:nth-child(3){
                    height: 1.6rem;
                    .InfoText{
                        display: flex;
                        align-items: center;
                    }
                    textarea{
                        width: 4rem;
                        height: .84rem;
                        font-size: .3rem;
                        opacity: 0.85;
                        color: #000000;
                        line-height: .42rem;
                        text-align: right;
                    }
                }
                &:last-child{
                    border-bottom: none;
                }
            }
        }
        .Hint{
            margin-top: .45rem;
            padding: 0 .3rem;
            opacity: 0.45;
            font-family: PingFangSC-Regular;
            font-size: .24rem;
            color: #000000;
            text-align: left;
            .HintTitle{
                i{
                    margin-right: .2rem;
                    letter-spacing: 0;
                }
            }
            .HintText{
                margin-top: .28rem;
                letter-spacing: 0;
            }
        }
    }
}
</style>
