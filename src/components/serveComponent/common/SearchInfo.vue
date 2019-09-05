<template>
    <div class="SearchInfo">
        <div class="SearchContent">
            <div class="SearchBox">
                <svg-icon icon-class="serveComponent_search"/>
                <input class="InputContent" v-model="searchText" :placeholder="'请输入身份证号'">
                <svg-icon class="deleteIcon" v-if="searchText!=''" @click="clear" icon-class="serveComponent_delete"></svg-icon>
                <div class="SearchBtn" @click="search">搜索</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            searchText: ''
        }
    },
    methods: {
        clear() {
            this.searchText = '';
        },
        search() {
            this.$emit('search', this.searchText);
        }
    }
}
</script>

<style lang="less" scoped>
.SearchInfo{
    padding: .2rem;
    background: #FFF;
    .SearchContent {
        width: 100%;
        height: 100%;
        background: #fff;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        .SearchBox {
            position: relative;
            height: 0.8rem;
            width: 100%;
            padding: 0 0.15rem;
            border: 0.01rem solid #1492ff;
            border-radius: 0.05rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .svg-icon {
                height: 0.5rem;
                width: 0.5rem;
                flex-shrink: 0;
            }
            .InputContent {
                font-size: 26px;
                letter-spacing: 0;
                height: 0.49rem;
                width: 100%;
                font-size: 0.26rem;
                border: none;
                margin-left: .1rem;
                &::placeholder {
                    color: #c9c9c9;
                }
            }
            .deleteIcon{
                height: .35rem;
                width: .35rem;
                flex-shrink: 0;
            }
            .SearchBtn {
                height: 0.5rem;
                width: 1rem;
                margin-left: .2rem;
                background: #1492ff;
                border-radius: 0.04rem;
                color: white;
                font-size: 0.26rem;
                line-height: 0.49rem;
                letter-spacing: 0;
                flex-shrink: 0;
            }
        }
    }
}
</style>