<template>
    <div class="EventDetail">
        <!-- 标题 -->
        <div class="Title">
            <el-row>
                <el-col :span="6">
                    <div class="grid-content">
                        <span class="el-icon-arrow-left" style="color: #ffffff;font-size: .38rem;margin-left: -50px;" @click="goBack"></span>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content NameTitle">
                        事件详情
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content">
                        <span class="el-icon-bell" style="color: #ffffff;font-size: .50rem;margin-right: -.4rem;margin-top:.15rem"></span>
                    </div>
                </el-col>
            </el-row>
        </div>
        <!-- 事项名 -->
        <div class="StateBox">
            <el-row>
                <el-col class="NameBox" :span="18">
                    <div class="StateTitle">基本医疗保险参保人员医疗费用零星报销项</div>
                    <div class="RestTime">处理时限：23:23:54</div>
                </el-col>
                <el-col class="BtnBox" :span="6">
                    <div class="Btn Arrived"><span>送达</span></div>
                </el-col>
            </el-row>
        </div>
        <!-- 日期 -->
        <div class="StateDate">
            <div class="StateInnerBox">
                <div class="BoxName"><span>开始日期:</span></div>
                <div class="BoxContent"><span>2019-03-01</span></div>
            </div>
            <div class="StateInnerBox">
                <div class="BoxName"><span>结束日期:</span></div>
                <div class="BoxContent"><span>2019-04-10</span></div>
            </div>
        </div>
        <!-- 地区 -->
        <div class="StateSite">
            <div class="StateInnerBox">
                <div class="BoxName"><span>就诊类型:</span></div>
                <div class="BoxContent"><span>门诊</span></div>
            </div>
            <div class="StateInnerBox">
                <div class="BoxName"><span>就诊省份:</span></div>
                <div class="BoxContent"><span>浙江省</span></div>
            </div>
            <div class="StateInnerBox">
                <div class="BoxName"><span>就诊城市:</span></div>
                <div class="BoxContent"><span>杭州</span></div>
            </div>
            <div class="StateInnerBox">
                <div class="BoxName"><span>就诊机构:</span></div>
                <div class="BoxContent"><span>杭州市第二人民医院</span></div>
            </div>
        </div>
        <!-- 发票 -->
        <div class="Invoice">
            <div class="PhotoBox">
                <img src=""/>
            </div>
            <div class="StateInnerBox">
                <div class="BoxName">发票号码:</div>
                <div class="BoxContent">345354587106</div>
            </div>
            <div class="StateInnerBox">
                <div class="BoxName">总金额:</div>
                <div class="BoxContent">5354.00</div>
            </div>
            <div class="StateInnerBox">
                <div class="BoxName">报销金额:</div>
                <div class="BoxContent">3245.00</div>
            </div>
            <div class="StateInnerBox">
                <div class="BoxName">现金:</div>
                <div class="BoxContent">169.00</div>
            </div>
        </div>
        <!-- 金额列表 -->
        <div class="Details">
            <div class="InnerBox">
                <div class="BoxName">统筹基金支付</div>
                <div class="BoxContent">2338.89</div>
            </div>
            <div class="InnerBox">
                <div class="BoxName">公务员补助</div>
                <div class="BoxContent">432.27</div>
            </div>
            <div class="InnerBox">
                <div class="BoxName">大病基金</div>
                <div class="BoxContent">132.67</div>
            </div>
            <div class="InnerBox">
                <div class="BoxName">当年账户</div>
                <div class="BoxContent">121.14</div>
            </div>
            <div class="InnerBox">
                <div class="BoxName">历年账户</div>
                <div class="BoxContent">432.27</div>
            </div>
        </div>
        <!-- 底部 -->
        <footer class="Footer">
            <div class="IconBox">
                <div class="Icon">
                    <svg-icon icon-class="SubmitReim_service" /></div>
                <div class="Text">客服</div>
            </div>
            <div class="BtnBox"><span>我要评价</span></div>
        </footer>
    </div>
</template>

<script>
export default {
    methods: {
        goBack() {
            this.$router.push({
                name: 'TReimbursement1',
                params: {
                    name: this.$route.params.name
                }
            })
        },
    }
}
</script>

<style lang="less" scoped>
    .EventDetail{
        width: 7.5rem;
        // 标题
        .Title {
            height: .8rem;
            background-color: #05AEF0;
            font-size: .36rem;
            line-height: .8rem;
            overflow: hidden;
            .NameTitle {
                font-size: .36rem;
                color: #FFFFFF;
                font-family: 'PingFangSC-Regular';
            }
        }
        // 事项名
        .StateBox{
            height: 2.4rem;
            width: 7.5rem;
            background: #FFF;
            .el-row{
                height: 2.4rem;
                display: flex;
                align-items: center;
                .NameBox{
                    height: 1.72rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    .StateTitle{
                        height: 1rem;
                        width: 4.48rem;
                        margin-left: .3rem;
                        opacity: 0.85;
                        text-align: left;
                        font-family: PingFangSC-Medium;
                        font-size: .32rem;
                        color: #000;
                        letter-spacing: 0;
                        line-height: .5rem;
                    }
                    .RestTime{
                        opacity: 0.45;
                        margin-left: .3rem;
                        text-align: left;
                        font-family: PingFangSC-Regular;
                        font-size: .3rem;
                        color: #000;
                        letter-spacing: 0;
                    }
                }
                .BtnBox{
                    height: 1.34rem;
                    .Btn{
                        height: 1.34rem;
                        width: 1.34rem;
                        margin-right: .4rem;
                        border-radius: 1.34rem/2;
                        line-height: 1.34rem;
                        font-family: PingFangSC-Regular;
                        font-size: .4rem;
                        color: #FFF;
                        text-align: center;
                    }
                    .Arrived{
                        background-color: #C3DB61;
                    }
                }
            }
        }
        //日期、地区、发票
        .StateDate ,.StateSite, .Invoice{
            background: #FFF;
            margin-top: .15rem;
            .StateInnerBox{
                height: 1.21rem;
                width: 7.5rem;
                display: flex;
                align-items: center;
                position: relative;
                .BoxName{
                    height: .42rem;
                    width: 1.5rem;
                    line-height: 0.42rem;
                    text-align: left;
                    margin-left: .3rem;
                    opacity: 0.45;
                    font-family: PingFangSC-Regular;
                    font-size: .3rem;
                    color: #000000;
                    letter-spacing: 0;
                    span{
                        display: block;
                    }
                    &::before {
                        content: '';
                        height: .02rem;
                        width: 6.9rem;
                        position: absolute;
                        bottom: 0;
                        left: 50%;
                        margin-left: -6.9rem/2;
                        background-color: #D5D5D5;
                    }
                }
                .BoxContent{
                    margin-left: .26rem;
                    opacity: 0.85;
                    font-family: PingFangSC-Regular;
                    font-size: .3rem;
                    color: #000000;
                    letter-spacing: 0;
                }
                &:last-child {
                    .BoxName {
                        &::before {
                            background-color: #FFF;
                        }
                    }
                }
            }
        }
        .Invoice{
            position: relative;
            .PhotoBox{
                height: 1.8rem;
                width: 1.8rem;
                background-color: #ddd;
                position: absolute;
                right: .38rem;
                top: .34rem;
                border-radius: .08rem;
            }
            .StateInnerBox{
                &:nth-child(2){
                    .BoxName{
                        &::before {
                            width: 4.6rem;
                        }
                    }
                }
            }
        }
        // 金额列表
        .Details{
            margin-top: .3rem;
            margin-bottom: 1.44rem;
            .InnerBox{
                width: 6.9rem;
                height: .8rem;
                margin: auto;
                background: #FFF;
                margin-top: .09rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                &:first-child{
                    margin-top: 0;
                }
                .BoxName{
                    height: .42rem;
                    width: 2rem;
                    margin-left: .47rem;
                    text-align: left;
                    opacity: 0.45;
                    font-family: PingFangSC-Regular;
                    font-size: .3rem;
                    color: #000;
                    letter-spacing: 0;
                }
                .BoxContent{
                    height: .42rem;
                    text-align: right;
                    margin-right: .56rem;
                    font-family: PingFangSC-Regular;
                    font-size: .3rem;
                    color: #000;
                    letter-spacing: 0;
                }
            }
        }
        // 底部
        .Footer {
            height: 1.2rem;
            width: 7.5rem;
            background-color: white;
            position: fixed;
            bottom: 0;
            left: 0;
            z-index: 199;
            display: flex;
            align-items: center;
            .IconBox {
                width: .6rem;
                margin-left: .51rem;
                .Icon {
                    height: .6rem;
                    width: .6rem;
                    .svg-icon {
                        display: block;
                        height: 100%;
                        width: 100%;
                    }
                }
                .Text {
                    height: .28rem;
                    width: .6rem;
                    opacity: 0.45;
                    font-family: PingFangSC-Regular;
                    font-size: .2rem;
                    color: #000;
                    letter-spacing: 0;
                    text-align: center;
                }
            }
            .BtnBox {
                height: .8rem;
                width: 5.6rem;
                margin-left: .51rem;
                line-height: 0.8rem;
                background-image: linear-gradient(90deg, #35B8FD 0%, #4E8DFF 100%);
                border-radius: .4rem;
                font-family: PingFangSC-Regular;
                font-size: .36rem;
                color: #FFFFFF;
                letter-spacing: 0;
                text-align: center;
            }
        }
    }
</style>