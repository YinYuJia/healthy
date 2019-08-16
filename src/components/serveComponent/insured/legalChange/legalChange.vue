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
            <div class="company"><p class="companyName">{{form.AAB004}}</p><p class="companyCode">{{form.AAB001}}</p></div>
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
                <div class="changeUserBtn" >
                    <div class="btn" @click="changeCompanyName(true)">更改法人用户名</div>
                    <div class="btn" @click="changeCompanyCode(true)">更改法人身份证</div>
                </div>
            </div>
        </div>
        <!-- 办事指南 -->
        <GuideIcon AGA002="331400501005"></GuideIcon>
        <!-- 按钮 -->
        <Footer :canSubmit='canSubmit' @submit="submit()"></Footer>
        <!-- 法人绑定 -->
        <Binding :flag="bindingFlag" @changeFlag="changeFlag"></Binding>
    </div>
</template>

<script>
import {
    MessageBox
} from 'mint-ui';
export default {
    data(){
        return{
            form:{
                AAB001: '', //单位编码
                AAE007: '', //单位邮编
                AAE006: '', //单位地址
                AAB005: '', //单位电话
                BKE280: '', //法人电话
                BKE281: '', //专管员1姓名
                BAC210: '', //专管员2姓名
                BKE283: '', //专管员1电话
                BAC212: '', //专管员2电话
                BKB225: '', //专管员部门
                AAE005: '', //单位邮箱
                AAB301: '',  //统筹区
            },
            AAB001:"",//单位编码
            AAB004:"",//单位名称
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
                if(val.AAB001!=''&&val.AAE007 != '' && val.detailAddress != '' && val.AAB005 != ''
                    && val.BKE280 != '' && val.BKE281 != '' && val.BKE283 != ''
                    && val.BKB225 != '' && val.AAE005 != ''){
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
        this.epFn.setTitle('单位参保变更')
    },
    methods:{
        //个人用户登录
        changeCompanyName(str) {
            if (str) {
                MessageBox.prompt('法人姓名', '').then(({
                    value,
                    action
                }) => {
                    sessionStorage.setItem('personName', value);
                });
            } else {
                this.$toast("功能正在建设中")
            }
        },
        //个人用户登录
        changeCompanyCode(str) {
            if (str) {
                MessageBox.prompt('法人身份证', '').then(({
                    value,
                    action
                }) => {
                    sessionStorage.setItem('personId', value);
                });
            } else {
                this.$toast("功能正在建设中")
            }
        },
        // 绑定成功后执行的请求
        changeFlag(val){
            this.bindingFlag = val;
            let user = JSON.parse(sessionStorage.getItem("LegalPerson"));
            this.form.AAB301=user.xzqh;
            this.requset1();
        },
        // 跳转前检查用户是否法人绑定
        checkJump(){
            let LegalPerson = JSON.parse(sessionStorage.getItem("LegalPerson"));
            let params = {
                OTHERINFO: LegalPerson.userId
            }
            this.$axios.post(this.epFn.ApiUrl() + "/H5/jy9102/distanceHospital", params).then((resData) => {
                console.log('绑定',resData)
                if(resData.enCode == 1000){
                    if(resData.LS_DS[0].USEGUL == '1'){
                        sessionStorage.setItem('LOGINNAME',resData.LS_DS[0].LOGINNAME);
                        let LegalPerson = JSON.parse(sessionStorage.getItem("LegalPerson"));
                        this.form.AAB301=LegalPerson.xzqh;
                        this.requset1();
                        this.bindingFlag = false;
                    }else{
                        this.bindingFlag = true;
                    }
                }else if (resData.enCode == 1001 ) {
                    //   失败  1001
                    this.bindingFlag = true;
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
                this.$toast('信息未填写完整')
                return false;
            }else{
                // 检验邮箱格式
                if(!this.util.checkMail(this.form.AAE005)){
                    this.$toast("邮箱格式不正确");
                    return false;
                }
                //单位电话AAB005
                if(this.form.AAB005&&this.form.AAB005.length==11){
                    if(!this.util.checkPhone(this.form.AAB005)){
                        this.$toast('请填写正确的手机号码')
                        return false;
                        }
                }else if(this.form.AAB005&&(this.form.AAB005.length==7||this.form.AAB005.length==8)){
                    if(!this.util.checkHomePhone(this.form.AAB005)){
                        this.$toast('请填写正确的电话号码')
                        return false;
                        }
                }else if(this.form.AAB005&&(this.form.AAB005.length!=7||this.form.AAB005.length!=8||this.form.AAB005.length!=11)){
                        this.$toast('请确认填写的号码位数是否正确')
                        return false;
                }
                //法人电话BKE280
                if(this.form.BKE280&&this.form.BKE280.length==11){
                    if(!this.util.checkPhone(this.form.BKE280)){
                        this.$toast('请填写正确的手机号码')
                        return false;
                        }
                }else if(this.form.BKE280&&(this.form.BKE280.length==7||this.form.BKE280.length==8)){
                    if(!this.util.checkHomePhone(this.form.BKE280)){
                        this.$toast('请填写正确的电话号码')
                        return false;
                        }
                }else if(this.form.BKE280&&(this.form.BKE280.length!=7||this.form.BKE280.length!=8||this.form.BKE280.length!=11)){
                        this.$toast('请确认填写的号码位数是否正确')
                        return false;
                }
                //专管员1电话BKE283
                if(this.form.BKE283&&this.form.BKE283.length==11){
                    if(!this.util.checkPhone(this.form.BKE283)){
                        this.$toast('请填写正确的手机号码')
                        return false;
                        }
                }else if(this.form.BKE283&&(this.form.BKE283.length==7||this.form.BKE283.length==8)){
                    if(!this.util.checkHomePhone(this.form.BKE283)){
                        this.$toast('请填写正确的电话号码')
                        return false;
                        }
                }else if(this.form.BKE283&&(this.form.BKE283.length!=7||this.form.BKE283.length!=8||this.form.BKE283.length!=11)){
                        this.$toast('请确认填写的号码位数是否正确')
                        return false;
                }
                //专管员2电话BAC212
                if(this.form.BAC212&&this.form.BAC212.length==11){
                    if(!this.util.checkPhone(this.form.BAC212)){
                        this.$toast('请填写正确的手机号码')
                        return false;
                        }
                }else if(this.form.BAC212&&(this.form.BAC212.length==7||this.form.BAC212.length==8)){
                    if(!this.util.checkHomePhone(this.form.BAC212)){
                        this.$toast('请填写正确的电话号码')
                        return false;
                        }
                }else if(this.form.BAC212&&(this.form.BAC212.length!=7||this.form.BAC212.length!=8||this.form.BAC212.length!=11)){
                        this.$toast('请确认填写的号码位数是否正确')
                        return false;
                }
                //邮箱验证
                if(this.form.AAE007){
                    if(!this.util.postOffic(this.form.AAE007)){
                        this.$toast('请确认填写的邮编是否正确');
                        return false;
                    }
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
        requset1(){
                // 封装数据
                let params = this.formatSubmitData1();
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
        formatSubmitData(){
            let submitForm = Object.assign({},this.form);
            // 加入用户名和电子社保卡号
                let LegalPerson = JSON.parse(sessionStorage.getItem("LegalPerson"));
                console.log("person",LegalPerson)
                // console.log("9999",LegalPerson)
                submitForm.AAC003=LegalPerson.CompanyName;//单位名称
                submitForm.AAB301=LegalPerson.xzqh//统筹区
                submitForm.BKE520='1'
                submitForm.AAE135=sessionStorage.getItem('LOGINNAME');//单位编码
            // 请求参数封装
            const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,"1035");
            return params;
        },
        formatSubmitData1(){
            let submitForm = {};
            // 加入用户名和电子社保卡号
            submitForm.AAB001=sessionStorage.getItem('LOGINNAME');
            // 请求参数封装
            const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,"9029");
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
        .company{
            width: 100%;
            padding: .3rem .3rem;
            background: white;
            text-align: left;
            .companyName{
                font-size: .4rem;
                margin-top: .2rem;
            }
            .companyCode{
                font-size: .18rem;
                margin-top: .2rem;
            }
        }
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
            .changeUserBtn {
                display: flex;
                justify-content: space-around;
                .btn {
                    height: .6rem;
                    line-height: .6rem;
                    width: 3.5rem;
                    border: 1px solid #DDD;
                    font-size: .36rem;
                    border-radius: .2rem;
                    background: #FFF;
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
