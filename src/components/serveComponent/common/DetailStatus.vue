<template>
    <div class="DetailStatus">
        <div class="InfoLine">
            <div class="InfoName" :style="{'width': nameWidth}"><span>办理结果:</span></div>
            <div v-if="success" class="InfoText success">成功</div>
            <div v-if="!success" class="InfoText error">失败</div>
        </div>
        <div class="InfoLine" v-if="!success">
            <div class="InfoName" :style="{'width': nameWidth}"><span>原因:</span></div>
            <div class="InfoText">缺少必要材料</div>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        success:{
            type: Boolean,
            default: true
        },
        nameWidth:{
            type: String,
            default: '1.5rem'
        }
    }
}
</script>

<style lang="less" scoped>
.DetailStatus{
    display: none;
    width: 100%;
    padding: 0 .3rem;
    margin-top: .15rem;
    margin-bottom: .3rem;
    background: white;
    .InfoLine{
        height: 1.2rem;
        position: relative;
        font-size: .28rem;
        display: flex;
        border-bottom: .01rem solid #D5D5D5;
        .InfoName{
            line-height: 1.2rem;
            text-align: left;
            span{
                height: .6rem;
                line-height: .6rem;
                color: #666;
                letter-spacing: 0;
            }
        }
        .InfoText{
            width: 5.1rem;
            color: #000;
            text-align: left;
            display: flex;
            position: relative;
            align-items: center;
        }
        .error{
            color: #FF0000;
        }
        .success{
            color: #1492FF;
        }
        &:last-child{
            border-bottom: none;
        }
    }
}
</style>