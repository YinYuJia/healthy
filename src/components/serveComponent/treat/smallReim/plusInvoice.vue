<template>
    <div class="plusInvoice">
        <!-- MintUI弹出框区域 -->
        <mt-datetime-picker
            type="date"
            ref="timePicker"
            v-model="dateVal"
            :endDate="endDate"
            @confirm="handleTimeConfirm">
        </mt-datetime-picker>
        <!-- 标题 -->
        <Title :title="'零星报销'" :backRouter="'/invoiceInfo'"></Title>
        <!-- 发票信息 -->
        <div class="Content">
            <div class="ReportInfo">
                <div class="InfoLine">
                    <div class="InfoName"><span>发票号码：</span></div>
                    <div class="InfoText"><input type="text" v-model="form.BKE100" placeholder="请输入"></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>发票金额：</span></div>
                    <div class="InfoText"><input type="number" @input="clearNoNum" v-model="form.AKC264" placeholder="请输入"></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>发票日期：</span></div>
                    <div class="InfoText"><input @click="openTimePicker()" type="text" v-model="form.AAE036" placeholder="请选择" readonly>
                      <svg-icon icon-class="serveComponent_arrowRight"></svg-icon></div>
                </div>
            </div>
            <!-- 需要补充信息 -->
            <div class="supplementInfo">
                <div class="infoName">上传图片：</div>
                <div class="photoBox">
                    <img :src="form.photoUrl" @click="showBigPhoto(form.photoUrl)" v-if="form.photoUrl" class="pic">
                    <svg-icon @click="uploadImg" icon-class="serveComponent_upload" />
                </div>
            </div>
        </div>

        <PhotoView ref="photo" :imgUrl="imgUrl"></PhotoView>
        <!-- 按钮 -->
        <Footer :canSubmit="canSubmit" :btnText="'添加发票'" @submit="submit()"></Footer>
    </div>
</template>

<script>
export default {
    data(){
        return{
            imgUrl:'',
            dateVal: new Date(), //默认绑定的时间
            endDate: new Date(), //最晚选择时间
            form:{
                BKE100: '', //发票号码
                AKC264: '', //发票金额
                AAE036: '', //发票日期,
                photoId: '',//图片id
                photoUrl:'',//图片URL
                selected:true
            },
            canSubmit: false
        }
    },
    created(){
        this.epFn.setTitle('零星报销')
    },
    watch: {
        form: {
            handler: function(val) {
                if(val.BKE100!=""){
                    // let reg=/[\u4E00-\u9FA5]/g
                    // let reg=/[0-9a-zA-Z]/
                    let reg=/^\w*\w+$/
                    if(!reg.test(val.BKE100)){
                        this.form.BKE100='';
                        this.$toast('发票号码只可填写数字和字母，请确认后重新填写')
                    }
                }
                if(val.AKC264!=""){
                    let bb=/\d/
                    if(!bb.test(val.AKC264)){
                        this.form.AKC264='';
                        this.$toast('发票金额只可填数字，请确认后重新填写')
                    }
                }
                // 判断不为空
                if (val.BKE100 != '' && val.AKC264 != '' && val.AAE036 != '' && val.photoId !='') {
                    this.canSubmit = true;
                } else {
                    this.canSubmit = false;
                }
            },
            deep: true
        }
    },
    methods:{
        clearNoNum(e){
            // console.log(e.target.value.toString().length);


            this.form.AKC264 = e.target.value.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符
            this.form.AKC264 = e.target.value.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的
            this.form.AKC264 = e.target.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
            this.form.AKC264 = e.target.value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');//只能输入两个小数
            if(e.target.value.indexOf(".")< 0 && e.target.value !=""){//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
                this.form.AKC264= parseFloat(e.target.value);
            }
            if(e.target.value.toString().length>10){
                this.form.AKC264 = this.form.AKC264.toString().slice(0,10)
            }
        },
        maxLength10(e){
            if(e.target.value.toString().length>10){
                this.form.BKE100 = this.form.BKE100.toString().slice(0,10)
            }
        },
        // 查看大图
        showBigPhoto(val){
            this.imgUrl = val;
            this.$refs.photo.open();
        },
        uploadImg(){
            if(this.form.BKE100==''||this.form.AKC264==''||this.form.AAE036==''){
                this.$toast("请先填写发票信息")
                return
            }
            let SET_SMALL_REIM_2 = this.$store.state.SET_SMALL_REIM_2
            for(let i=0;i<SET_SMALL_REIM_2.eleInvoices.length;i++){
                if(SET_SMALL_REIM_2.eleInvoices[i].BKE100 == this.form.BKE100){
                    this.$toast("该发票已添加")
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
                    console.log('ready')
                    dd.device.notification.chooseImage ({
                        onSuccess: function(data) {

                            console.log(data.picPath[0],'请求图片成功');
                            if(data.result){
                                // 获取图片

                                let submitForm = {};
                                 // 加入用户名和电子社保卡号
                                if (This.$store.state.SET_NATIVEMSG.name !== undefined ) {
                                    submitForm.AAC003 = This.$store.state.SET_NATIVEMSG.name;
                                    submitForm.AAE135 = This.$store.state.SET_NATIVEMSG.idCard;
                                }else {

                                    This.$toast("未获取到人员基本信息");
                                }
                                let AKA078=This.$store.state.SET_SMALL_REIM_1.AKA078;
                                if(AKA078=='1'){
                                    submitForm.AGA002 ='给付-00007-019-01'//门诊
                                }else if(AKA078=='3'){
                                    submitForm.AGA002 = '给付-00007-019-02'//住院
                                }
                                // 加入子项编码
                                // submitForm.AGA002 = '330600007019'
                                submitForm.photoList = data.picPath[0]
                                submitForm.PTX001 = '1'
                                // 发票信息
                                submitForm.BKE100 = This.form.BKE100
                                submitForm.AKC264 = String(This.form.AKC264)
                                submitForm.AAE036 = This.form.AAE036
                                const params = This.epFn.commonRequsetData(This.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,'2006');
                                // /h5/jy2006/updPhoto
                                This.$axios.post(This.epFn.ApiUrl() + '/h5/jy2006/updPhoto', params).then((resData) => {
                                    console.log('返回成功信息',resData)
                                    //   成功   1000
                                    if ( resData.enCode == 1000 ) {
                                        // 获取图片
                                        This.form.photoUrl = data.picPath[0]
                                        This.form.photoId = resData.photoId
                                        This.form.selected=true//默认选中的变量
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
            // if(this.canSubmit &&this.form.photoId){
            if(!this.canSubmit){
                this.$toast("请填写发票信息，并且上传附件")
                return
            }
            if(this.canSubmit){
                // 因为接口不对，暂留信息
                // let submitForm = JSON.parse(JSON.stringify(this.form));
                // let SET_SMALL_REIM_2 = this.$store.state.SET_SMALL_REIM_2
                // console.log(this.$store.state.SET_SMALL_REIM_2,'this.$store.state.SET_SMALL_REIM_2');

                // SET_SMALL_REIM_2.eleInvoices.push(submitForm)
                // this.$store.dispatch('SET_SMALL_REIM_2',SET_SMALL_REIM_2)
                // this.$router.push('invoiceInfo')
                // 暂留结束
                let params = this.formatSubmitData();
                this.$axios.post(this.epFn.ApiUrl() + '/h5/jy2003/info', params).then((resData) => {
                    console.log('返回成功信息',resData)
                    //   成功   1000
                    if ( resData.enCode == 1000 ) {
                        // if(resData.BKE521==1){
                        //     this.$toast("该发票未找到，请填写正确的信息")
                        //     return
                        // }

                        let submitForm = JSON.parse(JSON.stringify(this.form));
                        let SET_SMALL_REIM_2 = this.$store.state.SET_SMALL_REIM_2

                        SET_SMALL_REIM_2.eleInvoices.push(submitForm)
                        this.$store.dispatch('SET_SMALL_REIM_2',SET_SMALL_REIM_2)
                        this.$router.push('invoiceInfo')
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
        },
        // 封装提交的数据
        formatSubmitData(){
            let submitForm = JSON.parse(JSON.stringify(this.form)); //深拷贝
            submitForm.AAE036 = this.util.DateToNumber(submitForm.AAE036) //改变日期格式
            submitForm.AKB020 = this.$store.state.SET_SMALL_REIM_SUBMIT.AKB020
            submitForm.AKA078 = this.$store.state.SET_SMALL_REIM_1.AKA078
            // 加入用户名和电子社保卡号
            if (this.$store.state.SET_NATIVEMSG.name !== undefined ) {
                submitForm.AAC003 = this.$store.state.SET_NATIVEMSG.name;
                submitForm.AAE135 = this.$store.state.SET_NATIVEMSG.idCard;
            }else {

                this.$toast("未获取到人员基本信息");
            }
            // 请求参数封装
            const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,'2003');
            return params;
        },
        // 选择就诊日期
        openTimePicker(){
            this.$refs.timePicker.open();
        },
        handleTimeConfirm(val){
            let date = this.util.formatDate(val,'yyyy-MM-dd');
            this.form.AAE036 = date;
        }
    }
}
</script>

<style lang="less" scoped>
.plusInvoice{
    width: 100%;
    .Content {
        height: 100%;
        margin-bottom: 1.4rem;
        .ReportInfo {
            height: 3.6rem;
            width: 100%;
            padding: 0 .3rem;
            background: white;
            .InfoLine {
                height: 1.2rem;
                position: relative;
                font-family: PingFangSC-Regular;
                font-size: .28rem;
                display: flex;
                justify-content: space-between;
                border-bottom: .01rem solid #D5D5D5;
                .InfoName {
                    line-height: 1.2rem;
                    span {
                        height: .6rem;
                        line-height: .6rem;
                        color: #000000;
                        letter-spacing: 0;
                    }
                }
                .InfoText {
                    line-height: 1.2rem;
                    display: flex;
                    position: relative;
                    align-items: center;
                    input {
                        height: .6rem;
                        width: 4.5rem;
                        font-family: PingFangSC-Regular;
                        font-size: .3rem;
                        color: #000000;
                        letter-spacing: 0;
                        text-align: right;
                        border: none;
                    }
                }
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
            .infoName{
                letter-spacing: 0;
            }
            .photoBox{
                text-align: left;
                .svg-icon{
                    height: 1.5rem;
                    width: 1.5rem;
                }
            }
        }
    }
}
.pic{
    width:1.5rem;
    height: 1.5rem;
}
</style>
