<template>
    <div class="searchPrint">
        <!-- 弹出框内容 -->
        <SelectCity
            :type="2"
            ref="insuredPicker"
            @confirm="chooseInsured"
            >
        </SelectCity>
        <SelectCity
            :type="1"
            ref="monthPicker"
            :propArr="options"
            @confirm="handleMonthConfirm"
            >
        </SelectCity>
        <SelectCity
            :type="1"
            ref="yearPicker"
            :propArr="yearList"
            @confirm="handleYearConfirm"
            >
        </SelectCity>
        <!-- 子女姓名 -->
        <SelectCity
            :type="1"
            ref="childPicker"
            :propArr="childList"
            @confirm="handleChildConfirm">
        </SelectCity>
        <!-- 弹出框结束 -->
        <Title :title="'打印参保证明'" :backRouter="'/'"></Title>
        <div class="Content">
            <!-- 基本信息 -->
            <UserBaseInfo></UserBaseInfo>
            <!-- 查询月数 -->
            <div class="SearchInfo">
                <div class="InfoLine">
                    <div class="InfoName"><span>参保地</span></div>
                    <div class="InfoText">
                         <div class="InfoText"><input type="text" v-model="AAB301000" placeholder="请选择" readonly></div>
                    </div>
                </div>
                <div class="InfoLine" v-if="printType=='person'">
                    <div class="InfoName"><span>查询月数：</span></div>
                    <div class="InfoText">
                        <input @click="openMonthPicker()" readonly type="text" v-model="AAE011VALUE" placeholder="请选择" readonly><svg-icon icon-class="serveComponent_arrowRight"></svg-icon>
                    </div>
                </div>
                <div class="InfoLine" v-if="printType=='all'">
                    <div class="InfoName"><span>查询年度：</span></div>
                    <div class="InfoText">
                        <input  type="text" readonly="quotreadolyquot" v-model="AAE012VALUE" placeholder="请选择" >
                    </div>
                </div>
                <div class="InfoLine" v-if="printType=='record'">
                    <div class="InfoName"><span>查询年度：</span></div>
                    <div class="InfoText">
                        <input   type="text" readonly="quotreadolyquot" v-model="AAE013VALUE" placeholder="请选择" >
                    </div>
                </div>
                <!-- <div class="InfoLine" v-if="printType=='child'">
                    <div class="InfoName"><span>子女姓名：</span></div>
                    <div class="InfoText">
                        <input type="text" readonly="quotreadolyquot" v-model="AAE014VALUE" placeholder="请输入">
                    </div>
                </div> -->
            </div>
        </div>
        <!-- 按钮 -->
        <Footer :canSubmit='canSubmit' @submit="submit(printType)"></Footer>
    </div>
</template>

<script>
export default {
    data(){
        return{
            printType: '',
            AAB301000:"",
            form:{
                AAS301:'', //参保地
                AAB301:'', //参保地
                AAQ301:'', //参保地
                AAE011: '24' //缴费月数
            },
            canbao:"",
            AAE011VALUE: '24',
            AAE012VALUE: '',
            AAE013VALUE: '',
            AAE014VALUE: '',
            options:[
                {value: '12', label: '12'},
                {value: '24', label: '24'},
                {value: '36', label: '36'},
                {value: '48', label: '48'},
            ],
            canSubmit: false,
            yearList:[
                {value: '2015', label: '2015'},
                {value: '2016', label: '2016'},
                {value: '2017', label: '2017'},
                {value: '2018', label: '2018'},
                {value: '2019', label: '2019'},
            ],//查询年度列表
            childList: [], // 子女列表
        }
    },
    watch:{
        form:{
            handler:function(val){
                if(val.AAB301 != '' && val.AAE011 != ''){
                    this.canSubmit = true;
                }else{
                    this.canSubmit = false;
                }
            },
            deep: true
        }
    },
    created () {
        var now = new Date();
        var date = new Date(now.getTime() - 7 * 24 * 3600 * 1000);
        var year = date.getFullYear();
        console.log("year", year)
        this.AAE012VALUE = year - 1;
        this.AAE013VALUE = year - 1;
        this.printType = this.$route.query.printType;
        console.log("type", this.printType)
        this.form = this.$store.state.SET_SEARCH_PRINT;
          this.form.canbao = this.$store.state.SET_USER_DETAILINFO.regionName
          this.form.AAB301 = this.$store.state.SET_USER_DETAILINFO.AAB301

          let GinsengLandCode = sessionStorage.getItem("GinsengLandCode")
          let GinsengLandName = sessionStorage.getItem("GinsengLandName")

          console.log('GinsengLandCode', GinsengLandCode, 'GinsengLandName', GinsengLandName)
          this.AAB301000 = GinsengLandName
          console.log(this.AAB301000 == "")
          this.form.AAB301 = GinsengLandCode
          this.form.AAS301 = GinsengLandCode.substring(0, 2) + '0000'
        if (this.printType == 'person') {
          this.epFn.setTitle('个人参保证明')
          // this.form.AAC003 = this.$store.state.SET_NATIVEMSG.name
          // this.form.AAE135 = this.$store.state.SET_NATIVEMSG.idCard;
        } else if (this.printType == 'all') {
          this.epFn.setTitle('参保（合）凭证')
          this.getyear();
        } else if (this.printType == 'child') {
          this.epFn.setTitle('子女缴费证明')
        } else if (this.printType == 'record') {
          this.epFn.setTitle('个人权益记录单')
          this.getyear();
        }
        

},
    methods:{
        getyear() {
            for(let i=1900;i<=2100;i++){
                this.yearList.push({value:i,label:i})
            }
        },
        // 选择参保地
        openInsuredPicker(){
            this.$refs.insuredPicker.open();
        },
        chooseInsured(val){
            console.log(val);
            this.canbao = val.name;
            this.form.AAS301 = val.code[0]
            this.form.AAB301 = val.code[1]
            this.form.AAQ301 = val.code[2]
        },
        // 选择月数
        openMonthPicker(){
            this.$refs.monthPicker.open();
        },
        handleMonthConfirm(val){
            console.log(val);
            this.form.AAE011 = val.value;
            this.AAE011VALUE = val.label;
        },
        // 选择年份
        openYearPicker(){
            this.$refs.yearPicker.open();
        },
        openChildPicker() {
            this.$refs.childPicker.open();
        },
        handleChildConfirm(val) {
            this.AAE014VALUE = val.label
        },
        handleYearConfirm(val){
            console.log(val);
            this.form.AAE011 = val.value;
            this.AAE012VALUE = val.label;
        },
        submit(print){
            console.log('print', print)
            if(this.canSubmit == false){
                this.$toast('信息未填写完整');
                return false;
            }else{
                if(print == 'person') {
                    this.personSubmit();
                } else {
                    if(print == "all") {
                        this.elseSubmit(9026)
                    } else if(print == 'child') {
                        this.elseSubmit(9027)
                    } else if(print == 'record') {
                        this.elseSubmit(9025)
                    }
                }
            }
        },
        personSubmit() {
             let submitForm = JSON.parse(JSON.stringify(this.form)); //深拷贝
                submitForm.BKE520 = "1"

                // 加入用户名和电子社保卡号
                if (this.$store.state.SET_NATIVEMSG.name !== undefined ) {
                    submitForm.AAC003 = this.$store.state.SET_NATIVEMSG.name;
                    submitForm.AAE135 = this.$store.state.SET_NATIVEMSG.idCard;
                }else {
                    //
                    this.$toast("未获取到人员基本信息");
                }
                // 暂时删除参保地
                // delete submitForm.AAB301

                const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,'1011');
                console.log('submitForm--------------',params)
                this.$axios.post(this.epFn.ApiUrl() + '/h5/jy1011/QueryInsurance', params)
                    .then((resData) => {
                        console.log(resData);

                        sessionStorage.setItem("searchPrintData",JSON.stringify(resData))

                        if(resData.enCode==1000){

                            this.$router.push('/insuredDownload');
                        }else if(resData.enCode==1001){
                            this.$toast(resData.msg)
                        }
                    })
                    .catch((error) => {
                        console.log(error)
                    })
        },
        elseSubmit(code) {
            console.log("1234", code)
            let AAC002 = sessionStorage.getItem("idCard") 
            console.log("AAC:", AAC002)
            this.$axios.post(this.epFn.ApiUrl() + '/H5/jy0003/getAreaList', {
                AAC002: AAC002,
                trade: code + ''
            })
                    .then((resData) => {
                        console.log(resData);
                        sessionStorage.setItem("searchPrintData",JSON.stringify(resData))
                        if(resData.enCode==1000){
                            this.$router.push('/insuredDownload');
                        }else if(resData.enCode==1001){
                            this.$toast(resData.msg)
                        }
                    })
                    .catch((error) => {
                        console.log(error)
                    })
        }
    }
}
</script>

<style lang="less" scoped>
.searchPrint{
    width: 100%;
    .Content{
        height: 100%;
        margin-bottom: 1.4rem;
        .SearchInfo{
            height:2.4rem;
            width: 100%;
            background: white;
            padding: 0 .3rem;
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
                        // input {
                        //     width: 4rem;
                        //     height: .6rem;
                        //     opacity: 0.85;
                        //     font-family: PingFangSC-Regular;
                        //     font-size: .3rem;
                        //     color: #000000;
                        //     letter-spacing: 0;
                        //     text-align: right;
                        //     border: none;
                        //     background: #ffffff;
                        // }
                        input {
                        height: .6rem;
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
input:disabled {
    background-color: #fff
}
.searchPrint .el-select .el-input__inner{
    padding-right: 0;
    text-align: right;
    border: none;
}
.searchPrint .el-select .el-input__suffix .el-input__suffix-inner{
    display: none;
}
</style>
