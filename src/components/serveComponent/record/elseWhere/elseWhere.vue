<template>
    <div class="elseWhere">
        <Title :title="'异地就医备案'" :backRouter="'/'"></Title>
        <!-- MintUI弹出框区域 -->
        <mt-datetime-picker
            type="date"
            ref="startPicker"
            :startDate="startDate"
            v-model="dateVal"
            @confirm="handleStartConfirm">
        </mt-datetime-picker>
        <mt-datetime-picker
            type="date"
            ref="endPicker"
            :startDate="startDate"
            v-model="dateVal"
            @confirm="handleEndConfirm">
        </mt-datetime-picker>
        <SelectCity
            :type="2"
            ref="insuredPicker"
            @confirm="chooseInsured"
            >
        </SelectCity>
        <SelectCity
            :type="2"
            ref="cityPicker"
            :jy7206="true"
            @confirm="chooseCity"
            >
        </SelectCity>
        <SelectCity
            :type="1"
            ref="reasonPicker"
            :propArr="reportReason"
            @confirm="handleReasonConfirm"
            >
        </SelectCity>
        <!-- 弹出框区域结束 -->
        <div class="Content">
            <!-- 基本信息 -->
            <UserBaseInfo></UserBaseInfo>
            <!-- 申报信息 -->
            <div class="ReportInfo">
                <div class="InfoLine">
                    <div class="InfoName"><span>参保地</span></div>
                    <div class="InfoText">
                        <input  type="text" v-model="AAB301000" placeholder="请选择" readonly>
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>拟离杭日期</span></div>
                    <div class="InfoText">
                        <input @click="openStartPicker" type="text" v-model="form.AAE030" placeholder="请选择" readonly><svg-icon icon-class="serveComponent_arrowRight"></svg-icon>
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>回杭日期</span></div>
                    <div class="InfoText">
                        <input @click="openEndPicker" type="text" v-model="form.AAE031" placeholder="请选择" readonly><svg-icon icon-class="serveComponent_arrowRight"></svg-icon>
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>前往城市</span></div>
                    <div class="InfoText">
                        <input @click="openCityPicker" type="text" v-model="AAS011000" placeholder="请选择" readonly><svg-icon icon-class="serveComponent_arrowRight"></svg-icon>
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>详细地址</span></div>
                    <div class="InfoText">
                        <textarea v-model="form.AAE006" placeholder="请输入"></textarea>
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>申请原因</span></div>
                    <div class="InfoText">
                        <input @click="openReasonPicker()" type="text" v-model="AKC030VALUE" placeholder="请选择" readonly :disabled="reasonDisabled"><svg-icon icon-class="serveComponent_arrowRight"></svg-icon>
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>联系人</span></div>
                    <div class="InfoText"><input type="text" v-model="form.AAE004" placeholder="请输入"></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>手机号码</span></div>
                    <div class="InfoText"><input type="tel" maxlength="11" v-model="form.AAE005" placeholder="请输入"></div>
                </div>
            </div>
        </div>
        <!-- 办事指南 -->
        <GuideIcon AGA002="330800253013"></GuideIcon>
        <!-- 按钮 -->
        <Footer :canSubmit='canSubmit' @submit="submit()"></Footer>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // 提交信息
                AAS011000:"",//前往城市
                AAB301000:"",//参保地
            form: {

                AAE030: '', //离杭日期
                AAE031: '', //回杭日期
                AAS011: '', //前往城市省
                AAE011: '', //前往城市市
                
                AAQ011: '', //前往城市地区
                AAE004: '', //联系人
                AKC030: '', //申请原因
                AAE006: '', //详细地址
                AAE005: '', //联系电话
                AAB301: '',//参保地市
                AAS301: '',//参保地省

                // AAQ301: '',//参保地区
            },
            startDate: new Date(),
            AKC030VALUE: '', //申请原因绑定值
            optionList: [], //存放城市数据
            canSubmit: false,
            dateVal: new Date(), //默认绑定的时间
            excludeProvince: false, //排除省本级
            reasonDisabled: false, //申请原因默认可选择
            reportReason: [{
                    value: '1',
                    label: '退休异地安置'
                },
                {
                    value: '2',
                    label: '在职驻外工作学习'
                },
                {
                    value: '3',
                    label: '异地探亲'
                },
                {
                    value: '4',
                    label: '异地生育'
                },
                {
                    value: '5',
                    label: '子女统筹异地学习/抚养'
                },
            ],
        }
    },
    created() {
        // 根据路由配置子项选中
        let type = this.$route.params.type
        if(type){
            let label = ''
            let value = ''
            let chooseFlag = false // 二次选择
            switch(type) {
                case '1': label = '退休异地安置'; value = '1'; break;
                case '2': label = '在职驻外工作学习'; value = '2'; break;
                case '3': label = '异地生育'; value = '4'; break;
                case '4': ; chooseFlag = true; break;
                default: label = ''; break;
            }
            if(chooseFlag == false){
                this.AKC030VALUE = label
                this.form.AKC030 = value
                //原因变为不可选择
                this.reasonDisabled = true
            }else{
                this.reportReason = [
                    {
                        value: '3',
                        label: '异地探亲'
                    },
                    {
                        value: '5',
                        label: '子女统筹异地学习/抚养'
                    }
                ]
            }
        }
        // 设置标题
        this.epFn.setTitle('异地就医备案')
        let GinsengLandCode = sessionStorage.getItem("GinsengLandCode")
        let GinsengLandName = sessionStorage.getItem("GinsengLandName")

        console.log('GinsengLandCode',GinsengLandCode,'GinsengLandName',GinsengLandName)
        this.AAB301000 = GinsengLandName
        this.form.AAB301 = GinsengLandCode
        this.form.AAS301 = GinsengLandCode.substring(0,2) + '0000'
        console.log('this.form.AAS301',this.form.AAS301)
        console.log('this.form.AAB301',this.form.AAB301)
        //  排除省本级
        if(this.form.AAB301 == '339900'){
            this.excludeProvince = true;
        }
        // this.form = this.$store.state.SET_ELSEWHERE_OPERATION;
        this.$store.dispatch('SET_SELECTARRAY', this.epFn.ChinaJsonDatas());
        this.optionList = this.$store.state.SET_SELECTARRAY;
        console.log('11111---publicHeader---', this.$store.state.SET_NATIVEMSG.PublicHeader)
        // this.form.AAC003 = this.$store.state.SET_NATIVEMSG.name
        // this.form.AAE135 = this.$store.state.SET_NATIVEMSG.idCard;
        // // this.form.AAS011000 = this.$store.state.SET_USER_DETAILINFO.regionName
        // this.form.AAB301 = this.$store.state.SET_USER_DETAILINFO.AAB301
    },
    watch: {
        form: {
            handler: function(val) {
                // 判断不为空
                if (val.AAE030 != '' && val.AAE031 != '' && val.AAS011 != ''
                 && val.AAE011 != '' && val.AAE006 != ''
                 && val.AKC030 != '' && val.AAE004 != '' && val.AAE005 != ''
                 && val.AAS301 != '' && val.AAB301 != '') {
                    this.canSubmit = true;
                } else {
                    this.canSubmit = false;
                }
                // 判断时间间隔
                if (val.AAE030 != '' && val.AAE031 != '') {
                    let AAE030 = new Date(val.AAE030);
                    let AAE031 = new Date(val.AAE031);
                    let month = 24 * 3600 * 1000 * 30;
                    let gap = AAE031 - AAE030;
                    if (gap < month) {
                        this.$toast('备案时间至少一个月且不能小于拟离杭日期');
                        this.form.AAE031 = '';
                    }
                }
                if(val.AAE005.length>11){
                    this.$toast('手机号码不能超过11位');
                }
                // 判断转入转出地
                if (val.AAE011 != '' && val.AAB301 != '') {
                    if(val.AAE011==val.AAB301){
                        this.$toast('申请地市不能与参保地相同');
                        this.AAS011000 = '';
                        this.form.AAS011="";
                        this.form.AAE011="";
                        this.form.AAQ011="";
                    }
                }
            },
            deep: true
        },
    },
    methods: {
        // 选择参保地
        openInsuredPicker(){
            this.$refs.insuredPicker.open();
        },
        chooseInsured(val){
            this.AAB301000 =val.name, //参保地省
            this.form.AAS301 =val.code[0]; //参保地省
            this.form.AAB301 =val.code[1]; //参保地市
            // this.form.AAQ301 =val.code[2]  //参保地区
        },
        // 选择离开日期
        openStartPicker(){
            this.$refs.startPicker.open();
        },
        handleStartConfirm(val){
            let date = this.util.formatDate(val,'yyyy-MM-dd');
            console.log("data",date)
            this.form.AAE030 = date;
        },
        // 选择回杭日期
        openEndPicker(){
            this.$refs.endPicker.open();
        },
        handleEndConfirm(val){
            let date = this.util.formatDate(val,'yyyy-MM-dd');
            this.form.AAE031 = date;
        },
        // 选择申请地市
        openCityPicker(){
            this.$refs.cityPicker.open();
        },
        chooseCity(val){
            this.AAS011000= val.name;
            this.form.AAS011=val.code[0]
            this.form.AAE011=val.code[1]
            this.form.AAQ011=val.code[2]
            console.log("9999",val)
        },
        // 选择申请原因
        openReasonPicker(){
            this.$refs.reasonPicker.open();
        },
        handleReasonConfirm(val){
            console.log(val);
            this.form.AKC030 = val.value;
            this.AKC030VALUE = val.label;
        },
        // 提交
        submit() {
            sessionStorage.setItem('AKC030',this.form.AKC030)//储存当前的申请原因
            if (this.canSubmit == false) {
                this.$toast('信息未填写完整');
                return false;
            } else {
                if(this.form.AAE005){
                    if(!this.util.checkPhone(this.form.AAE005)){
                        this.$toast('请填写正确的手机号码');
                        return false;
                    }
                }
                if(this.form.AAE004){
                    if(this.util.checkName(this.form.AAE004)){
                        this.$toast('姓名中不能包含数字');
                        return false;
                    }
                }
                this.$store.dispatch('SET_ELSEWHERE_OPERATION', this.form);

                // 封装数据
                let params = this.formatSubmitData();
                // 开始请求
                console.log('parmas------',params)
                this.$axios.post(this.epFn.ApiUrl()+ '/h5/jy1012/addRecord', params).then((resData) => {
                        console.log('返回成功信息',resData)
                        //   成功   1000
                            if ( resData.enCode == 1000 ) {
                                // this.$toast("提交成功");
                                this.$router.push("/elseDetail");
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
            let submitForm = Object.assign({}, this.form);
            // 日期传换成Number
            submitForm.BKE520 = "1"
            submitForm.AAE030 = this.util.DateToNumber(this.form.AAE030).toString();
            submitForm.AAE031 = this.util.DateToNumber(this.form.AAE031).toString();
            // submitForm.AAS301 = this.form.AAS301//申请地省
            // submitForm.AAB301 = this.form.AAB301//申请地市
            // submitForm.AAQ301 = this.form.AAQ301//申请地区
            // submitForm.AAS011=  this.form.AAS011 //参保地省
            // submitForm.AAE011=  this.form.AAE011 //参保地市
            // submitForm.AAQ011=  this.form.AAQ011 //参保地区
            // submitForm.AAE006=  this.form.AAE006 //详细地址
            // submitForm.AKC030=  this.form.AKC030 //申请原因
            // submitForm.AAE004=  this.form.AAE004 //联系人
            // submitForm.AAE005=  this.form.AAE005 //联系电话
            // 加入用户名和电子社保卡号
            if (this.$store.state.SET_NATIVEMSG.name !== undefined ) {
                  submitForm.AAC003 = this.$store.state.SET_NATIVEMSG.name;
                submitForm.AAE135 = this.$store.state.SET_NATIVEMSG.idCard;
                submitForm.AAC002 = this.$store.state.SET_NATIVEMSG.idCard;
                
            }else {

                this.$toast("未获取到人员基本信息");
            }
            // 请求参数封装
            console.log('submitForm',submitForm)
            const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,"1012");
            console.log("params444444444444444444444",params)
            return params;
        }
    }
}
</script>

<style lang="less" scoped>
.elseWhere {
    width: 100%;
    .Content {
        height: 100%;
        margin-bottom: 1.4rem;
        .ReportInfo {
            height: 10rem;
            width: 100%;
            padding: 0 .3rem;
            background: white;
            .InfoLine {
                height: 1.2rem;
                position: relative;
                font-size: .28rem;
                display: flex;
                justify-content: space-between;
                border-bottom: .01rem solid #D5D5D5;
                .InfoName {
                    line-height: 1.2rem;
                    span {
                        height: .6rem;
                        line-height: .6rem;
                        color: #000000;
                        letter-spacing: 0;
                    }
                }
                .InfoText {
                    line-height: 1.2rem;
                    display: flex;
                    position: relative;
                    align-items: center;
                    input {
                        width: 4rem;
                        height: .6rem;
                        font-size: .28rem;
                        color: #000000;
                        letter-spacing: 0;
                        text-align: right;
                        border: none;
                    }
                    input:disabled{
                        background: #FFF;
                    }
                }
                &:nth-child(5) {
                    height: 1.6rem;
                    textarea {
                        height: .84rem;
                        width: 4rem;
                        padding: 0;
                        font-size: .28rem;
                        color: #000000;
                        line-height: .42rem;
                        text-align: right;
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
    .picker-items{
        width: 100%;
    }
    .elseWhere .el-date-editor.el-input,
    .el-date-editor.el-input__inner {
        width: 160px;
    }
    .elseWhere .el-input__prefix,
    .el-input__suffix {
        display: none;
    }
    .elseWhere .el-input__inner {
        border: none;
        text-align: right;
        padding-right: 0;
        padding-left: 0;
    }
    .elseWhere .el-cascader .el-input .el-input__inner {
        width: 4.5rem;
    }
    .elseWhere .el-cascader .el-cascader__label {
        text-align: right;
        padding: 0;
    }
</style>
