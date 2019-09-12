<template>
    <div class="unemployed">
        <!-- 分类选择器 -->
        <SelectList :list="sortList" ref="selectSort" @choose="chooseSort"></SelectList>
        <!-- 类型选择器 -->
        <SelectList :list="typeList" ref="selectType" @choose="chooseType"></SelectList>
        <!-- 时间选择器 -->
        <mt-datetime-picker type="date" ref="timePicker" :endDate="endDate" v-model="dateVal" @confirm="chooseTime"></mt-datetime-picker>
        <!-- 检验是否绑定 -->
        <BindingAgency></BindingAgency>
        <!-- 搜索框 -->
        <SearchInfo @search="search"></SearchInfo>
        <!-- 显示剩下的信息 -->
        <div class="Content" v-show="showAll">
            <!-- 用户信息 -->
            <UserInfoPad :userInfo="userInfo"></UserInfoPad>
            <!-- 申报信息 -->
            <div class="reportInfo">
                <div class="InfoLine">
                    <div class="InfoName"><span>生育人员姓名：</span></div>
                    <div class="InfoText"><input v-model="form.BMC021" placeholder="请输入"/></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>生育人员社会保障号：</span></div>
                    <div class="InfoText"><input v-model="form.BMC202" placeholder="请输入"/></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>计划生育分类：</span></div>
                    <div class="InfoText">
                        <input placeholder="请选择" v-if="gender=='man'" v-model="form.AMC099VALUE" @click="openChooseSort" readonly/>
                        <input v-if="gender=='woman'" v-model="form.AMC099VALUE" readonly/>
                        <svg-icon icon-class="serveComponent_arrowRight"></svg-icon>
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>计划生育类型：</span></div>
                    <div class="InfoText">
                        <input placeholder="请选择" v-if="gender=='man'" v-model="form.AMC029VALUE" @click="openChooseType" :disabled="chooseTypeDisabled" readonly/>
                        <input v-if="gender=='woman'" v-model="form.AMC029VALUE" readonly/>
                        <svg-icon icon-class="serveComponent_arrowRight"></svg-icon>
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>计划生育日期：</span></div>
                    <div class="InfoText">
                        <input placeholder="请选择" v-model="form.BMC131" @click="openChooseTime" readonly/>
                        <svg-icon icon-class="serveComponent_arrowRight"></svg-icon>
                    </div>
                </div>
            </div>
            <!-- 发票信息 -->
            <invoiceInfo v-if="showInvoice" @saveInfo="saveInfo" @deleteInvoice="deleteInvoice"></invoiceInfo>
            <!-- 发票提交方式 -->
            <mailInfo v-if="showInvoice" :type="form.BKE200" @mailType="mailType"></mailInfo>
            <!-- 下一步按钮 -->
            <Footer :canSubmit="canSubmit" @submit="submit()" btnText="补充材料"></Footer>
        </div>
        <!-- 办事指南 -->
        <GuideIcon AGA002="330600142003"></GuideIcon>
    </div>
</template>

<script>
import invoiceInfo from './section/invoiceInfo'
import plusInvoice from './section/plusInvoice'
import mailInfo from './section/mailInfo'
export default {
    components: {
        'invoiceInfo': invoiceInfo,
        'plusInvoice': plusInvoice,
        'mailInfo': mailInfo
    },
    data() {
        return {
            form: {
                BMC021: '', //配偶姓名
                BMC202: '', //配偶身份证号码
                AMC099: '', //分类
                AMC099VALUE: '',
                AMC029: '', //计划生育类别
                AMC029VALUE: '',
                BMC131: '', //计划生育日期
                BKE200: '', //发票提交方式
                invoiceList: [], //发票列表
            },
            dateVal: new Date(), //初始化时间
            endDate: new Date(), //最晚可选择到当前日期
            userInfo: {},
            sortList: [
                {name:'生育', value: '1'},
                {name:'计划内流产', value: '2'},
                {name:'计划外流产', value: '3'},
                {name:'节育、复通', value: '4'}
            ],
            typeList:[],
            showInvoice: false, //显示发票信息
            showAll: false, //显示剩下的所有信息
            canSubmit: false, //是否可提交
            isDestroy: true, //是否需要清空VUEX
            gender: '', //申请人性别
        };
    },
    created(){
        this.epFn.setTitle('未就业配偶')
        console.log('人员信息',this.$store.state.SET_UNEMPLOYED_USERINFO);
        console.log('申报信息',this.$store.state.SET_UNEMPLOYED_REPORT);
        console.log('发票信息',this.$store.state.SET_UNEMPLOYED_INVOICE);
        this.userInfo = this.$store.state.SET_UNEMPLOYED_USERINFO;
        this.form = this.$store.state.SET_UNEMPLOYED_REPORT;
        this.form.invoiceList = this.$store.state.SET_UNEMPLOYED_INVOICE;
        if(this.userInfo.AAB001 != undefined && this.userInfo.AAB001 != ''){
            this.showAll = true;
            // 根据性别判断生育类型
            if(this.userInfo.AAC004 == '2'){
                this.gender = 'woman';
            }else {
                this.gender = 'man';
            }
            // 判断是否显示发票
            if(this.form.AMC099 == '1' || this.form.AMC099 == '2'){
                this.showInvoice = false;
            }else{
                this.showInvoice = true;
            }
        }
    },
    computed:{
        chooseTypeDisabled(){
            // 判断类型是否可选
            if(this.form.AMC099 == ''){
                return true;
            }else{
                return false;
            }
        }
    },
    watch:{
        'form.AMC099'(val){
            console.log('生育分类改变',val);
            // 根据分类显示生育类型
            switch(val){
                case '1': this.typeList = [
                    {name:'平产、顺产', value: '01'},
                    {name:'助娩产', value: '02'},
                    {name:'剖宫产', value: '03'}
                ]; break;
                case '2': this.typeList = [
                    {name:'三个月以下流产', value: '04'},
                    {name:'三个月以上四个月以下流产', value: '05'},
                    {name:'满四个月流产', value: '06'},
                ];break;
                case '3': this.typeList = [
                    {name:'人工流产', value: '13'},
                    {name:'中期终止妊娠', value: '14'},
                    {name:'人工流产同时放置宫内节育器', value: '17'},
                    {name:'中期终止妊娠同时放置宫内节育器', value: '18'},
                    {name:'人工流产同时输卵管结扎', value: '19'},
                    {name:'中期终止妊娠同时输卵管结扎', value: '20'},
                    {name:'人工流产同时取出宫内节育器', value: '21'},
                    {name:'中期终止妊娠同时取出宫内节育器', value: '22'}
                ];break;
                case '4': this.typeList = [
                    {name:'放置宫内节育器', value: '11'},
                    {name:'取出宫内节育器', value: '12'},
                    {name:'单纯输卵管结扎', value: '15'},
                    {name:'产后输卵管结扎', value: '16'},
                ];break;
            }
        },
        form: {
            handler(val){
                if(this.showInvoice == true){
                    // 有发票时
                    if(val.BMC021 != '' && val.BMC202 != '' && val.AMC099 != '' && val.AMC029 != '' && val.BMC131 != '' && val.BKE200 != '' && val.invoiceList.length > 0){
                        this.canSubmit = true;
                    }else {
                        this.canSubmit = false;
                    }
                }else {
                    // 没有发票时
                    if(val.BMC021 != '' && val.BMC202 != '' && val.AMC099 != '' && val.AMC029 != '' && val.BMC131 != ''){
                        this.canSubmit = true;
                    }else {
                        this.canSubmit = false;
                    }
                }
            },
            deep: true
        }
    },
    methods: {
        // 搜索
        search(val) {
            let submitForm = {AAC002: val}
            // 请求参数封装
            const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,"9109");
            this.$axios.post(this.epFn.ApiUrl() + '/h5/jy9109/getRecord', params).then((resData) => {
                if ( resData.enCode == 1000 ) {
                    // 检测搜索的人是不是该公司员工
                    if(sessionStorage.getItem('LOGINNAME') != resData.LS_DS[0].AAB001){
                        this.$toast('该人员不是本单位职工，请重新输入身份证查询');
                        return;
                    }
                    // 清空基本信息和发票信息
                    this.clearVuex();
                    // 发票不显示
                    this.showInvoice = false;
                    // 存储申请人基本信息
                    this.userInfo = resData.LS_DS[0];
                    this.$store.dispatch('SET_UNEMPLOYED_USERINFO',this.userInfo);
                    // 根据性别判断生育类型
                    if(this.userInfo.AAC004 == '2'){
                        this.gender = 'woman';
                        this.form.AMC029 = '23';
                        this.form.AMC029VALUE = '输精管结扎';
                        this.form.AMC099 = '4';
                        this.form.AMC099VALUE = '节育、复通';
                        this.showInvoice = true;
                    }else {
                        this.gender = 'man';
                    }
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
        // 选择分类
        openChooseSort() {
            this.$refs.selectSort.open();
        },
        chooseSort(val) {
            this.form.AMC099VALUE = val.name;
            this.form.AMC099 = val.value;
            // 判断是否显示发票
            if(val.value == 1 || val.value == 2){
                this.showInvoice = false;
            }else{
                this.showInvoice = true;
            }
            // 清空生育类型
            this.form.AMC029 = '';
            this.form.AMC029VALUE = '';
        },
        // 选择生育类型
        openChooseType() {
            this.$refs.selectType.open();
        },
        chooseType(val) {
            this.form.AMC029VALUE = val.name;
            this.form.AMC029 = val.value;
        },
        // 选择生育时间
        openChooseTime() {
            this.$refs.timePicker.open();
        },
        chooseTime(val) {
            let date = this.util.formatDate(val,'yyyy-MM-dd');
            this.form.BMC131 = date;
        },
        // 触发保存基本信息
        saveInfo() {
            this.isDestroy = false;
            delete this.form.invoiceList;
            this.$store.dispatch('SET_UNEMPLOYED_REPORT', this.form);
        },
        // 触发删除发票
        deleteInvoice(val){
            this.form.invoiceList = val;
            if(val.length == 0){
                this.canSubmit = false;
            }
        },
        // 选择发票提交方式
        mailType(val) {
            this.form.BKE200 = val;
        },
        // 清空数据
        clearVuex() {
            this.form = {
                BMC021: '', //配偶姓名
                BMC202: '', //配偶身份证号码
                AMC099: '', //分类
                AMC099VALUE: '',
                AMC029: '', //计划生育类别
                AMC029VALUE: '', //计划生育类型值
                BMC131: '', //计划生育日期
                BKE200: '', //发票提交方式
            };
            this.$store.dispatch('SET_UNEMPLOYED_REPORT', {
                BMC021: '', //配偶姓名
                BMC202: '', //配偶身份证号码
                AMC029: '', //计划生育类别
                AMC029VALUE: '', //计划生育类型值
                BMC131: '', //计划生育日期
                BKE200: '', //发票提交方式
            });
            this.$store.dispatch('SET_UNEMPLOYED_USERINFO', {});
            this.$store.dispatch('SET_UNEMPLOYED_INVOICE', []);
            sessionStorage.removeItem('UMEMPLOY_BKZ019');
        },
        // 提交信息
        submit() {
            if(!this.canSubmit){
                return;
            }
            this.saveInfo();
            this.$router.push('/unemployedSubmit');
        }
    },
    beforeDestroy(){
        // 如果不是去发票和下一页就清空VUEX
        if(this.isDestroy){
            this.clearVuex();
        }
    },
}
</script>

<style lang="less" scoped>
.unemployed{
    width: 100%;
    .Content{
        margin-bottom: 2rem;
    }
    .reportInfo{
        width: 100%;
        padding: 0 .2rem;
        background: #FFF;
        .InfoLine{
            display: flex;
            justify-content: space-between;
            font-size: .28rem;
            padding: .35rem 0;
            border-bottom: .01rem solid #DDD;
            .InfoName{
                text-align: left;
                flex-shrink: 0;
                span{
                    line-height: .4rem;
                    color: #000;
                    letter-spacing: 0;
                }
            }
            .InfoText{
                height: auto;
                display: flex;
                align-items: center;
                width: 100%;
                input {
                    width: 100%;
                    font-size: .26rem;
                    color: #000;
                    letter-spacing: 0;
                    text-align: right;
                    border: none;
                    &::placeholder{
                        color: #999;
                    }
                    &:disabled{
                        background:  #FFF;
                    }
                }
            }
            &:last-child{
                border-bottom: none;
            }
        }
    }
}
</style>