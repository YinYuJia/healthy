<template>
    <div class="legalTransfer">
        <!-- MintUI弹出框区域 -->
        <SelectCity
            :type="3"
            ref="outCityPicker"
            :jy9029="true"
            @confirm="chooseOutCity"
            >
        </SelectCity>
        <SelectCity
            :type="3"
            ref="inCityPicker"
            :jy9029="true"
            @confirm="chooseInCity"
            >
        </SelectCity>
        <!-- 地址选择器 -->
        <SelectCity
            :type="3"
            ref="allCityPicker"
            :jy9029="true"
            @confirm="chooseAllCity"
            >
        </SelectCity>
        <!-- 时间选择器 -->
        <mt-datetime-picker
            type="date"
            ref="datePicker"
            v-model="dateVal"
            @confirm="chooseDate">
        </mt-datetime-picker>
        <!-- 户籍类型选择器 -->
        <SelectList :list="AAC009List" ref="AAC009Picker" @choose="chooseAAC009"></SelectList>
        <!-- 医保类型选择器 -->
        <SelectList :list="ACC002List" ref="ACC002Picker" @choose="chooseACC002"></SelectList>
        <!-- 弹出框区域结束 -->
        <!-- 搜索框 -->
        <SearchInfo @search="search"></SearchInfo>
        <!-- 显示剩下的信息 -->
        <div class="Content" v-show="showAll">
            <!-- 用户信息 -->
            <UserInfoPad :userInfo="userInfo"></UserInfoPad>
            <!-- 转移信息 -->
            <div class="ReportInfo">
                <h2 class="InfoTitle">转移信息</h2>
                <div class="InfoLine">
                    <div class="InfoName"><span>转出地</span></div>
                    <div class="InfoText">
                         <div class="InfoText"><input @click="openOutCityPicker" type="text" v-model="form.AAA027VALUE" placeholder="请选择" readonly><svg-icon icon-class="serveComponent_arrowRight"></svg-icon></div>
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>转入地</span></div>
                    <div class="InfoText">
                         <div class="InfoText"><input @click="openInCityPicker" type="text" v-model="form.AAB301VALUE" placeholder="请选择" readonly><svg-icon icon-class="serveComponent_arrowRight"></svg-icon></div>
                    </div>
                </div>
            </div>
            <!-- 剩余信息 -->
            <div class="RemainInfo" v-if="!isOutsideProvince">
                <div class="ReportInfo">
                    <h2 class="InfoTitle">基本信息</h2>
                    <div class="InfoLine">
                        <div class="InfoName"><span>手机号码</span></div>
                        <div class="InfoText"><input type="tel" maxlength="11" v-model="form.AAE005" placeholder="请输入"></div>
                    </div>
                </div>
            </div>
            <div class="RemainInfo" v-if="isOutsideProvince">
                <div class="ReportInfo">
                    <h2 class="InfoTitle">基本信息</h2>
                    <div class="InfoLine">
                        <div class="InfoName"><span>手机号码</span></div>
                        <div class="InfoText"><input type="tel" maxlength="11" v-model="form.AAC067" placeholder="请输入"></div>
                    </div>
                    <div class="InfoLine">
                        <div class="InfoName"><span>户籍地址</span></div>
                        <div class="InfoText"><input @click="openAllPicker('AAC010_1')" placeholder="请选择户籍地址" v-model="form.AAC010_1" readonly><svg-icon icon-class="serveComponent_arrowRight"></svg-icon></div>
                    </div>
                    <div class="InfoLine">
                        <div class="InfoName"><span></span></div>
                        <div class="InfoText"><input placeholder="请输入详细地址" v-model="form.AAC010_2"></div>
                    </div>
                    <div class="InfoLine">
                        <div class="InfoName"><span>户籍类型</span></div>
                        <div class="InfoText"><input @click="openAAC009Picker()" placeholder="请选择户籍类型" v-model="form.AAC009VALUE" readonly><svg-icon icon-class="serveComponent_arrowRight"></svg-icon></div>
                    </div>
                    <div class="InfoLine">
                        <div class="InfoName"><span>联系地址</span></div>
                        <div class="InfoText"><input @click="openAllPicker('AAE006L_1')" placeholder="请选择省/市/区" v-model="form.AAE006L_1" readonly><svg-icon icon-class="serveComponent_arrowRight"></svg-icon></div>
                    </div>
                    <div class="InfoLine">
                        <div class="InfoName"><span></span></div>
                        <div class="InfoText"><input placeholder="请输入详细地址" v-model="form.AAE006L_2"></div>
                    </div>
                    <div class="InfoLine">
                        <div class="InfoName"><span>邮政编码</span></div>
                        <div class="InfoText"><input placeholder="请输入" maxlength="6" v-model="form.AAE007"></div>
                    </div>
                </div>
                <div class="ReportInfo">
                    <h2 class="InfoTitle">转出地社保经办机构信息</h2>
                    <div class="InfoLine">
                        <div class="InfoName"><span>机构名称</span></div>
                        <div class="InfoText"><input @click="openOutCityPicker" placeholder="请选择行政区划" v-model="form.AAA027VALUE" readonly><svg-icon icon-class="serveComponent_arrowRight"></svg-icon></div>
                    </div>
                    <div class="InfoLine">
                        <div class="InfoName"><span></span></div>
                        <div class="InfoText"><input placeholder="请输入机构名称" v-model="form.AKC328"></div>
                    </div>
                    <div class="InfoLine">
                        <div class="InfoName"><span>联系人</span></div>
                        <div class="InfoText"><input placeholder="请输入联系人" v-model="form.AAE004"></div>
                    </div>
                    <div class="InfoLine">
                        <div class="InfoName"><span>联系电话</span></div>
                        <div class="InfoText"><input placeholder="请输入联系电话" v-model="form.AAE005"></div>
                    </div>
                    <div class="InfoLine">
                        <div class="InfoName"><span>联系地址</span></div>
                        <div class="InfoText"><input @click="openAllPicker('AAE006_1')" placeholder="请选择省/市/区" v-model="form.AAE006_1" readonly><svg-icon icon-class="serveComponent_arrowRight"></svg-icon></div>
                    </div>
                    <div class="InfoLine">
                        <div class="InfoName"><span></span></div>
                        <div class="InfoText"><input placeholder="请输入详细地址" v-model="form.AAE006_2"></div>
                    </div>
                    <div class="InfoLine">
                        <div class="InfoName"><span>邮政编码</span></div>
                        <div class="InfoText"><input placeholder="请输入邮政编码" maxlength="6" v-model="form.AKC330"></div>
                    </div>
                </div>
                <div class="ReportInfo">
                    <h2 class="InfoTitle">参保信息</h2>
                    <div class="InfoLine">
                        <div class="InfoName"><span>开始时间</span></div>
                        <div class="InfoText"><input @click="openDatePicker('AAE030')" placeholder="请选择开始时间" v-model="form.AAE030" readonly><svg-icon icon-class="serveComponent_arrowRight"></svg-icon></div>
                    </div>
                    <div class="InfoLine">
                        <div class="InfoName"><span>结束时间</span></div>
                        <div class="InfoText"><input @click="openDatePicker('AAE031')" placeholder="请选择结束时间" v-model="form.AAE031" readonly><svg-icon icon-class="serveComponent_arrowRight"></svg-icon></div>
                    </div>
                    <div class="InfoLine">
                        <div class="InfoName"><span>医保类型</span></div>
                        <div class="InfoText"><input @click="openACC002Picker" placeholder="请选择医保类型" v-model="form.ACC002VALUE" readonly><svg-icon icon-class="serveComponent_arrowRight"></svg-icon></div>
                    </div>
                    <div class="InfoLine">
                        <div class="InfoName"><span>累计缴费月份</span></div>
                        <div class="InfoText"><input type="number" placeholder="请输入累计缴费月份" v-model="form.BAB459"></div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 按钮 -->
        <Footer :canSubmit='canSubmit' @submit="submit()"></Footer>
    </div>
</template>

<script>
export default {
    data(){
        return{
            showAll: false,
            userInfo: {},
            isOutsideProvince: false, //转出地是否为省外
            cityFlag: '', //存储当先填写的是哪个地址
            dateFlag: '', //存储选择的是哪个日期
            dateVal: new Date(), //默认时间
            form:{
                AAS027: '', //转出地省、市、区
                AAA027: '',
                AAQ027: '',
                AAA027VALUE: '',
                AAS301: '', //转入地省、市、区
                AAB301: '', 
                AAQ301: '',
                AAB301VALUE: '',
                AAE005: '', //手机号码
                AAC010_1: '', //户籍地址
                AAC010_2: '',
                AAC009: '', //户籍类型
                AAC009VALUE: '',
                AAE006L_1: '', //基本信息联系地址
                AAE006L_2: '',
                AAE007: '', //邮政编码
                AKC328: '', //转出地社保机构名称
                AAE004: '', //转出地社保机构联系人
                AAC067: '', //当为接续时申请人的手机号码
                AAE006_1: '', //转出地社保机构地址
                AAE006_2: '',
                AKC330: '', //转出地社保机构邮编
                AAE030: '', //参保开始时间
                AAE031: '', //参保结束时间
                ACC002: '', //基本医疗保险类型
                ACC002VALUE: '',
                BAB459: '', //累计缴费月数
            },
            AAC009List:[
                {name:'城镇（非农业户口）', value: '1'},
                {name:'农村（农业户口）', value: '2'},
                {name:'其他', value: '3'}
            ], //户籍类型
            ACC002List:[
                {name:'职工医保', value: '1'},
                {name:'居民医保', value: '2'},
                {name:'其他', value: '5'}
            ],
            canSubmit: false,
        }
    },
    created(){
        this.epFn.setTitle('转移接续')
    },
    watch: {
        // 监听转出地
        'form.AAA027'(val){
            if(val == ''){
                return;
            }
            if(this.form.AAB301VALUE != ''){
                if(this.form.AAS027 != '330000'){
                    if(this.form.AAB301 == '339900'){
                        this.isOutsideProvince = true;
                    }else{
                        this.$toast('当前只支持省本级医保关系省外转入');
                        this.isOutsideProvince = false;
                        this.clearIncity();
                    }
                }else{
                    this.isOutsideProvince = false;
                }
            }
        },
        // 监听转入地
        'form.AAB301'(val){
            if(val == ''){
                return;
            }
            // 如果不是浙江省则提示错误,清空数据
            if(this.form.AAS301 != '330000'){
                this.$toast('如需办理省内转往省外的业务，请前往【医保证明】打印个人参保证明');
                this.clearIncity();
            }else{
                // 提示先选择转出地
                if(this.form.AAA027VALUE == ''){
                    this.$toast('请先选择转出地');
                    this.clearIncity();
                    return;
                }
                // 省内转省内
                if(this.form.AAS027 == '330000'){
                    this.isOutsideProvince = false;
                }else{
                    // 省外转省内
                    if(this.form.AAB301 == '339900'){
                        this.isOutsideProvince = true;
                    }else{
                        this.$toast('当前只支持省本级医保关系省外转入');
                        this.isOutsideProvince = false;
                        this.clearIncity();
                    }
                }
            }
        },
        // 监听是否能提交
        form:{
            handler: function(val){
                // 如果不是省外转省内
                if(!this.isOutsideProvince){
                    if(val.AAA027VALUE != '' && val.AAB301VALUE != '' && val.AAE005 != ''){
                        this.canSubmit = true;
                    }else{
                        this.canSubmit = false;
                    }
                }else{
                    // 如果是省外转省内
                    if(val.AAC010_1 != '' && val.AAC010_2 != '' && val.AAC009 != '' &&
                    val.AAE006L_1 != '' && val.AAE006L_2 != '' && val.AAE007 != '' &&
                    val.ACK328 != '' && val.AAE004 != '' && val.AAE005 != '' &&
                    val.AAE006_1 != '' && val.AAE006_2 != '' && val.AKC330 != '' &&
                    val.AAE030 != '' && val.AAE031 != '' && val.ACC002 != '' &&
                    val.BAB459 != ''){
                        this.canSubmit = true;
                    }else{
                        this.canSubmit = false;
                    }
                }
            },
            deep: true
        },
    },
    methods:{
        // 搜索
        search(val) {
            let submitForm = {AAE135: val}
            // 请求参数封装
            const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,"1013");
            this.$axios.post(this.epFn.ApiUrl() + '/h5/jy1013/info', params).then((resData) => {
                if ( resData.enCode == 1000 ) {
                    // 检测搜索的人是不是该公司员工
                    if(sessionStorage.getItem('LOGINNAME') != resData.LS_DS[0].AAB001){
                        this.$toast('该人员不是本单位职工，请重新输入身份证查询');
                        return;
                    }
                    // 存储申请人基本信息
                    this.userInfo = resData.LS_DS[0];
                    this.getMailInfo(val);
                    // 判断是否显示剩余信息
                    this.showAll = true;
                }else if (resData.enCode == 1001 ) {
                    this.showAllInfo = false;
                //   失败  1001
                    this.$toast('请输入有效的身份证号');
                    return;
                }else{
                    this.$message('业务出错');
                    return;
                }
            });
        },
        // 清空转入地
        clearIncity(){
            this.form.AAB301VALUE = '';
            this.form.AAS301 = '';
            this.form.AAB301 = '';
            this.form.AAQ301 = '';
        },
        // 选择转出地
        openOutCityPicker(){
            this.$refs.outCityPicker.open();
        },
        chooseOutCity(val){
            this.form.AAA027VALUE= val.name;
            this.form.AAS027=val.code[0]
            this.form.AAA027=val.code[1]
            this.form.AAQ027=val.code[2]
            console.log(val.code);
        },
        // 选择转入地
        openInCityPicker(){
            this.$refs.inCityPicker.open();
        },
        chooseInCity(val){
            this.form.AAB301VALUE= val.name;
            this.form.AAS301=val.code[0]
            this.form.AAB301=val.code[1]
            this.form.AAQ301=val.code[2]
            console.log(val.code);
        },
        // 选择城市
        openAllPicker(flag){
            this.cityFlag = flag;
            this.$refs.allCityPicker.open();
        },
        chooseAllCity(val){
            this.form[this.cityFlag] = val.name;
        },
        // 选择户籍类型
        openAAC009Picker(){
            this.$refs.AAC009Picker.open();
        },
        chooseAAC009(val){
            this.form.AAC009VALUE = val.name;
            this.form.AAC009 = val.value;
        },
        // 选择时间
        openDatePicker(flag){
            this.dateFlag = flag;
            this.$refs.datePicker.open();
        },
        chooseDate(val){
            this.form[this.dateFlag] = this.util.formatDate(val,'yyyy-MM-dd');;
        },
        // 选择医疗保险类型
        openACC002Picker(){
            this.$refs.ACC002Picker.open();
        },
        chooseACC002(val){
            this.form.ACC002VALUE = val.name;
            this.form.ACC002 = val.value;
        },
        // 提交
        submit(){
            if(!this.canSubmit){
                return;
            }
            let params = this.formatSubmitData();
            console.log('请求数据',params);
            // 如果是省外转省内
            if(this.isOutsideProvince){
                // 省内转省内
                this.$axios.post(this.epFn.ApiUrl() + '/h5/jy9105/distanceHospital', params).then((resData) => {
                    console.log('返回成功信息9105',resData)
                    //   成功   1000
                    if ( resData.enCode == 1000 ) {
                        sessionStorage.setItem('BKZ019',resData.BKZ019);
                        this.$router.push("/legalTransferDetail");
                    }else if (resData.enCode == 1001 ) {
                    //   失败  1001
                        this.$toast(resData.msg);
                        return;
                    }else{
                        this.$toast('业务出错');
                        return;
                    }
                })
            }else{
                // 省内转省内
                this.$axios.post(this.epFn.ApiUrl() + '/h5/jy1017/info', params).then((resData) => {
                    console.log('返回成功信息1017',resData)
                    //   成功   1000
                    if ( resData.enCode == 1000 ) {
                        sessionStorage.setItem('BKZ019',resData.BKZ019);
                        this.$router.push("/transferDetail");
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
        // 封装请求
        formatSubmitData(){
            let submitForm = {};
            let params;
            if(this.isOutsideProvince){
                let legalPerson = JSON.parse(sessionStorage.getItem('LegalPerson'));
                submitForm = {
                    AAC002: this.userInfo.AAC002, //被操作人身份证
                    AAC003: this.userInfo.AAC003, //被操作人姓名
                    AAE011: legalPerson.attnName, //经办人姓名
                    AAE135: legalPerson.attnIDNo, //经办人身份证
                    AAC067: this.form.AAC067, //手机号码
                    AAC010: this.form.AAC010_1 + this.form.AAC010_2, //户籍地址
                    AAC009: this.form.AAC009, //户籍类型
                    AAE006L: this.form.AAE006L_1 + this.form.AAE006L_2, //联系地址
                    AAE007: this.form.AAE007, //邮政编码。
                    BCC002: "1", // 现参加的基本医疗保险类型 默认选1
                    AAS027: this.form.AAS027, //转出地省
                    AAB027: this.form.AAA027, //转出地市
                    AAC027: this.form.AAQ027 == '' ? this.form.AAA027 : this.form.AAQ027, //转出地区
                    AKC328: this.form.AKC328, //转出地社保机构名称
                    AAE006: this.form.AAE006_1 + this.form.AAE006_2, //转出地社保机构地址
                    AKC330: this.form.AKC330, //转出地社保机构邮编
                    AAE005: this.form.AAE005, //转出地社保机构电话
                    AAE004: this.form.AAE004, //转出地社保机构联系人
                    ACC002: this.form.ACC002, //基本医疗保险类型
                    AAE030: this.form.AAE030, //参保开始时间
                    AAE031: this.form.AAE031, //参保结束时间
                    BAB459: this.form.BAB459, //累计缴费月数
                    userId: legalPerson.userId,
                    BKE520: '1', //申请渠道
                }
                params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,"9105");
            }else{
                let legalPerson = JSON.parse(sessionStorage.getItem('LegalPerson'));
                submitForm = {
                    AAA027: this.form.AAA027, //转出地市级编码
                    AAQ027: this.form.AAQ027, //转出地区/县级编码
                    AAS027: this.form.AAS027, //转出地区/省级编码
                    AAS301: this.form.AAS301, //转入地省级编码
                    AAB301: this.form.AAB301, //转入地市级编码
                    AAQ301: this.form.AAQ301, //转入地区/县级编码
                    AAE011: legalPerson.attnName, //经办人姓名
                    AAE135: legalPerson.attnIDNo, //经办人身份证
                    AAC003: this.userInfo.AAC003, //被操作人姓名
                    AAC002: this.userInfo.AAC002, //被操作人身份证
                    AAE005: this.form.AAE005, //联系电话
                    userId: legalPerson.userId,
                    BKZ019: '', //经办编号
                    BKE420: '1', //申请渠道
                }
                params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,"1017");
            }
            return params;
        },
       // 获取邮寄信息
        getMailInfo(idNo){
            let submitForm = {}
            // 加入电子社保卡号
            submitForm.AAE135 = idNo;
            const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,'2002');
            this.$axios.post(this.epFn.ApiUrl() + '/h5/jy2002/getRecord', params).then((resData) => {
                console.log('2002',resData);
                //   成功   1000
                if ( resData.enCode == 1000 ) {
                    this.form.AAE005 = resData.AAE005; //手机号码
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
    }
}
</script>

<style lang="less" scoped>
.legalTransfer{
    .Content{
        height: 100%;
        margin-bottom: 1.4rem;
        .ReportInfo{
            width: 100%;
            padding: .33rem .2rem 0;
            background: white;
            .InfoTitle{
                font-size: .32rem;
                text-align: left;
                color: #000000;
                letter-spacing: 0;
            }
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
                        background:  #FFF;
                    }
                }
                &:last-child{
                    border-bottom: none;
                }
            }
        }
        .RemainInfo{
            .ReportInfo{
                margin-top: .15rem;
            }
        }
    }
}
</style>