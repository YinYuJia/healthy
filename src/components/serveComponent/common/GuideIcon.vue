<template>
    <div @click="goto" class="GuideIcon">
        <svg-icon icon-class="serveComponent_guide"></svg-icon>
    </div>
</template>

<script>
export default {
    props:{
        AGA002:{
            type: String,
        }
    },
    methods:{
        goto(){
            this.$router.push({
                path: "/BusinessGuide", //缴费年限
                query: {
                    param: this.AGA002
                }
            });
        }
    }
}
</script>

<style lang="less" scoped>
.GuideIcon{
    position: fixed;
    right: .2rem;
    bottom: 2.1rem;
    .svg-icon{
        height: 1rem;
        width: 1rem;
    }
}
</style>