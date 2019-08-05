<template>
    <div class="DetailStatus">
        <div class="InfoLine">
            <div class="InfoName"><span>办理结果:</span></div>
            <div class="InfoText">失败</div>
        </div>
        <div class="InfoLine">
            <div class="InfoName"><span>原因:</span></div>
            <div class="InfoText">缺少必要材料</div>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="less" scoped>
.DetailStatus{
    width: 100%;
    padding: 0 .3rem;
    margin-top: .15rem;
    background: white;
    .InfoLine{
        height: 1.2rem;
        position: relative;
        font-size: .28rem;
        display: flex;
        border-bottom: .01rem solid #D5D5D5;
        .InfoName{
            width: 1.8rem;
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
        &:last-child{
            border-bottom: none;
        }
    }
}
</style>