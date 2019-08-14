<template>
<div class="main">
    <div class="bg">
        <svg-icon icon-class="login_bg"></svg-icon>
    </div>
    <div class="title"><span>医保经办系统</span></div>
    <div class="content">
        <div class="loginBox">
            <div class="userName">
                <svg-icon icon-class="login_user"></svg-icon>
                <input class="text" type="text" v-model="form.userName" placeholder="请输入用户名"/>
                <div class="clear">
                    <svg-icon icon-class="login_clear" v-if="form.userName" @click="deleteUserName()"></svg-icon>
                </div>
            </div>
            <div class="passWord">
                <svg-icon icon-class="login_password"></svg-icon>
                <input class="text" type="password" v-model="form.passWord" placeholder="请输入密码"/>
                <div class="clear">
                    <svg-icon icon-class="login_clear" v-if="form.passWord" @click="deletePassWord()"></svg-icon>
                </div>
            </div>
            <div class="test">
                <svg-icon icon-class="login_test"></svg-icon>
                <input class="text" type="text" placeholder="请输入验证码"/>
                <img @click="changeCode" :src="imgUrl" />
            </div>
        </div>
        
         <div><button class="SubmitBtn"  :class="{'active': canSubmit == true}" ><span>绑定</span></button></div>

    </div>
    
</div>
</template>

<script>
export default {
    data () {
        return {
            canSubmit:false,
            form:{
                userName:"",//用户名
                passWord:"",//密码
            },
            imgUrl: '',
        }
    },
    created(){
        this.imgUrl = this.epFn.ApiUrl() +  '/H5/jy0004/code?userId=' + JSON.parse(sessionStorage.getItem('LegalPerson')).userId
    },
    watch: {
        form:{
            handler:function(val){
                if(val.userName!="" && val.passWord!=""){
                    this.canSubmit=true;
                }else{
                    this.canSubmit=false;
                }
            },
            deep: true
        }
    },
    methods: {
        deleteUserName(){
            this.form.userName=""
        },
        deletePassWord(){
            this.form.passWord=""
        },
        // 获取验证码
        changeCode(){
            this.imgUrl = this.imgUrl + '?date=' + new Date();
        }
    }
}
</script>

<style lang="less" scoped>
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
        .title{
            margin-left: .5rem;
            margin-top: 2.67rem;
            width: 4.8rem;
            height: .64rem;
            background: none;
            text-align: left;
            span{   
                font-family: MicrosoftYaHei;
                font-size: .48rem;
                color: #FFFFFF;
                letter-spacing: 2px;
            }
        }
        .content{
                     
            .loginBox{
                width: 6.7rem;
                height: 6.93rem;
                background: #FFFFFF;
                border-radius: 10px;
                position: absolute;
                left: .4rem;
                top: 4.67rem;
                .userName{
                    height: 1.2rem;
                    line-height: 1.2rem;
                    text-align: left;
                    margin-left: .6rem;
                    margin-right: .6rem;
                    margin-top: .5rem;
                    border-bottom: 1px solid #DDDDDD;
                    .svg-icon{
                        display: inline;
                        width: .5rem;
                        height: .5rem;
                    }
                    .text{
                        width: 3.8rem;
                        display: inline-block;
                        margin-left: .4rem;
                        font-family: MicrosoftYaHei;
                        font-size: .28rem;
                        color: #999999;
                        letter-spacing: 0;
                        border: none;
                    }
                    .clear{
                        width: .5rem;
                        height: .5rem;
                        display: inline-block;
                        .svg-icon{
                            width: 100%;
                            height: 100%;
                            display: block;
                            margin-top: .1rem;
                        }
                    }
                }
                .passWord{
                    height: 1.2rem;
                    line-height: 1.2rem;
                    text-align: left;
                    margin-left: .6rem;
                    margin-top: .5rem;
                    margin-right: .6rem;
                    border-bottom: 1px solid #DDDDDD;
                    .svg-icon{
                        display: inline-block;
                        width: .5rem;
                        height: .5rem;
                    }
                    .text{
                        width: 3.8rem;
                        display: inline-block;
                        margin-left: .4rem;
                        font-family: MicrosoftYaHei;
                        font-size: .28rem;
                        color: #999999;
                        letter-spacing: 0;
                        border: none;
                    }
                    .clear{
                        width: .5rem;
                        height: .5rem;
                        display: inline-block;
                        .svg-icon{
                            width: 100%;
                            height: 100%;
                            display: block;
                            margin-top: .1rem;
                        }
                    }
                }
                .test{
                    height: 1.2rem;
                    line-height: 1.2rem;
                    text-align: left;
                    margin-left: .6rem;
                    margin-top: .5rem;
                    margin-right: .6rem;
                    border-bottom: 1px solid #DDDDDD;
                    .svg-icon{
                        display: inline-block;
                        width: .5rem;
                        height: .5rem;
                    }
                    .text{
                        width: 2.42rem;
                        display: inline-block;
                        margin-left: .4rem;
                        font-family: MicrosoftYaHei;
                        font-size: .28rem;
                        color: #999999;
                        letter-spacing: 0;
                        border: none;
                    }
                    img{
                        display: inline-block;
                    }
                }
            }
            .SubmitBtn {
                display: block;
                background: #F2F2F2;
                color: #B4B4B4;
                border-radius: .1rem;
                border: none;
                width: 6.6rem;
                height: 1.05rem;
                margin-left: .4rem;
                margin-top: 7.3rem;
                position: relative;
                z-index: 1;
                margin-bottom: 3rem;
                span{
                    font-family: MicrosoftYaHei;
                    font-size: .36rem;
                    color: #FFFFFF;
                    letter-spacing: 0;
                    text-align: center;
                }
            }
            .active{
                background: #1492FF;
                color: #FFFFFF;
            }
        }            


    }
</style>