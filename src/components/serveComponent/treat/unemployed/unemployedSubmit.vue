<template>
    <div class="unemployedSubmit">
        <div class="Content">
            <div class="CompleteTitle">根据业务需要，需要您补充提交以下资料</div>
            <!-- 附件 -->
            <div class="CompleteLine" v-for="(item,index) in fileList" :key="index">
                <div class="InfoText">{{index+1}}.{{item.name}}<div class="downloadBtn" v-if="index==0||index ==1" @click="downloadFile(index)">下载申请表</div></div>
                <!-- 附件不是医疗诊断证明书等 -->
                <div class="PhotoBox" v-if="item.saveName != 'BMC008URL'">
                    <div class="ImgBox" v-if="item.url!=''">
                        <img :src="item.url" @click="showBigPhoto(item.url)" />
                        <svg-icon @click="deleteImg(index,item)" icon-class="serveComponent_delete"></svg-icon>
                    </div>
                    <svg-icon @click="uploadImg(index,item)" icon-class="serveComponent_upload"></svg-icon>
                </div>
                <!-- 附件是医疗诊断证明书等 -->
                <div class="PhotoBox" v-if="item.saveName == 'BMC008URL'">
                    <div class="ImgBox" v-for="(innerItem,innerIndex) in item.url" :key="innerIndex">
                        <img :src="innerItem" @click="showBigPhoto(innerItem)" />
                        <svg-icon @click="deleteImg(index,item,innerIndex)" icon-class="serveComponent_delete"></svg-icon>
                    </div>
                    <svg-icon @click="uploadImg(index,item)" icon-class="serveComponent_upload"></svg-icon>
                </div>
            </div>
        </div>
        <div class="HintContent">
            <i class="el-icon-warning" style="color:#1492ff"></i>
            <div class="HintText">
                <span>温馨提示</span>
                <span>图片格式为jpg、png，不大于2M的文件。</span>
            </div>
        </div>
        <Footer @submit="submit()" :canSubmit="canSubmit"></Footer>
        <!-- 大图展示 -->
        <PhotoView ref="photo" :imgUrl="bigImgUrl"></PhotoView>
    </div>
</template>

<script>
export default {
    data(){
        return {
            BMC001PHOTO: '', //生育保险待遇申请表照片
            BMC002PHOTO: '', //医疗诊断证明或出院记录复印件一份照片
            BMC003PHOTO: [], //未就业承诺书照片
            form: {
                BMC001URL: '', //生育保险待遇申请表URL
                BMC002URL: '', //医疗诊断证明或出院记录复印件一份
                BMC003URL: [] //未就业承诺书及未就业证明原件一份
            },
            bigImgUrl: '', //大图Url
            canSubmit: false, //是否可以提交
            fileList: [], //上传的文件列表
        };
    },
    created() {
        // 根据分类设置需要上传的资料
        let reportInfo = this.$store.state.SET_UNEMPLOYED_REPORT;
        switch(reportInfo.AMC099){
                case '1': this.fileList = [
                    {name: '《生育保险待遇申请表》',url: '',photoId:'',saveName:'BMC001URL'},
                    {name: '未就业承诺书一份',url: '',photoId:'',saveName:'BMC002URL'},
                    {name: '医疗诊断证明或出院记录（需要医院盖章）复印件一份',url: '',photoId:'',saveName:'BMC003URL'}
                ]; break;
                case '2': this.fileList = [
                    {name: '《生育保险待遇申请表》',url: '',photoId:'',saveName:'BMC001URL'},
                    {name: '未就业承诺书一份',url: '',photoId:'',saveName:'BMC002URL'},
                    {name: '从确认怀孕开始（末次月经）时间的病历复印件一份',url: '',photoId:'',saveName:'BMC004URL'},
                    {name: '医疗助产机构出具的流产或引产时间证明（需要医院盖章）复印件一份',url: '',photoId:'',saveName:'BMC005URL'}
                ]; break;
                case '3': this.fileList = [
                    {name: '《生育保险待遇申请表》',url: '',photoId:'',saveName:'BMC001URL'},
                    {name: '未就业承诺书一份',url: '',photoId:'',saveName:'BMC002URL'},
                    {name: '从确认怀孕开始（末次月经）时间的病历复印件一份',url: '',photoId:'',saveName:'BMC004URL'},
                    {name: '医疗助产机构出具的流产或引产时间证明（需要医院盖章）复印件一份',url: '',photoId:'',saveName:'BMC005URL'},
                    {name: '结婚证复印件一份',url: '',photoId:'',saveName:'BMC006URL'},
                    {name: '医疗诊断证明书、出院小结及住院费用明细汇总清单（需要医院盖章）复印件一份(共3份)',url: [],photoId:[],saveName:'BMC008URL'}
                ]; break;
                case '4': if(reportInfo.AMC029 == '12'){
                    this.fileList = [
                        {name: '《生育保险待遇申请表》',url: '',photoId:'',saveName:'BMC001URL'},
                        {name: '未就业承诺书一份',url: '',photoId:'',saveName:'BMC002URL'},
                        {name: '病历复印件一份',url: '',photoId:'',saveName:'BMC007URL'}
                    ];
                }else{
                    this.fileList = [
                        {name: '《生育保险待遇申请表》',url: '',photoId:'',saveName:'BMC001URL'},
                        {name: '未就业承诺书一份',url: '',photoId:'',saveName:'BMC002URL'},
                        {name: '病历复印件一份',url: '',photoId:'',saveName:'BMC007URL'},
                        {name: '结婚证复印件一份',url: '',photoId:'',saveName:'BMC006URL'}
                    ];
                } break;
                default: this.fileList = []; break;
            }
    },
    watch: {
        form:{
            handler: function(val){
                if(val.BMC001URL != '' && val.BMC002URL != '' && val.BMC003URL.length == 2){
                    this.canSubmit = true;
                }else{
                    this.canSubmit = false;
                }
            },
            deep: true
        },
        fileList:{
            handler: function(val){
                this.canSubmit = true;
                val.forEach(ele => {
                    if(ele.saveName != 'BMC008URL'){
                        if(ele.photoId == ''){
                            this.canSubmit = false;
                        }
                    }else{
                        if(ele.photoId.length < 3){
                            this.canSubmit = false;
                        }
                    }
                })
            },
            deep: true
        }
    },
    methods:{
        // 下载资料
        downloadFile(index) {
            let submitForm ={};
            let u = navigator.userAgent;
            let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            if(isiOS){
                console.log("是否为苹果设备",isiOS);
                console.log("index:", typeof(index))
                if(index == 0){
                    submitForm.AAA001 = 'TEMPLATE_URL_IOSXY'
                }else{
                    submitForm.AAA001 = 'TEMPLATE_URL_IOSJY'
                }
            }else{
                if(index == 0){
                    submitForm.AAA001 = 'TEMPLATE_URL_XY'
                }else{
                    submitForm.AAA001 = 'TEMPLATE_URL_JY'
                }
            }
            // 请求参数封装
            const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,"7212");
            this.$axios.post(this.epFn.ApiUrl()+ '/H5/templateUrl/getUrl', params).then((resData) => {
                //   成功   1000
                    if ( resData.enCode == 1000 ) {
                        let url=resData.fileUrl
                        this.$router.push({
                            path:'/natureDownload',
                            query:{params:url}
                        })
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
        // 上传材料
        uploadImg(index,item){
            if(item.saveName == 'BMC008URL'){
                if(item.photoId.length >= 3){
                    this.$toast('该项最多上传三张照片');
                    return;
                }
            }
            if(this.$isSdk){
                dd.ready({
                    developer: 'daip@dtdream.com',
                    usage: ['dd.device.notification.chooseImage',],
                    remark: '描述业务场景'
                }, ()=> {
                    dd.device.notification.chooseImage ({
                        onSuccess: (data)=> {
                            // SDK上传成功后请求后台
                            let LegalPerson = JSON.parse(sessionStorage.getItem('LegalPerson'));
                            let submitForm = {
                                photoList: data.picPath[0],
                                AAC003: LegalPerson.attnName,
                                AAE135: LegalPerson.attnIDNo,
                                AGA002: '给付-00142-003',
                                PTX001: '2'
                            };
                            let params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,'2006');
                            this.$axios.post(this.epFn.ApiUrl() + '/h5/jy2006/updPhoto', params).then((resData) => {
                                //   成功   1000
                                if ( resData.enCode == 1000 ) {
                                    if(item.saveName != 'BMC008URL'){
                                        this.fileList[index].url = data.picPath[0];
                                        this.fileList[index].photoId = resData.photoId;
                                    }else{
                                        this.fileList[index].url.push(data.picPath[0]);
                                        this.fileList[index].photoId.push(resData.photoId);
                                    }
                                }else if (resData.enCode == 1001 ) {
                                    this.$toast(resData.msg);
                                    return;
                                }else{
                                    return;
                                }
                            })
                        },
                        onFail: (error)=> {
                            this.$toast(error)
                        }
                    })
                })
            }
        },
        // 删除照片
        deleteImg(index,item,innerIndex){
            if(innerIndex == undefined){
                this.fileList[index].photoId = '';
                this.fileList[index].url = '';
            }else{
                this.fileList[index].photoId.splice(innerIndex,1);
                this.fileList[index].url.splice(innerIndex,1);
            }
        },
        // 提交
        submit(){
            if(this.canSubmit == false){
                return;
            }
            const params = this.formatSubmitData();
            console.log(params);
            this.$axios.post(this.epFn.ApiUrl() + '/h5/jy7214/updRecord', params).then((resData) => {
                console.log('返回成功信息',resData)
                //   成功   1000
                if ( resData.enCode == 1000 ) {
                    sessionStorage.setItem('UMEMPLOY_BKZ019',JSON.stringify(resData.BKZ019));
                    this.$router.push('/unemployedDetail');
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
        // 封装请求参数
        formatSubmitData() {
            // 法人信息
            let LegalPerson = JSON.parse(sessionStorage.getItem('LegalPerson'));
            // 申报信息
            let reportInfo = this.$store.state.SET_UNEMPLOYED_REPORT;
            // 申请人信息
            let userInfo = this.$store.state.SET_UNEMPLOYED_USERINFO;
            // 附件信息
            let fileInfo = [];
            for(let i = 1; i <= 8; i++){
                fileInfo[i] = '';
                for(let j = 0; j < this.fileList.length; j++){
                    if(i == Number(this.fileList[j].saveName[5])){
                        fileInfo[i] = this.fileList[j].photoId;
                    }
                }
            }
            // 最后一个附件
            let BMC008URL = '';
            if(fileInfo[8] != ''){
                BMC008URL = fileInfo[8].join(',');
            }
            // 发票信息
            let invoiceInfo = this.$store.state.SET_UNEMPLOYED_INVOICE;
            let totalCount = 0;
            let invoiceLength = 0;
            let photoIdList = [];
            if(invoiceInfo != null && invoiceInfo != undefined && invoiceInfo.length != 0){
                invoiceLength = invoiceInfo.length;
                invoiceInfo.forEach(ele => {
                    totalCount += Number(ele.AKC264);
                    photoIdList.push(ele.photoId);
                })
            }
            // 提交的信息
            let submitForm = {
                AAB301: LegalPerson.xzqh, //统筹区编码
                AAE135: LegalPerson.attnIDNo, //经办人身份证号
                AAC002: userInfo.AAC002, //员工证件号码
                BMC061: '0', //计划生育人员类别,先默认传0
                BMC131: Number(this.util.DateToNumber(reportInfo.BMC131)), //生育日期
                AMC099: reportInfo.AMC099, //生育分类
                AMC029: reportInfo.AMC029, //生育类别
                AKC264: totalCount, //发票总金额
                BKC013: invoiceLength, //发票张数
                BMC021: reportInfo.BMC021, //配偶姓名
                BMC202: reportInfo.BMC202, //配偶身份证号
                BKE200: reportInfo.BKE200, //附件提供方式
                AAE011: userInfo.AAC003, //申请人
                AAC003: userInfo.AAC003,
                BKE520: '1', //申请渠道,掌上
                BMC001URL: fileInfo[1], //生育保险待遇申请表
                BMC002URL: fileInfo[2], //未就业承诺书一份
                BMC003URL: fileInfo[3], //医疗诊断证明或出院记录（需要医院盖章）复印件一份
                BMC004URL: fileInfo[4], //从确认怀孕开始（末次月经）时间的病历复印件一份
                BMC005URL: fileInfo[5], //医疗助产机构出具的流产或引产时间证明（需要医院盖章）复印件一份
                BMC006URL: fileInfo[6], //结婚证复印件一份
                BMC007URL: fileInfo[7], //病历复印件
                BMC008URL: BMC008URL, //医疗诊断证明书、出院小结及住院费用明细汇总清单（需要医院盖章）复印件一份
                photoIdList: photoIdList.join(','), //发票附件
                userId: LegalPerson.userId //法人id
            }
            const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,"7214");
            return params;
        },
        showBigPhoto(val){
            this.bigImgUrl = val;
            this.$refs.photo.open();
        }
    }
}
</script>

<style lang="less" scoped>
.unemployedSubmit{
    margin-bottom: 2rem;
    .Content{
        width: 100%;
        background: #FFF;
        padding: .5rem .2rem .2rem .2rem;
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
                .downloadBtn{
                    width: 1.9rem;
                    height: .5rem;
                    background: #1492FF;
                    border-radius: .06rem;
                    font-size: .28rem;
                    color: #FFFFFF;
                    text-align: center;
                    line-height: .5rem;
                }
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
                    .svg-icon{
                        position: absolute;
                        height: .4rem;
                        width: .4rem;
                        top: -0.3rem;
                        right: -0.2rem;
                    }
                }
                .svg-icon{
                    margin-top: .1rem;
                    height: 1.5rem;
                    width: 1.5rem;
                }
            }

        }
    }
    .HintContent{
        display: flex;
        margin-top: .3rem;
        .el-icon-warning{
            font-size: .3rem;
            margin-left: .3rem;
        }
        .HintText{
            font-size: .28rem;
            color: #999999;
            letter-spacing: 0;
            margin-left: .2rem;
            span{
                display: block;
                text-align: left;
                &:last-child{
                    margin-top: .2rem;
                }
            }
        }
    }

}
</style>