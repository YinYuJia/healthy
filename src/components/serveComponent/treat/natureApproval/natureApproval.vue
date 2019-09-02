<template>
    <div class="natureApproval">
        <div class="Content" >
            <Title :title="'计划内生育'" :backRouter="'/'"></Title>
            <SelectCity
                :type="1"
                ref="TypePicker"
                :propArr="types"
                @confirm="handleTypeConfirm"
                >
            </SelectCity>
            <SelectCity
                :type="1"
                ref="LatePicker"
                :propArr="late"
                @confirm="handleLateConfirm"
                >
            </SelectCity>
            <mt-datetime-picker
                type="date"
                ref="BirthPicker"
                v-model="dateVal"
                @confirm="handleBirthConfirm">
            </mt-datetime-picker>
            <!-- 基本信息 -->
            <!-- <UserBaseInfo></UserBaseInfo> -->
            <!-- 列表信息 -->
            <div class="SearchContent" id="searchContent">
            <div class="SearchBox">
                <svg-icon icon-class="serveComponent_search"/>
                <input class="InputContent" v-model="form.AAE135" :placeholder="'请输入身份证号'">
                <svg-icon v-if="form.AAE135" class="deleteIcon" @click="deleteSearch()" icon-class="serveComponent_delete"></svg-icon>
                <div class="SearchBtn" @click="search">搜索</div>
            </div>
            </div>
            <div class="userBaseInfo">
                <div class="infoBox">
                    <svg-icon icon-class="payLimit_bg"/>
                    <div class="infoName">
                        <span class="name">{{form1.AAC003}}</span>
                        <span class="sex">/{{form1.AAC004|AAC004}}</span>
                    </div>
                    <div class="infoAddress">
                        <div class="IconImg">
                            <svg-icon icon-class="payLimit_compony"/>
                        </div>
                        <span>{{form1.AAB004}}</span>
                    </div>
                    <div class="infoMessage">
                        <div class="birth">
                            <div class="infoMessageBirth">{{form1.AAC006}}</div>
                            <div class="infoMessageText">出生日期</div>
                        </div>
                    </div>

                </div>
            </div>
            <div class="ReportInfo">
                <div class="InfoLine">
                    <div class="InfoName"><span>生育类型:</span></div>
                    <div class="InfoText">
                        <div class="InfoText"><input @click="openTypePicker()" type="text" v-model="form.AMC029VALUE" placeholder="请选择" readonly></div>
                        <svg-icon icon-class="serveComponent_arrowRight"></svg-icon>
                        <!-- <el-select v-model="form.BKE810" placeholder="请选择">
                            <el-option v-for="item in types" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select> -->
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>生育日期:</span></div>
                    <div class="InfoText">
                        <input type="tel" @click="openBirthPicker()" v-model="form.BMC131" placeholder="选填"  readonly>
                        <!-- <svg-icon icon-class="serveComponent_arrowRight"></svg-icon> -->
                    </div>
                </div> 
                <div class="InfoLine">
                    <div class="InfoName"><span>胎儿数:</span></div>
                    <div class="InfoText">
                        <input type="tel"  maxlength="2" v-model="form.AMC028" placeholder="选填"  readonly>
                        <!-- <svg-icon icon-class="serveComponent_arrowRight"></svg-icon> -->
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>胎次:</span></div>
                    <div class="InfoText">
                        <input type="tel"   maxlength="2" v-model="form.AMC031" placeholder="选填">
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>其中死胎:</span></div>
                    <div class="InfoText">
                        <input type="tel"  maxlength="1" v-model="form.BMC046" placeholder="选填">
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>实际发生费用:</span></div>
                    <div class="InfoText">
                        <input type="number" v-model="form.BMC211" placeholder="选填">
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>实际住院天数:</span></div>
                    <div class="InfoText">
                        <input type="tel" v-model="form.BMC033" placeholder="选填">
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>是否晚育:</span></div>
                    <div class="InfoText">
                        <div class="InfoText"><input @click="openLatePicker()" type="text" v-model="form.AMC027VALUE" placeholder="请选择" readonly></div>
                        <svg-icon icon-class="serveComponent_arrowRight"></svg-icon>
                        <!-- <el-select v-model="form.BKE810" placeholder="请选择">
                            <el-option v-for="item in types" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select> -->
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>准生证号:</span></div>
                    <div class="InfoText">
                        <input type="tel" v-model="form.BMC035" placeholder="选填">
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>出生证编号:</span></div>
                    <div class="InfoText">
                        <input type="tel" v-model="form.AMC022" placeholder="选填">
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>医疗机构:</span></div>
                    <div class="InfoText">
                        <input type="text" v-model="form.BMC065" placeholder="选填">
                    </div>
                </div>
                <!-- <div class="InfoLine">
                    <div class="InfoName">
                        <svg-icon icon-class="payLimit_uncheck" v-if="uncheck" @click="uncheck1" ></svg-icon>
                        <svg-icon icon-class="payLimit_check" v-if="check" @click="check1"></svg-icon>
                        <span>提前退休</span>
                    </div>
                </div> -->
            </div>
        </div>
        <Footer :canSubmit='canSubmit' :btnText="'补充材料'" @submit="submit()"></Footer>
    </div>
</template>

<script>
export default {
    data () {
        return {
            form:{
                AAE135:"",//身份证号
                BMC061: '', //生育类别 0生育女职工,1男职工配偶
                BMC131: '', //生育日期
                AMC029: '', //生育类别 01平产、02助娩产、03剖宫产
                AMC029VALUE:'',//生育类别中文
                AMC028: '', //胎儿数
                AMC031: '', //胎次
                BMC046: '', //其中死胎
                BMC211: '', //实际发生费用
                BMC033: '', //实际住院天数
                AMC027: '', //晚育标志 0否1是
                AMC027VALUE:'',//晚育中文
                BMC035: '',//准生证号
                AMC022: '',//出生证编号
                BMC065: '',//医疗机构
            },
            form1:{
                AAC001:"",//个人编号
                AAC002:"",//证件号码
                AAC003:"",//姓名
                AAC004:"",//性别
                AAC005:"",//民族
                AAC006:"",//出生日期
                AAC067:"",//联系电话
                AAE006:"",//家庭地址
                AAB001:"",//单位编码
                AAB004:"",//单位名称
            },
            dateVal:new Date(),
            types: [
                {
                    value: '01',
                    label: '平产'
                },
                {
                    value: '02',
                    label: '助娩产'
                },
                {
                    value: '03',
                    label: '剖宫产'
                }
            ],
            late:[
                {
                    value: '0',
                    label: '否'
                },
                {
                    value: '1',
                    label: '是'
                },
            ],
            BKE810VALUE:"",
            canSubmit:false
        }
    },
    created () {
        console.log("111",this.$store.state.SET_NATUREAPPROVAL)
        this.form=this.$store.state.SET_NATUREAPPROVAL;
    },
    watch: {
        form:{
            handler:function(val){
                console.log(val)
                if(val.BMC131!=''&&val.AMC028!=''&&val.AMC027!=''&&val.AMC029!=''){
                    this.canSubmit = true;
                }else{
                    this.canSubmit = false
                }
            },
            deep: true
        }
    },
    methods: {
        search(){
            console.log('搜索')
        },
        deleteSearch(){
            this.form.AAE135=''
        },
        // 选择变更类型
        openTypePicker(){
            this.$refs.TypePicker.open();
        },
        handleTypeConfirm(val){
            console.log("类型",val);
            this.form.AMC029 = val.value;
            this.form.AMC029VALUE = val.label;
        },
        // 选择变更类型
        openLatePicker(){
            this.$refs.LatePicker.open();
        },
        handleLateConfirm(val){
            console.log("类型",val);
            this.form.AMC027 = val.value;
            this.form.AMC027VALUE = val.label;
        },
        // 开始工作时间
        openBirthPicker(){
            this.$refs.BirthPicker.open();
            // this.$refs.startPicker.$el.getElementsByClassName('picker-slot')[2].style.display='none';如果不要日
        },
        handleBirthConfirm(val){
            console.log("start",this.util.formatDate(val,'yyyyMM'))
            let date = this.util.formatDate(val,'yyyyMM');
            this.form.BMC131=date;
            console.log("生育日期",this.form.BMC131)

        },
        search(){
            if(this.util.idCard(this.form.AAC002)) {
                
            }else{
                this.$message({
                    message: '请填写正确的身份证号',
                    type: 'warning'
                });
                return;
            }
            let params = this.formatSubmitData();
            this.$axios.post(this.epFn.ApiUrl()+ '/h5/jy9109/getRecord', params).then((resData) => {
                //   成功   1000
                    if ( resData.enCode == 1000 ) {
                        console.log('返回成功信息',resData)
                        let user = sessionStorage.getItem("LOGINNAME");//法人的单位编码
                      if(user==resData.LS_DS[0].AAB001){//和7610里获取的单位编码进行比对，如果不匹配那么就提示这个人不是这个单位的
                        this.form1=resData.LS_DS[0]
                        this.$store.dispatch('SET_NATUREAPPROVAL_BASEINFO', this.form1)
                        // this.form=resData.LS_DS[0]
                        }else {

                        this.$toast('该人员不是本单位的职员，请重新查询')
                        this.form1=resData.LS_DS[0]
                        this.$store.dispatch('SET_NATUREAPPROVAL_BASEINFO', this.form1)
                        return false
                      }
                    }else if (resData.enCode == 1001 ) {
                    //   失败  1001
                        this.$toast(resData.msg)
                        return;
                    }else{
                        this.$toast('业务出错')
                        return;
                    }
            })
        },
        formatSubmitData(){
            let submitForm = {}
            submitForm.AAC002 =  this.form.AAE135;   
            // 请求参数封装
            const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,"9109");
            return params;
        },
        submit(){
            if(this.canSubmit == false){
                this.$toast('信息未填写完整');
                return false;
            }else{
                this.$store.dispatch('SET_NATUREAPPROVAL', this.form)
                this.$router.push('/natureApprovalSupplement')
            }
        }
    }
}
</script>

<style lang="less" scoped>
.natureApproval{
    #timeAll{
        position: absolute;
        z-index: -1000;
    }
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
            position: relative;
            z-index: -2;
            .infoBox{
                font-size: .3rem;
                position: relative;
                height: 100%;
                width: 7rem;
                padding: 0 .15rem;
                color: #ffffff;
                border-radius: 0.05rem;
                display: flex;
                flex-direction: column;
                align-items: left;
                .svg-icon{
                    display: block;
                    width:100%;
                    height: 100%;
                    position: absolute;
                    left:0;
                    z-index: -1;
                }
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
                    padding-left: .3rem;
                    span{
                        line-height:.4rem;
                        height: .4rem;
                        font-size: .24rem;
                    }
                    .IconImg{
                        width: .4rem;
                        height: .4rem;
                        display: inline-block;

                        .svg-icon{
                            padding-left: .3rem;
                            display:block;
                            width: .4rem;
                            height: .4rem;

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
}
</style>