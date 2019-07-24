<template>
    <div class="legalChange">
        <Title :title="'参保信息变更'" :backRouter="'/'"></Title>
        <div class="Content">
            <!-- 基本信息 -->
            <UserBaseInfo></UserBaseInfo>
            <!-- 变更信息 -->
            <div class="ChangeInfo">
                <div class="InfoLine">
                    <div class="InfoName"><span>单位邮编：</span></div>
                    <div class="InfoText"><input type="tel" maxlength="6" placeholder="请输入"></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>单位地址：</span></div>
                    <div class="InfoText"><input type="text" placeholder="请选择" readonly></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>住址详情：</span></div>
                    <div class="InfoText"><textarea placeholder="请输入"></textarea></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>单位电话：</span></div>
                    <div class="InfoText"><input type="tel" maxlength="11" placeholder="请输入"></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>法人代表电话：</span></div>
                    <div class="InfoText"><input type="tel" maxlength="6" placeholder="请输入"></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>专管员姓名：</span></div>
                    <div class="InfoText"><input type="text" placeholder="请输入"></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>专管员电话：</span></div>
                    <div class="InfoText"><input type="text" placeholder="请输入"></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>专管员所在部门：</span></div>
                    <div class="InfoText"><input type="text" placeholder="请输入"></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>邮箱：</span></div>
                    <div class="InfoText"><input type="text" placeholder="请输入"></div>
                </div>
            </div>
        </div>
        <!-- 办事指南 -->
        <GuideIcon AGA002="331400501005"></GuideIcon>
        <!-- 按钮 -->
        <Footer :canSubmit='canSubmit' @submit="submit()"></Footer>
    </div>
</template>

<script>
export default {
    data(){
        return{
        }
    },
    watch:{
        form:{
        }
    },
    created(){
    },
    methods:{}
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