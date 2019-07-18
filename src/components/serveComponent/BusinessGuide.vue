<template>
    <div class="businessGuide">
        <div class="businessHead">{{title}}</div>
        <div class="businessMenu" id="titleContent">
            <div class="MenuLine">
                <div class="MenuCell" @click="changeIndex(1)" :class="{'active': activeIndex == 1}">基本信息</div>
                <div class="MenuCell" @click="changeIndex(2)" :class="{'active': activeIndex == 2}">申请材料</div>
            </div>
        </div>
        <!-- 基本信息列表 -->
        <div class="Content" v-if="activeIndex == 1">
            <div class="ListInfo">
                <div class="InfoLine">
                    <div class="InfoName"><span>受理部门:</span></div>
                    <div class="InfoText"><span>XXXXX部</span></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>办事对象:</span></div>
                    <div class="InfoText"><span>参保人</span></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>法定期限:</span></div>
                    <div class="InfoText"><span>10 天</span></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>承诺期限:</span></div>
                    <div class="InfoText"><span>5 天</span></div>
                </div>
            </div>
            <div class="ListInfo">
                <div class="InfoLine">
                    <div class="InfoName"><span>权力事项类型:</span></div>
                    <div class="InfoText"><span>参保服务</span></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>权力来源:</span></div>
                    <div class="InfoText"><span>来源名称信息</span></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>责任处(科)室:</span></div>
                    <div class="InfoText"><span>XX科室</span></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>受理地址:</span></div>
                    <div class="InfoText"><span>地址信息地址信息地址信息地址信息</span></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>受理事件:</span></div>
                    <div class="InfoText"><span>2019-09-31</span></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>办件类型:</span></div>
                    <div class="InfoText"><span>人工办理</span></div>
                </div>
            </div>
            <div class="ListInfo">
                <div class="InfoLine">
                    <div class="InfoName"><span>申请条件:</span></div>
                    <div class="InfoText"><span>条件信息描述条件信息描述条件信息描述条件信息描述条件信息描述条件</span></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>申请限制:</span></div>
                    <div class="InfoText"><span>限制说明限制说明限制说明限制说明限制说明限制说明限制说明限制说明</span></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>办事流程:</span></div>
                    <div class="InfoText"><span>流程说明流程说明流程说明流程说明流程说明流程说明流程说明流程</span></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>收费情况:</span></div>
                    <div class="InfoText"><span>免费</span></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>法定依据:</span></div>
                    <div class="InfoText"><span>法定依据内容法定依据内容法定依据内容法定依据内容法定依据</span></div>
                </div>
            </div>
        </div>
        <div class="Content" v-if="activeIndex == 2">
            <div class="ListInfo">
                <div class="InfoLine">
                    <div class="InfoName"><span>材料名称:</span></div>
                    <div class="InfoText"><span>材料名称</span></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>材料描述:</span></div>
                    <div class="InfoText"><span>描述内容描述内容描述内容</span></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>材料要求:</span></div>
                    <div class="InfoText"><span>要求内容要求内容要求内容要求内容要求内容要求内容要求内容</span></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>备注:</span></div>
                    <div class="InfoText"><span>备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息</span></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            title: '基本医疗保险参保人员医疗费用零星报销',
            activeIndex: 1
        }
    },
    created () {
        console.log("1111",this.$route.query.param)
    },     
    methods:{
        changeIndex(index){
            this.activeIndex = index;
        },
        getList() {
            console.log(8888888888)
            // 封装数据
            let params = this.formatSubmitData();
            // 开始请求
            this.$axios.post(this.epFn.ApiUrl()+"/H5/jy9024/distanceHospital",params).then(resData => {
                console.log("返回成功信息11", resData);          
                console.log("返回成功信息", resData.LS_DS);
                //   成功   1000
                if (resData.enCode == 1000) {
                    
                    // this.$toast("提交成功");
                    if (resData.LS_DS.length > 0) {
                    this.List = [...this.List, ...resData.LS_DS];
                    let PAGE = Math.ceil(this.List.length / this.params.OUTNUMBER);
                    //向上取整
                    this.params.PAGE = PAGE;
                    // 总页数
                    if (resData.SPAGE > PAGE) {
                        this.params.PAGE += 1;
                        this.allLoaded = false;
                        sessionStorage.setItem("params", JSON.stringify(this.params));
                        // sessionStorage.setItem("pointList", JSON.stringify(this.List));
                    }else{
                        this.isShow = true
                    }
                    if(resData.SCOUNT<=15){
                        this.isShow = true
                        this.allLoaded = true;
                    }
                    sessionStorage.setItem("pointList", JSON.stringify(this.List));
                    sessionStorage.setItem("params", JSON.stringify(this.params));
                    // sessionStorage.setItem("params", JSON.stringify(this.params));
                    }else{
                        this.isShow = true
                    }
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
        formatSubmitData() {
        let submitForm = {};
        submitForm.PAGE = this.params.PAGE; //查询页数
        submitForm.AKA101 = this.params.AKA101; //医疗机构等级
        submitForm.OUTNUMBER = this.params.OUTNUMBER; //每页输出记录条数
        submitForm.JD = this.lng;//经度
        submitForm.WD = this.lat; //纬度
        submitForm.NAME = this.NAME; //医院名称
        // submitForm.AAA102 = this.params.AAA102; //模糊查询
        // submitForm.AAA100 = this.type; //机构参数
        // submitForm.AAE013 = this.AAE013 //关联性类别码
        // submitForm.AAA052 = this.AAA052  //关联性类别值
        // 加入用户名和电子社保卡号
        if (this.$store.state.SET_NATIVEMSG.name !== undefined) {
            submitForm.AAC003 = this.$store.state.SET_NATIVEMSG.name;
            submitForm.AAE135 = this.$store.state.SET_NATIVEMSG.idCard;
        } else {
            this.$toast("未获取到人员基本信息");
        }
        // 请求参数封装
        const params = this.epFn.commonRequsetData(
            this.$store.state.SET_NATIVEMSG.PublicHeader,
            submitForm,
            "9024"
        );
        return params;
        },
    },
}
</script>

<style lang="less" scoped>
.businessGuide{
    height: 100%;
    width: 100%;
    .businessHead{
        height: .63rem;
        width: 7.5rem;
        text-align: center;
        font-size: .32rem;
        line-height: .63rem;
        color: #000000;
        letter-spacing: 0;
        background: white;
    }
    .businessMenu {
        height: 1.2rem;
        width: 7.5rem;
        background: #FFF;
        display: flex;
        align-items: center;
        justify-content: center;
        .MenuLine {
            height: .62rem;
            width: 6.9rem;
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
        margin-bottom: 1.6rem;
        .ListInfo{
            width: 7.5rem;
            padding: 0 .3rem;
            margin-top: .15rem;
            background: white;
            &:first-child{
                margin-top: 0;
            }
            .InfoLine{
                // height: 1.2rem;
                position: relative;
                display: flex;
                font-size: .28rem;
                padding: .44rem 0;
                border-bottom: .01rem solid #D5D5D5;
                .InfoName{
                    width: 2.2rem;
                    text-align: left;
                    span{
                        line-height: .4rem;
                        color: #666;
                        letter-spacing: 0;
                    }
                }
                .InfoText{
                    height: auto;
                    width: 5rem;
                    letter-spacing: 0;
                    display: flex;
                    position: relative;
                    align-items: center;
                    span{
                        height: auto;
                        line-height: .4rem;
                        color: #000;
                        letter-spacing: 0;
                        text-align: left;
                    }
                }
                &:last-child{
                    border-bottom: none;
                }
            }
        }
    }
}
</style>