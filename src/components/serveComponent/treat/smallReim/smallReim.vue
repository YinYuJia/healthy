<template>
    <div class="smallReim">
        <Title :title="'零星报销'" :backRouter="'/'"></Title>
        <!-- MintUI弹出框区域 -->
        <mt-datetime-picker
            type="date"
            ref="timePicker"
            v-model="dateVal"
            :endDate="endDate"
            @confirm="handleTimeConfirm">
        </mt-datetime-picker>
        <SelectCity
            :type="1"
            ref="typePicker"
            :propArr="typeArr"
            @confirm="handleTypeConfirm"
            >
        </SelectCity>
        <!-- 弹出框区域结束 -->
        <div class="Content">
            <!-- 填写进度 -->
            <WorkProgress :currentStep="1" :progress="progress"></WorkProgress>
            <!-- 基本信息 -->
            <UserBaseInfo style="background:white"></UserBaseInfo>
            <!-- 列表信息 -->
            <div class="ReportInfo">
                <div class="InfoLine">
                    <div class="InfoName"><span>就诊医院：</span></div>
                    <div class="InfoText"><input @click="chooseHospital()" type="text" v-model="form.hospitalName" placeholder="请选择" readonly><svg-icon icon-class="serveComponent_arrowRight"></svg-icon></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>就诊类型：</span></div>
                    <div class="InfoText"><input @click="openTypePicker()" type="text" v-model="form.AKA078VALUE" placeholder="请选择" readonly :disabled="typeDisabled"><svg-icon icon-class="serveComponent_arrowRight"></svg-icon></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>就诊日期：</span></div>
                    <div class="InfoText"><input @click="openTimePicker()" type="text" v-model="form.AAE030" placeholder="请选择" readonly><svg-icon icon-class="serveComponent_arrowRight"></svg-icon></div>
                </div>
            </div>
        </div>
        <!-- 办事指南 -->
        <GuideIcon AGA002="330600007019"></GuideIcon>
        <!-- 按钮 -->
        <Footer :canSubmit="canSubmit" :btnText="'下一步'" @submit="submit()"></Footer>
    <SearchInfoPage ref="hospita" type="AKB020_SP" :jy9015='true' @childrenClick="hospitaClick" title="选择医院"></SearchInfoPage>

    </div>
</template>

<script>

export default {
    data() {
        return {
            // 提交信息
            form: {
                hospitalName: '', //医院名称
                AKB020: '', //医院编码
                AKA078: '', //就诊类型
                AKA078VALUE: '', //就诊类型中文
                AAE030: '', //就诊日期
            },
            dateVal: new Date(), //默认绑定的时间
            endDate: new Date(), //最晚选择时间
            canSubmit: false,
            progress:[
                {step:1,name:'申请报销'},
                {step:2,name:'发票信息'},
                {step:3,name:'信息录入'},
                {step:4,name:'申报完成'}
            ],
            typeArr: [ //就诊类型
                {value: '1',label: '门诊'},
                {value: '3',label: '住院'}
            ],
            ifClear:true,
            typeDisabled: false, //就诊类型默认可选择
        }
    },
    watch:{
        form: {
            handler: function(val) {
                if(val.AKA078VALUE){
                    console.log(val.AKA078VALUE)
                }
                // 判断不为空
                if (val.AKB020 != '' && val.AKA078 != '' && val.AAE030 != '' && val.AKA078VALUE != '') {
                    this.canSubmit = true;
                } else {
                    this.canSubmit = false;
                }
            },

            deep: true
        },
    },
    created() {
        // 设置标题
        this.epFn.setTitle('零星报销')
        //初始化电子发票
        let arr={};
        arr.eleInvoices=[];//电子发票信息
        arr.invoicesImg=[], //附件信息信息  图片id
        this.$store.dispatch('SET_SMALL_REIM_2',arr)
        // console.log("form",JSON.parse(JSON.stringify(this.$store.state.SET_SMALL_REIM_1)))
        // this.form = JSON.parse(JSON.stringify(this.$store.state.SET_SMALL_REIM_1));
        // console.log("1188888",this.form)
        this.isClear=sessionStorage.getItem('isClear')
        console.log('clear',this.isClear)
        if(this.isClear=='true'){
            console.log("form",this.$store.state.SET_SMALL_REIM_1)
            let arr1={};
            arr1.hospitalName='', //就诊医院
            arr1.AKB020='', //医院编码
            arr1.AKA078='', //就诊类型
            arr1.AKA078VALUE='', //就诊类型中文
            arr1.AAE030='' //就诊日期
            this.form ={...this.form,...arr1};
            console.log('初始化了form的数据',this.form)
        }else{
            console.log(111)
            this.form=JSON.parse(JSON.stringify(this.$store.state.SET_SMALL_REIM_1))
        }
        // 根据路由配置项目类型子项选中
        let type = this.$route.params.type
        if(type){
            let label = ''
            let value = ''
            switch(type) {
                case '1': label = '门诊'; value = '1'; break;
                case '2': label = '住院'; value = '3'; break;
                default: label = ''; value = ''; break;
            }
            this.form.AKA078VALUE = label
            this.form.AKA078 = value
            //原因变为不可选择
            this.typeDisabled = true
        }
    },
    methods: {
        // 选择就诊医院
        chooseHospital(){
            this.$refs.hospita.open();
        },
        hospitaClick(code,name){
            this.form.hospitalName = name
            this.form.AKB020 = code
        },
        // 选择就诊类型
        openTypePicker(){
            this.$refs.typePicker.open();
        },
        handleTypeConfirm(val){
            console.log(val)
            this.form.AKA078VALUE = val.label;
            this.form.AKA078 = val.value;
        },
        // 选择就诊日期
        openTimePicker(){
            this.$refs.timePicker.open();
        },
        handleTimeConfirm(val){
            let date = this.util.formatDate(val,'yyyy-MM-dd');
            this.form.AAE030 = date;
        },
        // 提交
        submit(){
            if(!this.canSubmit){
                this.$toast('信息未填写完整');
                return false;
            }else{
                console.log(this.form);
                // 封装数据
                let params = this.formatSubmitData();
                console.log(params);
                // return;
                this.$axios.post(this.epFn.ApiUrl() + '/h5/jy1026/getInvoice', params).then((resData) => {
                    console.log('返回成功信息',resData)
                    //   成功   1000
                    if ( resData.enCode == 1000 ) {
                        if(resData.hasOwnProperty('LS_DS1')){
                            if(resData.LS_DS1.length>0){
                                let arr = resData.LS_DS1
                                // if(resData.LS_DS1.length>0){
                                //     for(let i=0;i<arr.length;i++){
                                //         arr[i].BKA102 = arr[i].BKA102
                                //         arr[i].BKE100 = arr[i].BKE100
                                //         arr[i].BKA104 = arr[i].BKA104
                                //         arr[i].BKA105 = arr[i].BKA105
                                //         arr[i].AKC264 = arr[i].AKC264
                                //         arr[i].AAE036 = arr[i].AAE036
                                //         // resData.LS_DS1.AAE036 = resData.LS_DS1.eInvoiceStatus
                                //         arr[i].BKE554 = arr[i].BKE554
                                //     }
                                //     console.log('发票信息',arr);
                                // }
                                let SET_SMALL_REIM_2 = this.$store.state.SET_SMALL_REIM_2
                                SET_SMALL_REIM_2.eleInvoices = arr
                                this.$store.dispatch('SET_SMALL_REIM_2', SET_SMALL_REIM_2);
                                this.$store.dispatch('IS_INVOICE',true)
                            }else{
                                this.$store.dispatch('IS_INVOICE',false)
                            }
                        }else{
                            this.$store.dispatch('IS_INVOICE',false)
                        }

                        let GinsengLandCode = sessionStorage.getItem("GinsengLandCode")
                        let GinsengLandName = sessionStorage.getItem("GinsengLandName")
                        let submitForm = JSON.parse(JSON.stringify(this.$store.state.SET_SMALL_REIM_SUBMIT));
                        submitForm.AKB020 = this.form.AKB020;
                        submitForm.AAS301 = GinsengLandCode.substring(0,2) + '0000';
                        submitForm.AAB301 = GinsengLandCode;
                        this.$store.dispatch('SET_SMALL_REIM_SUBMIT', submitForm);
                        this.$store.dispatch('SET_SMALL_REIM_1', this.form);
                        sessionStorage.setItem('treatItemShow',true)
                        this.isClear=false;
                        sessionStorage.setItem('isClear',this.isClear)
                        this.$router.push("/invoiceInfo");
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
        // 封装提交的数据
        formatSubmitData(){
            let submitForm = JSON.parse(JSON.stringify(this.form)); //深拷贝
            delete submitForm.hospitalName; //删除医院名称
            submitForm.AAE030 = this.util.DateToNumber(submitForm.AAE030) //改变日期格式
            // 加入用户名和电子社保卡号
            if (this.$store.state.SET_NATIVEMSG.name !== undefined ) {
                submitForm.AAC003 = this.$store.state.SET_NATIVEMSG.name;
                submitForm.AAE135 = this.$store.state.SET_NATIVEMSG.idCard;
            }else {

                this.$toast("未获取到人员基本信息");
            }
            // 请求参数封装
            const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,'1026');
            return params;
        }
    }
}
</script>

<style lang="less" scoped>
.smallReim {
    width: 100%;
    .Content {
        height: 100%;
        margin-bottom: 1.4rem;
        .ReportInfo {
            height: 3.6rem;
            width: 100%;
            padding: 0 .3rem;
            margin: .15rem 0 0 0;
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
                        background:  #FFF;
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

<style>
    .picker-items{
        width: 100%;
    }
    .smallReim .el-date-editor.el-input,
    .el-date-editor.el-input__inner {
        width: 160px;
    }
    .smallReim .el-input__prefix,
    .el-input__suffix {
        display: none;
    }
    .smallReim .el-input__inner {
        border: none;
        text-align: right;
        padding-right: 0;
        padding-left: 0;
    }
    .smallReim .el-cascader .el-input .el-input__inner {
        width: 4.5rem;
    }
    .smallReim .el-cascader .el-cascader__label {
        text-align: right;
        padding: 0;
    }
</style>
