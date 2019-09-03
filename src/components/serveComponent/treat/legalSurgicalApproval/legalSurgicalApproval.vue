<template>
    <div class="SurgicalApproval">
        <!-- 选择器 -->
        <SelectList :list="slots" ref="select" @choose="chooseType"></SelectList>
        <!-- 标题 -->
        <Title :title="'计划外生育'" :backRouter="'/'"></Title>
        <mt-datetime-picker
        type="date"
        ref="startPicker"
        :startDate="startDate"
        v-model="dateVal"
        @confirm="handleStartConfirm">
        </mt-datetime-picker>
        <div class="Content">
            <div class="SearchContent">
                <div class="SearchBox">
                    <svg-icon icon-class="serveComponent_search"/>
                    <input class="InputContent" v-model="AAE135" :placeholder="'请输入身份证号'" readonly>
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
                        <input class="InputContent" v-model="AMC029VALUE" @click="openChooseType" :placeholder="'请选择'">
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
    
        <!-- 按钮 -->
        <div class="SubmitBtn" @click="add" v-if="showAll">补充材料</div>
         <!-- 判断是否绑定经办组建-->
        <BindingAgency></BindingAgency>
    </div>
</template>

<script>
export default {
    data() {
        return {
            userInfo: {},
            showAll: false,
            AAE135: '',
            form: {
                AMC029: '',
                BMC131: '',
            },
            AMC029VALUE: '',
            showCityPicker: false,
            slots: [{
                value: '04',
                name: '三个月以下流产'
            },{
                value: '05',
                name: '三个月以上四个月以下流产'
            },{
                value: '06',
                name: '满四个月流产'
            }],
            name: '',
            value: '',
            type: '',
            date: '',
            startDate: new Date(),
            dateVal: new Date(),
            type: '01'
        }
    },
    created(){
        this.epFn.setTitle('计划外生育')
    },
    methods: {
         handleStartConfirm(val){
            let date = this.util.formatDate(val,'yyyy-MM-dd');
            console.log("data",date)
            this.date = date;
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
            this.AMC029VALUE = val.name;
            this.form.AMC029 = val.value;
        },
        //搜索
        search(){
            console.log('通过身份证号请求数据')
            if(!this.util.idCard(this.AAE135)){
                this.$toast('请填写正确的身份证号');
                return false;
            }else{
                // 封装数据
                let params = this.formatSubmitData();
                // 开始请求
                console.log('parmas------',params)
                this.$axios.post(this.epFn.ApiUrl()+ '/H5/jy7610/getRecord', params).then((resData) => {
                    console.log('返回成功信息',resData)
                    //   成功   1000
                    if ( resData.enCode == 1000 ) {
                        let user = sessionStorage.getItem("LOGINNAME");//法人的单位编码
                      console.log("user",user);
                      console.log("AAB001",resData.LS_DS[0].AAB001)
                      if(user==resData.LS_DS[0].AAB001){//和7610里获取的单位编码进行比对，如果不匹配那么就提示这个人不是这个单位的
                        this.userInfo = resData.LS_DS[0]
                        sessionStorage.setItem('payLimitAAE135',this.AAE135)
                        }else {
                        this.$toast('该人员不是本单位的职员，请重新查询')
                        return false
                      }
                        this.showAll=true;
                        this.form.AMC029 = '';
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
            submitForm.BKE520 = "1";
            submitForm.AAC002 = this.AAE135;
            const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,"7610");
            return params;
        },
        add() {
            this.$router.push({path: '/legalSurgicalDetail', query: {type: this.type}})
        }
    }
}
</script>

<style lang="less" scoped>
.SurgicalApproval {
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
        height: 1.05rem;
        width: 100%;
        border-radius: .05rem;
        line-height: 1.05rem;
        font-family: PingFangSC-Regular;
        font-size: .36rem;
        letter-spacing: 0;
        text-align: center;
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
