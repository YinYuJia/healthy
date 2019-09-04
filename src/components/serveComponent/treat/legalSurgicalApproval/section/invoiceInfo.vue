<template>
    <div class="invoiceInfo">
        <!-- 标题 -->
        <div class="invoiceTitle">发票信息：</div>
        <!-- 发票列表 -->
        <div class="invoiceList" v-for="(item,index) in invoiceList" :key="index">
            <div class="infoLine">
                <div class="infoName"><span>发票号</span></div>
                <div class="infoText" @click="showBigPhoto(item.photoUrl)"><span class="active">{{item.BKE100}}</span></div>
            </div>
            <div class="infoLine">
                <div class="infoName"><span>发票金额</span></div>
                <div class="infoText"><span>{{item.AKC264}}</span></div>
            </div>
            <div class="infoLine">
                <div class="infoName"><span>发票日期</span></div>
                <div class="infoText"><span>{{item.AAE036}}</span></div>
            </div>
            <div class="deleteBtn"><svg-icon @click="deleteInvoice(item, index)" icon-class='payLimit_delete'></svg-icon></div>
        </div>
        <!-- 添加发票按钮 -->
        <div class="btnContent">
            <div class="plusBtn" @click="plusInvoice"><span>+</span>添加发票信息</div>
        </div>
        <PhotoView ref="photo" :imgUrl="imgUrl"></PhotoView>
    </div>
</template>

<script>
export default {
    data() {
        return {
            invoiceList: [],
        }
    },
    created() {
        this.invoiceList = JSON.parse(sessionStorage.getItem('SET_SURGICAL_INVOICELIST'));
    },
    methods: {
        // 查看大图
        showBigPhoto(val){
            this.imgUrl = val;
            this.$refs.photo.open();
        },
        // 打开添加发票面板
        plusInvoice() {
            this.$router.push('/surgicalPlus')
        },
        // 删除发票
        deleteInvoice(item, index){
            this.invoiceList.splice(index, 1);
            sessionStorage.setItem("SET_SURGICAL_INVOICELIST", invoiceList)
        }
    }
}
</script>

<style lang="less" scoped>
.invoiceInfo{
    padding: .35rem .2rem 0 .2rem;
    text-align: left;
    margin-top: .15rem;
    background: #FFF;
    // 标题
    .invoiceTitle{
        font-size: .28rem;
        color: #000000;
        letter-spacing: 0;
    }
    // 发票列表
    .invoiceList{
        height: 2.4rem;
        padding: .42rem 0;
        border-bottom: 1px solid #DDD;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        position: relative;
        .infoLine{
            font-size: .28rem;
            display: flex;
            .infoName{
                width: 1.5rem;
                span{
                    color: #666666;
                    letter-spacing: 0;
                }
            }
            .infoText{
                span{
                    color: #000000;
                    letter-spacing: 0;
                }
                .active{
                    color: #1492FF;
                }
            }
        }
        .deleteBtn{
            position: absolute;
            bottom: 0.2rem;
            right: 0;
            .svg-icon{
                height: .6rem;
                width: .6rem;
            }
        }
    }
    // 添加发票按钮
    .btnContent{
        padding: .3rem 0;
        .plusBtn{
            height: .85rem;
            line-height: .85rem;
            border: 1px solid #1492FF;
            border-radius: .05rem;
            font-size: .28rem;
            letter-spacing: 0;
            text-align: center;
            color: #1492FF;
            span{
                font-size: .35rem;
                margin-right: .1rem;
            }
        }
    }
}
</style>