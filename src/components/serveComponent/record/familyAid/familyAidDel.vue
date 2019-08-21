<template>
    <div class="familyDel">
        <Title :title="'家庭共济'" :backRouter="'/'"></Title>
        <div class="content">
            <!-- <mt-loadmore ref="loadmore"> -->
                <!-- 列表 -->
                <ul class="ListInfo">
                    <li class="ListLine" v-for="(item,index) in itemGroup" :key="index" >
                        <div class="InfoName">
                            <div class="info">
                            <div class="InfoHead">{{item.AGA004}}</div>
                            <div class="InfoDate">{{item.AAE036}}</div>
                            </div>
                            <button class="remove" @click="remove(item)">解绑</button>
                        </div>
                    </li>
                </ul>
                <footer></footer>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                pageSize: 10,
                pageNum: "1",
                itemGroup: [
                    {AGA004: '基本医疗保险', AAE036: '2019-05-19 12:09:31'},
                    {AGA004: '领取基本医疗保险就医凭证', AAE036: '2019-05-19 12:09:31'},
                    {AGA004: '基本医疗保险职工参保信息变更登记', AAE036: '2019-05-19 12:09:31'},
                    {AGA004: '参保人员查询打印社会保险信息', AAE036: '2019-05-19 12:09:31'},
                ],
                isShow: false,
                height: 0,
            }
        },
        created() {
            this.epFn.setTitle('家庭共济')
        },
        methods: {
            remove(item) {
                console.log(item)
            }
        }
    }
</script>

<style lang="less" scoped>
    .familyDel {
        width: 100%;
        overflow: auto;
        font-size: 0.32rem;
        .ListInfo {
            width: 100%;
            padding: 0 .37rem;
            background: white;
            .ListLine {
                height: 1.6rem;
                border-bottom: .01rem solid #D5D5D5;
                display: flex;
                align-items: center;
                justify-content: space-between;
                .InfoName {
                    display: flex;
                    .info {
                        display: flex;
                        flex-direction: column;
                        align-items: flex-start;
                        .InfoHead {
                            height: .4rem;
                            line-height: .4rem;
                            font-size: .28rem;
                            color: #000000;
                            letter-spacing: 0;
                        }
                        .InfoDate {
                            height: .33rem;
                            line-height: .33rem;
                            margin-top: .1rem;
                            font-size: .24rem;
                            color: #999;
                            letter-spacing: 0;
                        }
                    }
                    .remove {
                            position: fixed;
                            right: .2rem;
                            background: white;
                            border: .01rem solid #1492FF;
                            font-size: .28rem;
                            padding: .08rem .2rem;
                            color: #1492FF;
                            border-radius: .05rem;
                    }
                }
                .IconBox{
                    display: flex;
                    align-items: center;
                    .CompleteBtn{
                        height: .4rem;
                        width: .4rem;
                        border-radius: .2rem;
                        background: red;
                        color: white;
                        font-size: .13rem;
                        line-height: .4rem;
                        text-align: center;
                        margin-right: .1rem;
                    }
                    .svg-icon {
                        height: .3rem;
                        width: .3rem;
                    }
                    .error{
                        height: .4rem;
                        width: .4rem;
                        margin-right: .1rem;
                    }
                }
                &:last-child {
                    border-bottom: none;
                }
            }
        }
        .tip {
            margin-top: .1rem;
            font-size: 16px;
            color: #353535;
            text-align: center;
        }
    }
</style>