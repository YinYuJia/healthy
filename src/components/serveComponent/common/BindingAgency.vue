<template>
<div class="Binding" v-if="flag">
    <div class="main">
        <div class="bg">
            <svg-icon icon-class="login_bg"></svg-icon>
        </div>
        <div class="content">
            <!-- 标题 -->
            <div class="contentTitle"><span>医保经办系统</span></div>
            <!-- 输入栏 -->
            <div class="loginBox">
                <div class="loginLine">
                    <svg-icon icon-class="login_user"></svg-icon>
                    <input placeholder="请输入用户名" v-model="form.userName" />
                    <svg-icon v-if="form.userName!=''" @click="deleteUserName" icon-class="login_clear"></svg-icon>
                </div>
                <div class="loginLine">
                    <svg-icon icon-class="login_password"></svg-icon>
                    <input placeholder="请输入密码" type="password" v-model="form.passWord" />
                    <svg-icon v-if="form.passWord!=''" @click="deletePassWord" icon-class="login_clear"></svg-icon>
                </div>
                <div class="loginLine">
                    <svg-icon icon-class="login_test"></svg-icon>
                    <input placeholder="请输入验证码" v-model="form.code" />
                    <div @click="changeCode" class="imgBox">
                        <img :src="imgUrl" />
                    </div>
                </div>
            </div>
            <!-- 按钮 -->
            <div class="SubmitBtn" @click="submit()" :class="{'active': canSubmit == true}">
                <span>绑定</span>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import md5 from 'js-md5'
export default {
    data () {
        return {
            canSubmit:false,
            form:{
                userName:"",//用户名
                passWord:"",//密码
                code: "", //验证码
            },
            imgUrl: '',
            canClick: true, //是否能点击刷新，控制点击频率
            flag:false
        }
    },
    created(){
        if( this.$build == '1') {
         this.imgUrl = 'http://47.98.234.226:7000/api/api/H5/jy0004/code?userId=' + JSON.parse(sessionStorage.getItem('LegalPerson')).userId
        }else{
         this.imgUrl = 'https://ybj.zjzwfw.gov.cn/api/H5/jy0004/code?userId=' + JSON.parse(sessionStorage.getItem('LegalPerson')).userId
        }
        this.checkJump()
    },
    watch: {
        form:{
            handler:function(val){
                if(val.userName!="" && val.passWord!="" && val.code!=""){
                    this.canSubmit=true;
                }else{
                    this.canSubmit=false;
                }
            },
            deep: true
        }
    },
    methods: {
        checkJump(){
            let user = JSON.parse(sessionStorage.getItem("LegalPerson"));
            let params = {
                OTHERINFO: user.userId
            }
            this.$axios.post(this.epFn.ApiUrl() + "/H5/jy9102/distanceHospital", params).then((resData) => {
                console.log('绑定',resData)
                if(resData.enCode == 1000){
                    if(resData.LS_DS[0].USEGUL == '1'){
                        sessionStorage.setItem('LOGINNAME',resData.LS_DS[0].LOGINNAME);
                        this.flag = false;
                    }else{
                        this.flag = true;
                    }
                }else if (resData.enCode == 1001 ) {
                    //   失败  1001
                    this.flag = true;
                }else{
                    this.$toast('业务出错');
                    this.flag = true;
                    return false;
                }
            })
        },
        deleteUserName(){
            this.form.userName=""
        },
        deletePassWord(){
            this.form.passWord=""
        },
        // 获取验证码
        changeCode(){
            if(this.canClick){
                this.imgUrl = this.imgUrl.split('&')[0]
                this.imgUrl = this.imgUrl + '&num=' + Math.random(10)
                this.canClick = false
                setTimeout( ()=> {
                    this.canClick = true
                },1000)
            }else{
                return
            }
        },
        submit(){
            let params = {
                OTHERINFO: JSON.parse(sessionStorage.getItem('LegalPerson')).userId,
                LOGINNAME: this.form.userName,
                PASSWD: md5(this.form.passWord),
                code: this.form.code.toUpperCase(),
            }
            console.log('params', params);
            this.$axios.post( this.epFn.ApiUrl() + '/H5/jy9103/distanceHospital', params)
            .then((resData) => {
                console.log(resData);
                if(resData.enCode == 1000){
                    sessionStorage.setItem('LOGINNAME',this.form.userName);
                    this.$toast('绑定成功')
                    this.flag = false;
                }else{
                    this.$toast(resData.msg)
                    this.flag = true;
                }
            }).catch((error) => {
                console.log(error)
            })
        }
    }
}
</script>

<style lang="less" scoped>
.Binding{
    position: fixed;
    z-index: 999;
    top: 0;
    height: 100%;
    width: 100%;
    background: white;
    .main{
        background: #FFFFFF;  
        width: 100%;
        height: 100%;
        font-size: .16rem;
        margin-bottom: 2rem;
        .bg{
            position: absolute;
            top: 0;
            width: 7.5rem;
            height: 6.38rem;
            .svg-icon{
                display: block;
                width: 100%;
                height: 100%;
            }
        }
        .content{
            height: 9.5rem;
            width: 100%;
            position: absolute;
            top: 50%;
            margin-top: -9.5rem/2;
            padding: 0 .4rem;
            .contentTitle{
                font-size: .48rem;
                color: #FFFFFF;
                letter-spacing: .02rem;
                text-align: left;
            }
            .loginBox{
                width: 100%;
                height: 6.5rem;
                background: #FFF;
                border-radius: .1rem;
                margin-top: 1.35rem;
                padding: .2rem .4rem 0;
                .loginLine{
                    height: 1.35rem;
                    display: flex;
                    align-items: center;
                    font-size: .28rem;
                    color: #999999;
                    letter-spacing: 0;
                    border-bottom: 1px solid #DDDDDD;
                    .svg-icon{
                        height: .5rem;
                        width: .5rem;
                        &:first-child{
                            margin-right: .4rem;
                        }
                    }
                    input{
                        width: 80%;
                        height: .5rem;
                        border: none;
                        &:last-child{
                            width: 40%;
                        }
                    }
                    .imgBox{
                        width: 2rem;
                        height: 0.8rem;
                        background: #EEE;
                        img{
                            height: 100%;
                            width: 100%;
                        }
                    }
                }
            }
            .SubmitBtn {
                height: 1.05rem;
                width: 100%;
                border-radius: .05rem;
                line-height: 1.05rem;
                background: #F2F2F2;;
                font-size: .36rem;
                color: #B4B4B4;
                letter-spacing: 0;
                text-align: center;
            }
            .active{
                background: #1492FF;
                color: #FFFFFF;
            }
        }
    }
}
</style>