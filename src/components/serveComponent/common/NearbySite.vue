<template>
    <div class="NearbySite">
        <div class="IndexMenu" id="titleContent">
            <div class="MenuLine">
                <div class="MenuCell" @click="changeIndex(1)" :class="{'active': activeIndex == 1}">医院</div>
                <div class="MenuCell" @click="changeIndex(2)" :class="{'active': activeIndex == 2}">银行</div>
            </div>
        </div>
        <div class="Content">
            <ul class="ListInfo">
                <li class="InfoLine" v-for="(item,index) in pointList" :key="index">
                    <div class="InfoName">
                        <span class="Hospital">{{item.AAA103}}</span>
                        <span class="Address">{{item.addr}}</span>
                        <span class="Address" v-if="item.office">{{item.office}}</span>
                        <a class="Address" v-if="item.phone" :href="`tel:${item.phone}`">{{item.phone}}</a>
                    </div>
                    <div class="Distance"><span>0m</span></div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            activeIndex: 1,
            pointList: [],
            longitude: 0, //经度
            latitude: 0, //纬度
            AKB021:"",//医疗机构名称
            AAE009:""//银行名称
        };
    },
    created(){
        this.getSite();
        // this.getList('AKB020_JY'); //默认取医院网点
    },
    methods:{
        changeIndex(index){
            this.activeIndex = index;
            if(index == 1){
                this.getList9001();
            }else{
                this.getList9002();
            }
        },
        getSite(){
            let _this = this;
            dd.ready({
                developer: 'daip@dtdream.com',
                usage: [
                    'dd.device.location.get',
                ],
                remark: '获取坐标'
                }, 
                function() {
                dd.device.location.get ({
                    onSuccess: function(data) {
                        _this.longitude = data.longitude;
                        _this.latitude = data.latitude;
                        _this.getList9001();
                    },
                    onFail: function(error) {}
                })
            })
        },
        // 请求列表
        getList9001() {
            this.pointList = [];
            // 封装数据
            let params = this.formatSubmitData();
            // 开始请求
            this.$axios.post(this.epFn.ApiUrl() + "/h5/9001/getRecord", params).then(resData => {
                //   成功   1000
                console.log("resData",resData)
                if (resData.enCode == 1000) {
                    console.log('成功')
                    // this.pointList = [...this.pointList, ...resData.LS_DS];
                    // for (let i = 0; i < this.pointList.length; i++) {
                    //     let mesString = this.pointList[i].AAA105;
                    //     this.pointList[i].phone =mesString.split(',')[0];
                    //     this.pointList[i].addr = mesString.split(',')[1];
                    //     this.pointList[i].office = mesString.split(',')[2];
                    // }
                } else if (resData.enCode == 1001) {
                    return;
                } else {
                    return;
                }
            });
        },
        getList9002() {
            this.pointList = [];
            // 封装数据
            let params = this.formatSubmitData();
            // 开始请求
            this.$axios.post(this.epFn.ApiUrl() + "/h5/9002/getRecord", params).then(resData => {
                //   成功   1000
                console.log("resData",resData)
                if (resData.enCode == 1000) {
                    console.log('成功')
                    // this.pointList = [...this.pointList, ...resData.LS_DS];
                    // for (let i = 0; i < this.pointList.length; i++) {
                    //     let mesString = this.pointList[i].AAA105;
                    //     this.pointList[i].phone =mesString.split(',')[0];
                    //     this.pointList[i].addr = mesString.split(',')[1];
                    //     this.pointList[i].office = mesString.split(',')[2];
                    // }
                } else if (resData.enCode == 1001) {
                    return;
                } else {
                    return;
                }
            });
        },
        // 请求封装
        formatSubmitData() {
            let submitForm = {};
            submitForm.JD=this.longitude;
            submitForm.WD=this.latitude;
            submitForm.AKB021=this.AKB021;
            // 加入用户名和电子社保卡号
            submitForm.AAC003 = this.$store.state.SET_NATIVEMSG.name;
            submitForm.AAE135 = this.$store.state.SET_NATIVEMSG.idCard;
            // 请求参数封装
            const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader,submitForm, "9001");
            return params;
        },
        formatSubmitData1() {
            let submitForm = {};
            submitForm.JD=this.longitude;
            submitForm.WD=this.latitude;
            submitForm.AAE009=this.AAE009;
            // 加入用户名和电子社保卡号
            submitForm.AAC003 = this.$store.state.SET_NATIVEMSG.name;
            submitForm.AAE135 = this.$store.state.SET_NATIVEMSG.idCard;
            // 请求参数封装
            const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader,submitForm, "9002");
            return params;
        },
    }
}
</script>

<style lang="less" scoped>
.NearbySite{
    width: 100%;
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
    .Content{
        background: #FFF;
        padding: 0 .2rem;
        .ListInfo{
            .InfoLine{
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: .2rem 0 .25rem 0;
                border-bottom: .01rem solid #DDDDDD;
                &:last-child{
                    border-bottom: none;
                }
                .InfoName{
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    text-align: left;
                    .Hospital{
                        font-size: .28rem;
                        color: #000000;
                        letter-spacing: 0;
                    }
                    .Address{
                        margin-top: .1rem;
                        font-size: .24rem;
                        color: #999999;
                        letter-spacing: 0;
                    }
                }
                .Distance{
                    display: flex;
                    align-items: center;
                    span{
                        font-size: .24rem;
                        color: #999999;
                        letter-spacing: 0;
                    }
                }
            }
        }
    }
}
</style>