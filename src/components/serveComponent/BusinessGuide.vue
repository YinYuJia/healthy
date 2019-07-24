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
                    <div class="InfoText"><span>{{form.entrustedDept}}</span></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>法定期限:</span></div>
                    <div class="InfoText"><span>{{form.statutoryDeadline}}天</span></div>
                </div>
            </div>
            <div class="ListInfo">
                <div class="InfoLine">
                    <div class="InfoName"><span>权力事项类型:</span></div>
                    <div class="InfoText"><span>{{form.matType|matType}}</span></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>权力来源:</span></div>
                    <div class="InfoText"><span>{{form.rightSource|rightSource}}</span></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>责任处(科)室:</span></div>
                    <div class="InfoText"><span>{{form.leadDept}}</span></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>受理地址:</span></div>
                    <div class="InfoText"><span>{{form.entrustedDept}}</span></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>受理时间:</span></div>
                    <div class="InfoText"><span>{{form.acceptdate}}</span></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>办件类型:</span></div>
                    <div class="InfoText"><span>{{form.rightAttribute|rightAttribute}}</span></div>
                </div>
            </div>
            <div class="ListInfo">
                <div class="InfoLine">
                    <div class="InfoName"><span>办事流程:</span></div>
                    <div class="InfoText"><img :src="form.transactProcess"  @click="showBigPhoto(form.transactProcess)" /></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>法定依据:</span></div>
                    <div class="InfoText"><span class="htmlSpan" v-html="form.matSettingBasis"></span></div>
                </div>
            </div>
        </div>
        <div class="Content" v-if="activeIndex == 2">
                <div class="ListInfo"  v-for="(item,index) in itemArr" :key="index">
                <div class="InfoLine">
                    <div class="InfoName"><span>材料名称:</span></div>
                    <div class="InfoText"><span>{{item.materialName}}</span></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>材料描述:</span></div>
                    <div class="InfoText"><span>{{item.materialNecessityDesc}}</span></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>材料要求:</span></div>
                    <div class="InfoText"><span>{{item.materialDetailRequires}}</span></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>备注:</span></div>
                    <div class="InfoText"><span>{{item.memo}}</span></div>
                </div>
            </div>
        </div>
        
        <PhotoView ref="photo" :imgUrl="imgUrl"></PhotoView>
    </div>
</template>

<script>
import PhotoView from '../serveComponent/common/PhotoView'
export default {
    data(){
        return{
            imgUrl:"",
            title:"",
            activeIndex: 1,
            AGA002:"",//子项编码
            form:{},
            itemArr:[],
            SDK:""
        }
    },
    created () {
        let msg = '';
        let sdkTitle='';
        switch(this.$route.query.param){
            case '330800122043': msg = '领取基本医疗保险就医凭证',sdkTitle="领取就医凭证"; break; //领取就医凭证
            case '331400501005': msg = '基本医疗保险职工参保信息变更登记',sdkTitle="参保信息变更"; break; //参保信息变更
            case '331400512001': msg = '基本医疗保险关系转移',sdkTitle="医保转移接续"; break; //关系转移接续
            case '330800253013': msg = '基本医疗保险参保人员异地就医备案',sdkTitle="异地就医"; break; //异地就医
            case '330800253002': msg = '基本医疗保险参保人员转外就医备案',sdkTitle="转外就医"; break; //转外就医
            case '330800253001': msg = '基本医疗保险参保人员出国（境）带药备案',sdkTitle="出国带药"; break; //出国带药
            case '330800253023': msg = '基本医疗保险参保人员历年账户家庭共济备案',sdkTitle="家庭共济"; break; //家庭共济
            case '330800253003': msg = '基本医疗保险参保人员特治特药备案',sdkTitle="特治特药"; break; //特治特药
            case '330800253004': msg = '基本医疗保险参保人员规定（特殊慢性）病种备案',sdkTitle="规定病种（慢病）"; break; //规定病种（慢病）
            case '330600007019': msg = '基本医疗参保人员医疗费用零星报销',sdkTitle="零星报销"; break; //零星报销
            case '330800123004': msg = '基本医疗保险视同缴费年限核定',sdkTitle="缴费年限"; break; //缴费年限
        }
        this.title=msg;
        this.SDK=sdkTitle
        this.epFn.setTitle(this.SDK)
        if(this.$route.query.param){
            this.AGA002=this.$route.query.param;
            this.request();
        }
    },     
    methods:{
        // 查看大图
        showBigPhoto(val){
            this.imgUrl = val;
            this.$refs.photo.open();
        },
        changeIndex(index){
            this.activeIndex = index;
        },
        request() {
            console.log(8888888888)
            // 封装数据
            let params = this.formatSubmitData();
            // 开始请求
            this.$axios.post(this.epFn.ApiUrl()+"/H5/jy9014/queryItem",params).then(resData => {
                console.log("返回成功信息", resData);                  
                //   成功   1000
                if (resData.enCode == 1000) {
                    // this.form={...this.form,...resData.LS_DS2[]}
                    if(resData.LS_DS1[0]!=undefined){
                        this.itemArr=[...this.itemArr,...resData.LS_DS1]
                    }
                    if(resData.LS_DS0[0]!=undefined){
                        this.form={...this.form,...resData.LS_DS0[0]}
                    }
                    console.log(this.form.matSettingBasis)
                    // this.title=this.form.AGA004;
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
            submitForm.matCode = this.AGA002; //子项编码
            submitForm.matName = ""; //子项编码
            

            // 加入用户名和电子社保卡号
            // if (this.$store.state.SET_NATIVEMSG.name !== undefined) {
            //     submitForm.AAC003 = this.$store.state.SET_NATIVEMSG.name;
            //     submitForm.AAE135 = this.$store.state.SET_NATIVEMSG.idCard;
            // } else {
            //     this.$toast("未获取到人员基本信息");
            // }
            // 请求参数封装
            const params = this.epFn.commonRequsetData(
                this.$store.state.SET_NATIVEMSG.PublicHeader,
                submitForm,
                "9014"
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
        width: 100%;
        text-align: center;
        font-size: .32rem;
        line-height: .63rem;
        color: #000000;
        letter-spacing: 0;
        background: white;
    }
    .businessMenu {
        height: 1.2rem;
        width: 100%;
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
            width: 100%;
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
                    img{
                        width: 100%;
                    }
                    span{
                        height: auto;
                        width: 100%;
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