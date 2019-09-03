<template>
    <div class="natureApprovalSupplement">
        <div class="Content">
        <div class="title"><span>根据业务需要，需要您补充提交以下资料:</span></div>
        <!-- <div class="Hint">
            <svg-icon icon-class="redWarning"></svg-icon>
            <span>请选择下述附件内容进行上传<em>（图片格式为jpg、png，不大于2M的文件）</em></span>
        </div> -->
        <div class="Hint">
            <!-- <svg-icon icon-class="redWarning"></svg-icon> -->
            <div class="hint-left">1.《生育保险待遇申请表》</div>
            <div class="hint-right"><mt-button class="download" size="small" @click="getFileForm">下载原件</mt-button></div>
        </div>
        <!-- <button class="download" @click="getFileForm">下载原件</button> -->
        <!-- 需要补充信息 -->
        <div class="supplementInfo">
            <div class="photoBox">
                <img :src="form1.photoList1" @click="showBigPhoto(form1.photoList1[0])" v-if="form1.photoList1!=''" class="pic">
                <svg-icon @click="uploadImg1" icon-class="serveComponent_upload" />
                <!-- <svg-icon class="delete" icon-class="serveComponent_delete" @click="deletePic(item,index)" /> -->
            </div>
        </div>
        <div class="Hint">
            <!-- <svg-icon icon-class="redWarning"></svg-icon> -->
            <div class="hint-left">2. 医疗诊断证明或出院记录复印件</div>
            <div class="hint-right"></div>
        </div>
        <!-- <button class="download" @click="getFileForm">下载原件</button> -->
        <!-- 需要补充信息 -->
        <div class="supplementInfo">
            <div class="photoBox">
                <img :src="form1.photoList2" @click="showBigPhoto(form1.photoList2[0])" v-if="form1.photoList2!=''" class="pic">
                <svg-icon @click="uploadImg2" icon-class="serveComponent_upload" />
                <!-- <svg-icon icon-class="serveComponent_delete" @click="deletePic(item,index)" /> -->
            </div>
        </div>
        </div>
        <div class="Tip">
            <div class="HintContent">
                <p class="HintText">
                    <i class="el-icon-warning" style="color:#ff6204"></i> 温馨提示
                </p>
            </div>
            <p class="Tip1">图片格式为jpg、png，不大于2M的文件。</p>
        </div>
        <Footer :canSubmit='canSubmit' @submit="submit()"></Footer>
        <PhotoView ref="photo" :imgUrl="form1.imgUrl"></PhotoView>
    </div>
</template>

<script>
export default {
    data () {
        return {
            form1:{
                photoList1: [], //图片数组
                photoIdList1: [], //图片ID数组
                photoList2: [], //图片数组
                photoIdList2: [], //图片ID数组
            },
            form:{},
            canSubmit:false,
            imgUrl:'',
        }
    },
    created () {
        console.log('从填写信息页面来的数据1',this.$store.state.SET_NATUREAPPROVAL)
        console.log('从填写信息页面来的数据2',this.$store.state.SET_NATUREAPPROVAL_BASEINFO)
        console.log('从填写信息页面来的数据3',this.$store.state.SET_NATUREAPPROVAL_PHOTOLIST)
        if(this.$store.state.SET_NATUREAPPROVAL_PHOTOLIST.photoList1!=''||this.$store.state.SET_NATUREAPPROVAL_PHOTOLIST.photoList2!=''){
            this.form1=this.$store.state.SET_NATUREAPPROVAL_PHOTOLIST
            console.log(111)
        }
        
    },
    watch: {
        form1:{
            handler:function(val) {
                if(val.photoList1!=''&&val.photoList2!=''){
                    this.canSubmit=true
                }else{
                    this.canSubmit=false
                }
            },
            deep:true
        }
    },
    methods: {
        getFileForm(){
            console.log('获取表格')
            let params ={};
            params.AAA001='TEMPLATE_URL_XY'
            this.$axios.post(this.epFn.ApiUrl()+ '/H5/templateUrl/getUrl', params).then((resData) => {
                //   成功   1000
                    if ( resData.enCode == 1000 ) {
                        console.log('返回成功信息',resData)
                        let url=resData.fileUrl
                        window.open(url,"_blank")
                        console.log(1111)
                    }else if (resData.enCode == 1001 ) {
                    //   失败  1001
                        this.$toast(resData.msg)
                        return;
                    }else{
                        this.$toast('业务出错')
                        return;
                    }
            })
        },
        // 查看大图
        showBigPhoto(val){
            console.log("321321",val)
            this.form1.imgUrl = val;
            this.$refs.photo.open();
        },
        uploadImg1(){
            let This = this
            if(this.$isSdk){
                dd.ready({
                developer: 'daip@dtdream.com',
                usage: [
                    'dd.device.notification.chooseImage',
                ],
                remark: '描述业务场景'
                }, function() {
                    console.log('ready')
                    dd.device.notification.chooseImage ({
                        onSuccess: function(data) {

                            console.log(data.picPath[0],'请求图片成功');
                            if(data.result){
                                // 获取图片
                                let submitForm = {};
                                 // 加入用户名和电子社保卡号
                                let form2={}
                                form2=This.$store.state.SET_NATUREAPPROVAL_BASEINFO;
                                let form={}
                                form=This.$store.state.SET_NATUREAPPROVAL
                                submitForm.AAC003 = form2.AAC003;
                                submitForm.AAE135 = form2.AAC002; 
                                if(form.AMC029=='01'){
                                    submitForm.AGA002 ='给付-00142-001-01'//平产
                                }else if(form.AMC029=='02'){
                                    submitForm.AGA002 = '给付-00142-001-02'//剖宫产
                                }else if(form.AMC029=='03'){
                                    submitForm.AGA002 = '给付-00142-001-03'//助娩产
                                }
                                // 加入子项编码
                                // submitForm.AGA002 = '330600007019'
                                submitForm.photoList = data.picPath[0]
                                submitForm.PTX001 = '2'
                                const params = This.epFn.commonRequsetData(This.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,'2006');
                                // /h5/jy2006/updPhoto
                                This.$axios.post(This.epFn.ApiUrl() + '/h5/jy2006/updPhoto', params).then((resData) => {
                                    console.log('返回成功信息1',resData)
                                    //   成功   1000
                                    if ( resData.enCode == 1000 ) {
                                        // 获取图片
                                        console.log('1111',data.picPath[0])
                                        console.log('2222',resData.photoId)
                                        This.form1.photoList1=[];
                                        This.form1.photoIdList1=[];
                                        This.form1.photoList1.push(data.picPath[0])
                                        This.form1.photoIdList1.push(resData.photoId)
                                        This.$store.dispatch('SET_NATUREAPPROVAL_PHOTOLIST', This.form1)
                                    }else if (resData.enCode == 1001 ) {
                                    //   失败  1001
                                        This.$toast(resData.msg);
                                        return;
                                    }else{
                                        This.$toast('业务出错');
                                        return;
                                    }
                                })
                            }
                        },
                        onFail: function(error) {
                            This.$toast(error)
                            console.log("请求图片失败",error);

                        }
                    })
            })
            }

        },
        uploadImg2(){
            let This = this
            if(this.$isSdk){
                dd.ready({
                developer: 'daip@dtdream.com',
                usage: [
                    'dd.device.notification.chooseImage',
                ],
                remark: '描述业务场景'
                }, function() {
                    console.log('ready')
                    dd.device.notification.chooseImage ({
                        onSuccess: function(data) {

                            console.log(data.picPath[0],'请求图片成功');
                            if(data.result){
                                // 获取图片
                                let submitForm = {};
                                 // 加入用户名和电子社保卡号
                                let form2={}
                                form2=This.$store.state.SET_NATUREAPPROVAL_BASEINFO;
                                let form={}
                                form=This.$store.state.SET_NATUREAPPROVAL
                                submitForm.AAC003 = form2.AAC003;
                                submitForm.AAE135 = form2.AAC002; 
                                if(form.AMC029=='01'){
                                    submitForm.AGA002 ='给付-00142-001-01'//平产
                                }else if(form.AMC029=='02'){
                                    submitForm.AGA002 = '给付-00142-001-02'//剖宫产
                                }else if(form.AMC029=='03'){
                                    submitForm.AGA002 = '给付-00142-001-03'//助娩产
                                }
                                // 加入子项编码
                                // submitForm.AGA002 = '330600007019'
                                submitForm.photoList = data.picPath[0]
                                submitForm.PTX001 = '2'
                                const params = This.epFn.commonRequsetData(This.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,'2006');
                                // /h5/jy2006/updPhoto
                                This.$axios.post(This.epFn.ApiUrl() + '/h5/jy2006/updPhoto', params).then((resData) => {
                                    console.log('返回成功信息1',resData)
                                    //   成功   1000
                                    if ( resData.enCode == 1000 ) {
                                        // 获取图片
                                        console.log('1111',data.picPath[0])
                                        console.log('2222',resData.photoId)
                                        This.form1.photoList2=[];
                                        This.form1.photoIdList2=[];
                                        This.form1.photoList2.push(data.picPath[0])
                                        This.form1.photoIdList2.push(resData.photoId)
                                        This.$store.dispatch('SET_NATUREAPPROVAL_PHOTOLIST', This.form1)
                                    }else if (resData.enCode == 1001 ) {
                                    //   失败  1001
                                        This.$toast(resData.msg);
                                        return;
                                    }else{
                                        This.$toast('业务出错');
                                        return;
                                    }
                                })
                            }
                        },
                        onFail: function(error) {
                            This.$toast(error)
                            console.log("请求图片失败",error);

                        }
                    })
            })
            }

        },
        submit(){
            // 封装数据
            let params = this.formatSubmitData();
            // 开始请求
            console.log('parmas------',params)
            this.$axios.post(this.epFn.ApiUrl() + '/h5/jy7212/getRecord', params).then((resData) => {
                console.log('返回成功信息',resData)
                   //   成功   1000
                if ( resData.enCode == 1000 ) {
                    this.setSession('NATURE_BKZ019',resData.BKZ019)
                    console.log("form",this.form)
                    this.$router.push('/natureApprovalDetail')
                }else if (resData.enCode == 1001 ) {
                //   失败  1001
                    this.$message({
                        message: resData.msg,
                        type: 'warning'
                    });
                    return;
                }else{
                    this.$message({
                        message: '业务出错',
                        type: 'warning'
                    });
                    return;
                }
            });
        },
        formatSubmitData(){
            let submitForm ={};
            let legalPerson=JSON.parse(sessionStorage.getItem("LegalPerson"))
            console.log('法人',legalPerson)
            let form={};
            form=this.$store.state.SET_NATUREAPPROVAL;
            let form2={};
            form2=this.$store.state.SET_NATUREAPPROVAL_BASEINFO;
            if(form.AMC029=='01'){
                submitForm.AGA002 ='给付-00142-001-01'//平产
            }else if(form.AMC029=='02'){
                submitForm.AGA002 = '给付-00142-001-02'//剖宫产
            }else if(form.AMC029=='03'){
                submitForm.AGA002 = '给付-00142-001-03'//助娩产
            }
            // submitForm.AGA002 =  "330600007019";
            //从进度查询页面进入接收传参
            if(this.$route.query.param){
                submitForm.lx="1";
                submitForm.BKZ019=this.$route.query.param||"";
            }else{
                submitForm.lx="2";
                submitForm.BKZ019="";
            }
            submitForm.AAC002 = form.AAE135//被操作人员身份证号
            submitForm.AAC004 = form2.AAC004//性别
            submitForm.AAC006 = form.AAC006//出生日期
            submitForm.BMC061 = form.BMC061//生育类别 0生育女职工,1男职工配偶
            submitForm.BMC131 = form.BMC131//生育日期
            submitForm.AMC029 = form.AMC029//生育类别 01平产、02助娩产、03剖宫产
            submitForm.AMC028 = form.AMC028//胎儿数
            submitForm.AMC031 = form.AMC031//胎次
            submitForm.BMC046 = form.BMC046//其中死胎
            submitForm.BMC211 = form.BMC211//实际发生费用
            submitForm.BMC033 = form.BMC033//实际住院天数
            submitForm.AMC027 = form.AMC027//晚育标志 0否1是
            submitForm.BMC035 = form.BMC035//准生证号
            submitForm.AMC022 = form.AMC022//出生证编号
            submitForm.BMC065 = form.BMC065//医疗机构
            submitForm.AAE135 = legalPerson.attnIDNo;//经办人证件号码
            submitForm.AAE011 = legalPerson.attnName
            submitForm.AAB301 = legalPerson.xzqh
            submitForm.userId = legalPerson.userId
            
            
            submitForm.BKE520 = '1'//申请渠道
            submitForm.applicationFormUrl = this.form1.photoIdList1//申请表
            submitForm.medicalUrl =this.form1.photoIdList2//证明
            // 请求参数封装
            const params = this.epFn.commonRequsetData(submitForm,"7212");

            return params;
        },
    }    
}

</script>
<style lang="less" scoped>
.natureApprovalSupplement{
    height: 100%;
    width: 100%;
    position: relative;
    .Content{
        width: 100%;
        height: 6.3rem;
        background: #FFFFFF;
        padding: 0 .3rem;
        .title{
            background: #FFF;
            text-align: left;
            span{
                font-family: FZLTXHKM;
                font-size: .28rem;
                color: #000000;
                letter-spacing: 0;
                height: .28rem;
            }
        }
        // 补充资料
        .supplementInfo{
            background: #FFF;
            font-size: .28rem;
            color: #000000;
            line-height: 38px;
            text-align: left;
            padding: .1rem .3rem;
            .photoBox{
                text-align: left;
                .svg-icon{
                    height: 1.5rem;
                    width: 1.5rem;
                }
                .pic{
                    width:1.5rem;
                    height: 1.5rem;
                }
                .delete{
                    position: relative;
                    height: .4rem;
                    width: .4rem;
                    top: -0.2rem;
                    right: -0.2rem;
                }
            }
        }
        .Hint{
            margin-top: .29rem;
            height: .4rem;
            display: flex;
            justify-content: space-around;
            .hint-left{
                width: 100%;
                height: 100%;
                font-size: .28rem;
                text-align: left;
            }
            .hint-right{
                width: 2.5rem;
                height: .5rem;
                line-height: .5rem;
                border-radius: .06rem;
                position: relative;
                text-align: right;
                .download{
                    position: relative;
                    top: -.3rem;
                    background: #1492FF;
                    border-radius: .06rem;
                    width: 100%;
                    height: 100%;
                    color: #FFF;
                    font-size: .28rem;
                    outline: none;
                }
            }

        }
    }
    .Tip {
        width: 100%;
        height: 100%;
        margin-top: .3rem;
        font-size: .28rem;
        color: #999999;
        text-align: left;
        white-space: nowrap;
        overflow: hidden;
        .HintContent {
            .HintText{
                margin-left: .3rem;
            }
            p {
                display: inline-block;
                line-height: .6rem;
            }
            .padding {
                padding-right: 100%;
            }
        }
        .Tip1{
            margin-left: .7rem;
        }
    }
}
</style>