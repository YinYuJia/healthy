<template>
    <div class="mailInfo">
        <div class="submitType">
            <div class="submitName"><span>纸质发票提交方式:</span></div>
            <div class="submitText"><input placeholder="请选择" readonly/></div>
        </div>
        <div class="addressInfo">
            <div class="addressTitle">邮寄信息:</div>
            <div class="addressContent">
                <div class="InfoLine">
                    <div class="InfoName"><span>收件地址</span></div>
                    <div class="InfoText"><span>浙江省杭州市西湖区宁波大厦601</span></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>收件人</span></div>
                    <div class="InfoText"><span>医疗保障局</span></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>收件人电话</span></div>
                    <div class="InfoText"><span>13588888888</span></div>
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