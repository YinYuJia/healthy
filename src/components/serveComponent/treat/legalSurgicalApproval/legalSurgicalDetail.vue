<template>
    <div class="SurgicalDetail">
        <div class="Content">
            <div class="infoTitle">根据业务需要，需要您补充提交以下材料</div>
            <div style="display: flex;justify-content: space-between;height: .5rem;line-height: .5rem;">
                <div class="infoTitle">1.《生育保险待遇申请表》</div>
                <div class="down" @click="getFileForm">下载申请表</div>
            </div>
            <div class="dataUpload">
                <div class="picWrap">
                    <div  v-for="(item,index) in applicationFormUrl" :key="index">
                        <div class="uploadBtn" v-if="applicationFormUrl.length != 0">
                            <img :src="item" class="pic"/>
                            <svg-icon icon-class="serveComponent_delete" @click="deletePic('ph1')" />
                        </div>
                    </div>
                    <svg-icon @click="uploadImg1" icon-class="serveComponent_upload" />
                </div>
            </div>
            <!-- <PhotoView ref="photo" :imgUrl="imgUrl"></PhotoView> -->
            <div>
                <div class="infoTitle">2.从确认怀孕开始（末次月经）时间的病历复印件</div>
                <div class="dataUpload">
                    <div class="picWrap">
                        <div v-for="(item,index) in menstruationUrl" :key="index">
                            <div class="uploadBtn" v-if="menstruationUrl.length != 0">
                                <img :src="item" class="pic"/>
                                <svg-icon icon-class="serveComponent_delete" @click="deletePic('ph2')" />
                            </div>
                        </div>
                        <svg-icon @click="uploadImg2" icon-class="serveComponent_upload" />
                    </div>
                </div>
            </div>
            <div v-if="type != '03'">
                <div class="infoTitle">3.医疗助产机构出具的流产或引产时间证明（需要医院盖章）复印件一份</div>
                <div class="dataUpload">
                    <div class="picWrap">
                        <div  v-for="(item,index) in abortionUrl" :key="index">
                            <div class="uploadBtn" v-if="abortionUrl.length != 0">
                                <img :src="item" class="pic"/>
                                <svg-icon icon-class="serveComponent_delete" @click="deletePic('ph3')" />
                            </div>
                        </div>
                        <svg-icon @click="uploadImg3" icon-class="serveComponent_upload" />
                    </div>
                </div>
            </div>
            <div v-if="type == '02' || visibleMar == true">
                <div class="infoTitle">{{number}}.结婚证复印件</div>
                <div class="dataUpload">
                    <div class="picWrap">
                        <div  v-for="(item,index) in marriageCertificateUrl" :key="index">
                            <div class="uploadBtn" v-if="marriageCertificateUrl.length != 0">
                                <img :src="item" class="pic"/>
                                <svg-icon icon-class="serveComponent_delete" @click="deletePic('ph4')" />
                            </div>
                        </div>
                        <svg-icon @click="uploadImg4" icon-class="serveComponent_upload" />
                    </div>
                </div>
            </div>
            <div v-if="type == '02'">
                <div class="infoTitle">5.医疗诊断证明书、出院小结及住院费用明细汇总清单（需要医院盖章）复印件一份（请上传三张）</div>
                <div class="dataUpload">
                    <div class="picWrap">
                        <div v-for="(item,index) in expensesList" :key="index">
                            <div class="uploadBtn" v-if="expensesList.length != 0">
                                <img :src="item" class="pic"/>
                                <svg-icon icon-class="serveComponent_delete" @click="deletePic(index)" />
                            </div>
                        </div>
                        <svg-icon @click="uploadImg5" icon-class="serveComponent_upload" />
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
            <!-- 按钮 -->
            <div class="SubmitBtn" @click="submit()" ref="submit">确认提交</div>
        </div>
    </div>

</template>
      
    
<script>
export default {
    created() {
        this.type = this.$route.query.params.type;
        this.AMC029 = this.$route.query.params.AMC029;
        this.BMC131 = this.$route.query.params.BMC131;
        this.AAC002 = this.$route.query.params.AAC002;
        this.BKE200 = this.$route.query.params.BKE200;
        this.photoIdList = this.$route.query.params.photoIdList;
        if(this.type == '02') {
            this.number = '4'
        } else if (this.type == '03') {
            this.number = '3'
        }
        console.log("type:", this.type)
        if(this.type == '03') {
            if(this.AMC029 == '12') {
                this.visibleMar = false
            } else {
                this.visibleMar = true
            }
        }
    },
    data() {
        return {
            number: '',
            BKE200: '',
            photoIdList: '',
            type: '',
            applicationFormUrl : [],
            menstruationUrl: [],
            abortionUrl: [],
            marriageCertificateUrl: [],
            expensesList: [],
            imgUrl: '',
            tag: 1,
            appId: '',
            menId: '',
            aboId: '',
            marId: '',
            expIdList: [],
            listIndex: 1,
            AMC029: '',
            BMC131: '',
            AAC002: '',
            visibleMar: false
        }
    },
    methods: {
        formatSubmitData2(){
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

            return params;
        },
        getFileForm(){
            console.log('获取表格')
            let params =this.formatSubmitData2();
            this.$axios.post(this.epFn.ApiUrl()+ '/H5/templateUrl/getUrl', params).then((resData) => {
                //   成功   1000
                    if ( resData.enCode == 1000 ) {
                        console.log('返回成功信息',resData)
                        let url=resData.fileUrl
                        this.$router.push({
                            path:'/natureDownload',
                            query:{params:url}
                        })
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
        submit() {
            let LegalPerson = JSON.parse(sessionStorage.getItem('LegalPerson'));
            let obj = {
                        'applicationFormUrl' : this.appId,// 《生育保险待遇申请表》
                        "AAE135": LegalPerson.attnIDNo,// 经办身份证
                        "userId": LegalPerson.userId,
                        'AAB301': '339900', //参保地统筹区编码
                        'AAC002': this.AAC002, //证件号码
                        'BMC061': '0',	//计划生育人员类别
                        'BMC131': this.BMC131,	//计划生育日期
                        'AMC029': this.AMC029, //计划生育类别
                        'AAE011': LegalPerson.attnName,	//申请人
                        'BKE520': '1',	//申请渠道
                        'type': this.type,//类型
                        };
                    if(this.type == '01') {
                        if(this.applicationFormUrl.length == 0 || this.menstruationUrl.length == 0 || this.abortionUrl.length == 0) {
                            this.$toast('请补全信息！');
                        } else {
                            obj.menstruationUrl = this.menId;// 从确认怀孕开始（末次月经）时间的病历复印件
                            obj.abortionUrl = this.aboId;//医疗助产机构出具的流产或引产时间证明（需要医院盖章）复印件一份
                            this.submitList(obj);
                        }
                    } else if (this.type == '02') {
                        if(this.applicationFormUrl.length == 0 || this.menstruationUrl.length == 0 || this.abortionUrl.length == 0 || this.marriageCertificateUrl.length == 0 || this.expensesList.length < 3) {
                            this.$toast('请补全信息！');
                        } else {
                            obj.menstruationUrl = this.menId;// 从确认怀孕开始（末次月经）时间的病历复印件
                            obj.abortionUrl = this.aboId;//医疗助产机构出具的流产或引产时间证明（需要医院盖章）复印件一份
                            obj.marriageCertificateUrl = this.marId;// 结婚复印证
                            obj.expensesUrl = this.expIdList.join();// 病历出院小结图片列表
                            obj.photoIdList = this.photoIdList;
                            obj.BKE200 = this.BKE200;
                            this.submitList(obj);
                        }
                    } else if (this.type == '03') {
                        if(this.visibleMar == true){
                            if(this.applicationFormUrl.length == 0 || this.menstruationUrl.length == 0 || this.marriageCertificateUrl.length == 0){
                                this.$toast('请补全信息！');
                            } else {
                                obj.menstruationUrl = this.menId;// 从确认怀孕开始（末次月经）时间的病历复印件
                                obj.marriageCertificateUrl = this.marId;// 结婚复印证
                                this.submitList(obj);
                            }
                        } else {
                            if(this.applicationFormUrl.length == 0||this.menstruationUrl.length == 0) {
                                this.$toast('请补全信息！');
                            } else {
                                obj.menstruationUrl = this.menId;// 从确认怀孕开始（末次月经）时间的病历复印件
                                this.submitList(obj);
                            }
                        }
                    }
        },
        submitList(obj) {
            console.log("obj", obj);
            this.$axios.post(this.epFn.ApiUrl()+'/h5/jy7213/getRecord', {
                     "data": obj,
                     "tradeCode": "7213"
                     }).then((resData) => {
                    console.log('返回提交信息', resData)
                    if (resData.enCode == 1000) {
                        sessionStorage.setItem("SURGICAL_BKZ019", resData.BKZ019);
                        sessionStorage.setItem("SURGICAL_AMC029", this.AMC029);
                        let params = {
                            type: this.type,
                        }
                        this.$router.push({path:'/legalSurgicalView', query: {params: params}})
                        sessionStorage.removeItem('SET_SURGICAL_INVOICELIST');
                        sessionStorage.removeItem('SET_SURGICAL_MESSAGE');
                    }  else if (resData.enCode == 1001 ) {
                    //   失败  1001
                        this.$toast(resData.msg);
                        return;
                    }else{
                        this.$toast('业务出错');
                        return;
                    }
                });
        },
        uploadImg1() {
            this.tag = 1;
            this.uploadImg()
        },
        uploadImg2() {
            this.tag = 2;
            this.uploadImg()
        },
        uploadImg3() {
            this.tag = 3;
            this.uploadImg()
        },
        uploadImg4() {
            this.tag = 4;
            this.uploadImg()
        },
        uploadImg5() {
            this.tag = 5;
            this.uploadImg()
        },
        // 查看大图
        showBigPhoto(val){
            this.imgUrl = val;
            this.$refs.photo.open();
        },
        // 删除图片
        deletePic(index){
            if(index == 'ph1') {
                this.applicationFormUrl = []
            } else if(index == 'ph2') {
                this.menstruationUrl = []
            }else if(index == 'ph3') {
                this.abortionUrl = []
            }else if(index == 'ph4') {
                this.marriageCertificateUrl = []
            }else{
                this.expensesList.splice(index,1);
                this.expIdList.splice(index, 1);
            }
        },
        // 上传图片附件
        uploadImg(){
            if(this.tag == 1) {
                    if(this.applicationFormUrl.length>0){
                    this.$toast("申请表最多1张")
                    return
                }
            }
            if(this.tag == 2) {
                    if(this.menstruationUrl.length>0){
                    this.$toast("病历复印件最多1张")
                    return
                }
            }
            if(this.tag == 3) {
                    if(this.abortionUrl.length>0){
                    this.$toast("流产证明复印件最多1张")
                    return
                }
            }
            if(this.tag == 4) {
                    if(this.marriageCertificateUrl.length>0){
                    this.$toast("结婚证最多1张")
                    return
                }
            }
            if(this.tag == 5) {
                    if(this.expensesList.length>2){
                    this.$toast("出院小结等最多三张")
                    return
                }
            }
            
            let This = this
            if(this.$isSdk){
                dd.ready({
                developer: 'daip@dtdream.com',
                usage: [
                    'dd.device.notification.chooseImage',
                ],
                remark: '描述业务场景'
                }, function() {
                dd.device.notification.chooseImage ({
                    onSuccess: function(data) {
                        console.log(data)
                        console.log(data.picPath[0],'请求图片成功');
                        if(data.result){
                            let LegalPerson = JSON.parse(sessionStorage.getItem('LegalPerson'));
                            let submitForm = {}; 
                            // 加入用户名和电子社保卡号
                            submitForm.AAC003 = LegalPerson.attnName;
                            submitForm.AAE135 = LegalPerson.attnIDNo;
                            submitForm.AGA002 ='给付-00142-002'
                            // 加入子项编码
                            // 加入图片URL
                            submitForm.photoList = data.picPath[0];
                            // 类型为附件
                            submitForm.PTX001 = '2'
                            const params = This.epFn.commonRequsetData(This.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,'2006');
                            // 图片上传后台
                            This.$axios.post(This.epFn.ApiUrl() + '/h5/jy2006/updPhoto', params).then((innerResData) => {
                            //   成功   1000
                            if ( innerResData.enCode == 1000 ) {
                                console.log("upload成功")
                                console.log("res---", innerResData)
                                console.log('tag:', typeof(This.tag))
                                if(This.tag == 1) {
                                    This.applicationFormUrl.push(data.picPath[0])
                                    This.appId = innerResData.photoId
                                }else if(This.tag == 2) {
                                    This.menstruationUrl.push(data.picPath[0])
                                    This.menId = innerResData.photoId
                                }else if(This.tag == 3) {
                                    This.abortionUrl.push(data.picPath[0])
                                    This.aboId = innerResData.photoId
                                }else if(This.tag == 4) {
                                    This.marriageCertificateUrl.push(data.picPath[0])
                                    This.marId = innerResData.photoId
                                }else if(This.tag == 5) {
                                    This.expensesList.push(data.picPath[0])
                                    This.expIdList.push(innerResData.photoId)
                                }
                                console.log("obj:", obj)
                        }else if (innerResData.enCode == 1001 ) {
                        //   失败  1001
                            return;
                        }else{
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
        
    }

}
</script>
    
<style lang="less" scoped>
.SurgicalDetail {
    .Content {
        background-color: #FFF;
        padding-top: .2rem;
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
        .infoTitle {
            font-size: .28rem;
            text-align: left;
            margin-top: .2rem;
            margin-left: .3rem;
            margin-right: .3rem;
        }
        .down {
            font-size: 0.28rem;
            text-align: right;
            margin-top: 0.2rem;
            width: 1.9rem;
            height: .5rem;
            border: 1px solid #1492FF;
            text-align: center;
            background: #1492FF;
            color: white;
            border-radius: .06rem;
            line-height: .5rem;
            margin-right: .3rem;
        }
        .dataUpload{
            background: #FFF;
            //margin: 0 0 1.4rem 0;
            padding: .37rem .4rem;
            .picWrap{
                display: flex;
                flex-wrap: wrap;
                margin-top: .2rem;
                .uploadBtn{
                    position: relative;
                    height: 1.5rem;
                    width: 1.5rem;
                    margin: .1rem .15rem 0 0;
                    img{
                        height: 100%;
                        width: 100%;
                    }
                    .svg-icon{
                            position: absolute;
                            height: .4rem;
                            width: .4rem;
                            top: -0.2rem;
                            right: -0.2rem;
                    }
                }
                .svg-icon{
                    margin: .1rem .15rem 0 0;
                    height: 1.5rem;
                    width: 1.5rem;
                }
            }
        }
        .SubmitBtn {
            margin-top: .2rem;
            height: 1.05rem;
            width: 100%;
            border-radius: .05rem;
            line-height: 1.05rem;
            margin-left: .3rem;
            margin-right: .3rem;
            width: 90%;
            font-family: PingFangSC-Regular;
            font-size: .36rem;
            letter-spacing: 0;
            text-align: center;
            background: #1492FF;
            color: #FFFFFF;
        }
    }
}
</style>