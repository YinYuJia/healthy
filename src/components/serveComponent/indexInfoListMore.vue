<template>
    <div class="indexInfoListMore">
        <div class="infoListHeader" id="title">
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="(item,index) in titleList" :key="index" @click="changeIndex('iconContent'+item.index,index)" :class="{'active': activeIndex == index}">
                        {{item.name}}
                    </div>
                    <!-- <div class="swiper-slide" @click="changeIndex('insured',1)" :class="{'active': activeIndex == 1}">参保服务</div>
                            <div class="swiper-slide" @click="changeIndex('record',2)" :class="{'active': activeIndex == 2}">备案服务</div>
                            <div class="swiper-slide" @click="changeIndex('treat',3)" :class="{'active': activeIndex == 3}">待遇服务</div>
                            <div class="swiper-slide" @click="changeIndex('others',4)" :class="{'active': activeIndex == 4}">其他服务</div> -->
                </div>
            </div>
        </div>
        <!-- 图标列表 -->
        <div id="wrapper">
            <div class="iconContainer" :style="{height:containerHeight}">
                <div v-for="(listLine,index) in iconList" :key="index">
                    <div class="iconList" v-if="listLine.children.length != 0">
                        <div class="listHeader" v-if="index != 0">{{listLine.iconCategoryName}}</div>
                        <div class="iconContent" :id="'iconContent'+index">
                            <div class="iconBox" v-for="icon in listLine.children" :key="icon.blockAppId" @click="jumpToUrl(icon.jumpUrl,icon.status)">
                                <div class="photoBox"><img :src="icon.outPicUrl" /></div>
                                <div class="text">{{icon.mattersName}}</div>
                                <svg-icon v-if="icon.mattersId == '40' || icon.mattersId == '41'" class="provinceIcon" icon-class="serveComponent_province" />
                            </div>
                        </div>
                    </div>
                </div>
                <!-- <div class="iconList">
                            <div class="iconContent" id="insured">
                                <div class="iconBox" @click="showDetail('getProof','领取就医凭证')">
                                    <svg-icon icon-class="serveComponent_icon_1" />
                                    <div class="text">就医凭证</div>
                                </div>
                                <div class="iconBox" @click="showDetail('insuredChange','参保信息变更')">
                                    <svg-icon icon-class="serveComponent_icon_2" />
                                    <div class="text">信息变更</div>
                                </div>
                                <div class="iconBox" @click="showDetail('searchSelect','打印信息')">
                                    <svg-icon icon-class="serveComponent_icon_3" />
                                    <div class="text">医保证明</div>
                                </div>
                                <div class="iconBox" @click="showDetail('transferRenewing','关系转移接续')">
                                    <svg-icon icon-class="serveComponent_icon6" />
                                    <svg-icon icon-class="serveComponent_province" class="provinceIcon" />
                                    <div class="text">医保转接</div>
                                </div>
                            </div>
                        </div>
                        <div class="iconList">
                            <div class="listHeader">备案服务</div>
                            <div class="iconContent" id="record">
                                <div class="iconBox" @click="showDetail('elseWhere','异地就医备案')">
                                    <svg-icon icon-class="serveComponent_icon_5" />
                                    <div class="text">异地备案</div>
                                </div>
                                <div class="iconBox" @click="showDetail('turnOut','转外备案')">
                                    <svg-icon icon-class="serveComponent_icon_6" />
                                    <div class="text">转外就医</div>
                                </div>
                                <div class="iconBox" @click="showDetail('abroadTake','出国带药')">
                                    <svg-icon icon-class="serveComponent_icon_7" />
                                    <div class="text">出国带药</div>
                                </div>
                                <div class="iconBox" @click="showDetail('familyAid','家庭共济')">
                                    <svg-icon icon-class="serveComponent_icon_8" />
                                    <div class="text">家庭共济</div>
                                </div>
                                <div class="iconBox" @click="showDetail('specialDrug','特制特药备案')">
                                    <svg-icon icon-class="serveComponent_icon_9" />
                                    <div class="text">特药备案</div>
                                </div>
                                <div class="iconBox" @click="showDetail('chronicDisease','规定（特殊慢性）病种待遇备案')">
                                    <svg-icon icon-class="serveComponent_icon_10" />
                                    <div class="text">规定病种</div>
                                </div>
                            </div>
                        </div>
                        <div class="iconList">
                            <div class="listHeader">待遇服务</div>
                            <div class="iconContent" id="treat">
                                <div class="iconBox" @click="showDetail('smallReim','基本医疗保险参保人员医疗费用零星报销')">
                                    <svg-icon icon-class="serveComponent_icon5" />
                                    <svg-icon icon-class="serveComponent_province" class="provinceIcon" />
                                    <div class="text">零星报销</div>
                                </div>
                                <div class="iconBox" >
                                    <svg-icon v-if="1" icon-class="serveComponent_grey_jiaofeinianxian" />
                                    <div class="text">年限核定</div>
                                </div>
                                <div class="iconBox">
                                    <svg-icon v-if="0" icon-class="serveComponent_icon_13" />
                                    <svg-icon v-if="1" icon-class="serveComponent_grey_5" />
                                    <div class="text">平产/剖腹</div>
                                </div>
                                <div class="iconBox">
                                    <svg-icon v-if="0" icon-class="serveComponent_icon_14" />
                                    <svg-icon v-if="1" icon-class="serveComponent_grey_6" />
                                    <div class="text">流产/引产</div>
                                </div>
                                <div class="iconBox">
                                    <svg-icon v-if="0" icon-class="serveComponent_icon_15" />
                                    <svg-icon v-if="1" icon-class="serveComponent_grey_7" />
                                    <div class="text">未就业配偶</div>
                                </div>
                            </div>
                        </div>
                        <div class="iconList">
                            <div class="listHeader">其他服务</div>
                            <div class="iconContent" id="others">
                                <div class="iconBox" @click="showDetail('searchBaseInfo','个人信息查询')">
                                    <svg-icon icon-class="serveComponent_icon_16" />
                                    <div class="text">参保信息</div>
                                </div>
                                <div class="iconBox" @click="showDetail('searchInsuredInfo','参保信息查询')">
                                    <svg-icon icon-class="serveComponent_icon_17" />
                                    <div class="text">征缴信息</div>
                                </div>
                                <div class="iconBox" @click="showDetail('searchProgress','我的事项')">
                                    <svg-icon icon-class="serveComponent_icon_18" />
                                    <div class="text">办事进度</div>
                                </div>
                                <div class="iconBox" @click="showDetail('searchFee','费用信息查询')">
                                    <svg-icon icon-class="serveComponent_icon_19" />
                                    <div class="text">就医信息</div>
                                </div>
                                <div class="iconBox" @click="showDetail('searchRecord','备案信息查询')">
                                    <svg-icon icon-class="serveComponent_icon_20" />
                                    <div class="text">备案信息</div>
                                </div>
                                <div class="iconBox">
                                    <svg-icon icon-class="serveComponent_icon_hosipital" />
                                    <div class="text">定点医院</div>
                                </div>
                                <div class="iconBox">
                                    <svg-icon icon-class="serveComponent_icon_drugstore" />
                                    <div class="text">定点药店</div>
                                </div>
                            </div>
                        </div> -->
            </div>
        </div>
    </div>
</template>

<script>
    import Swiper from 'swiper';
    import IScroll from 'iscroll/build/iscroll-probe';
    export default {
        data() {
            return {
                activeIndex: 0,
                headerSwiper: {},
                containerHeight: 0,
                myScroll: undefined,
                iconList: [], //图标列表
                titleList: [], //头部列表
                isClear: true,
                userType: "", //用户类型
            }
        },
        destroyed() {
            this.myScroll.destroy();
            this.myScroll = null;
        },
        created() {
            sessionStorage.setItem('ifRequest', false)
            sessionStorage.setItem('isClear', this.isClear)
            // 清空零星报销的Vuex
            let SET_SMALL_REIM_SUBMIT = {
                AAS301: '', //参保地统筹省编码
                AAB301: '', //参保地统筹市编码
                AKC264: 0, //发票费用总额
                AAE008: '', //收款开户行
                AAE009: '', //收款开户名
                AAE010: '', //收款银行账号
                BKC013: '', //发票张数
                AKB020: '', //机构编码（医院编码）
            }
            this.$store.dispatch('SET_SMALL_REIM_SUBMIT', SET_SMALL_REIM_SUBMIT)
            let SET_SMALL_REIM_1 = {
                hospitalName: '', //就诊医院
                AKB020: '', //医院编码
                AKA078: '', //就诊类型
                AAE030: '' //就诊日期
            }
            this.$store.dispatch('SET_SMALL_REIM_1', SET_SMALL_REIM_1)
            let SET_SMALL_REIM_2 = {
                eleInvoices: [], //电子发票信息
                invoicesImg: [], //附件信息信息  图片id
            }
            this.$store.dispatch('SET_SMALL_REIM_2', SET_SMALL_REIM_2)
            let SET_ENCLOSURE = []
            this.$store.dispatch('SET_ENCLOSURE', SET_ENCLOSURE)
            let SET_NATUREAPPROVAL = {
                AAE135: "", //身份证号
                BMC061: '0', //生育类别 0生育女职工,1男职工配偶
                BMC131: '', //生育日期
                AMC029: '01', //生育类别 01平产、02助娩产、03剖宫产
                AMC029VALUE: '平产', //生育类别中文
                AMC028: '1', //胎儿数
                AMC031: '', //胎次
                BMC046: '', //其中死胎
                BMC211: '', //实际发生费用
                BMC033: '', //实际住院天数
                AMC027: '0', //晚育标志 0否1是
                AMC027VALUE: '否', //晚育中文
                BMC035: '', //准生证号
                AMC022: '', //出生证编号
                BMC065: '', //医疗机构
                photoList1: [], //图片数组
                photoIdList1: [], //图片ID数组
                photoList2: [], //图片数组
                photoIdList2: [], //图片ID数组
            }
            this.$store.dispatch('SET_NATUREAPPROVAL', SET_NATUREAPPROVAL)
            let SET_NATUREAPPROVAL_PHOTOLIST = {
                photoList1: [], //图片数组
                photoIdList1: [], //图片ID数组
                photoList2: [], //图片数组
                photoIdList2: [], //图片ID数组
            }
            this.$store.dispatch('SET_NATUREAPPROVAL_PHOTOLIST', SET_NATUREAPPROVAL_PHOTOLIST)
            this.epFn.setTitle('医疗保障专区');
            if (sessionStorage.getItem('userType') == '0' || sessionStorage.getItem('userType') == '1') {
                this.getMatterInfo(sessionStorage.getItem("GinsengLandCode")); //获取列表
            } else {
                let LegalPerson = JSON.parse(sessionStorage.getItem("LegalPerson"));
                if (LegalPerson.xzqh == '330000') {
                    this.getMatterInfo('339900')
                } else {
                    this.getMatterInfo(LegalPerson.xzqh); //获取列表
                }
            }
        },
        methods: {
            // 跳转配置的地址
            jumpToUrl(url, status) {
                // return;
                if (status == '1') {
                    this.$toast('该区域暂未开通');
                    return;
                } else {
                    // 省本级项目
                    if (url.split('/').pop() == 'smallReim' || url.split('/').pop() == 'transferRenewing' || url.split('/').pop() == 'searchBaseInfo' || url.split('/').pop() == 'searchInsuredInfo' || url.split('/').pop() == 'searchProgress' ||
                    url.split('/').pop() == 'searchFee' || url.split('/').pop() == 'searchRecord') {
                        this.$router.push(url.split('/').pop());
                    } else {
                        // 其他项目跳转
                        let userType = sessionStorage.getItem('userType')
                        if (userType == 0 || userType == 1) {
                            if (sessionStorage.getItem('GinsengLandCode') == "339900") {
                                console.log('url----', url)
                                if (url.indexOf('servicecode') != -1) {
                                    window.location.href = url;
                                } else {
                                    let route = url.split('/');
                                    this.$router.push(route.pop());
                                }
                            } else {
                                console.log(11111111111111)
                                if (url.indexOf("?") != -1) {
                                    url = url + '&' + 'token=' + sessionStorage.getItem("getToken");
                                    // url = url + '&' + 'token=' + '8afac8196c756f1f016cac693beb2088-commonToken'
                                    // console.log(url)
                                    // return
                                } else {
                                    url = url + '?' + 'token=' + sessionStorage.getItem("getToken");
                                    // url = url + '&' + 'token=' + '8afac8196c756f1f016cac693beb2088-commonToken'
                                    // console.log(url)
                                    // return
                                }
                                window.location.href = url;
                            }
                        } else {
                            let LegalPerson = JSON.parse(sessionStorage.getItem("LegalPerson"));
                            if (LegalPerson.xzqh == "339900" || LegalPerson.xzqh == '330000') {
                                let route = url.split('/');
                                this.$router.push(route.pop());
                            } else {
                                if (url.indexOf("?") != -1) {
                                    url = url + '&' + 'ssoToken=' + sessionStorage.getItem("ssoToken");
                                } else {
                                    url = url + '?' + 'ssoToken=' + sessionStorage.getItem("ssoToken");
                                }
                                window.location.href = url;
                            }
                        }
                    }
                }
            },
            //动态获取图标
            getMatterInfo(code) {
                let Type = sessionStorage.getItem('userType');
                let userType;
                if (Type == '1' || Type == '0') {
                    userType = 1
                } else if (Type == '2') {
                    userType = 2
                }
                let params = {
                    "areaId": code,
                    "isApp": 1, //1代表APP，0代表网上办
                    "mattersType": userType //1是个人，2是单位
                }
                this.$axios.post(this.epFn.ApiUrl() + "/H5/jy0002/getAreaList", params).then((resData) => {
                    if (this.isClear == true) {
                        sessionStorage.setItem('isClear', true)
                    } else if (this.isClear == false) {
                        sessionStorage.setItem('isClear', true)
                    }
                    console.log('获取区域事项', resData)
                    let resList = resData.list;
                    let iconList = [];
                    if (Type == 1 || Type == 0) {
                        resList.forEach((ele, index) => {
                            ele.children.forEach(innerEle => {
                                innerEle.jumpUrl = innerEle.personJumpUrl;
                            })
                            if (ele.children.length != 0) {
                                this.titleList.push({
                                    name: ele.iconCategoryName,
                                    index: index
                                });
                            }
                        })
                    } else if (Type == 2) {
                        resList.forEach((ele, index) => {
                            ele.children.forEach(innerEle => {
                                innerEle.jumpUrl = innerEle.unitJumpUrl;
                            })
                            if (ele.children.length != 0) {
                                this.titleList.push({
                                    name: ele.iconCategoryName,
                                    index: index
                                });
                            }
                        })
                    }
                    // 自动补齐图标
                    this.iconList = resList
                    console.log('图标列表', this.iconList);
                    this.calculateContent(); //计算区域高度
                })
            },
            calculateContent() {
                this.$nextTick(() => {
                    let length = this.titleList.length;
                    let lastId = 'iconContent' + this.titleList[length - 1].index;
                    let lastContentHeight = document.getElementById(lastId).offsetHeight;
                    let titleHeight = document.getElementById('title').offsetHeight;
                    let offsetHeight = document.getElementById(lastId + '').offsetTop;
                    this.containerHeight = offsetHeight + window.innerHeight - titleHeight + 'px';
                    setTimeout(() => {
                        this.myScroll = new IScroll('#wrapper', {
                            mouseWheel: true, //允许鼠标滑动
                            bounce: false, //关闭回弹
                            scrollbars: false, //关闭滚动条
                            click: true, //开启点击功能
                            // momentum: false, //关闭势能，提升性能
                            probeType: 3
                        });
                        this.myScroll.on('scroll', this.handleScroll);
                    }, 50);
                    this.headerSwiper = new Swiper('.swiper-container', {
                        slidesPerView: 3.5, //显示的范围
                        observer: true, //修改swiper自己或子元素时，自动初始化swiper
                        observeParents: true, //修改swiper的父元素时，自动初始化swiper
                        freeMode: true, //去除惯性
                    });
                })
            },
            // gotoSDK(){
            //     console.log(111)
            //     let url =
            //         location.href.substring(0, location.href.indexOf("#")) +
            //         // "#/payDetail?obj=" +
            //         // JSON.stringify(item) +
            //         "&signNo=" +
            //         "2037EAE0AC692753452C80EA73580B86" +
            //         "&idCard=" +
            //         "331081198611144030" +
            //         "&name=" +
            //         "林江";
            //     let ua = navigator.userAgent;
            //     let isIos = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            //     if (isIos) {
            //         window.webkit.messageHandlers.goToPay.postMessage(url);
            //     } else {
            //         window.EPSdk.newHtml(url);
            //     }
            // },
            changeIndex(chooseId, index) {
                this.activeIndex = index;
                this.headerSwiper.slideTo(index - 1, 50);
                let scrollHieght = 0;
                var u = navigator.userAgent;
                var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
                if (isiOS) {
                    scrollHieght = -document.getElementById(chooseId).offsetTop + document.getElementById('title').offsetHeight;
                } else {
                    scrollHieght = -document.getElementById(chooseId).offsetTop;
                }
                this.myScroll.scrollTo(0, scrollHieght);
            },
            slideIndex(index) {
                this.activeIndex = index;
                this.headerSwiper.slideTo(index - 1, 50);
            },
            handleScroll() {
                var u = navigator.userAgent;
                var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
                let scrollY = -(this.myScroll.y);
                let title = 10;
                if (isiOS) {
                    title = document.getElementById('title').offsetHeight + 10;
                }
                let scroll = [];
                for (let i = 0; i < this.titleList.length; i++) {
                    let id = 'iconContent' + this.titleList[i].index;
                    scroll[i] = document.getElementById(id).offsetTop - title;
                }
                for (let i = 0; i < scroll.length - 1; i++) {
                    if (scrollY >= scroll[i] && scrollY <= scroll[i + 1]) {
                        this.slideIndex(i);
                    }
                }
                if (scrollY >= scroll.pop()) {
                    this.slideIndex(scroll.length)
                }
                // if(scrollY >= scroll_1 && scrollY < scroll_2){
                //     this.slideIndex(1);
                // }else if(scrollY >= scroll_2 && scrollY < scroll_3){
                //     this.slideIndex(2);
                // }else if(scrollY >= scroll_3 && scrollY < scroll_4){
                //     this.slideIndex(3);
                // }else if(scrollY >= scroll_4){
                //     this.slideIndex(4);
                // }
            },
            getScrollTop() {
                var scrollPos;
                if (window.pageYOffset) {
                    scrollPos = window.pageYOffset;
                } else if (document.compatMode && document.compatMode != 'BackCompat') {
                    scrollPos = document.documentElement.scrollTop;
                } else if (document.body) {
                    scrollPos = document.body.scrollTop;
                }
                return scrollPos;
            },
            showWork(url, item, itemInfo) {
                sessionStorage.setItem('itemUrl', url);
                sessionStorage.setItem("item", item);
                sessionStorage.setItem("itemInfo", itemInfo);
                this.$router.push({
                    name: 'Index',
                    params: {
                        info: url,
                        item: item,
                        itemInfo: itemInfo
                    }
                })
            },
            showDetail(url, item) {
                let str = sessionStorage.getItem("GinsengLandCode")
                console.log('str', str)
                if (str == "" || str == undefined || str == null) {
                    this.$toast("未获取到您的参保地信息")
                    return
                }
                sessionStorage.setItem('itemUrl', url);
                sessionStorage.setItem("item", item);
                let This = this
                setTimeout(function() {
                    This.$router.push({
                        name: url,
                        params: {
                            item: item,
                        }
                    })
                }, 16)
            }
        }
    }
</script>

<style lang="less" scoped>
    .indexInfoListMore {
        width: 100%; // 头部
        .infoListHeader {
            height: .94rem;
            width: 100%;
            background: #FFF;
            position: fixed;
            z-index: 999;
            top: 0;
            .swiper-container {
                height: 100%;
                width: 100%;
                .swiper-wrapper {
                    border-bottom: .04rem solid #E6E6E6;
                    .swiper-slide {
                        height: .94rem;
                        width: 2rem;
                        line-height: .94rem;
                        font-size: .36rem;
                        color: #333333;
                        letter-spacing: -0.0064rem;
                        text-align: center;
                    }
                    .active {
                        border-bottom: .04rem solid #0284FD;
                        color: #000;
                        font-weight: bold;
                    }
                }
            }
        }
        #wrapper {
            position: fixed;
            width: 100%;
            height: 100%;
        } // 图标区域
        .iconContainer {
            width: 100%;
            touch-action: none;
            background: #FFF;
            padding: 0 .2rem;
            margin-top: .94rem;
            .iconList {
                .listHeader {
                    height: .8rem;
                    line-height: .8rem;
                    font-size: .44rem;
                    color: #000000;
                    letter-spacing: 0;
                    text-align: left;
                    font-weight: bold;
                }
                .iconContent {
                    width: 100%;
                    display: -webkit-box;
                    /* Chrome 4+, Safari 3.1, iOS Safari 3.2+ */
                    display: -moz-box;
                    /* Firefox 17- */
                    display: -webkit-flex;
                    /* Chrome 21+, Safari 6.1+, iOS Safari 7+, Opera 15/16 */
                    display: -moz-flex;
                    /* Firefox 18+ */
                    display: -ms-flexbox;
                    /* IE 10 */
                    display: flex;
                    flex-wrap: wrap;
                    padding: .2rem 0 .44rem 0;
                    .iconBox {
                        position: relative;
                        height: 1.4rem;
                        width: 25%;
                        display: -webkit-box;
                        /* Chrome 4+, Safari 3.1, iOS Safari 3.2+ */
                        display: -moz-box;
                        /* Firefox 17- */
                        display: -webkit-flex;
                        /* Chrome 21+, Safari 6.1+, iOS Safari 7+, Opera 15/16 */
                        display: -moz-flex;
                        /* Firefox 18+ */
                        display: -ms-flexbox;
                        /* IE 10 */
                        display: flex;
                        flex-direction: column;
                        justify-content: space-around;
                        align-items: center;
                        .photoBox {
                            height: .68rem;
                            width: .68rem;
                            position: relative;
                            img {
                                height: 100%;
                                width: 100%;
                                position: absolute;
                                top: 0;
                                left: 0;
                            }
                        }
                        .svg-icon {
                            height: .68rem;
                            width: .68rem;
                        }
                        .provinceIcon {
                            height: .28rem;
                            width: .5rem;
                            position: absolute;
                            top: 0rem;
                            right: 0.1rem;
                        }
                        .text {
                            font-size: .28rem;
                            color: #3A4259;
                            letter-spacing: 0;
                            text-align: center;
                            line-height: .28rem;
                        }
                    }
                }
            }
        }
    }
</style>
