<template>
    <div class="searchProgress">
        <Title :title="'我的事项'" :backRouter="'/'"></Title>
        <!-- 标题 -->
        <div class="IndexMenu" id="titleContent">
            <div class="MenuLine">
                <div class="MenuCell" @click="changeIndex(1)" :class="{'active': activeIndex == 1}">待受理</div>
                <div class="MenuCell" @click="changeIndex(2)" :class="{'active': activeIndex == 2}">受理中</div>
                <div class="MenuCell" @click="changeIndex(3)" :class="{'active': activeIndex == 3}">已办结</div>
            </div>
        </div>
        <div class="content" :style="{height:height,fontSize:'16px'}">
            <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
                <!-- 列表 -->
                <ul class="ListInfo">
                    <li class="ListLine" v-for="(item,index) in itemGroup" :key="index" @click="gotoplace(item)">
                        <div class="InfoName">
                            <div class="InfoHead">{{item.AGA004 | tooLong}}</div>
                            <div class="InfoDate">{{item.AAE036}}</div>
                        </div>
                        <div class="IconBox">
                            <svg-icon v-if="item.BOD038 == '22'" icon-class="serveComponent_complete" class="error" />
                            <svg-icon v-if="item.BOD038 == '11'" icon-class="serveComponent_error" class="error" />
                            <svg-icon icon-class="serveComponent_arrowRight" />
                        </div>
                    </li>
                </ul>
            </mt-loadmore>
            <div v-if="isShow">
                <div class="pic_null"></div>
                <div class="tip">没有更多事项了~~~</div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                allLoaded: true,
                activeIndex: 1,
                pageSize: 10,
                pageNum: "1",
                itemGroup: [
                    // {name: '基本医疗保险', date: '2019-05-19 12:09:31'},
                    // {name: '领取基本医疗保险就医凭证', date: '2019-05-19 12:09:31'},
                    // {name: '基本医疗保险职工参保信息变更登记', date: '2019-05-19 12:09:31'},
                    // {name: '参保人员查询打印社会保险信息', date: '2019-05-19 12:09:31'},
                ],
                BOD037: "1",
                totalPage: "",
                isShow: false,
                height: 0,
            }
        },
        filters: {
            tooLong: function(val) {
                if (val) {
                    if (val.length > 20) {
                        return val.substring(0, 20) + '...';
                    }
                    return val;
                }
            }
        },
        created() {
            this.epFn.setTitle('我的事项')
            this.$nextTick(() => {
                let heightTop = document.getElementById("titleContent").offsetHeight;
                console.log(heightTop);
                this.height = window.innerHeight - heightTop + "px"
            })
            this.getList();
        },
        methods: {
            gotoplace(item) {
                console.log("item", item)
                console.log("item.bkz019", item.BKZ019);
                let submitForm = {};
                submitForm.BKZ019 = item.BKZ019;
                console.log(submitForm);
                const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader, submitForm, "1034");
                // 开始请求
                this.$axios.post(this.epFn.ApiUrl() + '/h5/jy1034/info', params).then((resData) => {
                    console.log('返回成功信息', resData)
                    
                    //   成功   1000
                    if (resData.enCode == 1000) {
                        let path = '';
                        switch(resData.AGA002){
							case '确认-00122-002': path = '/registerFour';break; //单位新参保
							case '公共服务-00501-004': path = '/legalChangeDetail'; break; //单位变更
							case '确认-00123-004': path = '/payLimitDetail'; break; //单位变更
							case '确认-00253-013-01': path = '/lElseWhereDetail'; break; //法人异地就医备案
							case '确认-00253-013-02': path = '/lElseWhereDetail'; break; //法人异地就医备案
							case '确认-00253-013-03': path = '/lElseWhereDetail'; break; //法人异地就医备案
							case '确认-00253-013-04': path = '/lElseWhereDetail'; break; //法人异地就医备案
							case '给付-00142-001-01': path = '/natureApprovalDetail'; break; //平产
							case '给付-00142-001-02': path = '/natureApprovalDetail'; break; //平产
                            case '给付-00142-001-03': path = '/natureApprovalDetail'; break; //平产
							case '给付-00142-002-01': path = '/legalSurgicalView'; break; //流产
							case '给付-00142-002-02': path = '/legalSurgicalView'; break; //流产
                            case '给付-00142-002-03': path = '/legalSurgicalView'; break; //流产
                            case '给付-00142-003': path = '/unemployedDetail'; break; //未就业
                            case '公共服务-00512-002': path = 'legalTransferDetail'; break; //转移接续
							default: path = ''; break;
						}
						if(path == ''){
							this.$toast('该事项暂未开通');
							return;
						}
                        this.$router.push({
                            path: path,
                            query: {
                                param: item.BKZ019,
                                AGA002: resData.AGA002
                            }
                        });
                    } else if (resData.enCode == 1001) {
                        //   失败  1001
                        this.$toast(resData.msg);
                        return;
                    } else {
                        this.$toast('业务出错');
                        return;
                    }
                })
                // this.itemInof()
            },
            changeIndex(index) {
                this.activeIndex = index;
                this.itemGroup = [];
                if (index == 1) {
                    this.BOD037 = "1";
                    this.pageNum = "1";
                    this.getList();
                } else if (index == 2) {
                    this.BOD037 = "2";
                    this.pageNum = "1";
                    this.getList();
                } else if (index == 3) {
                    this.BOD037 = "3";
                    this.pageNum = "1";
                    this.getList();
                }
            },
            // itemInof() {
            //         let params = this.formatSubmitData2();
            //         // 开始请求
            //         this.$axios.post(this.epFn.ApiUrl()+ '/h5/jy1018/getList', params).then((resData) => {
            //                 console.log('返回成功信息',resData)
            //                 //   成功   1000
            //                 if ( resData.enCode == 1000 ) {
            //                       console.log("请求成功")
            //                 }else if (resData.enCode == 1001 ) {
            //                 //   失败  1001
            //                     this.$toast(resData.msg);
            //                     return;
            //                 }else{
            //                     this.$toast('业务出错');
            //                     return;
            //                 }
            //         })
            // },
            // formatSubmitData2(){
            //     let submitForm = {}
            //         console.log(submitForm)
            //         // 加入用户名和电子社保卡号
            //         if (this.$store.state.SET_NATIVEMSG.name !== undefined ) {
            //             submitForm.AAC003 = this.$store.state.SET_NATIVEMSG.name;
            //             submitForm.AAE135 = this.$store.state.SET_NATIVEMSG.idCard;
            //         }else {
            //             
            //             this.$toast("未获取到人员基本信息");
            //         }      
            //         // 请求参数封装
            //         const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,"1034");
            //         return params;
            // },
            getList() {
                // 封装数据
                let params = this.formatSubmitData();
                // 开始请求
                this.$axios.post(this.epFn.ApiUrl() + '/h5/jy1018/getList', params).then((resData) => {
                    console.log('返回成功信息', resData)
                    //   成功   1000
                    if (resData.enCode == 1000) {
                        if (resData.LS_DS.length > 0 && resData.LS_DS.length < 10) {
                            this.isShow = false;
                        }
                        if (resData.LS_DS.length > 0) {
                            this.itemGroup = [...this.itemGroup, ...resData.LS_DS]
                            //向上取整
                            console.log("list", this.itemGroup)
                            let Num = Math.ceil(resData.pages / this.pageSize);
                            this.totalPage = Num;
                            console.log("totalPage", this.totalPage)
                            let Num111 = Number(this.pageNum);
                            this.pageNum = Num111
                            if (this.totalPage > this.pageNum) {
                                console.log("up", Num111)
                                this.pageNum += 1;
                                console.log("down", this.pageNum)
                                let Num222 = this.pageNum.toString();
                                this.pageNum = Num222
                                console.log('pageNum', this.pageNum)
                                this.allLoaded = false
                                console.log(this.allLoaded)
                            }
                        } else {
                                // this.allLoaded=true
                                this.isShow = true;
                            }
                    } else if (resData.enCode == 1001) {
                        //   失败  1001
                        this.$toast(resData.msg);
                        return;
                    } else {
                        this.$toast('业务出错');
                        return;
                    }
                })
            },
            formatSubmitData() {
				let submitForm = {};
				let LegalPerson = JSON.parse(sessionStorage.getItem("LegalPerson"));
                submitForm.BOD037 = this.BOD037 //办件状态
                submitForm.pageNum = this.pageNum //页码
                submitForm.BKE520 = '1' //页码
                // 加入用户名和电子社保卡号
				submitForm.AAC003 = LegalPerson.attnName;
				submitForm.AAE135 = LegalPerson.userId;
                // 请求参数封装
                console.log('submitForm', submitForm)
                const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader, submitForm, "1018");
                return params;
            },
            loadBottom() {
                console.log("加载")
                if (!this.allLoaded) {
                    this.getList();
                }
                this.allLoaded = true;
                this.$refs.loadmore.onBottomLoaded();
            },
        }
    }
</script>

<style lang="less" scoped>
    .searchProgress {
        width: 100%;
        overflow: auto;
        font-size: 0.32rem;
        .IndexMenu {
            height: 1.2rem;
            width: 100%;
            background: #FFF;
            display: flex;
            align-items: center;
            justify-content: center;
            .MenuLine {
                height: .62rem;
                width: 95%;
                background: #FFFFFF;
                border: 1px solid #1492FF;
                border-radius: .05rem;
                display: flex;
                .MenuCell {
                    line-height: .62rem;
                    width: 100%;
                    color: #1492FF;
                    text-align: center;
                    letter-spacing: 0;
                    font-size: .28rem;
                    border-right: 1px solid #1492FF;
                    &:first-child {
                        border-top-left-radius: .05rem;
                        border-bottom-left-radius: .05rem;
                    }
                    &:last-child {
                        border-top-right-radius: .05rem;
                        border-bottom-right-radius: .05rem;
                        border-right: none;
                    }
                }
                .active {
                    color: #FFF;
                    background: #1492FF;
                }
            }
        }
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