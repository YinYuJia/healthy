<template>
    <div class="searchPrint">
        <!-- 弹出框结束 -->
        <Title :title="'打印参保证明'" :backRouter="'/'"></Title>
        <div class="Content">
            <!-- 查询月数 -->
            <div class="SearchInfo">
                <div class="InfoLine" @click="goPrint('person')">
                    <div class="InfoName">
                        <span>个人参保证明（社保缴费证明）</span>
                    </div>
                    <div class="InfoText">
                        <div class="InfoText">
                            <svg-icon icon-class="serveComponent_arrowRight"></svg-icon>
                        </div>
                    </div>
                </div>
                <div class="InfoLine" @click="goPrint('all')">
                    <div class="InfoName">
                        <span>参保（合）凭证（仅限医保转移）</span>
                    </div>
                    <div class="InfoText">
                        <div class="InfoText">
                            <svg-icon icon-class="serveComponent_arrowRight"></svg-icon>
                        </div>
                    </div>
                </div>
                <div class="InfoLine" @click="submit">
                    <div class="InfoName">
                        <span>子女缴费证明</span>
                    </div>
                    <div class="InfoText">
                        <div class="InfoText">
                            <svg-icon icon-class="serveComponent_arrowRight"></svg-icon>
                        </div>
                    </div>
                </div>
                <div class="InfoLine" @click="goPrint('record')">
                    <div class="InfoName">
                        <span>个人权益记录单</span>
                    </div>
                    <div class="InfoText">
                        <div class="InfoText">
                            <svg-icon icon-class="serveComponent_arrowRight"></svg-icon>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
			visible: true,
			canClick: false
        };
    },
    watch: {},
    created() {
        this.epFn.setTitle("医保证明");
        if (this.$build == "2") {
            this.visible = false;
		}
		// 延迟后再让用户点击
		setTimeout(()=> {
			this.canClick = true;
		},200)
    },
    methods: {
        goPrint(item) {
			if(this.canClick == false){
				return;
			}
            this.$router.push({
                path: "/searchPrint",
                query: { printType: item }
            });
        },
        submit() {
			if(this.canClick == false){
				return;
			}
            let AAC002 = sessionStorage.getItem("idCard");
            console.log("AAC:", AAC002);
            this.$axios
                .post(this.epFn.ApiUrl() + "/H5/jy0003/getAreaList", {
                    AAC002: AAC002,
                    trade: "9027"
                })
                .then(resData => {
                    console.log(resData);
                    sessionStorage.setItem(
                        "searchPrintData",
                        JSON.stringify(resData)
                    );
                    if (resData.enCode == 1000) {
                        this.$router.push({path: "insuredDownload", query: {params: "子女缴费证明"}});
                    } else if (resData.enCode == 1001) {
                        this.$toast(resData.msg);
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }
};
</script>

<style lang="less" scoped>
.searchPrint {
    width: 100%;
    .Content {
        height: 100%;
        margin-bottom: 1.4rem;
        .SearchInfo {
            height: auto;
            width: 100%;
            background: white;
            padding: 0 0.3rem;
            .InfoLine {
                cursor: pointer;
                height: 1.2rem;
                position: relative;
                font-family: PingFangSC-Regular;
                font-size: 0.3rem;
                display: flex;
                justify-content: space-between;
                border-bottom: 1px solid #d5d5d5;
                .InfoName {
                    opacity: 0.85;
                    line-height: 1.2rem;
                    span {
                        height: 0.6rem;
                        line-height: 0.6rem;
                        color: #000000;
                        letter-spacing: 0;
                    }
                }
                .InfoText {
                    opacity: 0.85;
                    line-height: 1.2rem;
                    display: flex;
                    position: relative;
                    align-items: center;
                    input {
                        height: 0.6rem;
                        font-size: 0.3rem;
                        color: #000000;
                        letter-spacing: 0;
                        text-align: right;
                        border: none;
                    }
                }
                &:last-child {
                    border-bottom: none;
                }
            }
        }
    }
}
</style>

<style>
.searchPrint .el-select .el-input__inner {
    padding-right: 0;
    text-align: right;
    border: none;
}
.searchPrint .el-select .el-input__suffix .el-input__suffix-inner {
    display: none;
}
</style>
