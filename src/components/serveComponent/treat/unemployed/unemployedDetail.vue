<template>
    <div class="unemployedDetail">
        <div class="Content">
            <!-- 办事进度 -->
            <WorkProgress :currentStep="currentStep"></WorkProgress>
            <!-- 用户信息 -->
            <UserInfoPad :userInfo="userInfo"></UserInfoPad>
            <!-- 申报信息 -->
            <div class="reportInfo">
                <div class="InfoLine">
                    <div class="InfoName"><span>申请时间：</span></div>
                    <div class="InfoText">{{allInfo.AAE036}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>进度时间：</span></div>
                    <div class="InfoText">{{allInfo.BAE019}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>生育人员姓名：</span></div>
                    <div class="InfoText">{{allInfo.BMC021}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>生育人员社会保障号：</span></div>
                    <div class="InfoText">{{allInfo.BMC202}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>计划生育分类：</span></div>
                    <div class="InfoText">{{allInfo.AMC099|AMC099}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>计划生育类型：</span></div>
                    <div class="InfoText">{{allInfo.AMC029|AMC029}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>计划生育日期：</span></div>
                    <div class="InfoText">{{allInfo.BMC131}}</div>
                </div>
            </div>
            <!-- 发票信息 -->
            <div class="invoiceInfo" v-if="allInfo.photoList.length != 0">
                <!-- 发票提交方式 -->
                <div class="submitType">
                    <div class="submitName"><span>纸质发票提交方式:</span></div>
                    <div class="submitText">{{allInfo.BKE200|BKE200}}</div>
                </div>
                <!-- 发票列表 -->
                <div class="invoiceList" v-for="(item, index) in allInfo.photoList" :key="index">
                    <div class="infoLine">
                        <div class="infoName"><span>发票号</span></div>
                        <div class="infoText"><span class="active" @click="showBigPhoto(item.BKE554)">{{item.BKE100}}</span></div>
                    </div>
                    <div class="infoLine">
                        <div class="infoName"><span>发票金额</span></div>
                        <div class="infoText"><span>{{item.AKC264}}</span></div>
                    </div>
                    <div class="infoLine">
                        <div class="infoName"><span>发票日期</span></div>
                        <div class="infoText"><span>{{item.AAE036}}</span></div>
                    </div>
                </div>
            </div>
            <!-- 附件信息 -->
            <div class="fileInfo">
                <div class="CompleteTitle">附件</div>
                <!-- 附件1 -->
                <div class="CompleteLine" v-for="(item,index) in fileList" :key="index">
                    <div class="InfoText">{{index+1}}.{{item.name}}</div>
                    <!-- 当资料不为医疗诊断证明书等 -->
                    <div class="PhotoBox" v-if="item.saveName != 'BMC008URL' ">
                        <div class="ImgBox"><img @click="showBigPhoto(item.url)" :src="item.url"/></div>
                    </div>
                    <!-- 当资料为医疗诊断证明书等 -->
                    <div class="PhotoBox" v-if="item.saveName == 'BMC008URL' ">
                        <div class="ImgBox" v-for="(innerItem,innerIndex) in item.url" :key="innerIndex">
                            <img @click="showBigPhoto(innerItem)" :src="innerItem"/>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 成功标志 -->
            <Success :flag="successFlag"></Success>
            <!-- 大图展示 -->
            <PhotoView ref="photo" :imgUrl="bigImgUrl"></PhotoView>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            currentStep: 1,
            userInfo: {},
            successFlag: 1,
            allInfo: {photoList:[]}, //返回的信息
            bigImgUrl: '',
            fileList:[
                {name: '《生育保险待遇申请表》',saveName:'BMC001URL',url:''},
                {name: '未就业承诺书一份',saveName:'BMC002URL',url:''},
                {name: '医疗诊断证明或出院记录（需要医院盖章）复印件一份',saveName:'BMC003URL',url:''},
                {name: '从确认怀孕开始（末次月经）时间的病历复印件一份',saveName:'BMC004URL',url:''},
                {name: '医疗助产机构出具的流产或引产时间证明（需要医院盖章）复印件一份',saveName:'BMC005URL',url:''},
                {name: '结婚证复印件一份',saveName:'BMC006URL',url:''},
                {name: '病历复印件一份',saveName:'BMC007URL',url:''},
                {name: '医疗诊断证明书、出院小结及住院费用明细汇总清单（需要医院盖章）复印件一份(共3份)',saveName:'BMC008URL',url:''}
            ], //文件列表
        }
    },
    created() {
        this.epFn.setTitle('未就业配偶')
        if(this.$route.query.param){
            this.successFlag = 2;
        }
        this.request(); //办事进度
        this.getInfo(); //回显信息
    },
    methods: {
        //办事进度
        request() {
            let LegalPerson = JSON.parse(sessionStorage.getItem('LegalPerson'));
            let submitForm = {
                AGA002: '给付-00142-003',
                AAC003: LegalPerson.attnName,
                AAE135: LegalPerson.attnIDNo,
                BKZ019: this.$route.query.param || ""
            }
            // 请求参数封装
            const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,"1009");
            this.$axios.post(this.epFn.ApiUrl()+ '/h5/jy1009/getRecord', params).then((resData) => {
                //   成功   1000
                if ( resData.enCode == 1000 ) {
                    if (resData.LS_DS.length > 0 ) {
                       this.currentStep = Number(resData.LS_DS[0].BOD037)
                    }else{
                        this.$toast('暂无状态信息')
                    }
                }else if (resData.enCode == 1001 ) {
                //   失败  1001
                    this.$toast(resData.msg)
                    return;
                }else{
                    this.$toast("业务出错")
                    return;
                }
            })
        },
        // 回显信息
        getInfo() {
            let LegalPerson = JSON.parse(sessionStorage.getItem("LegalPerson"));
            let BKZ019 = '';
            let lx = '';
             if(this.$route.query.param){
                lx = '1';
                BKZ019 = this.$route.query.param
            }else{
                lx = '2';
                BKZ019 = JSON.parse(sessionStorage.getItem('UMEMPLOY_BKZ019'));
            }
            let submitForm = {
                AGA002: '给付-00142-003',
                AAC003: LegalPerson.attnName,
                AAE135: LegalPerson.attnIDNo,
                BKZ019: BKZ019,
                lx: lx,
            }
            // 请求参数封装
            const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,"1016");
            this.$axios.post(this.epFn.ApiUrl()+ '/h5/jy1016/info', params).then((resData) => {
                //   成功   1000
                if ( resData.enCode == 1000 ) {
                    this.allInfo = resData.LS_DS_20;
                    console.log('结果',this.allInfo)
                    // 发票信息
                    if(this.allInfo.photoList == undefined){
                        this.allInfo.photoList = [];
                    }
                    // 请求人员信息
                    this.getUserInfo(this.allInfo.AAC002);
                    // 将照片存入fileList
                    for(let i = 0; i < this.fileList.length; i++){
                        let name = 'BMC00' + (i + 1) + 'URL';
                        if(this.allInfo[name] != ''){
                            this.fileList[i].url = this.allInfo[name];
                            if((i + 1) == 8){
                                this.fileList[i].url = this.fileList[i].url.split(',');
                            }
                        }
                    }
                    for(let i = 0; i < this.fileList.length; i++){
                        if(this.fileList[i].url == ''){
                            this.fileList.splice(i,1);
                            i--;
                        }
                    }
                    console.log('文件列表111',this.fileList);
                }else if (resData.enCode == 1001 ) {
                    //   失败  1001
                    this.$toast(resData.msg);
                    return;
                }else{
                    this.$toast('业务出错');
                    return;
                }
            })
        },
        // 请求人员信息
        getUserInfo(AAC002) {
            let submitForm = {AAC002: AAC002}
            // 请求参数封装
            const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,"9109");
            this.$axios.post(this.epFn.ApiUrl() + '/h5/jy9109/getRecord', params).then((resData) => {
                if ( resData.enCode == 1000 ) {
                    // 存储申请人基本信息
                    this.userInfo = resData.LS_DS[0];
                }else if (resData.enCode == 1001 ) {
                    //   失败  1001
                    this.$toast(resData.msg);
                    return;
                }else{
                    this.$toast('业务出错');
                    return;
                }
            });
        },
        showBigPhoto(val){
            this.bigImgUrl = val;
            this.$refs.photo.open();
        }
    }
}
</script>

<style lang="less" scoped>
.unemployedDetail{
    .Content{
        // 申报信息
        .reportInfo{
            width: 100%;
            padding: 0 .2rem;
            background: white;
            .InfoLine{
                padding: .36rem 0;
                position: relative;
                font-size: .28rem;
                display: flex;
                border-bottom: .01rem solid #DDD;
                .InfoName{
                    width: 3rem;
                    text-align: left;
                    flex-shrink: 0;
                    span{
                        height: .4rem;
                        line-height: .4rem;
                        letter-spacing: 0;
                        color: #666;
                    }
                }
                .InfoText{
                    display: flex;
                    position: relative;
                    align-items: center;
                    text-align: left;
                    line-height: .4rem;
                    color: #000;
                }
                &:last-child{
                    border-bottom: none;
                }
            }
        }
        // 发票信息
        .invoiceInfo{
            padding: 0 .2rem;
            text-align: left;
            margin-top: .15rem;
            background: #FFF;
            // 发票提交方式
            .submitType{
                padding: .36rem 0;
                display: flex;
                justify-content: space-between;
                font-size: .28rem;
                border-bottom: 1px solid #DDD;
                .submitName{
                    width: auto;
                    flex-shrink: 0;
                    text-align: left;
                    span{
                        color: #666;
                        letter-spacing: 0;
                    }
                }
                .submitText{
                    width: 100%;
                    font-size: .28rem;
                    color: #000;
                    letter-spacing: 0;
                    text-align: right;
                }
            }
            // 发票列表
            .invoiceList{
                height: 2.4rem;
                padding: .42rem 0;
                border-bottom: 1px solid #DDD;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                position: relative;
                &:last-child{
                    border-bottom: none;
                }
                .infoLine{
                    font-size: .28rem;
                    display: flex;
                    .infoName{
                        width: 2rem;
                        span{
                            color: #666666;
                            letter-spacing: 0;
                        }
                    }
                    .infoText{
                        span{
                            color: #000000;
                            letter-spacing: 0;
                        }
                        .active{
                            color: #1492FF;
                        }
                    }
                }
            }
        }
        // 附件信息
        .fileInfo{
            width: 100%;
            background: #FFF;
            padding: .2rem;
            margin-top: 0.15rem;
            .CompleteTitle{
                font-size: .28rem;
                letter-spacing: 0;
                text-align: left;
            }
            .CompleteLine{
                padding: .26rem 0 .1rem 0;
                text-align: left;
                font-size: .28rem;
                letter-spacing: 0;
                .InfoText{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .PhotoBox{
                    padding-left: .3rem;
                    display: flex;
                    flex-wrap: wrap;
                    margin-top: .32rem;
                    .ImgBox{
                        height: 1.5rem;
                        width: 1.5rem;
                        margin-right: .25rem;
                        margin-top: .1rem;
                        position: relative;
                        img{
                            height: 100%;
                            width: 100%;
                        }
                    }
                }

            }
        }
    }
}
</style>