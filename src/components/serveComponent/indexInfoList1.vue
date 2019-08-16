<template>
    <div class="indexInfoList">
        <div class="mask" v-show="isMask">
            <div class="mask_div">
                <svg-icon class="content" icon-class="内容"></svg-icon>
                <input class="mask_input" type="password" name="" v-model="epPasword" id="">
                <button class="loginButton" @click="loginIn"></button>
            </div>
        </div>
        <!-- 提示 -->
        <div class="Hint" v-if="isTips">
            <div class="HintContent">
                <p class="HintText">
                    <i class="el-icon-warning" style="color:#ff6204"></i> 温馨提示：当前专区功能建设完善中，敬请期待!
                </p>
            </div>
        </div>
        <!-- 头部 -->
        <div class="indexHeader">
            <svg-icon icon-class="serveComponent_background" />
            <div class="headerText">医疗保障专区</div>
            <div class="headerInfo">汇聚浙江省医疗保障服务</div>
            <div class="headerPad">
                <div class="iconBox" @click="socialCard">
                    <svg-icon v-if="1" icon-class="serveComponent_icon1" />
                    <svg-icon v-if="0" icon-class="serveComponent_grey_1" />
                    <div class="text">电子社保卡</div>
                </div>
                <div class="iconBox" @click="payCode">
                    <svg-icon v-if="1" icon-class="serveComponent_icon2" />
                    <svg-icon v-if="0" icon-class="serveComponent_grey_2" />
                    <div class="text">支付码</div>
                </div>
                <div class="iconBox" @click="movePay">
                    <svg-icon v-if="1" icon-class="serveComponent_icon4" />
                    <svg-icon v-if="0" icon-class="serveComponent_grey_4" />
                    <div class="text">移动支付</div>
                </div>
                <div class="iconBox" @click="showDetail('medicalInsuranceAccount','医保账户')">
                    <svg-icon v-if="1" icon-class="serveComponent_icon3" />
                    <svg-icon v-if="0" icon-class="serveComponent_grey_3" />
                    <div class="text">医保账户</div>
                </div>
            </div>
        </div>
        <!-- 图标列表 -->
        <div class="iconContent">
            <div class="iconList">
                <div class="iconBox" v-for="(item,index) in iconList" :key="index">
                    <div class="photoBox" @click="jumpToUrl(item.jumpUrl,item.status)"><img :src="item.outPicUrl" /></div>
                    <div class="text">{{item.mattersName}}</div>
                </div>
                <div class="iconBox" @click="goRouter('indexInfoListMore')">
                    <svg-icon icon-class="serveComponent_icon12" />
                    <div class="text">更多</div>
                </div>
            </div>
            <!-- <div class="iconList">
                                                        <div class="iconBox" @click="showDetail('smallReim','基本医疗保险参保人员医疗费用零星报销')">
                                                            <svg-icon icon-class="serveComponent_icon5" />
                                                            <svg-icon icon-class="serveComponent_province" class="provinceIcon" />
                                                            <div class="text">零星报销</div>
                                                        </div>
                                                        <div class="iconBox" @click="showDetail('transferRenewing','关系转移接续')">
                                                            <svg-icon icon-class="serveComponent_icon6" />
                                                            <svg-icon icon-class="serveComponent_province" class="provinceIcon" />
                                                            <div class="text">医保转接</div>
                                                        </div>
                                                        <div class="iconBox" v-if="iconFlag" @click="showDetail('searchFee','费用信息查询')">
                                                            <svg-icon icon-class="serveComponent_icon_19" />
                                                            <div class="text">费用信息</div>
                                                          </div>
                                                        <div class="iconBox" @click="showDetail('searchProgress','我的事项')">
                                                            <svg-icon icon-class="serveComponent_icon8" />
                                                            <div class="text">办事进度</div>
                                                        </div>
                                                        <div class="iconBox" v-if="iconFlag" @click="showDetail('searchBaseInfo','个人信息查询')">
                                                            <svg-icon icon-class="serveComponent_icon_16" />
                                                            <div class="text">参保信息</div>
                                                        </div>
                                                        <div class="iconBox" v-if="iconFlag" @click="showDetail('searchInsuredInfo','参保信息查询')">
                                                            <svg-icon icon-class="serveComponent_icon_17" />
                                                            <div class="text">征缴信息</div>
                                                        </div>
                                                        <div class="iconBox" v-if="iconFlag" @click="showDetail('getProof','领取就医凭证')">
                                                            <svg-icon icon-class="serveComponent_icon11" />
                                                            <div class="text">就医凭证</div>
                                                        </div>
                                                        <div class="iconBox" v-if="iconFlag" @click="goRouter('indexInfoListMore')">
                                                            <svg-icon icon-class="serveComponent_icon12" />
                                                            <div class="text">更多</div>
                                                        </div>
                                                    </div> -->
        </div>
        <!-- banner -->
        <div class="banner">
            <!-- <div class="swiper-container">
                                                            <div class="swiper-wrapper">
                                                                <div class="swiper-slide">
                                                                    <svg-icon icon-class="serveComponent_icon13" @click="elseWhereHospital" /></div>
                                                                <div class="swiper-slide">
                                                                    <svg-icon icon-class="serveComponent_icon14" @click="hint" /></div>
                                                                <div class="swiper-slide">
                                                                    <svg-icon icon-class="serveComponent_icon15" @click="medicalList" class="right-svg" /></div>
                                                            </div>
                                                        </div> -->
            <div class="bannerSvg">
                <svg-icon icon-class="serveComponent_icon13" @click="elseWhereHospital" />
                <svg-icon icon-class="serveComponent_icon15" @click="medicalList" />
            </div>
        </div>
        <!-- 轮播图 -->
        <div class="carousel">
            <!-- <swipe>
                                                            <swipe-item><svg-icon icon-class="serveComponent_icon16" /></swipe-item>
                                                            <swipe-item><svg-icon icon-class="serveComponent_icon15" /></swipe-item>
                                                            <swipe-item><svg-icon icon-class="serveComponent_icon15" /></swipe-item>
                                                        </swipe> -->
            <svg-icon icon-class="serveComponent_icon16" />
        </div>
        <!-- 热点资讯 -->
        <div class="hotMsg">
            <div class="hotHeader">热点资讯</div>
            <div class="msgLine" v-for="(item,index) in hotMsg" :key="index" @click="goDetail(item)">
                <div class="textBox">
                    <div class="textInfo">{{item.name | msgLength}}</div>
                    <div class="dateInfo">{{item.time}}</div>
                </div>
                <div class="imgBox"><img :src=item.src></div>
            </div>
        </div>
        <div class="changeUserBtn" v-if="ifShow">
            <div class="btn" @click="changeUsername(true)">更改用户名</div>
            <div class="btn" @click="changeUserCode(true)">更改社保卡号</div>
        </div>
        <div v-if="ifShow" class="changeUserBtn"><button class="btn" @click="change()">切换</button></div>
        <div class="bottomline">
            <p>本服务由浙江政务服务网提供</p>
            <p>服务咨询热线 : <span class="bottomSpan">{{tel}}</span> </p>
        </div>
    </div>
</template>

<script>
    import Swiper from 'swiper';
    import {
        MessageBox
    } from 'mint-ui';
    export default {
        data() {
            return {
                epPasword: "",
                isMask: false, // 控制mask显示隐藏
                isTips: false,
                provice: false,
                name: "",
                lat: "",
                lng: "",
                ifShow: true,
                tel: "0571-88808880",
                imgurl: "",
                hotMsg: [],
                iconFlag: false,
                isClear: true,
                iconList: [], //图标列表,
                isVisible: false,
                isClear: true,
            }
        },
        mounted() {
            console.log('---this.$build', this.$build)
            // 跑马灯效果
            setTimeout(() => {
                // this.srcollLine()
            }, 500)
            new Swiper('.swiper-container', {
                slidesPerView: 2.15, //显示的范围
                spaceBetween: -8, //间隔大小
                slidesOffsetBefore: 10, //靠左偏移量
                slidesOffsetAfter: 10, //靠左偏移量
                observer: true, //修改swiper自己或子元素时，自动初始化swiper
                observeParents: true, //修改swiper的父元素时，自动初始化swiper
            })
        },
        // watch: {
        //     epPasword: function(val) {
        //         console.log("old----", val)
        //         if (val == 'epsoft') {
        //             this.isMask = false;
        //         }
        //     }
        // },
        created() {
            // 判断登录状态
            sessionStorage.setItem('isClear', this.isClear)
            console.log('sessionISCLEAR', sessionStorage.getItem('isClear'));
            const ssoToken = this.util.paramStr("ssoToken")
            if (ssoToken != 'undefined' && ssoToken != null && ssoToken != '') {
                this.$router.push("/indexInfoList")
            }
            // 清空零星报销的Vuex
            console.log('获取token', sessionStorage.getItem('getToken'))
            let SET_SMALL_REIM_SUBMIT = {
                AAS301: '', //参保地统筹省编码
                AAB301: '', //参保地统筹市编码
                AKC264: 0, //发票费用总额
                AAE008: '', //收款开户行
                AAE009: '', //收款开户名
                AAE010: '', //收款银行账号
                BKC013: '', //发票张数
                AKB020: '', //机构编码（医院编码）
                AAE005: '', //手机号码
            }
            this.$store.dispatch('SET_SMALL_REIM_SUBMIT', SET_SMALL_REIM_SUBMIT)
            let SET_SMALL_REIM_1 = {
                hospitalName: '', //就诊医院
                AKB020: '', //医院编码
                AKA078: '', //就诊类型
                AKA078VALUE: '', //就诊类型中文
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
            // 清空结束
            console.log("$build", this.$build)
            //  切换打包环境  1 网新恩普包  2  浙理办包
            if (this.$build == "1") {
                this.ifShow = true //显示输入人名社保卡
                this.showPerson = false //默认隐藏法人用户登录
                console.log('----11111-----',dd)


                dd.biz.user.getUserType({
                            onSuccess: function(data){
                                console.log("获取用户类型------", data.userType)
                                sessionStorage.setItem("userType", data.userType)
                            },
                            onFail: function (){
                                console.log("data获取用户类型", error)
                            }
                        }) 

            } else if (this.$build == "2") {
                dd.ready({
                        developer: 'daip@dtdream.com',
                        usage: [
                            'dd.biz.user.getUserType', //获取用户类型
                        ],
                        remark: '获取用户登录类型'
                    },
                    function() {
                        dd.biz.user.getUserType({
                    onSuccess: function(data){
                        // 成功回调 保存到session
                        // 引用浙理办SDK获取用户登录类型
                        sessionStorage.setItem("userType", data.userType)
                        console.log("data获取用户类型", data)
                        // 如果是0 或者1 那么是个人登录
                        if (data.userType == '0' || data.userType == '1') {
                            // url事项配置截取url参数方法  ------开始
                            var sp = this.util.paramStr('sp')
                            console.log(sp == undefined)
                            if (sp != "" && sp != undefined && sp != null) {
                                const arr1 = sp.split("|")
                                let obj = {}
                                arr1.map((item, index) => {
                                    console.log(item.split("=")[0] + '------' + item.split("=")[1])
                                    console.log()
                                    obj[item.split("=")[0]] = item.split("=")[1]
                                })
                                console.log('obj---', obj)
                                // url事项配置截取url参数方法  ------结束 如果有存入对象
                                sessionStorage.setItem("globalConfigObj", JSON.stringify(obj))
                            } else {
                                // 如果没有 对象存空
                                sessionStorage.setItem("globalConfigObj", JSON.stringify({}))
                            }
                            // ------------事项url配置截取sp分成对象保存到session里面---------end
                            console.log('---globalConfigObj---', sessionStorage.getItem("globalConfigObj"))
                            const code = 'yibaozs';
                            console.log('code', code)
                            // var ticket = paramStr("ticket") || "8afac0cc6b84c4aa016b8e7fb4662798-ticket";
                            var ticket = this.util.paramStr("ticket");
                            console.log('ticket-------------', ticket)
                            var token = sessionStorage.getItem("getToken")
                            console.log('token-------------', token)
                            //如果有token直接请求用户信息
                            if (token != "" && token != 'undefined' && token != null) {
                                this.$axios.post(this.ApiUrl() + "/H5/jy2005/info", {
                                    "token": token,
                                    "tradeCode": "2005"
                                }).then(result2 => {
                                    console.log(6)
                                    console.log('result2-----------------', result2)
                                    if (result2.result == "0") {
                                        sessionStorage.setItem("userName", result2.username)
                                        sessionStorage.setItem("idCard", result2.idnum)
                                        console.log('userName', result2.username)
                                        console.log('idCard', result2.idnum)
                                        // 个人登录
                                        console.log("全局配置事项obj", JSON.parse(sessionStorage.getItem('globalConfigObj')))
                                        var globalConfigObj = JSON.parse(sessionStorage.getItem('globalConfigObj'))
                                        if (globalConfigObj == null || globalConfigObj == undefined || globalConfigObj == '') {
                                            // 证明不是url事项配置 走正常逻辑
                                            this.ifShow = false; //隐藏输入人名社保卡
                                            this.setNativeMsg(); //浙理办打包需要打开
                                            this.getUserRegion(); // 自动获取参保地
                                        } else {
                                            if (globalConfigObj.userType == undefined) {
                                                // 证明不是url事项配置 走正常逻辑
                                                this.ifShow = false; //隐藏输入人名社保卡
                                                this.setNativeMsg(); //浙理办打包需要打开
                                                this.getUserRegion(); // 自动获取参保地
                                            } else {
                                                // url事项配置 跳转路由
                                                this.$router.push({
                                                    name: globalConfigObj.identifier,
                                                    params: globalConfigObj
                                                })
                                            }
                                        }
                                    } else {
                                        MessageBox.alert(result2.errmsg);
                                        return;
                                    }
                                })
                            } else {
                                // 如果有ticket 直接用ticket 换取token  再用token 获取用户信息
                                if (ticket != "" && ticket != undefined && ticket != null) {
                                    console.log(4)
                                    this.$axios.post(this.ApiUrl() + "/H5/jy2004/info", {
                                        "st": ticket,
                                        "tradeCode": "2004"
                                    }).then(result0 => {
                                        console.log('result0----------------------', result0)
                                        if (result0.result == "0") {
                                            sessionStorage.setItem("getToken", result0.token)
                                        } else {
                                            MessageBox.alert(result0.errmsg);
                                            return;
                                            // return;
                                        }
                                        this.$axios.post(this.ApiUrl() + "/H5/jy2005/info", {
                                            "token": result0.token,
                                            "tradeCode": "2005"
                                        }).then(result1 => {
                                            console.log(5)
                                            console.log('result1------------------', result1)
                                            if (result1.result == "0") {
                                                sessionStorage.setItem("userName", result1.username)
                                                sessionStorage.setItem("idCard", result1.idnum)
                                                console.log('userName', result1.username)
                                                console.log('idCard', result1.idnum)
                                                // 个人登录
                                                console.log("全局配置事项obj", JSON.parse(sessionStorage.getItem('globalConfigObj')))
                                                var globalConfigObj = JSON.parse(sessionStorage.getItem('globalConfigObj'))
                                                if (globalConfigObj == null || globalConfigObj == undefined || globalConfigObj == '') {
                                                    // 证明不是url事项配置 走正常逻辑
                                                    this.ifShow = false; //隐藏输入人名社保卡
                                                    this.setNativeMsg(); //浙理办打包需要打开
                                                    this.getUserRegion(); // 自动获取参保地
                                                } else {
                                                    if (globalConfigObj.userType == undefined) {
                                                        // 证明不是url事项配置 走正常逻辑
                                                        this.ifShow = false; //隐藏输入人名社保卡
                                                        this.setNativeMsg(); //浙理办打包需要打开
                                                        this.getUserRegion(); // 自动获取参保地
                                                    } else {
                                                        // url事项配置 跳转路由
                                                        this.$router.push({
                                                            name: globalConfigObj.identifier,
                                                            params: globalConfigObj
                                                        })
                                                    }
                                                }
                                            } else {
                                                MessageBox.alert(result1.errmsg);
                                            }
                                        })
                                    });
                                } else {
                                    console.log(3)
                                    // return;
                                    // 如果没有ticket 跳入易和获取ticket
                                    window.location.href = "https://puser.zjzwfw.gov.cn/sso/mobile.do?action=oauth&scope=1&servicecode=" + code;
                                }
                                sessionStorage.setItem("iflegal", data.userType)
                            }
                            //--------------------------- 单点登录逻辑开始-----------------
                        } else if (data.userType == '2') {
                            // 如果 userType = 2 那么是法人登录
                            // ----------------------获取事项配置url开始---------------------
                            console.log('法人登录')
                            console.log("window.location.href", window.location.href)
                            var arr = window.location.href.split("?")
                            if (window.location.href.indexOf("ssoToken") != -1) {
                                console.log('----', arr)
                                const arr1 = arr[1].split("&")
                                let obj = {}
                                arr1.map((item, index) => {
                                    console.log(item.split("=")[0] + '------' + item.split("=")[1])
                                    obj[item.split("=")[0]] = item.split("=")[1]
                                })
                                console.log('obj---', obj)
                                // ----------------------获取事项配置url结束---------------------
                                sessionStorage.setItem("globalConfigObj", JSON.stringify(obj))
                            } else {
                                sessionStorage.setItem("globalConfigObj", JSON.stringify({}))
                            }
                            var ssoToken = paramStr("ssoToken");
                            console.log('ssoToken', ssoToken)
                            if (ssoToken != "" && ssoToken != undefined && ssoToken != null) {
                                sessionStorage.setItem("ssoToken", ssoToken);
                                // 个人登录
                                console.log("全局配置事项obj", JSON.parse(sessionStorage.getItem('globalConfigObj')))
                                var globalConfigObj = JSON.parse(sessionStorage.getItem('globalConfigObj'))
                                if (globalConfigObj == null || globalConfigObj == undefined || globalConfigObj == '') {
                                    // 证明不是url事项配置 走正常逻辑
                                    this.ifShow = false; //隐藏输入人名社保卡
                                    this.setNativeMsg(); //浙理办打包需要打开
                                    this.getUserRegion(); // 自动获取参保地
                                } else {
                                    if (globalConfigObj.userType == undefined) {
                                        // 证明不是url事项配置 走正常逻辑
                                        this.ifShow = false; //隐藏输入人名社保卡
                                        this.setNativeMsg(); //浙理办打包需要打开
                                        this.getUserRegion(); // 自动获取参保地
                                    } else {
                                        // url事项配置 跳转路由
                                        this.$router.push({
                                            name: globalConfigObj.identifier,
                                            params: globalConfigObj
                                        })
                                    }
                                }
                            } else {
                                window.location.href = 'https://esso.zjzwfw.gov.cn/opensso/spsaehandler/metaAlias/sp?spappurl=https://ybj.zjzwfw.gov.cn/api/H5/jy2009/info?goto=?epsoft=1'
                            }
                        }
                    },
                    onFail: function(error){
                        console.log("data获取用户类型", error)
                    }
                })
                    })
                
            }
            console.log('dddddd引入浙理办SDKddddddd', dd)
            this.epFn.setTitle('医疗保障专区')
            // 获取参保地
            if (sessionStorage.getItem("GinsengLandCode") == "339900") {
                this.iconFlag = true; //省本级设置为true
            } else {
                this.iconFlag = false; //其他情况设置为false
            }
            // 设置标题
            // this.$ep.setTitle("sssssssssssssssssssssssss")
            // 选择图片
            // this.$ep.chooseImage((data)=> {
            //     console.log('chooseImage成功回调',data)
            // },(error)=> {
            //     console.log('chooseImage失败回调',error)
            // });
            // // 获取当前城市信息
            //  dd.biz.util.selectLocalCity ({
            //     onSuccess: (data) => {
            //         console.log('############################jozhi')
                   
            //     },
            //     onFail: (error) => {
                   
            //     }
            //   })
              


            // // 获取当前地理位置
            // this.$ep.locationGet((data) => {
            //     console.log('locationGet成功回调', data)
            //     let lat = data.latitude.toString();
            //     let lng = data.longitude.toString();
            //     this.lat = lat;
            //     this.lng = lng;
            //     console.log("lng", this.lng)
            //     console.log("lat", this.lat)
            // }, (error) => {
            //     console.log('locationGet失败回调', error)
            // })
            // 移动支付
            // this.$ep.mobelPay((data) => {
            //     console.log('locationGet成功回调',data)
            // },(error)=> {
            //     console.log('locationGet失败回调',error)
            // })
            // 支付码
            // this.$ep.payCode((data) => {
            //     console.log('locationGet成功回调',data)
            // },(error)=> {
            //     console.log('locationGet失败回调',error)
            // })
            // 电子社保卡
            // this.$ep.socialCard((data) => {
            //     console.log('locationGet成功回调',data)
            // },(error)=> {
            //     console.log('locationGet失败回调',error)
            // })
        },
        filters: {
            msgLength: function(val) {
                if (val.length > 20) {
                    return val.slice(0, 20) + '...';
                } else {
                    return val;
                }
            }
        },
        methods: {
            // isUserType() {
            //     if (this.$build == "2") {
            //         // 控制路由跳转
            //         // 引用浙理办SDK获取用户登录类型
            //         dd.biz.user.getUserType({
            //             onSuccess: (data) => {
            //                 // 成功回调 保存到session
            //                 sessionStorage.setItem("userType", data.userType)
            //                 console.log("data获取用户类型", data)
            //                 // 如果是0 或者1 那么是个人登录
            //                 if (data.userType == '0' || data.userType == '1') {
            //                     // url事项配置截取url参数方法  ------开始
            //                     var sp = this.util.paramStr('sp')
            //                     console.log(sp == undefined)
            //                     if (sp != "" && sp != undefined && sp != null) {
            //                         const arr1 = sp.split("|")
            //                         let obj = {}
            //                         arr1.map((item, index) => {
            //                             console.log(item.split("=")[0] + '------' + item.split("=")[1])
            //                             console.log()
            //                             obj[item.split("=")[0]] = item.split("=")[1]
            //                         })
            //                         console.log('obj---', obj)
            //                         // url事项配置截取url参数方法  ------结束 如果有存入对象
            //                         sessionStorage.setItem("globalConfigObj", JSON.stringify(obj))
            //                     } else {
            //                         // 如果没有 对象存空
            //                         sessionStorage.setItem("globalConfigObj", JSON.stringify({}))
            //                     }
            //                     // ------------事项url配置截取sp分成对象保存到session里面---------end
            //                     console.log('---globalConfigObj---', sessionStorage.getItem("globalConfigObj"))
            //                     sessionStorage.setItem("iflegal", data.userType)
            //                     //--------------------------- 单点登录逻辑开始-----------------
            //                     const code = 'yibaozs';
            //                     console.log('code', code)
            //                     // var ticket = paramStr("ticket") || "8afac0cc6b84c4aa016b8e7fb4662798-ticket";
            //                     var ticket = this.util.paramStr("ticket");
            //                     console.log('ticket-------------', ticket)
            //                     var token = sessionStorage.getItem("getToken")
            //                     console.log('token-------------', token)
            //                     //如果有token直接请求用户信息
            //                     if (token != "" && token != undefined && token != null) {
            //                         this.$axios.post(this.ApiUrl() + "/H5/jy2005/info", {
            //                             "token": token,
            //                             "tradeCode": "2005"
            //                         }).then(result2 => {
            //                             console.log(6)
            //                             console.log('result2-----------------', result2)
            //                             if (result2.result == "0") {
            //                                 sessionStorage.setItem("userName", result2.username)
            //                                 sessionStorage.setItem("idCard", result2.idnum)
            //                                 console.log('userName', result2.username)
            //                                 console.log('idCard', result2.idnum)
            //                             } else {
            //                                 MessageBox.alert(result2.errmsg);
            //                                 return;
            //                             }
            //                         })
            //                     } else {
            //                         // 如果有ticket 直接用ticket 换取token  再用token 获取用户信息
            //                         if (ticket != "" && ticket != undefined && ticket != null) {
            //                             console.log(4)
            //                             this.$axios.post(this.ApiUrl() + "/H5/jy2004/info", {
            //                                 "st": ticket,
            //                                 "tradeCode": "2004"
            //                             }).then(result0 => {
            //                                 console.log('result0----------------------', result0)
            //                                 if (result0.result == "0") {
            //                                     sessionStorage.setItem("getToken", result0.token)
            //                                 } else {
            //                                     MessageBox.alert(result0.errmsg);
            //                                     return;
            //                                     // return;
            //                                 }
            //                                 this.$axios.post(this.ApiUrl() + "/H5/jy2005/info", {
            //                                     "token": result0.token,
            //                                     "tradeCode": "2005"
            //                                 }).then(result1 => {
            //                                     console.log(5)
            //                                     console.log('result1------------------', result1)
            //                                     if (result1.result == "0") {
            //                                         sessionStorage.setItem("userName", result1.username)
            //                                         sessionStorage.setItem("idCard", result1.idnum)
            //                                         console.log('userName', result1.username)
            //                                         console.log('idCard', result1.idnum)
            //                                     } else {
            //                                         MessageBox.alert(result1.errmsg);
            //                                     }
            //                                 })
            //                             });
            //                         } else {
            //                             console.log(3)
            //                             // return;
            //                             // 如果没有ticket 跳入易和获取ticket
            //                             window.location.href = "https://puser.zjzwfw.gov.cn/sso/mobile.do?action=oauth&scope=1&servicecode=" + code;
            //                             return;
            //                         }
            //                     }
            //                     sessionStorage.setItem("iflegal", data.userType)
            //                 } else if (data.userType == '2') {
            //                     // 如果 userType = 2 那么是法人登录
            //                     // ----------------------获取事项配置url开始---------------------
            //                     console.log('法人登录')
            //                     console.log("window.location.href", window.location.href)
            //                     var arr = window.location.href.split("?")
            //                     if (window.location.href.indexOf("ssoToken") != -1) {
            //                         console.log('----', arr)
            //                         const arr1 = arr[1].split("&")
            //                         let obj = {}
            //                         arr1.map((item, index) => {
            //                             console.log(item.split("=")[0] + '------' + item.split("=")[1])
            //                             obj[item.split("=")[0]] = item.split("=")[1]
            //                         })
            //                         console.log('obj---', obj)
            //                         // ----------------------获取事项配置url结束---------------------
            //                         sessionStorage.setItem("globalConfigObj", JSON.stringify(obj))
            //                     } else {
            //                         sessionStorage.setItem("globalConfigObj", JSON.stringify({}))
            //                     }
            //                     var ssoToken = this.util.paramStr("ssoToken");
            //                     console.log('ssoToken', ssoToken)
            //                     if (ssoToken != "" && ssoToken != undefined && ssoToken != null) {
            //                         sessionStorage.setItem("ssoToken", ssoToken);
            //                     } else {
            //                         window.location.href = 'https://esso.zjzwfw.gov.cn/opensso/spsaehandler/metaAlias/sp?spappurl=https://ybj.zjzwfw.gov.cn/api/H5/jy2009/info?goto=?epsoft=1'
            //                         return;
            //                     }
            //                 }
            //             },
            //             onFail: (error) => {
            //                 console.log("data获取用户类型", error)
            //             }
            //         })
            //     } else {
            //         console.log("######-----", dd)
            //         dd.biz.user.getUserType({
            //             onSuccess: (data) => {
            //                 console.log("获取用户类型------", data.userType)
            //                 sessionStorage.setItem("userType", data.userType)
            //             },
            //             onFail: (error) => {
            //                 console.log("data获取用户类型", error)
            //             }
            //         })
            //     }
            // },
            //弹窗登录
            loginIn() {
                if (this.epPasword == 'epsoft') {
                    //   this.$message({
                    //   message: '验证成功！',
                    //   type: 'success'
                    // });
                    this.isMask = false;
                }
                this.epPasword = '';
            },
            ApiUrl() {
                // return 'http://10.85.159.203:13030' // 吴学文
                console.log('process.env.NODE_ENV', process.env.NODE_ENV)
                if (process.env.NODE_ENV == 'development') {
                    return 'http://47.98.48.185:8000/api/api' //服务器
                    // return 'http://192.168.1.189:13030' //吴学文
                } else {
                    return ''
                }
            },
            change() {
                this.$router.push('/indexInfoList')
            },
            // 判断是否法人登录
            isLegalLogin() {
                console.log("----法人登录成功token-------", sessionStorage.getItem("ssoToken"))
                const ssoToken = sessionStorage.getItem("ssoToken")
                if (ssoToken != undefined && ssoToken != null && ssoToken != '') {
                    if (ssoToken != undefined && ssoToken != '' && ssoToken != null) {
                        // 请求法人信息
                        this.$axios.post(this.epFn.ApiUrl() + '/H5/jy2009/getUserInfo', {
                            ssoToken: ssoToken
                            // ssoToken:'a1e99379-3fcc-451f-a041-c8ab14008a6c'
                        }).then((resData) => {
                            console.log('返回成功信息', resData);
                            // 存贮法人信息
                            sessionStorage.setItem("LegalPerson", JSON.stringify(resData))
                        })
                    }
                } else {
                    console.log("'法人登录失败")
                }
            },
            // 资讯跳转详情
            goDetail(item) {
                console.log("item:", item)
                this.$router.push({
                    path: "/goDetail",
                    query: {
                        param: item
                    }
                })
            },
            // 跳转配置的地址
            jumpToUrl(url, status) {
                // status为1是失效状态
                if (status == '1') {
                    this.$toast(sessionStorage.getItem("GinsengLandName") + '暂未开通');
                    return;
                } else {
                    // 省本级项目
                    console.log(11111111)
                    if (url.split('/').pop() == 'smallReim' || url.split('/').pop() == 'transferRenewing' || url.split('/').pop() == 'searchProgress') {
                        this.$router.push(url.split('/').pop());
                    } else {
                        // 其他项目跳转
                        if (sessionStorage.getItem("GinsengLandCode") == "339900") {
                            let route = url.split('/');
                            this.$router.push(route.pop());
                        } else {
                            if (url.indexOf("?") != -1) {
                                url = url + '&' + this.util.getToken()
                            } else {
                                url = url + '?' + this.util.getToken()
                            }
                            window.location.href = url;
                        }
                    }
                }
            },
            //动态获取事项信息
            getMatterInfo(code) {
                let params = {
                    "areaId": code,
                    "isApp": 1, //1代表APP；0代表网上办
                }
                this.$axios.post(this.epFn.ApiUrl() + "/H5/jy0000/getAreaList", params).then((resData) => {
                    console.log('获取区域事项', resData)
                    let resList = resData.list;
                    console.log('图标sdk成功')
                    let iconList = [];
                    let userType = sessionStorage.getItem('userType')
                    if (userType == 1 || userType == 0) {
                        iconList = resList.personList;
                        iconList.forEach(ele => {
                            ele.jumpUrl = ele.personJumpUrl
                        });
                    } else if (userType == 2) {
                        iconList = resList.unitList;
                        iconList.forEach(ele => {
                            ele.jumpUrl = ele.unitJumpUrl
                        });
                    }
                    // 自动补齐图标
                    this.iconList = iconList
                    console.log('图标列表', this.iconList);
                })
            },
            ApiUrl() {
                // return 'http://10.85.159.203:13030' // 吴学文
                console.log('process.env.NODE_ENV', process.env.NODE_ENV)
                if (process.env.NODE_ENV == 'development') {
                    return 'http://47.98.48.185:8000/api/api' //服务器
                    // return 'http://192.168.1.189:13030' //吴学文
                } else {
                    return ''
                }
            },
            // ·列表
            getNewsInfo(code) {
                let _this = this;
                let userType = sessionStorage.getItem('userType')
                let params = {
                    "areaId": code,
                    "statusType": userType //1代表个人2代表单位
                };
                _this.$axios.post(_this.epFn.ApiUrl() + "/H5/jy0001/getAreaList", params).then((resData) => {
                    console.log('resData', resData)
                    if (this.isClear == true) {
                        sessionStorage.setItem('isClear', true)
                    } else if (this.isClear == false) {
                        sessionStorage.setItem('isClear', true)
                    }
                    _this.hotMsg = resData.list;
                    console.log("hotMsg", _this.hotMsg)
                    _this.hotMsg.forEach(ele => {
                        ele.src = ele.synopsisUrl;
                    })
                    this.hotMsg.splice(0, 5);
                    console.log('获取资讯列表', _this.hotMsg);
                })
            },
            // 跑马灯效果
            srcollLine() {
                let [box, content, text] = [
                    document.querySelector('.Hint'),
                    document.querySelector('.HintContent'),
                    document.querySelector('.HintText')
                ];
                let [textWidth, boxWidth] = [
                    text.offsetWidth,
                    box.offsetWidth
                ];
                if (boxWidth > textWidth) {
                    return false
                }
                content.innerHTML += content.innerHTML;
                document.querySelector('.HintText').classList.add('padding');
                // 更新
                textWidth = document.querySelector('.HintText').offsetWidth;
                this.toScrollLeft(textWidth, box);
            },
            toScrollLeft(textWidth, box) {
                //  如果文字长度大于滚动条距离，则递归拖动
                if (textWidth > box.scrollLeft) {
                    box.scrollLeft++
                        setTimeout(() => {
                            this.toScrollLeft(textWidth, box);
                        }, 20);
                } else {
                    box.scrollLeft = 0;
                    this.toScrollLeft(textWidth, box);
                }
            },
            query1() {
                console.log("query")
            },
            hint() {
                this.$toast("功能正在建设中");
            },
            //移动支付
            movePay() {
                let _this = this
                dd.ready({
                    developer: 'daip@dtdream.com',
                    usage: [
                        'dd.biz.navigation.open',
                    ],
                    remark: '移动支付'
                }, function() {
                    dd.biz.navigation.open({
                        pageId: 'card',
                        params: {
                            id: "medicalPayCard",
                            functionType: 1 //1医保SDK
                        },
                        onSuccess: function(data) {
                            console.log(data)
                        },
                        onFail: function(error) {
                            console.log(error)
                            _this.$toast("请升级浙里办APP版本")
                        }
                    })
                })
            },
            //支付码
            payCode() {
                let _this = this
                dd.ready({
                    developer: 'daip@dtdream.com',
                    usage: [
                        'dd.biz.navigation.open',
                    ],
                    remark: '支付码'
                }, function() {
                    dd.biz.navigation.open({
                        pageId: 'card',
                        params: {
                            id: "socialCard",
                            functionType: 2 //1社保卡首页 2打开社保卡支付码 3打开社保卡关联页
                        },
                        onSuccess: function(data) {
                            console.log(data)
                        },
                        onFail: function(error) {
                            console.log(error)
                            _this.$toast("请升级浙里办APP版本")
                        }
                    })
                })
            },
            //电子社保卡
            socialCard() {
                let _this = this
                dd.ready({
                    developer: 'daip@dtdream.com',
                    usage: [
                        'dd.biz.navigation.open',
                    ],
                    remark: '电子社保卡'
                }, function() {
                    dd.biz.navigation.open({
                        pageId: 'card',
                        params: {
                            id: "socialCard",
                            functionType: 1 //1社保卡首页 2打开社保卡支付码 3打开社保卡关联页
                        },
                        onSuccess: function(data) {
                            console.log(data)
                        },
                        onFail: function(error) {
                            console.log(error)
                            _this.$toast("请升级浙里办APP版本")
                        }
                    })
                })
            },
            //药品目录
            medicalList() {
                console.log(1)
                this.$router.push("/SearchInfoMedicalList");
            },
            //异地定点医院
            elseWhereHospital() {
                console.log(2)
                let item = {}
                if (this.lat == "" && this.lng == "") {
                    item.lat = "30.274643833098636"
                    item.lng = "120.14708140897169"
                } else {
                    item.lat = this.lat;
                    item.lng = this.lng;
                }
                console.log("item", item)
                this.$router.push({
                    path: "/SearchInfoElseWhere", //领取就医凭证
                    query: {
                        param: item
                    }
                });
            },
            yibaozhanghu() {
                this.$toast("功能正在建设中")
            },
            goRouter(route) {
                if (sessionStorage.getItem("GinsengLandCode") == "339900" || sessionStorage.getItem("GinsengLandCode") == "331099") {
                    this.$router.push(route);
                } else {
                    this.$toast(sessionStorage.getItem("GinsengLandName") + '暂未开通');
                    return;
                }
            },
            setNativeMsg() {
                this.$store.dispatch('SET_NATIVEMSG', {
                    title: "",
                    describe: "",
                    type: "",
                    typeItem: "",
                    name: sessionStorage.getItem("userName"),
                    idCard: sessionStorage.getItem("idCard"),
                    PublicHeader: {
                        imei: '',
                        mac: '1111',
                        phoneModel: '',
                        platform: '',
                        signType: '',
                        sign: '',
                        version: 'v2.0',
                    }
                });
            },
            getUserRegion() {
                let params = this.formatSubmitData();
                this.$axios.post(this.epFn.ApiUrl() + '/h5/jy1033/getRecord', params).then((resData) => {
                    console.log('返回成功信息', resData)
                    //   成功   1000
                    if (resData.enCode == 1000) {
                        if (resData.AAB301) {
                            sessionStorage.setItem("GinsengLandCode", resData.AAB301)
                            sessionStorage.setItem("GinsengLandName", resData.RegionName)
                            this.$store.dispatch('SET_USER_DETAILINFO', {
                                insured: resData.AAB301,
                                regionName: resData.RegionName || '杭州市'
                            })
                            console.log('用户参保地信息', sessionStorage.getItem("GinsengLandCode"));
                            console.log("this.isTips", this.isTips)
                            // 调用首页事项和咨询管理
                            this.getMatterInfo(sessionStorage.getItem("GinsengLandCode"));
                            this.getNewsInfo(sessionStorage.getItem("GinsengLandCode"));
                            if (sessionStorage.getItem("GinsengLandCode") == "339900") {
                                this.iconFlag = true; //省本级设置为true
                                this.isTips = false
                            } else {
                                this.iconFlag = false; //其他情况设置为false
                                this.isTips = true
                            }
                        } else {
                            dd.ready({
                                developer: 'daip@dtdream.com',
                                usage: [
                                    'dd.device.location.get',
                                ],
                                remark: '获取当前位置'
                            }, function() {
                                dd.device.location.get({
                                    onSuccess: function(data) {
                                        console.log(data)
                                    },
                                    onFail: function(error) {}
                                })
                            })
                        }
                    } else if (resData.enCode == 1001) {
                        //   失败  1001
                        this.$toast(resData.msg);
                        return;
                    } else {
                        this.$toast('业务出错');
                        return;
                    }
                })
            },
            formatSubmitData() {
                let submitForm = {}
                // 加入用户名和电子社保卡号
                submitForm.AAC003 = sessionStorage.getItem("userName");
                submitForm.AAE135 = sessionStorage.getItem("idCard");
                // 请求参数封装
                const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader, submitForm, "1033");
                return params;
            },
            //个人用户登录
            changeUsername(str) {
                if (str) {
                    let user = Object.assign({}, this.$store.state.SET_USER_BASEINFO);
                    MessageBox.prompt('用户名', '').then(({
                        value,
                        action
                    }) => {
                        user.name = value;
                        this.$store.dispatch('SET_USER_BASEINFO', user);
                        sessionStorage.setItem('userName', value);
                        this.setNativeMsg();
                    });
                } else {
                    this.$toast("功能正在建设中")
                }
            },
            //个人用户登录
            changeUserCode(str) {
                if (str) {
                    let user = Object.assign({}, this.$store.state.SET_USER_BASEINFO);
                    MessageBox.prompt('社保卡号', '').then(({
                        value,
                        action
                    }) => {
                        user.idNo = value;
                        this.$store.dispatch('SET_USER_BASEINFO', user);
                        sessionStorage.setItem('idCard', value);
                        this.setNativeMsg();
                        this.getUserRegion();
                        sessionStorage.setItem("userType", 1)
                    });
                } else {
                    this.$toast('功能正在建设中')
                }
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
                const tip = sessionStorage.getItem("GinsengLandCode")
                const tipstr = sessionStorage.getItem("GinsengLandName")
                // 正式环境 杭州不能点 测试环境可以点
                if (this.$build == "2") {
                    if (tip != "339900" && tip != "331099") {
                        console.log("tiptiptiptiptiptip", tip);
                        if (tipstr === null) {
                            this.$toast("服务暂未开通")
                        } else {
                            this.$toast(tipstr + "服务暂未开通")
                        }
                        return;
                    }
                } else if (this.$build == "1") {
                    if (tip != "339900" && tip != "331099" && tip != "330100") {
                        console.log("tiptiptiptiptiptip", tip);
                        if (tipstr === null) {
                            this.$toast("服务暂未开通")
                        } else {
                            this.$toast(tipstr + "服务暂未开通")
                        }
                        return;
                    }
                }
                // 医保账户 只有省本级能点
                if (url == 'medicalInsuranceAccount') {
                    if (tip != '339900') {
                        if (tipstr === null) {
                            this.$toast("服务暂未开通")
                        } else {
                            this.$toast(tipstr + "服务暂未开通")
                        }
                        return;
                    }
                }
                //  台州市只能点转移接续
                // if ( url == "smallReim" ) {
                //     if ( tip != "339900" ) {
                //         this.$toast(tipstr + "服务暂未开通")
                //         return
                //     }
                // }
                let str = sessionStorage.getItem("GinsengLandCode")
                console.log('str', str)
                if (str == "" || str == undefined || str == null) {
                    this.$toast("未获取到您的参保地信息")
                    return
                }
                sessionStorage.setItem('itemUrl', url);
                sessionStorage.setItem("item", item);
                this.$router.push({
                    name: url,
                    params: {
                        item: item,
                    }
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    .indexInfoList {
        width: 100%;
        .mask {
            height: 100%;
            width: 100%;
            background-color: rgba(0, 0, 0, .5);
            position: fixed;
            top: 0;
            left: 0;
            z-index: 99999;
            .mask_div {
                height: 5rem;
                width: 6rem;
                background-color: #fff;
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                top: 30%;
                border-radius: 5px;
                .mask_div_text {
                    width: 96%;
                    height: 3rem;
                    position: absolute;
                    left: 50%;
                    transform: translateX(-50%);
                    top: 10px;
                    background-color: #aaa;
                }
                .content {
                    width: 6.2rem;
                    height: 7.8rem;
                }
                .mask_input {
                    width: 76%;
                    height: 0.7rem;
                    font-size: 0.35rem;
                    position: absolute;
                    text-indent: 5px;
                    top: 82%;
                    left: 50%;
                    -webkit-transform: translateX(-50%);
                    transform: translateX(-50%);
                    margin-left: .4rem;
                    border: none;
                }
                .loginButton {
                    position: absolute;
                    top: 128%;
                    border: none;
                    background: none;
                    left: 5%;
                    width: 93%;
                    height: 21%;
                }
            }
        }
        .Hint {
            width: 100%;
            padding: 0 .3rem;
            font-size: .26rem;
            color: #000000;
            text-align: left;
            background: #fbdedb;
            color: #ff6204;
            white-space: nowrap;
            overflow: hidden;
            .HintContent {
                p {
                    display: inline-block;
                    line-height: .6rem;
                }
                .padding {
                    padding-right: 100%;
                }
            }
        } // 头部
        .indexHeader {
            height: 3.4rem;
            position: relative;
            .svg-icon {
                height: 3.4rem;
                width: 100%;
            }
            .headerText {
                position: absolute;
                top: .4rem;
                left: .5rem;
                font-size: .6rem;
                color: #FFFFFF;
                line-height: .6rem;
            }
            .headerInfo {
                position: absolute;
                top: 1.1rem;
                left: .5rem;
                opacity: 0.8;
                font-size: .28rem;
                color: #FFFFFF;
                letter-spacing: .0046rem;
                line-height: .4rem;
            }
            .headerPad {
                position: absolute;
                top: 2.3rem;
                left: 50%;
                transform: translateX(-50%);
                height: 2.2rem;
                width: 94%;
                background: #FFFFFF;
                border: 0 solid #E7EDF7;
                box-shadow: 0 0 .28rem 0 rgba(0, 0, 0, 0.07);
                border-radius: .08rem;
                display: flex;
                justify-content: space-around;
                align-items: center;
                .iconBox {
                    height: 1.4rem;
                    width: 1.4rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    align-items: center;
                    .svg-icon {
                        height: .68rem;
                        width: .68rem;
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
        } // 图标区域
        .iconContent {
            // height: 4.74rem;
            background: #FFF;
            padding: 1.8rem .2rem 0 .2rem;
            .iconList {
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
                .iconBox {
                    position: relative;
                    height: 1.4rem;
                    width: 25%;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    align-items: center;
                    .svg-icon {
                        height: .68rem;
                        width: .68rem;
                    }
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
                    .provinceIcon {
                        height: .28rem;
                        width: .5rem;
                        position: absolute;
                        top: 0rem;
                        right: 0rem;
                    }
                    .text {
                        font-size: .28rem;
                        color: #3A4259;
                        letter-spacing: 0;
                        text-align: center;
                        line-height: .28rem;
                    }
                }
                &:last-child {
                    margin-top: .16rem;
                }
            }
        } // banner
        .banner {
            height: 2.96rem;
            background: #FFF;
            padding: 0 .2rem;
            display: flex;
            align-items: center;
            .swiper-container {
                height: 100%;
                .swiper-wrapper {
                    height: 100%;
                    .swiper-slide {
                        .svg-icon {
                            height: 100%;
                            width: 100%;
                        }
                    }
                }
            }
            .bannerSvg {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-around;
                .svg-icon {
                    height: 1.76rem;
                    width: 3.28rem;
                }
            }
        } // 轮播图
        .carousel {
            height: 2.48rem;
            background: #FFF;
            padding-bottom: .48rem;
            .c-swipe {
                height: 100%;
                .svg-icon {
                    height: 100%;
                    width: 100%;
                }
            }
            .svg-icon {
                height: 100%;
                width: 100%;
            }
        } // 热点资讯
        .hotMsg {
            background: #FFF;
            padding: 0 .32rem;
            .hotHeader {
                height: .8rem;
                line-height: .8rem;
                font-size: .44rem;
                color: #000000;
                letter-spacing: 0;
                text-align: left;
                font-weight: bold;
            }
            .msgLine {
                height: 2.24rem;
                padding: .32rem 0;
                display: flex;
                justify-content: space-between;
                border-bottom: .01rem solid#E5E5E5;
                .textBox {
                    width: 4rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    .textInfo {
                        height: 1rem;
                        font-size: .36rem;
                        color: #000000;
                        letter-spacing: 0;
                        line-height: .48rem;
                        text-align: left;
                    }
                    .dateInfo {
                        font-size: .28rem;
                        color: #999999;
                        text-align: left;
                        line-height: .3rem;
                    }
                }
                .imgBox {
                    height: 1.6rem;
                    width: 2.2rem;
                    background: #EEE;
                    border-radius: .05rem;
                    img {
                        height: 100%;
                        width: 100%;
                        border-radius: .05rem
                    }
                }
            }
        }
    }
    .bottomline {
        font-size: .28rem;
        margin-top: .1rem;
        margin-bottom: .18rem;
        text-align: center;
        p {
            margin: 0 10px;
            line-height: 25px;
            color: #888;
            .bottomSpan {
                color: #1492ff; // color: red;
                a {
                    color: #1492ff
                }
            }
        }
    }
    .changeUserBtn {
        display: flex;
        justify-content: space-around;
        .btn {
            height: .6rem;
            line-height: .6rem;
            width: 3.5rem;
            border: 1px solid #DDD;
            font-size: .36rem;
            border-radius: .2rem;
            background: #FFF;
        }
    }
</style>
