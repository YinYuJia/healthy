<template>
    <div class="SurgicalApproval">
        <!-- 选择器 -->
        <SelectList :list="slots" ref="select" @choose="chooseType"></SelectList>
        <!-- 标题 -->
        <Title :title="'计划外生育'" :backRouter="'/'"></Title>
        <mt-datetime-picker
            type="date"
            ref="startPicker"
            :endDate="endDate"
            v-model="dateVal"
            @confirm="handleStartConfirm">
        </mt-datetime-picker>
        <div class="Content">
            <div class="SearchContent">
                <div class="SearchBox">
                    <svg-icon icon-class="serveComponent_search"/>
                    <input class="InputContent" v-model="AAE135" :placeholder="'请输入身份证号'">
                    <svg-icon v-if="AAE135" class="deleteIcon" @click="deleteSearch()" icon-class="serveComponent_delete"></svg-icon>
                <div class="SearchBtn" @click="search">搜索</div>
            </div>
            </div>
            <div class="userBaseInfo" v-if="showAll">
                <UserInfoPad :userInfo="userInfo"></UserInfoPad>
            </div>
            <div class="ReportInfo" v-if="showAll">
                 <div class="InfoLine">
                    <div class="InfoName"><span>计划生育类型</span></div>
                    <div class="InfoText">
                        <input class="InputContent" v-model="form.AMC029VALUE" @click="openChooseType" :placeholder="'请选择'" readonly>
                        <svg-icon icon-class="serveComponent_arrowRight"></svg-icon>
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>计划生育日期</span></div>
                    <div class="InfoText">
                         <input @click="openEndPicker" type="text" v-model="form.BMC131" placeholder="请选择" readonly><svg-icon icon-class="serveComponent_arrowRight"></svg-icon>
                    </div>
                </div>
            </div>
        </div>
        <!-- 发票信息 -->
        <invoiceInfo v-if="type == '02'" @saveInfo="saveInfo"></invoiceInfo>
        <!-- 发票提交方式 -->
        <mailInfo v-if="type == '02'" :type="form.BKE200" @mailType="mailType"></mailInfo>
    
        <!-- 按钮 -->
        <div class="SubmitBtn" :class="{'active': canSubmit == true}" @click="add()" v-if="showAll">补充材料</div>
         <!-- 判断是否绑定经办组建-->
        <BindingAgency></BindingAgency>
        <!-- 办事指南 -->
        <GuideIcon AGA002="330600142002"></GuideIcon>
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
            dispatch: 0,
            photoIdList: [],
            invoiceList: [],
            canSubmit: false,
            userInfo: {},
            showAll: false,
            AAE135: '',
            form: {
                AMC029: '',
                BMC131: '',
                BKE200: '',
                AMC029VALUE: '',
            },
            showCityPicker: false,
            slots: [],
            name: '',
            value: '',
            endDate: new Date(),
            dateVal: new Date(),
            type: '',
            isDestroy: true,
            list1:[{
                value: '13',
                name: '人工流产'
            },{
                value: '14',
                name: '中期终止妊娠'
            },{
                value: '17',
                name: '人工流产同时放置宫内节育器'
            },{
                value: '18',
                name: '中期终止妊娠同时放置宫内节育器'
            },{
                value: '19',
                name: '人工流产同时结扎输卵管'
            },{
                value: '20',
                name: '中期终止妊娠同时结扎输卵管'
            },{
                value: '21',
                name: '人工流产同时取出宫内节育器'
            },{
                value: '22',
                name: '中期终止妊娠同时取出宫内节育器'
            }],
            list2: [{
                value: '04',
                name: '三个月以下流产'
            },{
                value: '05',
                name: '三个月以上四个月以下流产'
            },{
                value: '06',
                name: '满四个月流产'
            }],
            list3:[{
                value: '11',
                name: '放置宫内节育器'
            },{
                value: '12',
                name: '取出宫内节育器'
            },{
                value: '15',
                name: '单纯输卵管结扎'
            },{
                value: '16',
                name: '产后结扎输卵管'
            }],
            list4:[{
                value: '23',
                name: '输精管结扎'
            }]
        }
    },
    created(){
        this.epFn.setTitle('流产报销');
        if(this.$route.query.dispatch) {
            this.dispatch = 1
        } else {
            this.dispatch = 0
        }
        console.log("dispatch:", this.dispatch);
        console.log(sessionStorage.getItem('SET_SURGICAL_MESSAGE'))
        if(this.dispatch == 1 || sessionStorage.getItem('SET_SURGICAL_MESSAGE') != null) {
            console.log("backtype------------:", this.type)
            this.showAll = true;
            this.type = '02';
            this.userInfo = JSON.parse(sessionStorage.getItem('SET_SURGICAL_MESSAGE')).userInfo;
            this.form = JSON.parse(sessionStorage.getItem('SET_SURGICAL_MESSAGE')).form;
            this.invoiceList = JSON.parse(sessionStorage.getItem('SET_SURGICAL_INVOICELIST'));
            this.type = JSON.parse(sessionStorage.getItem('SET_SURGICAL_MESSAGE')).type;
            if(this.userInfo.AAC004 == '1'){
                            this.slots = this.list4
                            console.log("b", this.slots)
                        } else if (this.userInfo.AAC004 == '2') {
                            this.slots = this.slots.concat(this.list1, this.list2,this.list3)
                            console.log("b", this.slots)
                        }
            console.log("invoice:", this.invoiceList)
        }
    },
    watch: {
        form:{
            handler:function(val){
                if(val.AMC029!="" && val.BMC131!=""){
                    if(this.type == '02') {
                        if(val.BKE200 != '') {
                            this.canSubmit = true;
                        } else {
                            this.canSubmit = false
                        }
                    } else {
                        this.canSubmit = true
                    }
                } else {
                    this.canSubmit = false
                }
                let obj = {
                    userInfo: this.userInfo,
                    form: val,
                    type: this.type
                }
                sessionStorage.setItem("SET_SURGICAL_MESSAGE", JSON.stringify(obj))
                console.log("form---:", this.form)
                console.log("message:", obj)            
            },
            deep: true
        }
    },
    methods: {
        // 触发保存基本信息
        saveInfo() {
            this.isDestroy = false;
        },
        // 选择发票提交方式
        mailType(val) {
            this.form.BKE200 = val;
            console.log("BKE200", this.form.BKE200)
        },
         handleStartConfirm(val){
            let date1 = this.util.formatDate(val,'yyyy-MM-dd');
            console.log("data",date1)
            this.form.BMC131 = date1;
            this.$refs.startPicker.close();
        },
        //选择日期
        openEndPicker(){
            this.$refs.startPicker.open();
        },
        deleteSearch(){
            this.AAE135 = '';
        },
        // 选择类型
        openChooseType() {
            this.$refs.select.open();
        },
        chooseType(val){
            this.type = ''
            this.form.AMC029VALUE = val.name;
            this.form.AMC029 = val.value;
            if(val.value =='04' || val.value =='05' || val.value == '06') {
                this.type = '01';
            } else if (val.value=='13' || val.value =='14' || val.value == '17' || val.value == '18' || val.value == '19' || val.value == '20' || val.value == '21' || val.value == '22') {
                this.type = '02'             
            } else if(val.value=='11' || val.value =='12' || val.value == '15' || val.value == '16' || val.value == '23') {
                this.type = '03'
            }
             console.log("this.type:", this.type)
        },
        //搜索
        search(){
            this.form.AMC029VALUE = '';
            this.form.AMC029 = '';
            this.form.BMC131 = '';
            this.slots = []
            this.type = ''
            this.showAll=false;
            sessionStorage.removeItem('SET_SURGICAL_INVOICELIST')
            sessionStorage.removeItem('SET_SURGICAL_MESSAGE')
            console.log('通过身份证号请求数据')
            if(!this.util.idCard(this.AAE135)){
                this.$toast('请填写正确的身份证号');
                return false;
            }else{
                // 封装数据
                let params = this.formatSubmitData();
                // 开始请求
                console.log('parmas------',params)
                this.$axios.post(this.epFn.ApiUrl()+ '/h5/jy9109/getRecord', params).then((resData) => {
                    console.log('返回成功信息',resData)
                    //   成功   1000
                    if ( resData.enCode == 1000 ) {
                        let user = sessionStorage.getItem("LOGINNAME");//法人的单位编码
                      console.log("user",user);
                      console.log("res",resData.LS_DS[0].AAB001)
                      if(user==resData.LS_DS[0].AAB001){//和7610里获取的单位编码进行比对，如果不匹配那么就提示这个人不是这个单位的
                        this.userInfo = resData.LS_DS[0]
                        sessionStorage.setItem('payLimitAAE135',this.AAE135);
                        console.log("a-", this.userInfo.AAC002);
                        if(resData.LS_DS[0].AAC004 == '1'){
                            this.slots = this.list4
                            this.form.AMC029VALUE = '输精管结扎';
                            this.form.AMC029 = '23';
                            this.type = '03'
                            console.log("b", this.slots)
                        } else if (resData.LS_DS[0].AAC004 == '2') {
                            this.slots = this.slots.concat(this.list1, this.list2,this.list3)
                            console.log("b", this.slots)
                        }
                        this.showAll=true;
                        }else {
                        this.AAE135 = ''
                        this.$toast('该人员不是本单位的职员，请重新查询')
                        return false
                      }
                    }else if (resData.enCode == 1001 ) {
                    //   失败  1001
                        this.$toast('请输入有效的身份证号');
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
            submitForm.BKE520 = "1";
            submitForm.AAC002 = this.AAE135;
            const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,"9109");
            return params;
        },
        add() {
            this.invoiceList = JSON.parse(sessionStorage.getItem('SET_SURGICAL_INVOICELIST'))
            console.log("list------:", this.invoiceList)
            if(this.type == '02') {
                if(this.form.AMC029 == '' || this.form.BMC131 == '' || this.form.BKE200 == '' || this.invoiceList.length == 0) {
                    this.$toast('请补全信息！');
                } else {
                    this.invoiceList.forEach( e => {
                        this.photoIdList.push(e.photoId)
                    })
                    let params = {
                        type: this.type,
                        AMC029: this.form.AMC029,
                        AAC002: this.userInfo.AAC002,
                        BKE200: this.form.BKE200,
                        photoIdList: this.photoIdList.join(),
                        BMC131: Number(this.util.DateToNumber(this.form.BMC131))
                    }
                    console.log("params", params)
                    this.isDestroy = false;
                     this.$router.push({path: '/legalSurgicalDetail', query: {params: params}})
                }
            } else {
                if (this.form.AMC029 == '' || this.form.BMC131 == '') {
                    this.$toast('请补全信息！');
                } else {

                    let params = {
                        type: this.type,
                        AMC029: this.form.AMC029,
                        AAC002: this.userInfo.AAC002,
                        BMC131: Number(this.util.DateToNumber(this.form.BMC131))
                    }
                    console.log("params", params)
                    this.isDestroy = false;
                    this.$router.push({path: '/legalSurgicalDetail', query: {params: params}});
                }
            }
        },
        // 清空数据
        clearVuex() {
            sessionStorage.removeItem('SET_SURGICAL_INVOICELIST');
            sessionStorage.removeItem('SET_SURGICAL_MESSAGE');
            this.form = {
                AMC029: '',
                BMC131: '',
                BKE200: '',
                AMC029VALUE: '',
            },
            this.userInfo = {};
            this.showAll = false;
        },
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
.SurgicalApproval {
    .Content {
        height: 100%;
        .SearchContent {
                height: .9rem;
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
            .userBaseInfo {
                margin-top: .2rem;
            }
            .ReportInfo {
            height: 100%;
            width: 7.5rem;
            padding: 0 .3rem;
            background: white;
            .InfoLine {
                height: 1rem;
                position: relative;
                font-family: PingFangSC-Regular;
                font-size: .3rem;
                display: flex;
                justify-content: space-between;
                border-bottom: .01rem solid #D5D5D5;
                .InfoName {
                    opacity: 0.85;
                    line-height: 1rem;
                    span {
                        height: .6rem;
                        line-height: .6rem;
                        color: #000000;
                        letter-spacing: 0;
                    }
                }
                .InfoText {
                    opacity: 0.85;
                    line-height: 1rem;
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
    .SubmitBtn {
        position: fixed;
        bottom: .3rem;
        height: 1.05rem;
        margin-left: .3rem;
        margin-right: .3rem;
        width: 90%;
        border-radius: .05rem;
        line-height: 1.05rem;
        font-family: PingFangSC-Regular;
        font-size: .36rem;
        letter-spacing: 0;
        text-align: center;
        background: #F2F2F2;
        color: #B4B4B4;
    }
    .active{
        background: #1492FF;
        color: #FFFFFF;
    }
}
</style>

<style>
    .SurgicalApproval .el-date-editor.el-input,
    .el-date-editor.el-input__inner {
        width: 160px;
    }
    .SurgicalApproval .el-input__prefix,
    .el-input__suffix {
        display: none;
    }
    .SurgicalApproval .el-input__inner {
        border: none;
        text-align: right;
        padding-right: 0;
        padding-left: 0;
    }
</style>
