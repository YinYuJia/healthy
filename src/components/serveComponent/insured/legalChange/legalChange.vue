<template>
    <div class="legalChange">
        <Title :title="'参保信息变更'" :backRouter="'/'"></Title>
        <SelectCity 
            :type="3"
            ref="cityPicker"
            @confirm="chooseCity"
            >
        </SelectCity>
        <div class="Content">
            <!-- 基本信息 -->
            <UserBaseInfo></UserBaseInfo>
            <!-- 变更信息 -->
            <div class="ChangeInfo">
                <div class="InfoLine">
                    <div class="InfoName"><span>单位邮编：</span></div>
                    <div class="InfoText"><input v-model="form.AAE007" type="tel" maxlength="6" placeholder="请输入"></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>单位地址：</span></div>
                    <div class="InfoText"><input v-model="form.address" @click="openCityPicker" type="text" placeholder="请选择" readonly><svg-icon icon-class="serveComponent_arrowRight"></svg-icon></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>地址详情：</span></div>
                    <div class="InfoText"><textarea v-model="form.detailAddress" placeholder="请输入"></textarea></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>单位电话：</span></div>
                    <div class="InfoText"><input v-model="form.AAB005" type="tel" maxlength="11" placeholder="请输入"></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>法人代表电话：</span></div>
                    <div class="InfoText"><input v-model="form.BKE280" type="tel" maxlength="11" placeholder="请输入"></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>专管员姓名：</span></div>
                    <div class="InfoText"><input v-model="form.BKE281" type="text" placeholder="请输入"></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>专管员电话：</span></div>
                    <div class="InfoText"><input v-model="form.BKE283" type="tel" maxlength="11" placeholder="请输入"></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>专管员所在部门：</span></div>
                    <div class="InfoText"><input v-model="form.BKB225" type="text" placeholder="请输入"></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>邮箱：</span></div>
                    <div class="InfoText"><input v-model="form.AAE005" type="text" placeholder="请输入"></div>
                </div>
            </div>
        </div>
        <!-- 办事指南 -->
        <!-- <GuideIcon AGA002="331400501005"></GuideIcon> -->
        <!-- 按钮 -->
        <Footer :canSubmit='canSubmit' @submit="submit()"></Footer>
    </div>
</template>

<script>
export default {
    data(){
        return{
            form:{
                AAB001: '', //单位编码
                AAE007: '', //单位邮编
                AAE006: '', //单位地址
                address: '', //选择的地址
                detailAddress: '', //详细地址
                AAB005: '', //单位电话
                BKE280: '', //法人电话
                BKE281: '', //专管员姓名
                BKE283: '', //专管员电话
                BKB225: '', //专管员部门
                AAE005: '', //单位邮箱
                BKE520: '1' //数据来源 掌上
            },
            canSubmit: false,
        }
    },
    watch:{
        form:{
            handler: function(val) {
                if(val.AAE007 != '' && val.address != '' && val.detailAddress != '' && val.AAB005 != '' 
                    && val.BKE280 != '' && val.BKE281 != '' && val.BKE283 != '' && val.BKB225 != '' && val.AAE005 != ''){
                    this.canSubmit = true;
                }else{
                    this.canSubmit = false;
                }
            },
            deep:true
        }
    },
    created(){
    },
    methods:{
        // 选择城市
        openCityPicker(){
            this.$refs.cityPicker.open();
        },
        chooseCity(val){
            this.form.address= val.name;
        },
        // 提交
        submit(){
            if(this.canSubmit == false){
                return false;
            }
            // 检验邮箱格式
            if(!this.util.checkMail(this.form.AAE005)){
                this.$toast("邮箱格式不正确");
                return false;
            }
            this.$router.push('/legalChangeDetail');
        }
    }
}
</script>

<style lang="less" scoped>
.legalChange{
    width: 100%;
    .Content{
        height: 100%;
        margin-bottom: 1.4rem;
        .ChangeInfo{
            width: 100%;
            padding: 0 .3rem;
            background: white;
            .InfoLine{
                height: 1.2rem;
                position: relative;
                font-family: PingFangSC-Regular;
                font-size: .3rem;
                display: flex;
                justify-content: space-between;
                border-bottom: .01rem solid #D5D5D5;
                .InfoName{
                    opacity: 0.85;
                    line-height: 1.2rem;
                    span{
                        height: .6rem;
                        line-height: .6rem;
                        color: #000000;
                        letter-spacing: 0;
                    }
                }
                .InfoText{
                    opacity: 0.85;
                    line-height: 1.2rem;
                    display: flex;
                    position: relative;
                    align-items: center;
                    input{
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
                &:nth-child(3){
                    height: 1.6rem;
                    .InfoText{
                        display: flex;
                        align-items: center;
                    }
                    textarea{
                        width: 4rem;
                        height: .84rem;
                        font-size: .3rem;
                        opacity: 0.85;
                        color: #000000;
                        line-height: .42rem;
                        text-align: right;
                    }
                }
                &:last-child{
                    border-bottom: none;
                }
            }
        }
        .Hint{
            margin-top: .45rem;
            padding: 0 .3rem;
            opacity: 0.45;
            font-family: PingFangSC-Regular;
            font-size: .24rem;
            color: #000000;
            text-align: left;
            .HintTitle{
                i{
                    margin-right: .2rem;
                    letter-spacing: 0;
                }
            }
            .HintText{
                margin-top: .28rem;
                letter-spacing: 0;
            }
        }
    }
}
</style>