<template>
    <div class="payLimit">
        <!-- 标题 -->
        <Title :title="'缴费年限核定'" :backRouter="'/'"></Title>
        <SelectCity 
            :type="1"
            ref="typePicker"
            :propArr="types"
            @confirm="handleTypeConfirm"
            >
        </SelectCity>
        <SelectCity 
            :type="1"
            ref="punishPicker"
            :propArr="punish"
            @confirm="handlePunishConfirm"
            >
        </SelectCity>
        <div class="Content">
            <!-- 基本信息 -->
            <!-- <UserBaseInfo></UserBaseInfo> -->
            <!-- 列表信息 -->
            <div class="SearchContent" id="searchContent">
            <div class="SearchBox">
                <svg-icon icon-class="serveComponent_search"/>
                <input class="InputContent" v-model="form.idCard" :placeholder="'请输入身份证号'">
                <svg-icon v-if="form.idCard" class="deleteIcon" @click="deleteSearch()" icon-class="serveComponent_delete"></svg-icon>
                <div class="SearchBtn" @click="search">搜索</div>
            </div>
            </div>
            <div class="userBaseInfo">
                <div class="infoBox">
                    <div class="infoName">
                        <span class="name">{{form.name}}</span>
                        <span class="sex">/{{form.sex}}</span>
                    </div>
                    <div class="infoAddress">
                        <div class="IconImg">
                            <svg-icon icon-class="dizhi"/>
                        </div>
                        <span>{{form.address}}</span>
                    </div>
                    <div class="infoMessage">
                        <div class="birth">
                            <div class="infoMessageBirth">{{form.birth}}</div>
                            <div class="infoMessageText">出生日期</div>
                        </div>
                        <div class="work">
                            <div class="infoMessageWork">{{form.work}}</div>
                            <div class="infoMessageText">参加工作时间</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="ReportInfo">
                <div class="InfoLine">
                    <div class="InfoName"><span>连续工龄:</span></div>
                    <div class="InfoText">
                        <input type="tel" maxlength="3" v-model="form.AKC412" placeholder="请输入">
                        <svg-icon icon-class="serveComponent_arrowRight"></svg-icon>
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>视作缴费年限</span></div>
                    <div class="InfoText"><input type="tel" maxlength="3" v-model="form.BAC213" placeholder="请输入">个月</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>退休工资</span></div>
                    <div class="InfoText"><input type="tel" maxlength="4" v-model="form.AAE041" placeholder="请输入">元</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName">
                        <el-checkbox v-model="form.checked">提前退休</el-checkbox>
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>提前退休类别</span></div>
                    <div class="InfoText">
                        <div class="InfoText"><input @click="openTypePicker()" type="text" v-model="BKE810VALUE" placeholder="请选择" readonly></div>
                        <svg-icon icon-class="serveComponent_arrowRight"></svg-icon>                        
                        <!-- <el-select v-model="form.BKE810" placeholder="请选择">
                            <el-option v-for="item in types" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select> -->
                    </div>
                </div>
            </div>
            <div class="simpleNote">
                <div class="InfoLine">
                    <div class="InfoName"><span>简历1</span></div>
                    <div class="InfoText">
                        <svg-icon icon-class="serveComponent_arrowRight" @click="deleted"></svg-icon>
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>时间:</span></div>
                    <div class="InfoText"><input type="text"  v-model="form.time" placeholder="请输入"></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>单位:</span></div>
                    <div class="InfoText"><input type="text"  v-model="form.workplace" placeholder="请输入">元</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>证明人:</span></div>
                    <div class="InfoText">
                        <div class="InfoText"><input  type="text" v-model="form.witness" placeholder="请输入" ></div>                   
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>处分:</span></div>
                    <div class="InfoText">
                        <div class="InfoText"><input @click="openPunishPicker()" type="text" v-model="punishtypevalue" placeholder="请选择" readonly></div>
                        <svg-icon icon-class="serveComponent_arrowRight"></svg-icon>                   
                    </div>
                </div>
            </div>
            <div class="newSimpleNote">新增简历</div>
        </div>
        <!-- 办事指南 -->
        <GuideIcon AGA002="330800123004"></GuideIcon>
        <!-- 按钮 -->
        <Footer :canSubmit='canSubmit' @submit="submit()"></Footer>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // 提交信息
            BKE810VALUE:"",
            form: {
                work: '2016-09-12',//参加工作时间
                birth: '1994-10-26', //出生日期
                address: '网新恩普软件有限公司', //工作地址
                sex: '先生', //性别
                name: '张勒君', //姓名
                idCard: '',//身份证号
                checked:false,
                simpleNote:[{
                    time:'',//时间
                    workplace:'',//单位
                    witness:'',//证明人
                    punishtype:''//处分数值
                }],
                punishtypevalue:'',//处分中文
                btnText:'确认提交'
            },
            canSubmit: false,
            punish:[
                {
                    value:'0',
                    label:'警告处分'
                },
                {
                    value:'1',
                    label:'记过处分'
                },
                {
                    value:'2',
                    label:'记大过处分'
                }
            ],
            types: [
                {
                    value: '0',
                    label: '否'
                },
                {
                    value: '1',
                    label: '因病'
                },
                {
                    value: '3',
                    label: '特殊工种'
                },
                {
                    value: '4',
                    label: '符合浙委办[2009]14号'
                },
                {
                    value: '5',
                    label: '其他'
                },
                {
                    value: '6',
                    label: '浙政发[2015]37号'
                }
            ],
        }
    },
    watch:{
        form:{
            handler:function(val){
                if(val.AKC412 != '' && val.BAC213 != '' && val.AAE041 != '' && val.BKE810 != ''){
                    this.canSubmit = true;
                }else{
                    this.canSubmit = false;
                }
            },
            deep: true
        }
    },
    created(){
        this.epFn.setTitle('缴费年限核定')
    },
    methods:{
        deleted(){
            console.log("删除简历")
        },
        deleteSearch(){
            this.form.idCard = '';
        },
        search(){
            console.log('通过身份证号请求数据')
            if(!this.util.idCard(this.form.idCard)){
                this.$toast('请填写正确的身份证号');
                return false;
            }else{
                // 封装数据
                let params = this.formatSubmitData();
                // 开始请求
                console.log('parmas------',params)
                this.$axios.post(this.epFn.ApiUrl()+ '/h5/jy1022/familyRecord', params).then((resData) => {
                    console.log('返回成功信息',resData)
                    //   成功   1000
                    if ( resData.enCode == 1000 ) {
                        this.$store.dispatch('SET_FAMILYAID_OPERATION', this.form);
                        this.$router.push('/familyDetail');
                    }else if (resData.enCode == 1001 ) {
                    //   失败  1001
                        this.$toast(resData.msg);
                        return;
                    }else{
                        this.$toast('业务出错');
                        return;
                    }
                })
            }
        },
        formatSubmitData(){
            let submitForm ={}
            // 日期传换成Number
            // submitForm.AAE030 = this.util.DateToNumber(this.form.AAE030)
            submitForm.BKE520 = "1"
            submitForm.AAE030 = this.util.DateToNumber(this.form.AAE030)
            submitForm.BAC003=this.form.BAC003,//被授权人姓名
            submitForm.BAC002=this.form.BAC002,//被授权人身份证
            submitForm.AAE144=this.form.AAE144,//绑定关系
            submitForm.AAS301=this.form.AAS301//参保地省
            submitForm.AAB301=this.form.AAB301//参保地市
            submitForm.AAQ301=this.form.AAQ301//参保地区
            submitForm.BKZ019=this.form.BKZ019//经办编号
            submitForm.AAE031='20991230'

            // 加入用户名和电子社保卡号
            if (this.$store.state.SET_NATIVEMSG.name !== undefined ) {
                submitForm.AAC003 = this.$store.state.SET_NATIVEMSG.name;
                submitForm.AAE135 = this.$store.state.SET_NATIVEMSG.idCard;
            }else {

                this.$toast("未获取到人员基本信息");
            }
            // 请求参数封装
            const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,"1022");
            return params;
        },
        submit(){
            // if(!/^[0-9]+$/.test(this.form.AKC412)){
            //     this.$toast("缴费年限只能输入数字");
            // }
            // if(!/^[0-9]+$/.test(this.form.BAC213)){
            //     this.$toast("缴费月数只能输入数字");
            // }
            // if(!/^[0-9]+$/.test(this.form.AAE041)){
            //     this.$toast("退休工资只能输入数字");
            // }
            if(this.canSubmit == false){
                this.$toast('信息未填写完整');
                return false;
            }else{
                this.$store.dispatch('SET_PAYLIMIT_OPERATION', this.form);     
                // 封装数据
                let params = this.formatSubmitData();
                // 开始请求
                console.log('parmas------',params)
                this.$axios.post(this.epFn.ApiUrl() + '/h5/jy1025/addRecord', params).then((resData) => {
                        console.log('返回成功信息',resData)
                        //   成功   1000
                            if ( resData.enCode == 1000 ) {
                                this.$router.push("/payLimitDetail");
                            }else if (resData.enCode == 1001 ) {
                            //   失败  1001
                                this.$toast(resData.msg);
                                return;
                            }else{
                                this.$toast('业务出错');
                                return;
                            }
                    
                })


            }
        },
        formatSubmitData(){
            let submitForm = JSON.parse(JSON.stringify(this.form)); //深拷贝
            submitForm.BKE520 = "1"
            submitForm.AKC412 =  this.form.AKC412;
            submitForm.BAC213 =  this.form.BAC213;
            submitForm.AAE041 =  this.form.AAE041;
            submitForm.BKE810 =  this.form.BKE810;
            // 加入用户名和电子社保卡号
            if (this.$store.state.SET_NATIVEMSG.name !== undefined ) {
                submitForm.AAC003 = this.$store.state.SET_NATIVEMSG.name;
                submitForm.AAE135 = this.$store.state.SET_NATIVEMSG.idCard;
            }else {
                
                this.$toast("未获取到人员基本信息");
            }
            // 请求参数封装
            const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,"1025");
            return params;

            // submitForm.AAE091 =  "12";
            // // 加入用户名和电子社保卡号
            // if (this.$store.state.SET_NATIVEMSG.name !== undefined ) {
            //     submitForm.AAC003 = this.$store.state.SET_NATIVEMSG.name;
            //     submitForm.AAE135 = this.$store.state.SET_NATIVEMSG.idCard;
            // }else {
            //     
            //     this.$toast("未获取到人员基本信息");
            // }
            // // 请求参数封装
            // const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,"1014");
            // return params;
        },
        // 选择变更类型
        openTypePicker(){
            this.$refs.typePicker.open();
        },
        handleTypeConfirm(val){
            console.log("类型",val);
            this.form.BKE810 = val.value;
            this.BKE810VALUE = val.label;
        },
        openPunishPicker(){
            this.$refs.punishPicker.open();
        },
        handlePunishConfirm(val){
            console.log("处分",val)
            this.form.simpleNote.punishtype=val.value;
            this.punishtypevalue=val.label;
        }
    }
}
</script>

<style lang="less" scoped>
.payLimit {
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
            .infoBox{
                font-size: .3rem;
                position: relative;
                height: 100%;
                width: 7rem;
                padding: 0 0.15rem;
                background:  #1492ff;
                color: #ffffff;
                border-radius: 0.05rem;
                display: flex;
                flex-direction: column;
                align-items: left;
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
                    span{
                        line-height:.4rem;
                        height: 4rem;
                        font-size: .24rem;
                    }
                    .IconImg{
                        width: .4rem;
                        height: .4rem;
                        display: inline-block;
                        .svg-icon{
                            display:block;
                            width: 100%;
                            height: 100%;
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
                height: 1.2rem;
                position: relative;
                font-family: PingFangSC-Regular;
                font-size: .3rem;
                display: flex;
                justify-content: space-between;
                border-bottom: .01rem solid #D5D5D5;
                .InfoName {
                    opacity: 0.85;
                    line-height: 1.2rem;
                    span {
                        height: .6rem;
                        line-height: .6rem;
                        color: #000000;
                        letter-spacing: 0;
                    }
                }
                .InfoText {
                    opacity: 0.85;
                    line-height: 1.2rem;
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
                &:last-child {
                    border-bottom: none;
                }
            }
        }
        .simpleNote{
            margin-top: .3rem;
            height: 100%;
            width: 7.5rem;
            padding: 0 .3rem;
            background: white;
            .InfoLine {
                height: 1.2rem;
                position: relative;
                font-family: PingFangSC-Regular;
                font-size: .3rem;
                display: flex;
                justify-content: space-between;
                border-bottom: .01rem solid #D5D5D5;
                .InfoName {
                    opacity: 0.85;
                    line-height: 1.2rem;
                    span {
                        height: .6rem;
                        line-height: .6rem;
                        color: #000000;
                        letter-spacing: 0;
                    }
                }
                .InfoText {
                    opacity: 0.85;
                    line-height: 1.2rem;
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
                &:last-child {
                    border-bottom: none;
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