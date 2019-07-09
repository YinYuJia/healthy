<template>
    <div class="searchRecord">
        <Title :title="'药品目录'" :backRouter="'/'"></Title>
        <div class="Content">
            <!-- 列表信息 -->
            <div class="ListInfo">
                <div class="InfoLine">
                    <div class="InfoName"><span>{{form.AKA061}}</span></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>英文名称:</span></div>
                    <div class="InfoText">{{form.AKA062}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>目录等级:</span></div>
                    <div class="InfoText">{{form.AKA065}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>剂型:</span></div>
                    <div class="InfoText">{{form.AKA070}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>备注:</span></div>
                    <div class="InfoText">{{form.AAE013}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            form:{
            },
        }
    },
    created () {
        if(this.$route.query.param){
            console.log("有传过来参数")
            console.log("传参",this.$route.query.param)
            this.form={...this.form,...this.$route.query.param}
        }
    },
    methods: {
    }
}
</script>

<style lang="less" scoped>
.searchRecord{
    .Content{
        .ListInfo{
            width: 7.5rem;
            margin-bottom: .3rem;
            background: white;
            .InfoLine{
                height: 1.2rem;
                font-size: .28rem;
                border-bottom: .01rem solid #D5D5D5;
                .InfoName{
                    width: 1.5rem;
                    margin-left: .2rem;
                    line-height: 1.2rem;
                    text-align: right;
                    span{
                        height: .6rem;
                        line-height: .6rem;
                        color: #666;
                        letter-spacing: 0;
                    }
                }
                .InfoText{
                    width: 100%;
                    line-height: 1.2rem;
                    color: #000;
                    letter-spacing: 0;
                    align-items: left;
                }
                &:last-child{
                    border-bottom: none;
                }
            }
        }
    }
}
</style>