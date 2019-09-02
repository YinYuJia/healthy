<template>
    <div class="UserInfoPad">
        <svg-icon icon-class="payLimit_bg"></svg-icon>
        <div class="InfoContent">
            <div class="NameLine">
                <span class="Name">{{userInfo.AAC003}}</span><span class="gender">/ {{gender}}</span>
            </div>
            <div class="IconLine">
                <svg-icon icon-class="payLimit_compony"/><span>{{userInfo.AAB004}}</span>
            </div>
            <div class="IconLine">
                <svg-icon icon-class="serveComponent_birthday"/><span>{{userInfo.AAC006}}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        userInfo: {
            type: Object,
            default: {}
        }
    },
    computed: {
        gender() {
            if(this.userInfo.AAC004 == '1'){
                return '男'
            }else if(this.userInfo.AAC004 == '2'){
                return '女'
            }else {
                return ''
            }
        }
    }
}
</script>

<style lang="less" scoped>
.UserInfoPad{
    width: 100%;
    padding: 0 .2rem;
    position: relative;
    .svg-icon{
        width: 100%;
        height: 100%;
    }
    .InfoContent{
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        padding: .3rem .55rem .8rem .55rem;
        text-align: left;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .NameLine{
            display: flex;
            align-items: center;
            .Name{
                font-size: .36rem;
                color: #FFFFFF;
                letter-spacing: 0;
            }
            .gender{
                opacity: 0.65;
                font-size: .24rem;
                color: #FFFFFF;
                letter-spacing: 0;
            }
        }
        .IconLine{
            display: flex;
            align-items: center;
            .svg-icon{
                height: .28rem;
                width: .28rem;
            }
            span{
                font-size: .24rem;
                color: #FFFFFF;
                letter-spacing: 0;
                margin-left: .12rem;
            }
        }
    }
}
</style>