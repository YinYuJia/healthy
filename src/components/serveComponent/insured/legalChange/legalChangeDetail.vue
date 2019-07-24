<template>
    <div class="legalChangeDetail">
        <Title :title="'参保信息变更'" :backRouter="'/insuredChange'"></Title>
        <div class="Content">
            <!-- 办事进度 -->
            <WorkProgress :currentStep="currentStep"></WorkProgress>
            <!-- 邮递信息 -->
            <div class="MailInfo">
                <div class="InfoLine">
                    <div class="InfoName"><span>单位邮编:</span></div>
                    <div class="InfoText"></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>单位地址:</span></div>
                    <div class="InfoText"></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>住址详情:</span></div>
                    <div class="InfoText"><textarea ></textarea></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>单位电话:</span></div>
                    <div class="InfoText"></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>法人代表电话:</span></div>
                    <div class="InfoText"></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>专管员姓名:</span></div>
                    <div class="InfoText"></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>专管员电话:</span></div>
                    <div class="InfoText"></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>专管员所在部门:</span></div>
                    <div class="InfoText"></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>法人代表电话:</span></div>
                    <div class="InfoText"></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>邮箱:</span></div>
                    <div class="InfoText"></div>
                </div>
                <!-- 进度时间 -->
                <ProgressDate  replyDate=""  progressDate=""></ProgressDate>
            </div>
        </div>
        <Success :flag="successFlag"></Success>
        <!-- 底部 -->
        <Footer :btnType="2" v-if="currentStep==1" @backout="backout()" @edit="edit()"></Footer>
    </div>
</template>

<script>
export default {
    data(){
        return{
            currentStep: 1,
            successFlag: 1,
        }
    },
    created(){
    },
    methods:{}
}
</script>

<style lang="less" scoped>
.legalChangeDetail{
    width: 100%;
    .Content{
        margin-bottom: 1.4rem;
        .MailInfo{
            width: 100%;
            padding: 0 .3rem;
            background: white;
            .InfoLine{
                height: 1.2rem;
                position: relative;
                font-size: .28rem;
                display: flex;
                border-bottom: .01rem solid #D5D5D5;
                .InfoName{
                    width: 2.2rem;
                    line-height: 1.2rem;
                    text-align: left;
                    span{
                        height: .6rem;
                        line-height: .6rem;
                        letter-spacing: 0;
                        color: #666;
                    }
                }
                .InfoText{
                    line-height: 1.2rem;
                    display: flex;
                    position: relative;
                    align-items: center;
                    color: #000;
                }
                &:nth-child(3){
                    height: 1.6rem;
                    .InfoText{
                        height: 1.6rem;
                        textarea{
                            border: none;
                            width: 5rem;
                            line-height: .45rem;
                            color: #000;
                        }
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