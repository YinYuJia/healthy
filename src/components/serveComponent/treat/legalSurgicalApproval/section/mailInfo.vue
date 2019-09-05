<template>
    <div class="mailInfo">
        <!-- 选择器 -->
        <SelectList :list="optionList" ref="selectMailType" @choose="chooseType"></SelectList>
        <!-- 发票提交方式 -->
        <div class="submitType">
            <div class="submitName"><span>纸质发票提交方式:</span></div>
            <div class="submitText">
                <input placeholder="请选择" v-model="BKE200VALUE" @click="openChooseType" readonly/>
                <svg-icon icon-class="serveComponent_arrowRight"></svg-icon>
            </div>
        </div>
        <!-- 地址信息 -->
        <div class="addressInfo">
            <div class="addressTitle">邮寄信息:</div>
            <div class="addressContent">
                <div class="InfoLine">
                    <div class="InfoName"><span>收件地址</span></div>
                    <div class="InfoText"><span>{{address}}</span></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>收件人</span></div>
                    <div class="InfoText"><span>{{name}}</span></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>收件人电话</span></div>
                    <div class="InfoText"><span>{{phone}}</span></div>
                </div>
            </div>
        </div>
        <div class="hintInfo">
            <i class="el-icon-warning" style="color:#FFA007"></i><span>邮寄时若发生票据丢失等现象，后果需自行承担，请谨慎对待！</span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        type: {
            type: String
        }
    },
    data() {
        return {
            BKE200VALUE: '', //发票提交方式
            optionList:[
                {name:'邮寄', value: '1'},
                {name:'自送', value: '2'}
            ],
            address: '', //地址
            name: '', //收件人
            phone: '', //联系电话
        }
    },
    watch: {
        type(val){
            if(val == '1'){
                this.BKE200VALUE = '邮寄';
            }else {
                this.BKE200VALUE = '自送'
            }
        }
    },
    created() {
        console.log("this.typeaaa", this.type)
        if(this.type == '1'){
            this.BKE200VALUE = '邮寄';
        }else if(this.type == '2'){
            this.BKE200VALUE = '自送';
        }else {
            this.BKE200VALUE = '';
        }
        console.log('邮寄方式',this.BKE200VALUE)
        this.getMailInfo()
    },
    methods: {
        // 选择发票提交方式
        openChooseType() {
            this.$refs.selectMailType.open();
        },
        chooseType(val) {
            this.BMC220VALUE = val.name;
            this.$emit('mailType', val.value);
        },
        // 获取邮寄信息
        getMailInfo(){
            let LegalPerson = JSON.parse(sessionStorage.getItem('LegalPerson'));
            let submitForm = {code:LegalPerson.xzqh} //统筹区编码
            this.$axios.post(this.epFn.ApiUrl() + '/H5/jy0005/getAreaList', submitForm).then((resData) => {
                //   成功   1000
                if ( resData.enCode == 1000 ) {
                    let code = resData.code;
                    this.address = code.organizationAddress;
                    this.name = code.organizationName;
                    this.phone = code.organizationPhone
                }else if (resData.enCode == 1001 ) {
                //   失败  1001
                    return;
                }else{
                    this.$toast('业务出错');
                    return;
                }
            })
        },
    }
}
</script>

<style lang="less" scoped>
.mailInfo{
    margin-top: .15rem;
    background: #FFF;
    margin-bottom: 2rem;
    .submitType{
        padding: .36rem .2rem;
        display: flex;
        justify-content: space-between;
        font-size: .28rem;
        border-bottom: 1px solid #DDD;
        .submitName{
            text-align: left;
            span{
                color: #000000;
                letter-spacing: 0;
            }
        }
        .submitText{
            display: flex;
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
    }
    .addressInfo{
        text-align: left;
        padding: 0 .2rem .4rem .2rem;
        .addressTitle{
            margin-top: .26rem;
            font-size: .28rem;
            color: #000000;
            letter-spacing: 0;
        }
        .addressContent{
            .InfoLine{
                margin-top: .4rem;
                font-size: .28rem;
                display: flex;
                .InfoName{
                    width: 2rem;
                    flex-shrink: 0;
                    span{
                        color: #666666;
                        letter-spacing: 0;
                    }
                }
                .InfoText{
                    span{
                        color: #000000;
                        letter-spacing: 0;
                    }
                }
            }
        }
    }
    .hintInfo{
        background-color: rgba(255, 160, 7, .1);
        padding: .18rem 0;
        display: flex;
        align-items: flex-start;
        text-align: left;
        padding: .18rem .2rem;
        i{
            font-size: .24rem;
        }
        span{
            font-size: .24rem;
            color: #FFA007;
            letter-spacing: 0;
        }
    }
}
</style>