<template>
    <div class="plusInvoice">
        <!-- MintUI弹出框区域 -->
        <mt-datetime-picker
            type="date"
            ref="timePicker"
            v-model="dateVal"
            :endDate="endDate"
            @confirm="chooseTime">
        </mt-datetime-picker>
        <!-- 发票信息 -->
        <div class="Content">
            <div class="ReportInfo">
                <div class="InfoLine">
                    <div class="InfoName"><span>发票号码：</span></div>
                    <div class="InfoText"><input type="text" v-model="form.BKE100" placeholder="请输入"></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>发票金额：</span></div>
                    <div class="InfoText"><input type="number" v-model="form.AKC264" placeholder="请输入"></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>发票日期：</span></div>
                    <div class="InfoText"><input @click="openChooseTime()" type="text" v-model="form.AAE036" placeholder="请选择" readonly>
                      <svg-icon icon-class="serveComponent_arrowRight"></svg-icon></div>
                </div>
            </div>
            <!-- 需要补充信息 -->
            <div class="supplementInfo">
                <div class="infoName">上传图片：</div>
                <div class="photoContent">
                    <div class="photoBox" v-if="form.photoUrl!=''">
                        <img :src="form.photoUrl" @click="showBigPhoto(form.photoUrl)">
                    </div>
                    <svg-icon @click="uploadImg" icon-class="serveComponent_upload" />
                </div>
            </div>
        </div>

        <PhotoView ref="photo" :imgUrl="bigPhotoUrl"></PhotoView>
        <!-- 按钮 -->
        <Footer :canSubmit="canSubmit" :btnText="'添加发票'" @submit="submit()"></Footer>
    </div>
</template>

<script>
export default {
    data() {
        return {
            bigPhotoUrl:'', //展示大图用URL
            dateVal: new Date(), //默认绑定的时间
            endDate: new Date(), //最晚选择时间
            form:{
                BKE100:'',//发票号
                AKC264:'',//发票金额
                AAE036:'',//发票日期
                photoUrl: '', //照片路径
                photoId: '', //照片ID
            },
            canSubmit: false,
        }
    },
    watch: {
        form: {
            handler(val){
                if(val.BKE100 != '' && val.AKC264 != '' &&  val.AAE036 != '' && val.photoId != ''){
                    this.canSubmit = true;
                }else {
                    this.canSubmit = false;
                }
            },
            deep: true
        }
    },
    methods: {
        // 选择时间
        openChooseTime() {
            this.$refs.timePicker.open();
        },
        chooseTime(val) {
            let date = this.util.formatDate(val,'yyyy-MM-dd');
            this.form.AAE036 = date;
        },
        // 上传图片
        uploadImg(){
            if(this.form.BKE100 == '' || this.form.AKC264 == '' || this.form.AAE036 == ''){
                this.$toast("请完善发票信息后再上传照片")
                return false;
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
                                AAC003: LegalPerson.attnName,
                                AAE135: LegalPerson.attnIDNo,
                                AGA002: '给付-00142-002',
                                photoList: data.picPath[0],
                                PTX001: '1',
                                BKE100: this.form.BKE100,
                                AKC264: String(this.form.AKC264),
                                AAE036: this.form.AAE036
                            };
                            let params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,'2006');
                            this.$axios.post(this.epFn.ApiUrl() + '/h5/jy2006/updPhoto', params).then((resData) => {
                                //   成功   1000
                                if ( resData.enCode == 1000 ) {
                                    this.form.photoUrl = data.picPath[0];
                                    this.form.photoId = resData.photoId;
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
        // 展示大图
        showBigPhoto(val) {
            this.bigPhotoUrl = val;
            this.$refs.photo.open();
        },
        // 点击添加发票
        submit() {
            if(!this.canSubmit){
                return;
            }
            if(sessionStorage.getItem('SET_SURGICAL_INVOICELIST') == null){
                let arr = [];
                let obj=this.form;
                console.log('1111',obj)
                arr.push(obj)
                sessionStorage.setItem("SET_SURGICAL_INVOICELIST", JSON.stringify(arr))
                console.log("9999",sessionStorage.getItem("SET_SURGICAL_INVOICELIST"))
            } else {
                let invoiceList = JSON.parse(sessionStorage.getItem('SET_SURGICAL_INVOICELIST'))
                invoiceList.push(this.form);
                sessionStorage.setItem("SET_SURGICAL_INVOICELIST", JSON.stringify(invoiceList))
            }
            console.log("listlist", JSON.parse(sessionStorage.getItem('SET_SURGICAL_INVOICELIST')))
            this.$router.push({path: '/legalSurgicalApproval', query: {dispatch: 1}})
        }
    }
}
</script>

<style lang="less" scoped>
.plusInvoice{
    background: #FFF;
    z-index: 200;
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    overflow: hidden;
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
                font-size: .28rem;
                display: flex;
                justify-content: space-between;
                border-bottom: 1px solid #DDD;
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
                        font-size: .26rem;
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
            .photoContent{
                display: flex;
                .photoBox{
                    height: 1.5rem;
                    width: 1.5rem;
                    margin-right: .15rem;
                    img{
                        height: 100%;
                        width: 100%;
                    }
                }
                .svg-icon{
                    height: 1.5rem;
                    width: 1.5rem;
                }
            }
        }
    }
}
</style>