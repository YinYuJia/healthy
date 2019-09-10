<template>
    <div class="payLimitPic">
            <!-- 需要补充信息 -->
            <div class="payLimitTitle">附件上传</div>
            <div class="supplementInfo" v-if="ifShow">
                <div class="infoName">1.浙江省机关事业养老待遇计发(预发)表</div>
                <div class="photoBox">
                    <img :src="form.photoUrl1" @click="showBigPhoto(form.photoUrl1)" v-if="form.photoUrl1" class="pic">
                    <svg-icon @click="uploadImg1" icon-class="serveComponent_upload"/>
                </div>
            </div>
            <div>
                <div class="supplementInfo" v-if="!ifShow">
                    <div class="infoName">1.浙江省职工退休、退职审批表</div>
                    <div class="photoBox">
                        <img :src="form.photoUrl2" @click="showBigPhoto(form.photoUrl2)" v-if="form.photoUrl2" class="pic">
                        <svg-icon @click="uploadImg2" icon-class="serveComponent_upload" />
                    </div>
                </div>
                <div class="supplementInfo">
                    <div class="infoName">2.退休人员养老金预核发证明或退休人员养老金核定表</div>
                    <div class="photoBox">
                        <img :src="form.photoUrl3" @click="showBigPhoto(form.photoUrl3)" v-if="form.photoUrl3" class="pic">
                        <svg-icon @click="uploadImg3" icon-class="serveComponent_upload" />
                    </div>
                </div>
            </div>
            <PhotoView ref="photo" :imgUrl="imgUrl"></PhotoView>
            <Footer :canSubmit='canSubmit' @submit="submit()"></Footer>
    </div>
</template>
<script>
export default {
    data () {
        return {
            imgUrl:'',
            LS_DS:'',//简历数组
            canSubmit: false,
            form:{
                photoUrl1:'',
                photoId1:'',
                photoUrl2:'',
                photoId2:'',
                photoUrl3:'',
                photoId3:'',
            },
            ifShow:false
        }
    },
    created () {
        if(this.$route.query.AAB019){
            if(this.$route.query.AAB019=='11'){
                this.ifShow=true;
                console.log('机关')
            }else{
                this.ifShow=false;
                console.log('非机关')
            }
        }
    },
    watch: {
        form:{
            handler:function(val) {
                    if(val.photoId1!=''){
                        this.canSubmit=true
                        console.log('机关')
                    }else if(val.photoId2!=''&&val.photoId3!=''){
                        this.canSubmit=true
                        console.log('非机关')
                    }else{
                        this.canSubmit=false;
                    }
            },
            deep:true
        }
    },
    methods:{
        // 查看大图
        showBigPhoto(val){
            this.imgUrl = val;
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
                                let form=JSON.parse(sessionStorage.getItem('payLimitBaseInfo'))
                                submitForm.AAC003=form.AAC003;
                                submitForm.AAE135=sessionStorage.getItem('payLimitAAE135')
                                submitForm.AGA002 = '确认-00123-004'//住院
                                submitForm.photoList = data.picPath[0]
                                submitForm.PTX001 = '2'
                                const params = This.epFn.commonRequsetData(This.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,'2006');
                                // /h5/jy2006/updPhoto
                                This.$axios.post(This.epFn.ApiUrl() + '/h5/jy2006/updPhoto', params).then((resData) => {
                                    console.log('返回成功信息',resData)
                                    //   成功   1000
                                    if ( resData.enCode == 1000 ) {
                                        // 获取图片
                                        This.form.photoUrl1 = data.picPath[0]
                                        This.form.photoId1 = resData.photoId
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
                                let form=JSON.parse(sessionStorage.getItem('payLimitBaseInfo'))
                                submitForm.AAC003=form.AAC003;
                                submitForm.AAE135=sessionStorage.getItem('payLimitAAE135')
                                submitForm.AGA002 = '确认-00123-004'//住院
                                submitForm.photoList = data.picPath[0]
                                submitForm.PTX001 = '2'
                                const params = This.epFn.commonRequsetData(This.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,'2006');
                                // /h5/jy2006/updPhoto
                                This.$axios.post(This.epFn.ApiUrl() + '/h5/jy2006/updPhoto', params).then((resData) => {
                                    console.log('返回成功信息',resData)
                                    //   成功   1000
                                    if ( resData.enCode == 1000 ) {
                                        // 获取图片
                                        This.form.photoUrl2 = data.picPath[0]
                                        This.form.photoId2 = resData.photoId
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
        uploadImg3(){
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
                                let form=JSON.parse(sessionStorage.getItem('payLimitBaseInfo'))
                                submitForm.AAC003=form.AAC003;
                                submitForm.AAE135=sessionStorage.getItem('payLimitAAE135')
                                submitForm.AGA002 = '确认-00123-004'//住院
                                submitForm.photoList = data.picPath[0]
                                submitForm.PTX001 = '2'
                                const params = This.epFn.commonRequsetData(This.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,'2006');
                                // /h5/jy2006/updPhoto
                                This.$axios.post(This.epFn.ApiUrl() + '/h5/jy2006/updPhoto', params).then((resData) => {
                                    console.log('返回成功信息',resData)
                                    //   成功   1000
                                    if ( resData.enCode == 1000 ) {
                                        // 获取图片
                                        This.form.photoUrl3 = data.picPath[0]
                                        This.form.photoId3 = resData.photoId
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
            let params = this.formatSubmitData1();
            // 开始请求
            console.log('parmas------',params)
            this.$axios.post(this.epFn.ApiUrl() + '/h5/jy1025/addRecord', params).then((resData) => {
                console.log('返回成功信息',resData)
                //   成功   1000
                    if ( resData.enCode == 1000 ) {
                        this.$router.push("/payLimitDetail");
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
        formatSubmitData1(){
            let submitForm ={}
            // 日期传换成Number
            // submitForm.AAE030 = this.util.DateToNumber(this.form.AAE030)
            let form=JSON.parse(sessionStorage.getItem('payLimitBaseInfo'))
            submitForm.AAE135 = form.AAE135;
            submitForm.AAC003=form.AAC003;
            submitForm.BKE520 = "1"
            submitForm.AKC412 = form.AKC412;
            console.log(submitForm.AKC412)
            console.log(typeof submitForm.AKC412)
            submitForm.AAC004 = form.AAC004;
            submitForm.AAC006 = form.AAC006;
            submitForm.AAC007 = form.AAC007;
            submitForm.AAB001 = form.AAB001;
            console.log(typeof submitForm.AAB001)
            submitForm.AAB004 = form.AAB004;
            submitForm.BKE703 = form.BKE703;
            submitForm.BKE704 = form.BKE704;
            submitForm.AAE041 = sessionStorage.getItem('payLimitAAE041');
            submitForm.BKE810 = sessionStorage.getItem('payLimitBKE810');
            if(this.$route.query.AAB019){
                if(this.$route.query.AAB019=='11'){
                    submitForm.fileIdList=this.form.photoId1;
                    console.log('机关')
                }else{
                    submitForm.fileIdList=this.form.photoId2+','+this.form.photoId3;
                    console.log('非机关')
                }
            }
            
            submitForm.LS_DS=[];
            let arr=JSON.parse(sessionStorage.getItem('payLimitList'))
            submitForm.LS_DS =[...submitForm.LS_DS,...arr]
            console.log('LS',submitForm.LS_DS)
            let LegalPerson = JSON.parse(sessionStorage.getItem("LegalPerson"));
            submitForm.userId=LegalPerson.userId;//userId
            
            // 请求参数封装
            const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,"1025");
            return params;
        },
    }
}
</script>
<style lang="less">
    .payLimitPic{
        // 补充资料
        .payLimitTitle{
            background: #FFF;
            text-align: left;
            font-size: .36rem;
            color: #000000;
            font-weight: 900;
            padding-left: .3rem;
            padding-top: .2rem;
        }
        .supplementInfo{
            background: #FFF;
            font-size: .28rem;
            color: #000000;
            line-height: 38px;
            text-align: left;
            padding: .1rem .3rem;
            .infoName{
                letter-spacing: 0;
            }
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
            }
        }
    }
</style>