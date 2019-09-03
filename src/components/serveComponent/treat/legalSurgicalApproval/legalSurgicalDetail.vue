<template>
    <div class="SurgicalDetail">
        <div class="Content" v-if="type='01'">
            <div class="infoTitle">根据业务需要，需要您补充提交以下材料</div>
            <div style="display: flex;justify-content: space-between;height: .5rem;line-height: .5rem;">
                <div class="infoTitle">1.《生育保险待遇申请表》</div>
                <div class="down">下载申请表</div>
            </div>
            <div class="dataUpload">
                <div class="picWrap">
                    <div  v-for="(item,index) in applicationFormUrl" :key="index">
                        <div class="uploadBtn" v-if="applicationFormUrl.length != 0">
                            <img :src="item" class="pic"/>
                            <svg-icon icon-class="serveComponent_delete" @click="deletePic(item,index)" />
                        </div>
                    </div>
                    <svg-icon @click="uploadImg1" icon-class="serveComponent_upload" />
                </div>
            </div>
            <!-- <PhotoView ref="photo" :imgUrl="imgUrl"></PhotoView> -->
            <div v-if="type != '03'">
                <div class="infoTitle">2.从确认怀孕开始（末次月经）时间的病历复印件</div>
                <div class="dataUpload">
                    <div class="picWrap">
                        <div v-for="(item,index) in menstruationUrl" :key="index">
                            <div class="uploadBtn" v-if="menstruationUrl.length != 0">
                                <img :src="item" class="pic"/>
                                <svg-icon icon-class="serveComponent_delete" @click="deletePic(item,index)" />
                            </div>
                        </div>
                        <svg-icon @click="uploadImg2" icon-class="serveComponent_upload" />
                    </div>
                </div>
            </div>
            <div v-if="type != '03'">
                <div class="infoTitle">3.医疗助产机构出具的流产或引产时间证明复印件</div>
                <div class="dataUpload">
                    <div class="picWrap">
                        <div  v-for="(item,index) in abortionUrl" :key="index">
                            <div class="uploadBtn" v-if="abortionUrl.length != 0">
                                <img :src="item" class="pic"/>
                                <svg-icon icon-class="serveComponent_delete" @click="deletePic(item,index)" />
                            </div>
                        </div>
                        <svg-icon @click="uploadImg3" icon-class="serveComponent_upload" />
                    </div>
                </div>
            </div>
            <div v-if="type == '02'">
                <div class="infoTitle">4.结婚证复印件</div>
                <div class="dataUpload">
                    <div class="picWrap">
                        <div  v-for="(item,index) in marriageCertificateUrl" :key="index">
                            <div class="uploadBtn" v-if="marriageCertificateUrl.length != 0">
                                <img :src="item" class="pic"/>
                                <svg-icon icon-class="serveComponent_delete" @click="deletePic(item,index)" />
                            </div>
                        </div>
                        <svg-icon @click="uploadImg4" icon-class="serveComponent_upload" />
                    </div>
                </div>
            </div>
            <div v-if="type == '02'">
                <div class="infoTitle">5.病历、出院小结及住院费用明细汇总清单复印件一份</div>
                <div class="dataUpload">
                    <div class="picWrap">
                        <div v-for="(item,index) in expensesList" :key="index">
                            <div class="uploadBtn" v-if="expensesList.length != 0">
                                <img :src="item" class="pic"/>
                                <svg-icon icon-class="serveComponent_delete" @click="deletePic(item,index)" />
                            </div>
                        </div>
                        <svg-icon @click="uploadImg5" icon-class="serveComponent_upload" />
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
      
    
<script>
export default {
    created() {
        this.type = this.$route.query.type;
        console.log("type:", this.type)
    },
    data() {
        return {
            type: '',
            applicationFormUrl : '',
            menstruationUrl: '',
            abortionUrl: '',
            marriageCertificateUrl: '',
            expensesList: [],
            imgUrl: '',
            tag: 1,
            appId: '',
            menId: '',
            aboId: '',
            marId: '',
            expIdList: []
        }
    },
    methods: {
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
        deletePic(item,index){
            this.picArr.splice(index,1)
            this.picArrNum.splice(index,1)
            let picArrNum = JSON.parse(JSON.stringify(this.$store.state.SET_SMALL_REIM_2));
            picArrNum.invoicesImg = this.picArrNum
            this.$store.dispatch('SET_SMALL_REIM_2',picArrNum)

            let picArr = JSON.parse(JSON.stringify(this.$store.state.SET_ENCLOSURE));
            picArr = this.picArr
            this.$store.dispatch('SET_SMALL_REIM_2',picArr)
        },
        // 上传图片附件
        uploadImg(){
            if(this.tag == 1) {
                    if(this.applicationFormUrl.length>1){
                    this.$toast("申请表最多1张")
                    return
                }
            }
            if(this.tag == 2) {
                    if(this.menstruationUrl.length>1){
                    this.$toast("病历复印件最多1张")
                    return
                }
            }
            if(this.tag == 3) {
                    if(this.abortionUrl.length>1){
                    this.$toast("流产证明复印件最多1张")
                    return
                }
            }
            if(this.tag == 4) {
                    if(this.marriageCertificateUrl.length>1){
                    this.$toast("结婚证最多1张")
                    return
                }
            }
            if(this.tag == 5) {
                    if(this.expensesList.length>1){
                    this.$toast("出院小结等最多一张")
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
                            submitForm.photoList = resData.photoUrl;
                            // 类型为附件
                            submitForm.PTX001 = '2'
                            const params = this.epFn.commonRequsetData(submitForm,'2006');
                            // 图片上传后台
                            this.$axios.post(this.epFn.ApiUrl() + '/h5/jy2006/updPhoto', params).then((innerResData) => {
                            //   成功   1000
                            if ( innerResData.enCode == 1000 ) {
                                console.log("upload成功")
                                console.log("res---", innerResData)
                                if(this.flag == 1) {
                                this.applicationFormUrl = resData.photoUrl
                                this.appId = innerResData.photoId
                                }else if(this.flag == 2) {
                                    this.menstruationUrl = resData.photoUrl
                                    this.menId = innerResData.photoId
                                }else if(this.flag == 3) {
                                    this.abortionUrl = resData.photoUrl
                                    this.aboId = innerResData.photoId
                                }else if(this.flag == 4) {
                                this.marriageCertificateUrl = resData.photoUrl
                                this.marId = innerResData.photoId
                                }else if(this.flag == 5) {
                                    if (this.listIndex == 222) {
                                        this.expIdList.push(innerResData.photoId)
                                    } else {
                                    this.expIdList.splice(this.listIndex, 1, innerResData.photoId)
                                    }
                                }
                                let obj = {
                                    applicationFormUrl : this.appId,// 《生育保险待遇申请表》
                                    };
                                    this.$emit("upload1", obj)
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
                        this.$toast(error)
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
        .infoTitle {
            font-size: .28rem;
            text-align: left;
            margin-top: .2rem;
            margin-left: .3rem;
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
    }
}
</style>