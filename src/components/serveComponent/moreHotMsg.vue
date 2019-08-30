<template>
    <div class="moreHotMsg">
        <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
            <!-- 列表 -->
            <div class="hotMsg">
                <div class="msgLine" v-for="(item,index) in hotMsg" :key="index" @click="goDetail(item)">
                    <div class="textBox">
                        <div class="textInfo">{{item.name | msgLength}}</div>
                        <div class="dateInfo">{{item.time}}</div>
                    </div>
                    <div class="imgBox"><img :src=item.src></div>
                </div>
            </div>
        </mt-loadmore>
        <div v-if="isShow">
            <div class="tip">没有更多事项了</div>
        </div>
        <!-- 更多资讯 -->
        <!-- <div class="hotMsg">
            <div class="msgLine" v-for="(item,index) in hotMsg" :key="index" @click="goDetail(item)">
                <div class="textBox">
                    <div class="textInfo">{{item.name | msgLength}}</div>
                    <div class="dateInfo">{{item.time}}</div>
                </div>
                <div class="imgBox"><img :src=item.src></div>
            </div>
        </div> -->
    </div>
</template>

<script>
export default {
    data() {
        return{
            allLoaded: true,
            isShow: false,
            hotMsg: [],
            userType: '', //用户类型
            areaId: '', //区域编码
            pageSize: '10',
            pageNum: 1,
        }
    },
    created() {
        this.epFn.setTitle('热点资讯')
        let userType = sessionStorage.getItem('userType')
        if(userType == '0' || userType == '1'){
            console.log("个人用户")
            this.userType = '1'
            this.areaId = sessionStorage.getItem("GinsengLandCode")
        }else{
            console.log("法人用户")
            this.userType = '2'
            let LegalPerson = JSON.parse(sessionStorage.getItem("LegalPerson"));
            if( LegalPerson.xzqh == '330000') {
                this.areaId  = '339900'
            }else{
  this.areaId = LegalPerson.xzqh
            }
          
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
            this.$router.push({
                path: "/goDetail",
                query: {
                    param: item
                }
            })
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
                this.hotMsg = [...this.hotMsg, ...resData.list]
                this.hotMsg.forEach(ele => {
                    ele.src = ele.synopsisUrl;
                })
                this.allLoaded = false
                this.pageNum++
                if(resData.list.length == 0){
                    this.allLoaded = true
                    this.isShow = true;
                }
                console.log('获取资讯列表', this.hotMsg);
            })
        },
        loadBottom() {
            console.log("加载")
            if (!this.allLoaded) {
                this.getNewsInfo();
            }
            this.allLoaded = true;
            this.$refs.loadmore.onBottomLoaded();
        },
    }
}
</script>

<style lang="less" scoped>
.moreHotMsg{
    .mint-loadmore{
        font-size: .28rem;
    }
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
    .tip{
        font-size: .28rem;
        line-height: .5rem;
        color: #999;
    }
}
</style>