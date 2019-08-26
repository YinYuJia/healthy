<template>
    <div class="familyDel">
        <Title :title="'家庭共济'" :backRouter="'/'"></Title>
        <div class="dialog" v-show="dialogVisible">
            <div class="dialog_div">
                <div class="text">确定解绑与"{{name}}"的家庭共济？</div>
                <button class="cancel" @click="cancel">取消</button>
                <button class="confirm" @click="removeConfirm">确定</button>
            </div>
        </div>
        <div class="content">
                <ul class="ListInfo">
                    <li class="ListLine" v-for="(item,index) in itemGroup" :key="index" >
                        <div class="InfoName">
                            <div class="info">
                            <div style="display: flex;">
                            <div class="InfoHead">{{item.AGA004}}</div>
                            <div class="InfoText1" v-if="item.type == '配偶'">{{item.type}}</div>
                            <div class="InfoText2" v-if="item.type == '子女'">{{item.type}}</div>
                            <div class="InfoText3" v-if="item.type == '父母'">{{item.type}}</div>
                            </div>
                            <div class="InfoDate">{{item.AAE036}}</div>
                            </div>
                            <div class="remove" @click="remove(item.AGA004)">解绑</div>
                        </div>
                    </li>
                </ul>
                <Footer :canSubmit='canSubmit' @submit="add()" btnText="添加解绑人员"></Footer>
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
                    {AGA004: '基本医疗保险', AAE036: '2019-05-19 12:09:31', type: '配偶'},
                    {AGA004: '领取基本医疗保险就医凭证', AAE036: '2019-05-19 12:09:31', type: '子女'},
                    {AGA004: '基本医疗保险职工参保信息变更登记', AAE036: '2019-05-19 12:09:31', type: '配偶'},
                    {AGA004: '参保人员查询打印社会保险信息', AAE036: '2019-05-19 12:09:31', type: '父母'},
                ],
                canSubmit: true,
                dialogVisible: false,
                name: ''
            }
        },
        created() {
            this.epFn.setTitle('家庭共济')
        },
        methods: {
            // getList() {
            //          this.$axios.post(this.epFn.ApiUrl()+'h5/jy9107/getList', AAE135).then((resData) => {
            //         console.log('返回家庭列表', resData)
            //         if(resData.enCode == 1000) {
            //             this.itemGroup = resData
            //         } else if (resData.enCode == 1001 ) {
            //         //   失败  1001
            //             this.$toast(resData.msg);
            //             return;
            //         }else{
            //             this.$toast('业务出错');
            //             return;
            //         }
            //     })
            // },
            remove(item) {
                this.dialogVisible = true;
                console.log("name:", item)
                this.name = item;
            },
            add() {
                this.$router.push({path: '/familyAidDel'})
            },
            removeConfirm() {
                this.$message({
                    message: '撤销成功！',
                    type: 'success'
                })
                this.dialogVisible = false;
            },
            cancel() {
                this.dialogVisible = false;
            }
        }
    }
</script>

<style lang="less" scoped>
    .dialog {
        height: 100%;
        width: 100%;
        background-color: rgba(0, 0, 0, .5);
        position: fixed;
        top: 0;
        left: 0;
        z-index: 99999;
        .dialog_div {
            height: 2.8rem;
            width: 5.2rem;
            background-color: #fff;
            position: absolute;
            left: 15%;
            top: 5.32rem;
            border: 1px solid #979797;
            border-radius: 5px;
            .text {
                font-family: FZLTXHKM;
                font-size: .28rem;
                color: #000000;
                letter-spacing: 0;
                text-align: center;
                padding-top: .74rem;
            }
            .confirm {
                background-color: #1492FF;
                border-radius: 5px;
                width: 1.8rem;
                height: .63rem;
                font-size: .28rem;
                font-family: FZLTXHKM;
                border: none;
                color: #fff;
            }
            .cancel {
                background: #d3d3d3;
                border-radius: 5px;
                width: 1.8rem;
                height: 0.63rem;
                margin-right: .4rem;
                margin-top: .53rem;
                font-size: .28rem;
                font-family: FZLTXHKM;
                color: #666;
                border: none;
            }
        }
    }
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
                        .InfoText1 {
                                width: .8rem;
                                font-size: .24rem;
                                height: .4rem;
                                vertical-align: center;
                                line-height: .4rem;
                                margin-left: .4rem;
                                background: #ECFFF1;
                                color: #26A88F;
                        }
                        .InfoText2 {
                                width: .8rem;
                                font-size: .24rem;
                                height: .4rem;
                                vertical-align: center;
                                line-height: .4rem;
                                margin-left: .4rem;
                                background: #DCEFFF;
                                color: #1482ff;
                        }
                        .InfoText3 {
                                width: .8rem;
                                font-size: .24rem;
                                height: .4rem;
                                vertical-align: center;
                                line-height: .4rem;
                                margin-left: .4rem;
                                background: rgb(248, 222, 240);
                                color: rgb(184, 7, 154);
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