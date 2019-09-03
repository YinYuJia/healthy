<template>
    <div class="unemployed">
        <!-- 类型选择器 -->
        <SelectList :list="optionList" ref="select" @choose="chooseType"></SelectList>
        <!-- 时间选择器 -->
        <mt-datetime-picker type="date" ref="timePicker" v-model="dateVal" @confirm="chooseTime"></mt-datetime-picker>
        <!-- 检验是否绑定 -->
        <BindingAgency></BindingAgency>
        <!-- 搜索框 -->
        <SearchInfo @search="search"></SearchInfo>
        <!-- 用户信息 -->
        <UserInfoPad :userInfo="userInfo"></UserInfoPad>
        <!-- 申报信息 -->
        <div class="reportInfo">
            <div class="InfoLine">
                <div class="InfoName"><span>生育人员姓名：</span></div>
                <div class="InfoText"><input placeholder="请输入"/></div>
            </div>
            <div class="InfoLine">
                <div class="InfoName"><span>生育人员社会保障号：</span></div>
                <div class="InfoText"><input placeholder="请输入"/></div>
            </div>
            <div class="InfoLine">
                <div class="InfoName"><span>计划生育类型：</span></div>
                <div class="InfoText">
                    <input placeholder="请选择" v-model="AMC029VALUE" @click="openChooseType" readonly/>
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
        <invoiceInfo></invoiceInfo>
        <!-- 发票提交方式 -->
        <mailInfo></mailInfo>
    </div>
</template>

<script>
import invoiceInfo from './section/invoiceInfo'
import mailInfo from './section/mailInfo'
export default {
    components: {
        'invoiceInfo': invoiceInfo,
        'mailInfo': mailInfo
    },
    data() {
        return {
            form: {
                BMC021: '', //配偶姓名
                BMC202: '', //配偶身份证号码
                AMC029: '', //计划生育类别
                BMC131: '', //计划生育日期
            },
            AMC029VALUE: '', //计划生育类型值
            dateVal: new Date(), //初始化时间
            userInfo: {},
            optionList:[
                {name:'平产、顺产', value: '01'},
                {name:'助娩产', value: '02'},
                {name:'剖宫产', value: '03'},
                {name:'三个月以下流产', value: '04'},
                {name:'三个月以上四个月以下流产', value: '05'},
                {name:'满四个月流产', value: '06'},
                {name:'放置宫内节育器', value: '11'},
                {name:'取出宫内节育器', value: '12'},
                {name:'人工流产', value: '13'},
                {name:'中期终止妊娠', value: '14'},
                {name:'单纯输卵管结扎', value: '15'},
                {name:'产后输卵管结扎', value: '16'},
                {name:'人工流产同时放置宫内节育器', value: '17'},
                {name:'中期终止妊娠同时放置宫内节育器', value: '18'},
                {name:'人工流产同时输卵管结扎', value: '19'},
                {name:'中期终止妊娠同时输卵管结扎', value: '20'},
                {name:'人工流产同时取出宫内节育器', value: '21'},
                {name:'中期终止妊娠同时取出宫内节育器', value: '22'}
            ]
        };
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
                    // 存储申请人基本信息
                    this.userInfo = resData.LS_DS[0];
                    // 根据性别判断生育类型
                    // if(this.userInfo.AAC004 == '1'){
                    //     this.gender = 'man';
                    // }else {
                    //     this.gender = 'woman';
                    // }
                    // 判断是否显示剩余信息
                    // this.showAllInfo = true;
                }else if (resData.enCode == 1001 ) {
                    this.showAllInfo = false;
                //   失败  1001
                    this.$toast(resData.msg);
                    return;
                }else{
                    this.$message('业务出错');
                    return;
                }
            });
        },
        // 选择生育类型
        openChooseType() {
            this.$refs.select.open();
        },
        chooseType(val) {
            this.AMC029VALUE = val.name;
            this.form.AMC029 = val.value;
        },
        // 选择生育时间
        openChooseTime() {
            this.$refs.timePicker.open();
        },
        chooseTime(val) {
            let date = this.util.formatDate(val,'yyyy-MM-dd');
            this.form.BMC131 = date;
        }
    }
}
</script>

<style lang="less" scoped>
.unemployed{
    width: 100%;
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
                flex-shrink: 0;
                input {
                    width: 100%;
                    font-size: .26rem;
                    color: #666;
                    letter-spacing: 0;
                    text-align: right;
                    border: none;
                    &::placeholder{
                        color: #999;
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