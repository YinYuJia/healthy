<template>
    <div class="searchFee">
        <Title :title="'个人费用查询'" :backRouter="'/'"></Title>
        <!-- 弹出区域 -->
        <mt-datetime-picker
            type="date"
            ref="startPicker"
            v-model="dateVal"
            :endDate="endDate"
            @confirm="handleStartConfirm">
        </mt-datetime-picker>
        <mt-datetime-picker
            type="date"
            ref="endPicker"
            v-model="dateVal"
            :endDate="endDate"
            @confirm="handleEndConfirm">
        </mt-datetime-picker>

        <div class="Content">
        <!-- 基本信息 -->
        <UserBaseInfo></UserBaseInfo>
        <!-- 变更信息 -->
        <div class="ListInfo" v-show="showSearch" >
            <div class="InfoLine">
                <div class="InfoName"><span>开始日期：</span></div>
                <div class="InfoText">
                    <input @click="openStartPicker" type="text" v-model="form.AAE030" placeholder="请选择" readonly>
                    <svg-icon icon-class="serveComponent_arrowRight"></svg-icon>
                </div>
            </div>
            <div class="InfoLine">
                <div class="InfoName"><span>结束日期：</span></div>
                <div class="InfoText">
                    <input @click="openEndPicker" type="text" v-model="form.AAE031" placeholder="请选择" readonly>
                    <svg-icon icon-class="serveComponent_arrowRight"></svg-icon>
                </div>
            </div>
            <!-- <div class="InfoLine">
                <div class="InfoName"><span>就诊医院：</span></div>
                <div class="InfoText">
                    <input type="text" @click="chooseHospital" v-model="form.AKB020VALUE" placeholder="请选择就诊医院" readonly>
                    <svg-icon icon-class="serveComponent_arrowRight"></svg-icon>
                </div>
            </div> -->
            <div class="searchBtn" @click="submit()" >查询</div>
        </div>
        <!-- 隐藏时展示的 -->
        <div class="btn" v-if="!showSearch"><div class="text" @click="changeSearch"><span>点击查询</span></div></div>
        </div>
        <div class="searchFeeResult">
            <div class="Content">
                <div class="padContent"  v-for="(item,index) in List" :key="index">
                    <div class="InfoLine">
                        <div class="InfoName">结算日期：</div>
                        <div class="InfoText">{{item.AKE010}}</div>
                    </div>
                    <div class="InfoLine">
                        <div class="InfoName">医疗类别：</div>
                        <div class="InfoText">{{item.AKA130}}</div>
                    </div>
                    <div class="InfoLine">
                        <div class="InfoName">医疗机构：</div>
                        <div class="InfoText">{{item.AKB021}}</div>
                    </div>
                    <div class="InfoLine">
                        <div class="InfoName">总费用：</div>
                        <div class="InfoText">{{item.AKC264}}</div>
                    </div>
                    <div class="InfoLine">
                        <div class="InfoName">医保支付：</div>
                        <div class="InfoText">{{item.BKE450}}</div>
                    </div>
                    <div class="InfoLine">
                        <div class="InfoName">现金支付：</div>
                        <div class="InfoText">{{item.BKE452}}</div>
                    </div>
                </div>
            </div>
        </div>  

        <SearchInfoPage ref="hospita" :jy7603='true' @childrenClick="hospitaClick" title="选择医院"></SearchInfoPage>
    </div>
</template>

<script>
export default {
    data(){
        return{
            form:{
                AAE030: '', //开始日期
                AAE031: '', //结束日期
                AKB020:'',//医院编码
                AKB020VALUE:''//医院中文名称
            },
            dateVal: new Date(), //默认绑定的时间
            endDate: new Date(),
            List:[
                // {
                // AKE010:"",//结算日期
                // AKA130:"",//医疗类别
                // AKB021:"",//医疗机构名称
                // AKC264:"",//医疗总费用
                // BKE450:"",//医保支付
                // BKE452:""//现金支付
                // }
              
            ],
            showSearch:true
        }
    },
    created () {
        //现在是屏蔽医院，等医院出来就把firstchild改成4.5rem;
        this.epFn.setTitle('个人费用查询');
        this.form.AAE031 = this.util.formatDate(new Date(),'yyyy-MM-dd');
        // 计算三个月前日期
        this.getStartDate(new Date());
        this.submit();
        window.onscroll=()=> {
        //为了保证兼容性，这里取两个值，哪个有值取哪一个
        //scrollTop就是触发滚轮事件时滚轮的高度
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        if(scrollTop>300){
            console.log('超过300距离')
            this.showSearch=false;
            console.log(this.form)
            console.log(this.showSearch)
        }else{
            this.showSearch=true;
        }
        console.log("滚动距离" + scrollTop);
        }
        // this.form = this.$store.state.SET_SEARCHFEE_OPERATION;
    },
    watch: {
        form: {
            handler: function(val) {
                // 判断不为空
                // if (val.AAE030 != '' && val.AAE031 != '') {
                //     this.canSubmit = true;
                //     console.log("this.canSubmit",this.canSubmit)
                // } else {
                //     this.canSubmit = false;
                // }
                // 判断时间间隔
                if (val.AAE030 != '' && val.AAE031 != '') {
                    let AAE030 = new Date(val.AAE030);
                    let AAE031 = new Date(val.AAE031);
                    let month = 24 * 3600 * 1000 * 30;
                    let gap = AAE031 - AAE030;
                    if (gap <=0) {
                        this.$toast('结束日期必须大于开始日期');
                        this.form.AAE031 = '';
                    }
                }
            },
            deep: true
        },
    },
    methods:{
        //隐藏后重新展示
        changeSearch(){
            this.showSearch=true;
        },
        // 选择就诊医院
        chooseHospital(){
            this.$refs.hospita.open();
        },
        hospitaClick(code,name){
            this.form.AKB020 = code;
            this.form.AKB020VALUE = name;
        },
        // 计算三个月前日期
        getStartDate(val){
            let end = val.getTime();
            let start = end - (24*3600*90*1000);
            let date = this.util.formatDate(new Date(start),'yyyy-MM-dd');
            this.form.AAE030 = date;
        },
        // 选择离开日期
        openStartPicker(){
            this.$refs.startPicker.open();
        },
        handleStartConfirm(val){
            let date = this.util.formatDate(val,'yyyy-MM-dd');
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
        // 提交
        submit() {
            // 判断时间间隔不得超过一年
            if (this.form.AAE030 != '' && this.form.AAE031 != '') {
                let start = new Date(this.form.AAE030);
                let end = new Date(this.form.AAE031);
                let year = 365 * 24 * 3600 * 1000;
                let gap = end - start;
                if (gap > year) {
                    this.$toast('时间跨度不得超过一年');
                    this.form.AAE031 = '';
                    return false;
                }
            }
            if (this.canSubmit == false) {
                this.$toast('信息未填写完整');
                return false;
            } else {
                // 封装数据
                let params = this.formatSubmitData();
                // 开始请求
                console.log('parmas------',params)
                this.$axios.post(this.epFn.ApiUrl()+ '/h5/jy1027/getRecord', params).then((resData) => {
                        console.log('返回成功信息',resData)
                        //   成功   1000
                        if ( resData.enCode == 1000 ) {
                            this.List=[]
                            this.List = [...this.List, ...resData.LS_DS];
                        }else if (resData.enCode == 1001 ) {
                        //   失败  1001
                            this.List=[]
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
            let submitForm ={};
            // 日期传换成Number
            submitForm.AAE030 = this.util.DateToNumber(this.form.AAE030).toString();
            submitForm.AAE031 = this.util.DateToNumber(this.form.AAE031).toString();
            submitForm.AKB020 = this.form.AKB020;
            // 加入用户名和电子社保卡号
            if (this.$store.state.SET_NATIVEMSG.name !== undefined ) {
                submitForm.AAC003 = this.$store.state.SET_NATIVEMSG.name;
                submitForm.AAE135 = this.$store.state.SET_NATIVEMSG.idCard;
            }else {
                

                this.$toast("未获取到人员基本信息");
            }
            // 请求参数封装
            console.log('submitForm',submitForm)
            const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,"1027");
            return params;
        }

    }
}
</script>

<style lang="less" scoped>
.searchFee{
    width: 100%;
    .Content{
        .ListInfo{
            width: 100%;
            padding: 0 .3rem .3rem .3rem ;
            background: white;
            position: fixed;
            top: 0;
            .InfoLine{
                height: 1rem;
                position: relative;
                font-family: PingFangSC-Regular;
                font-size: .28rem;
                display: flex;
                justify-content: space-between;
                border-bottom: .01rem solid #D5D5D5;
                .InfoName{
                    line-height: 1rem;
                    span{
                        height: .6rem;
                        line-height: .6rem;
                        color: #000000;
                        letter-spacing: 0;
                    }
                }
                .InfoText{
                    opacity: 0.85;
                    line-height: 1rem;
                    display: flex;
                    position: relative;
                    align-items: center;
                    input{
                        width:4rem;
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
                &:last-child{
                    border-bottom: none;
                }
            }
            .searchBtn{
                position: relative;
                z-index: 2;
                height: 1.05rem;
                width: 100%;
                margin-top: .3rem;
                border-radius: .05rem;
                line-height: 1.05rem;
                background:  #1492FF;
                font-family: PingFangSC-Regular;
                font-size: .36rem;
                color: #FFFFFF;
                letter-spacing: 0;
                text-align: center;
            }
        }
        .btn{
            width: 100%;
            height: .99rem;
            line-height: .99rem;
            background: #FFFFFF;
            position: fixed;
            margin-bottom: .01rem;
            top: 0;
            .text{
                width: 100%;
                background: #ffffff;           
                border-bottom: .01rem solid #DDDDDD;
                
                margin: 0;
                span{
                    font-family: FZLTXHKM;
                    font-size: .28rem;
                    color: #1492FF;
                    letter-spacing: 0;
                    text-align: center;
                    vertical-align: middle;
                    height: .28rem
                }
            }

        }
    }
    .searchFeeResult{
        width: 100%;
        .Content{
            .padContent{
                width: 100%;
                background: #FFF;
                box-shadow: 1px 2px 3px #DDD;
                padding: 0 .28rem;
                .InfoLine{
                    height: 1rem;
                    line-height: 1rem;
                    font-size: .28rem;
                    display: flex;
                    height: auto;
                    border-bottom: .01rem solid #DDDDDD;
                    .InfoName{
                        width: 3rem;
                        color: #666;
                        text-align: left;
                        letter-spacing: 0;
                    }
                    .InfoText{
                        width: 100%;
                        color: #000;
                        letter-spacing: 0;
                        text-align: left;
                    }
                    &:first-child{
                        margin-top: .24rem
                    }
                }
                &:first-child{
                    margin-top: 3.5rem
                }
            }
        }
    }    
}
</style>
