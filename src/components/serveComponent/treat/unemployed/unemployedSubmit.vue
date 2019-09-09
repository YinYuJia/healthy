<template>
    <div class="unemployedSubmit">
        <div class="Content">
            <div class="CompleteTitle">根据业务需要，需要您补充提交以下资料</div>
            <!-- 附件1 -->
            <div class="CompleteLine">
                <div class="InfoText">1.《生育保险待遇申请表》<div class="downloadBtn" @click="downloadFile">下载申请表</div></div>
                <div class="PhotoBox">
                    <div class="ImgBox" v-if="BMC001PHOTO!=''">
                        <img :src="BMC001PHOTO"/>
                        <svg-icon @click="deleteImg('photo1')" icon-class="serveComponent_delete"></svg-icon>
                    </div>
                    <svg-icon @click="uploadImg(1)" icon-class="serveComponent_upload"></svg-icon>
                </div>
            </div>
            <!-- 附件2 -->
            <div class="CompleteLine">
                <div class="InfoText">2. 医疗诊断证明或出院记录（需要医院盖章）复印件一份</div>
                <div class="PhotoBox">
                    <div class="ImgBox" v-if="BMC002PHOTO!=''">
                        <img :src="BMC002PHOTO" />
                        <svg-icon @click="deleteImg('photo2')" icon-class="serveComponent_delete"></svg-icon>
                    </div>
                    <svg-icon @click="uploadImg(2)" icon-class="serveComponent_upload"></svg-icon>
                </div>
            </div>
            <!-- 附件3 -->
            <div class="CompleteLine">
                <div class="InfoText">3. 未就业承诺书及未就业证明原件（共两份）</div>
                <div class="PhotoBox">
                    <div class="ImgBox" v-for="(item,index) in BMC003PHOTO" :key="index">
                        <img :src="item" />
                        <svg-icon @click="deleteImg(index)" icon-class="serveComponent_delete"></svg-icon>
                    </div>
                    <svg-icon @click="uploadImg(3)" icon-class="serveComponent_upload"></svg-icon>
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
            bigPhotoUrl: '', //大图Url
            canSubmit: false, //是否可以提交
        };
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
        }
    },
    methods:{
        // 下载资料
        downloadFile() {
            let submitForm ={};
            let u = navigator.userAgent;
            let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            if(isiOS){
                console.log("是否为苹果设备",isiOS);
                submitForm.AAA001='TEMPLATE_URL_IOSXY';
            }else{
                submitForm.AAA001='TEMPLATE_URL_XY';
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
        uploadImg(index){
            if(index == 3){
                console.log('第三个',this.form.BMC003URL.length)
                if(this.form.BMC003URL.length >= 2){
                    this.$toast('该项最多上传两张照片')
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
                                    if(index == 1){
                                        this.BMC001PHOTO = data.picPath[0];
                                        this.form.BMC001URL = resData.photoId;
                                    }else if(index == 2){
                                        this.BMC002PHOTO = data.picPath[0];
                                        this.form.BMC002URL = resData.photoId;
                                    }else{
                                        this.BMC003PHOTO.push(data.picPath[0]);
                                        this.form.BMC003URL.push(resData.photoId);
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
        deleteImg(index){
            if(index == 'photo1'){
                this.BMC001PHOTO = '';
                this.form.BMC001URL = '';
            }else if(index == 'photo2'){
                this.BMC002PHOTO = '';
                this.form.BMC002URL = '';
            }else{
                this.BMC003PHOTO.splice(index,1);
                this.form.BMC003URL.splice(index,1);
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
            let fileInfo = this.form;
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
                AMC029: reportInfo.AMC029, //生育类别
                AKC264: totalCount, //发票总金额
                BKC013: invoiceLength, //发票张数
                BMC021: reportInfo.BMC021, //配偶姓名
                BMC202: reportInfo.BMC202, //配偶身份证号
                BKE200: reportInfo.BKE200, //附件提供方式
                AAE011: userInfo.AAC003, //申请人
                AAC003: userInfo.AAC003,
                BKE520: '1', //申请渠道,网上
                BMC001URL: fileInfo.BMC001URL, //生育保险待遇申请表
                BMC002URL: fileInfo.BMC002URL, //医疗诊断证明或出院记录复印件一份
                BMC003URL: fileInfo.BMC003URL.join(','), //未就业承诺书及未就业证明原件一份
                photoIdList: photoIdList.join(','), //发票附件
                userId: LegalPerson.userId //法人id
            }
            const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,"7214");
            return params;
        },
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