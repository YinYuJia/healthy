<template>
    <div class="download">
        <Title :title="'打印申请表'" :backRouter="'/natureApprovalSupplement'"></Title>
        <!-- 按钮 -->
        <div class="img">
            <img :src="imgurl" alt="">
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                imgurl: '',
            }
        },
        created() {
            let u = navigator.userAgent;
            if(u.indexOf('Android') > -1 || u.indexOf('Adr') > -1){
            console.log('这是isAndroid')  
            window.location.href=this.$route.query.params
            }else if(!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){
            console.log('这是isiOS')
            this.imgurl=this.$route.query.params
            }
            this.epFn.setTitle('申请表打印')
        }
    }
</script>

<style lang="less" scoped>
    .download {
        .Title {
            height: 1.2rem;
            background-color: #05AEF0;
            font-size: .36rem;
            line-height: 1.2rem;
            overflow: hidden;
            .NameTitle {
                color: white;
            }
        }
        img {
            height: 100%;
            width: 100%;
        }
        .Btn {
            height: 1rem;
            width: 100%;
            background: rgb(124, 206, 250);
            font-size: .34rem;
            color: white;
            line-height: 1rem;
            text-align: center;
            position: fixed;
            bottom: 0;
        }
        .active {
            background: #1492FF;
        }
    }
</style>
