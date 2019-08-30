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
                    <div class="NoInfo" v-if="noInfo">
                        <svg-icon icon-class="noInfo"></svg-icon>
                        <div class="Text">暂无信息</div>
                    </div>
                    <div v-for="(item,index) in itemGroup" :key="index">
                        <li class="ListLine" v-if="item != ''">
                            <div class="InfoName">
                                <div class="info">
                                <div style="display: flex;">
                                <div class="InfoHead">{{item.BAC003}}</div>
                                <div class="InfoText1" v-if="item.AAE144 == '配偶'">{{item.AAE144}}</div>
                                <div class="InfoText2" v-if="item.AAE144 == '子女'">{{item.AAE144}}</div>
                                <div class="InfoText3" v-if="item.AAE144 == '父母'">{{item.AAE144}}</div>
                                </div>
                                <div class="InfoDate">开始时间：{{item.AAE030}}</div>
                                </div>
                                <div class="remove" @click="remove(item.BAC003)">解绑</div>
                            </div>
                        </li>
                    </div>
                </ul>
                <Footer :canSubmit='canSubmit' @submit="add()" btnText="添加绑定人员"></Footer>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                pageSize: 10,
                pageNum: "1",
                itemGroup: [],
                canSubmit: true,
                dialogVisible: false,
                name: '',
                AAE135: '',
                AAE011: '',
                submitForm: {},
                noInfo: true
            }
        },
        created() {
            this.epFn.setTitle('家庭共济');
            this.AAE135 = this.$store.state.SET_NATIVEMSG.idCard;
            this.AAE011 = this.$store.state.SET_NATIVEMSG.name;
            this.getList();
        },
        methods: {
            getList() {
                    this.$axios.post(this.epFn.ApiUrl()+'/h5/jy9107/getList', {
                     "data": {AAE135: this.AAE135},
                     "tradeCode": "9107"
                     }).then((resData) => {
                    console.log('返回家庭列表', resData)
                    if (resData.enCode == 1000) {
                        this.itemGroup = [...this.itemGroup, ...resData.LS_DS];
                        for ( let i = 0;i < resData.LS_DS.length; i++) {
                            resData.LS_DS[i].AAE030 = this.util.NumberToDate(resData.LS_DS[i].AAE030);
                            this.itemGroup[i].AAE030 = resData.LS_DS[i].AAE030
                        }
                       console.log("list1----:", this.itemGroup)
                        for(let i = 0;i < this.itemGroup.length; i++) {
                            if (this.itemGroup[i].AAE100 == '无效') {
                                console.log('无效')
                                this.itemGroup.splice(i, 1, '');
                            }
                        }
                        for(let i = 0;i < this.itemGroup.length; i++) {
                            if(this.itemGroup[i] != ''){
                                this.noInfo = false;
                            }
                        }
                        if(this.itemGroup.length == 0) {
                            this.noInfo = true;
                        }
                    } else if (resData.enCode == 1001 ) {
                    //   失败  1001
                        this.noInfo = true;
                        return;
                    }else{
                        this.$toast('业务出错');
                        return;
                    }
                })
            },
            remove(item) {
                this.dialogVisible = true;
                console.log("name:", item)
                this.name = item;
                this.itemGroup.forEach( e => {
                    if(e.BAC003 == item) {
                        this.submitForm.AAE135 = this.AAE135;
                        this.submitForm.BAC002 = e.BAC002;
                        this.submitForm.BAC003 = e.BAC003;
                        this.submitForm.AAE011 = this.AAE011;
                        this.submitForm.BKE520 = 1;
                    }
                })
                console.log("-----submit:", this.submitForm)
            },
            add() {
                this.$router.push({path: '/familyAidDel'})
            },
            removeConfirm() {
                this.$axios.post(this.epFn.ApiUrl()+'/h5/jy9108/updRecord', {
                    "data": this.submitForm,
                     "tradeCode": "9108"
                    }).then((resData) => {
                    console.log('返回解绑信息', resData)
                    if(resData.enCode == 1000) {
                        this.$toast('解绑成功');
                        this.itemGroup = [];
                         this.getList();
                         this.dialogVisible = false;
                        this.dialogVisible = false;
                    } else if (resData.enCode == 1001 ) {
                    //   失败  1001
                        this.$toast(resData.msg);
                        return;
                    }else{
                        this.$toast('业务出错');
                        return;
                    }
                })
                for(let i = 0;i < this.itemGroup.length; i++) {
                            if(this.itemGroup[i] != ''){
                                this.noInfo = false;
                            } else {
                                this.noInfo = true;
                            }
                        }
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
            .NoInfo{
                    .svg-icon{
                        height: 3.8rem;
                        width: 3.8rem;
                        left: 50%;
                        margin-left: -1.9rem;
                        padding-top: 4rem;
                        position: absolute;
                    }
                    .Text{
                        font-size: .4rem;
                        color: #999999;
                        padding-top: 4rem;
                        width: 3rem;
                        left: 50%;
                        margin-left: -1.5rem;
                        position: absolute;
                        padding-top: 8rem;

                    }
                }
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