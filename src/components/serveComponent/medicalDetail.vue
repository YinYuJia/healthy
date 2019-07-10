<template>
    <div class="searchRecord">
        <Title :title="'药品目录'" :backRouter="'/'"></Title>
        <div class="Content">
            <!-- 列表信息 -->
                <div class="medical-name"><span>{{form.AKA061}}</span></div>
                <div class="ListInfo">
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
        this.epFn.setTitle('药品目录')
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
        height: 100%;   
            .medical-name{
            opacity: 0.85;
            font-family: PingFangSC-Medium;
            font-size: .36rem;
            color: #000000;
            letter-spacing: 0;
            line-height: 50px;
            background: #FFF;
            text-align: left;
            padding: 0 0 0 .2rem;
            }
            .ListInfo{
                width: 7.5rem;
                margin-bottom: .3rem;
                background: white;
                .InfoLine{
                    width: 7.1rem;
                    height: 1.2rem;
                    width: 100%;
                    font-size: .28rem;
                    display: flex;
                    justify-content: space-between;
                    height: auto;
                    .InfoName{
                        width: 1.5rem;
                        padding-left: .2rem;
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
                        line-height: 1.2rem;
                        color: #000;
                        letter-spacing: 0;
                        text-align: left;
                        width: 5.16rem;
                        height: auto;
                    }
                    &:last-child{
                        border-bottom: none;
                    }
                }
            } 
        }


    
}
</style>