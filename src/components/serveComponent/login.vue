<template>
<div class="main">
    <div class="bg">
        <svg-icon icon-class="login_bg"></svg-icon>
    </div>
    <div class="title"><span>医保经办系统</span></div>
    <div class="content">
        <div class="loginBox">
            <div class="userName"><svg-icon icon-class="login_user"></svg-icon><input class="text" type="text" placeholder="请输入用户名"/></div>
            <div class="passWord"><svg-icon icon-class="login_password"></svg-icon><input class="text" type="text" placeholder="请输入密码"/></div>
            <div class="test"><svg-icon icon-class="login_test"></svg-icon><input class="text" type="text" placeholder="请输入验证码"/></div>
        </div>
        
         <div><button class="submit" ><span>绑定</span></button></div>
    </div>
    
</div>
</template>

<script>
export default {
    
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
                        display: inline;
                        margin-left: .4rem;
                        font-family: MicrosoftYaHei;
                        font-size: .28rem;
                        color: #999999;
                        letter-spacing: 0;
                        border: none;
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
                        display: inline;
                        width: .5rem;
                        height: .5rem;
                    }
                    .text{
                        display: inline;
                        margin-left: .4rem;
                        font-family: MicrosoftYaHei;
                        font-size: .28rem;
                        color: #999999;
                        letter-spacing: 0;
                        border: none;
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
                        display: inline;
                        width: .5rem;
                        height: .5rem;
                    }
                    .text{
                        display: inline;
                        margin-left: .4rem;
                        font-family: MicrosoftYaHei;
                        font-size: .28rem;
                        color: #999999;
                        letter-spacing: 0;
                        border: none;
                    }
                    
                }
            }
            .submit{
                display: block;
                background: #1492FF;
                border-radius: .1rem;
                border: none;
                width: 6.7rem;
                height: 1.05rem;
                margin-left: .4rem;
                margin-top: 7.3rem;
                position: relative;
                z-index: 1;
                span{
                    font-family: MicrosoftYaHei;
                    font-size: .36rem;
                    color: #FFFFFF;
                    letter-spacing: 0;
                    text-align: center;
                }
            }
        }            


    }
</style>