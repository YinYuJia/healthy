<template>
    <div class="CompleteUpload">
        <div class="Content">
            <div class="CompleteTitle">根据业务需要，需要您补充提交以下资料</div>
            <div class="CompleteLine" v-for="(item,index) in completeList" :key="index">
                <div class="InfoText">{{item.BKE265}}<span v-if="item.BKE266!=''">（{{item.BKE266}}）</span></div>
                <div class="PhotoBox">
                    <div class="ImgBox" v-if="item.imgUrl != ''">
                        <img  :src="item.imgUrl" @click="showBigPhoto(item.imgUrl)" />
                    </div>
                    <svg-icon @click="uploadImg(index)" icon-class="serveComponent_upload"></svg-icon>
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
        <PhotoView ref="photo" :imgUrl="imgUrl"></PhotoView>
        <Footer @submit="submit()" :canSubmit="canSubmit"></Footer>
    </div>
</template>

<script>
export default {
    data(){
        return{
            imgUrl: '',
            completeList:[], //补充材料数组
            photoIdList: [], //照片ID数组
            BKZ019: '', //经办编号
            AGA002: '', //子项编码
            route: '', //需跳转的路由
        };
    },
    created(){
        if(this.$route.query.list[0].BKE266 == undefined){
            window.history.go(-3);
        }
        // 获取需要补充的材料清单
        this.completeList = this.$route.query.list
        this.completeList.forEach(ele => {
            ele.imgUrl = ''
            this.photoIdList.push('');
        })
        // 经办编号
        this.BKZ019 = this.$route.query.BKZ019;
        // 需跳转的路由
        this.route = this.$route.query.route;
        // 子项编码
        this.AGA002 = this.$route.query.AGA002;
        console.log("路由",this.route);
        console.log("子项编码",this.AGA002);
    },
    computed:{
        canSubmit(){
            for(let i = 0; i < this.completeList.length; i++ ){
                if(this.completeList[i].imgUrl == ''){
                    return false;
                }
            }
            return true;
        }
    },
    methods:{
        // 查看大图
        showBigPhoto(val){
            this.imgUrl = val;
            this.$refs.photo.open();
        },
        uploadImg(index){
            let This = this
            if(this.$isSdk){
                dd.ready({
                developer: 'zzxprint',
                usage: [
                    'dd.device.notification.chooseImage',
                ],
                remark: '补充材料上传'
                }, function() {
                    dd.device.notification.chooseImage ({
                        onSuccess: function(data) {
                            if(data.result){
                                let submitForm = {}; 
                                // 加入用户名和电子社保卡号
                                submitForm.AAC003 = This.$store.state.SET_NATIVEMSG.name;
                                submitForm.AAE135 = This.$store.state.SET_NATIVEMSG.idCard;
                                // 加入子项编码
                                submitForm.AGA002 = This.AGA002;
                                // 加入照片
                                submitForm.photoList = data.picPath[0];
                                // 类型为附件
                                submitForm.PTX001 = '2';
                                const params = This.epFn.commonRequsetData(This.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,'2006');
                                // 图片上传后台
                                This.$axios.post(This.epFn.ApiUrl() + '/h5/jy2006/updPhoto', params).then((resData) => {
                                    //   成功   1000
                                    if ( resData.enCode == 1000 ) {
                                        // This.completeList[index].imgUrl = data.picPath[0]; 这样页面视图不会更新
                                        let oldVal = This.completeList[index];
                                        oldVal.imgUrl = data.picPath[0];
                                        This.completeList.splice(index, 1, oldVal);
                                        This.photoIdList[index] = resData.photoId;
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
                            this.$toast(error)
                            console.log("请求图片失败",error);
                        }
                    })
                })
            }
        },
        // 提交
        submit(){
            if(this.canSubmit == false){
                return;
            }
            let submitForm = {
                BKZ019: this.BKZ019,
                photoIdList:this.photoIdList.join(',')//照片ID数组
            }
            console.log(submitForm);
            const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,"1030");
            this.$axios.post(this.epFn.ApiUrl()+ '/h5/jy1030/getRecord', params).then((resData) => {
                console.log('返回成功信息',resData)
                //   成功   1000
                if ( resData.enCode == 1000 ) {
                    this.$router.push({
                        path: this.route,
                        query:{
                            showSuccess: true,
                            param: this.BKZ019
                        }
                    });
                    
                }else if (resData.enCode == 1001 ) {
                //   失败  1001
                    this.$toast(resData.msg);
                    return;
                }else{
                    this.$toast('业务出错');
                    return;
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
.CompleteUpload{
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
            .PhotoBox{
                padding-left: .3rem;
                display: flex;
                flex-wrap: wrap;
                margin-top: .32rem;
                .ImgBox{
                    height: 1.5rem;
                    width: 1.5rem;
                    margin-right: .2rem;
                    margin-top: .1rem;
                    img{
                        height: 100%;
                        width: 100%;
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