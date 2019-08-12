<template>
<div class="main">
    <div class="bg">
        <svg-icon icon-class="login_bg"></svg-icon>
    </div>
    <div class="content">
        <div class="title"><span>医保经办系统</span></div>
        <div class="loginBox"></div>
    </div>
</div>
</template>

<script>
export default {
    
}
</script>

<style lang="less" scoped>
    .main{
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
            width: 7.5rem;
            height: 6.38rem;
            .title{
                    padding-left: .5rem;
                    padding-top: 2.67rem; 
                    background: none;
                span{
                    line-height: .48rem;
                    font-family: MicrosoftYaHei;
                    font-size: .48rem;
                    color: #FFFFFF;
                    letter-spacing: 2px;
                    background:none;
                    text-align: left;

                }
            }
            .loginBox{
                width: 6.7rem;
                height: 6.93rem;
                background: #FFFFFF;
                border-radius: 10px;
            }
        }
    }
</style>