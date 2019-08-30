<template>
    <div class="elseDetail">
        <Title :title="'参保登记'" :backRouter="'/'"></Title>
        <div class="Content">
            <!-- 办事进度 -->
            <WorkProgress :currentStep="currentStep"></WorkProgress>
            <!-- 办理结果 -->
            <DetailStatus nameWidth="1.8rem"></DetailStatus>
            <ProgressDate
                class="picWrap"
                nameWidth="1.8rem"
                :replyDate="AAE036"
                :progressDate="BAE019"
            ></ProgressDate>
            <!-- 邮递信息 -->
            <div class="picWrap">
                <p>1、统一社会信用代码证</p>
                <img v-for="item in imgList1" :key="item" :src="item" alt />
            </div>
            <div class="picWrap">
                <p>2、社会保险单位参保信息登记表</p>
                <img v-for="item in imgList2" :key="item" :src="item" alt />
            </div>
            <!-- 补充材料 -->
            <div v-if="workStatus=='22'" class="CompleteInfo">
                <div class="CompleteTitle">根据业务需要，需要您补充提交以下资料</div>
                <div class="CompleteLine" v-for="(item,index) in completeList" :key="index">
                    {{item.BKE265}}
                    <span v-if="item.BKE266!=''">（{{item.BKE266}}）</span>
                    <!-- <span v-if="workStatus=='06'" style="color:#1492FF">已补充</span>23 -->
                </div>
            </div>
            <div v-if="workStatus=='06'" class="CompleteInfo">
                <div class="CompleteLine" style="color:#1492FF">材料已补充</div>
            </div>
        </div>
        <Success :flag="successFlag"></Success>
        <!-- 补齐材料提交 -->
        <Footer v-if="workStatus=='22'" @submit="complete()" btnText="补充材料" :canSubmit="true"></Footer>
        <!-- 底部 -->
        <!-- <Footer :btnType="2" v-if="currentStep==1" @backout="backout()" :handleNumber="handleNumber" @edit="edit()"></Footer> -->
    </div>
</template>

<script>
export default {
    data() {
        return {
            currentStep: 1,
            handleNumber: "",
            successFlag: 1,
            imgList1: [],
            imgList2: [],
            AAE036: "",
            BAE019: "",
            workStatus: "" //办件状态，02受理，22需补齐，06已补正
        };
    },
    created() {
        if (this.$route.query.param) {
            this.successFlag = 2;
        }
        this.epFn.setTitle("参保登记");
        this.request();
        this.request1();
    },
    methods: {
        back() {
            // this.$router.push('/')
        },
        edit() {
            this.$router.push("/elseWhere");
        },
        // 撤销提醒
        backout() {
            this.$messagebox.confirm("确定撤销吗?").then(() => {
                this.$router.push("/Index");
                this.$toast("撤销成功");
            });
        },
        request() {
            let params = this.formatSubmitData();
            this.$axios
                .post(this.epFn.ApiUrl() + "/h5/jy1009/getRecord", params)
                .then(resData => {
                    console.log("返回成功信息", resData);
                    //   成功   1000
                    if (resData.enCode == 1000) {
                        if (resData.LS_DS.length > 0) {
                            this.currentStep = Number(resData.LS_DS[0].BOD037);
                            this.workStatus = resData.LS_DS[0].BOD038;
                            //  获取补充材料
                            if (this.workStatus == "22") {
                                this.getCompleteInfo();
                            }
                        } else {
                            this.$toast("暂无状态信息");
                        }
                    } else if (resData.enCode == 1001) {
                        //   失败  1001
                        this.$toast(resData.msg);
                        return;
                    } else {
                        this.$toast("业务出错");
                    }
                });
        },
        request1() {
            let params = this.formatSubmitData1();
            this.$axios
                .post(this.epFn.ApiUrl() + "/h5/jy1016/info", params)
                .then(resData => {
                    console.log("返回info信息", resData);
                    //   成功   1000
                    if (resData.enCode == 1000) {
                        this.AAE036 = resData.AAE036;
                        this.BAE019 = resData.BAE019;
                        resData.LS_DS_16.photoList.forEach(ele => {
                            if (ele.PTX001 == "21") {
                                this.imgList1.push(ele.PUL002);
                            } else {
                                this.imgList2.push(ele.PUL002);
                            }
                        });
                        this.form = { ...this.form, ...LS };
                        console.log("form", this.form);
                    } else if (resData.enCode == 1001) {
                        //   失败  1001
                        this.$toast(resData.msg);
                    } else {
                        this.$toast("业务出错");
                        return;
                    }
                });
        },
        formatSubmitData() {
            let submitForm = {};

            submitForm.BKZ019 =
                this.$route.query.param ||
                this.$store.state.REGISTER_INFO.BKZ019 ||
                "";
            let LegalPerson = JSON.parse(sessionStorage.getItem("LegalPerson"));
            console.log("LegalPerson", LegalPerson);
            submitForm.AAC003 = LegalPerson.attnName;
            submitForm.AAE135 = LegalPerson.attnIDNo;

            // 请求参数封装
            const params = this.epFn.commonRequsetData(
                this.$store.state.SET_NATIVEMSG.PublicHeader,
                submitForm,
                "1009"
            );
            return params;
        },
        formatSubmitData1() {
            let submitForm = {};
            let AKC030 = sessionStorage.getItem("AKC030");
            submitForm.AGA002 = "确认-00122-002";
            //从进度查询页面进入接收传参
            if (this.$route.query.param) {
                submitForm.lx = "1";
                submitForm.BKZ019 =
                    this.$route.query.param ||
                    this.$store.state.REGISTER_INFO.BKZ019;
            } else {
                submitForm.lx = "2";
                submitForm.BKZ019 =
                    "" || this.$store.state.REGISTER_INFO.BKZ019;
            }
            let LegalPerson = JSON.parse(sessionStorage.getItem("LegalPerson"));
            console.log("LegalPerson", LegalPerson);
            submitForm.AAC003 = LegalPerson.attnName;
            submitForm.AAE135 = LegalPerson.attnIDNo;

            // 请求参数封装
            const params = this.epFn.commonRequsetData(
                this.$store.state.SET_NATIVEMSG.PublicHeader,
                submitForm,
                "1016"
            );
            return params;
        },
        // 获取补充材料
        getCompleteInfo() {
            let submitForm = { BKZ019: this.$route.query.param || "" };
            const params = this.epFn.commonRequsetData(
                this.$store.state.SET_NATIVEMSG.PublicHeader,
                submitForm,
                "1029"
            );
            this.$axios
                .post(this.epFn.ApiUrl() + "/h5/jy1029/expenseAccount", params)
                .then(resData => {
                    //   成功   1000
                    if (resData.enCode == 1000) {
                        this.completeList = resData.LS_DS1;
                    } else if (resData.enCode == 1001) {
                        //   失败  1001
                        this.$toast(resData.msg);
                        return;
                    } else {
                        this.$toast("业务出错");
                        return;
                    }
                });
        },
        // 补充材料
        complete() {
            this.$router.push({
                path: "/CompleteUpload",
                query: {
                    list: this.completeList,
                    BKZ019: this.$route.query.param,
                    AGA002: this.$route.query.AGA002,
                    route: "/registerFour"
                }
            });
        }
    }
};
</script>

<style lang="less" scoped>
.elseDetail {
    .content {
        // 补充材料
        .CompleteInfo {
            width: 100%;
            padding: 0.2rem 0.3rem 0.4rem 0.3rem;
            margin-top: 0.15rem;
            background: white;
            .CompleteTitle {
                font-size: 0.28rem;
                letter-spacing: 0;
                text-align: left;
            }
            .CompleteLine {
                padding: 0.2rem 0 0.1rem 0;
                text-align: left;
                font-size: 0.28rem;
                letter-spacing: 0;
            }
        }
    }
}
.picWrap {
    background-color: #fff;
    padding: 0.2rem;
    p {
        font-size: 0.32rem;
        text-align: left;
        margin-bottom: 0.3rem;
    }
    img {
        width: 100%;
    }
}
</style>
