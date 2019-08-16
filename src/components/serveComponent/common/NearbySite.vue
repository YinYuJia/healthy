<template>
    <div class="NearbySite">
        <div class="IndexMenu"  id="titleContent">
            <div class="MenuLine">
                <div class="MenuCell" @click="changeIndex(1)" :class="{'active': activeIndex == 1}" ref="disable" v-if='showHospital'>医院</div>
                <div class="MenuCell" @click="changeIndex(2)" :class="{'active': activeIndex == 2}">银行</div>
            </div>
        </div>
        <div class="Content">
            <ul class="ListInfo">
                <li class="InfoLine" v-for="(item,index) in pointList" :key="index">
                    <div class="InfoName">
                        <span class="Hospital">{{item.AKB021}}</span>
                        <div class="Msg">
                            <div class="IconImg">
                                <svg-icon icon-class="dizhi"/>
                            </div>
                            <span class="Address">
                                {{item.AAE006}}
                                <!-- <div class="IconImg" v-if="isPhone">
                                <svg-icon icon-class="dianhua"/>
                                </div> -->
                                
                            </span>
                        </div>
                        <div class="Server" v-if="unShow">
                            <div class="IconImg">
                                <svg-icon icon-class="keshi"/>
                            </div>
                            <span class="Hospital">{{item.AAE055}}</span>
                        </div>
                        <div class="Server" v-if="isShow">
                            <div class="IconImg">
                                <svg-icon icon-class="dianhua"/>
                            </div>
                            <span class="Hospital"><a class="Phone" v-if="item.AAE005" :href="`tel:${item.AAE005}`">{{item.AAE005}}</a></span>
                        </div>
                        <!-- <span class="Address" v-if="item.office">{{item.office}}</span>
                        <span class="Address"><a class="Address" v-if="item.AAE005" :href="`tel:${item.AAE005}`">{{item.AAE005}}</a></span> -->
                    </div>
                    <div class="Distance"><span>{{item.JL|ecimalPoint}}km</span></div>
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
            AAE006:"",//地址
            JL:"",//距离
            isShow:false,
            unShow:true,
            isPhone:false,
            pointStatus: '',
            showHospital:true
        };
    },
    created(){
        this.pointStatus = this.$route.query.pointStatus;
        console.log("11:", this.pointStatus);
        if (this.pointStatus == '2') {
          this.activeIndex = this.pointStatus;
          this.showHospital=false;
        //   this.showHospital=false;
            this.getSite1();
        }else{
            this.showHospital=true;
            this.getSite();
        }
      
        // this.getList('AKB020_JY'); //默认取医院网点
    },
    mounted() {
      if (this.pointStatus == '2') {
        this.$refs.disable.style.color = '#888';
        this.$refs.disable.style.border = "1px solid #888"
      }
    },
    //距离保留两位小数
    filters: {
        ecimalPoint:function(val){
            return val.toFixed(2)
        }
    },
    methods:{
        changeIndex(index){
            if (this.pointStatus == '2') {
              this.activeIndex = this.pointStatus;
              return;
            } else {
              this.activeIndex = index;
              if (index == 1) {
                this.getList9001();
              } else {
                this.getList9002();
              }
            }
        },
        getSite(){
            let _this = this;
                            dd.device.location.get ({
                    onSuccess: function(data) {
                        _this.longitude = data.longitude;
                        _this.latitude = data.latitude;
                        _this.getList9001();
                    },
                    onFail: function(error) {}
                })
        },
        getSite1(){
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
                        _this.getList9002();
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
            this.$axios.post(this.epFn.ApiUrl() + "/H5/jy9001/getRecord", params).then(resData => {
                //   成功   1000
                console.log("resData",resData)
                if (resData.enCode == 1000) {
                    console.log('成功')
                    this.pointList=[...this.pointList,...resData.LS_DS];
                    console.log("9001",this.pointList)
                    this.isShow=false;
                    this.unShow=true;
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
            this.$axios.post(this.epFn.ApiUrl() + "/H5/jy9002/getRecord", params).then(resData => {
                //   成功   1000
                console.log("resData",resData)
                if (resData.enCode == 1000) {
                    console.log('成功')
                    this.pointList=[...this.pointList,...resData.LS_DS];
                    console.log("9002",this.pointList)
                    this.isShow=true;
                    this.unShow=false;
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
                  border: 1px solid #1492FF;
                }
                &:last-child {
                    border-top-right-radius: .05rem;
                    border-bottom-right-radius: .05rem;
                    border-right: none;
                  border: 1px solid #1492FF;
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
                    .Msg{
                        width: 5.8rem;
                        line-height: .25rem;
                        .IconImg{
                            width: .3rem;
                            height: .3rem;
                            display: inline-block;
                            .svg-icon{
                                display:block;
                                width: 100%;
                                height: 100%;
                            }
                        }
                        .Address{
                            display: inline-block;
                            font-size: .24rem;
                            color: #999999;
                            letter-spacing: 0;
                            .Phone{
                                font-size: .24rem;
                                color: #999999;
                                letter-spacing: 0;
                            }
                        }
                    }
                    .Server{
                        line-height: .25rem;
                        .IconImg{
                            width: .3rem;
                            height: .3rem;
                            display: inline-block;
                            .svg-icon{
                                display:block;
                                width: 100%;
                                height: 100%;
                            }
                        }
                        .Hospital{
                            margin-top: .1rem;
                            font-size: .24rem;
                            color: #999999;
                            letter-spacing: 0;
                            .Phone{
                                font-size: .24rem;
                                color: #999999;
                                letter-spacing: 0;
                            }
                        }
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
