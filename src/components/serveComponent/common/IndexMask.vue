<template>
    <div>
        <div class="mask" v-show="isMask">
            <div class="mask_div">
                <svg-icon class="content" icon-class="内容"></svg-icon>
                <input class="mask_input" type="password" name="" v-model="epPasword" id="">
                <button class="loginButton" @click="loginIn"></button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isMask: false, // 控制mask显示隐藏
                epPasword: "",
            }
        },
        methods: {
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
        },
        created() {
            console.log('----弹出层----')
        }
    }
</script>

<style lang="less" scoped>
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
</style>


