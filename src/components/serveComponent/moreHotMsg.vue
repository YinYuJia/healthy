<template>
    <div class="moreHotMsg">
        <!-- 更多资讯 -->
        <div class="hotMsg">
            <div class="msgLine" v-for="(item,index) in hotMsg" :key="index" @click="goDetail(item)">
                <div class="textBox">
                    <div class="textInfo">{{item.name | msgLength}}</div>
                    <div class="dateInfo">{{item.time}}</div>
                </div>
                <div class="imgBox"><img :src=item.src></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return{
            hotMsg: [],
            userType: '', //用户类型
            areaId: '', //区域编码
            pageSize: '15',
            pageNum: '1'
        }
    },
    created() {
        this.epFn.setTitle('热点资讯')
        let userType = sessionStorage.getItem('userType')
        if(userType == '0' || userType == '1'){
            this.userType = '1'
            this.areaId = sessionStorage.getItem("GinsengLandCode")
        }else{
            this.userType = '2'
            let LegalPerson = JSON.parse(sessionStorage.getItem("LegalPerson"));
            this.areaId = LegalPerson.xzqh
        }
        this.getNewsInfo()
    },
    filters: {
        msgLength: function(val) {
            if (val.length > 20) {
                return val.slice(0, 20) + '...';
            } else {
                return val;
            }
        }
    },
    methods: {
        // 资讯跳转详情
        goDetail(item) {
            if(item == 'more'){
                this.$router.push({path:'/moreHotMsg'})
            }else{
                this.$router.push({
                    path: "/goDetail",
                    query: {
                        param: item
                    }
                })
            }
        },
        // 获取咨询列表
        getNewsInfo() {
            let params = {
                "areaId": this.areaId,
                "statusType": this.userType, //1代表个人2代表单位
                "pageNum": this.pageNum,
                "pageSize": this.pageSize
            };
            this.$axios.post(this.epFn.ApiUrl() + "/H5/jy0001/getAreaList", params).then((resData) => {
                this.hotMsg = resData.list;
                this.hotMsg.forEach(ele => {
                    ele.src = ele.synopsisUrl;
                })
                console.log('获取资讯列表', this.hotMsg);
            })
        },
    }
}
</script>

<style lang="less" scoped>
.moreHotMsg{
    .hotMsg {
        background: #FFF;
        padding: 0 .32rem;
        .msgLine {
            height: 2.24rem;
            padding: .32rem 0;
            display: flex;
            justify-content: space-between;
            border-bottom: .01rem solid#E5E5E5;
            .textBox {
                width: 4rem;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                .textInfo {
                    height: 1rem;
                    font-size: .36rem;
                    color: #000000;
                    letter-spacing: 0;
                    line-height: .48rem;
                    text-align: left;
                }
                .dateInfo {
                    font-size: .28rem;
                    color: #999999;
                    text-align: left;
                    line-height: .3rem;
                }
            }
            .imgBox {
                height: 1.6rem;
                width: 2.2rem;
                background: #EEE;
                border-radius: .05rem;
                img {
                    height: 100%;
                    width: 100%;
                    border-radius: .05rem
                }
            }
        }
    }
}
</style>