<template>
    <div class="SurgicalDetail">
        <div class="Content" v-if="type='01'">
            <div class="infoTitle">根据业务需要，需要您补充提交以下材料</div>
            <div style="display: flex;justify-content: space-between">
                <div class="infoTitle">1.《生育保险待遇申请表》</div>
                <div class="down">下载申请表</div>
            </div>
            <div class="dataUpload">
                <div class="picWrap">
                    <div class="uploadBtn" v-for="(item,index) in picArr" :key="index">
                        <img :src="item" class="pic" @click="showBigPhoto(item)" />
                        <svg-icon icon-class="serveComponent_delete" @click="deletePic(item,index)" />
                    </div>
                    <svg-icon @click="uploadImg" icon-class="serveComponent_upload" />
                </div>
            </div>
            <PhotoView ref="photo" :imgUrl="imgUrl"></PhotoView>
            <div class="infoTitle">2.从确认怀孕开始（末次月经）时间的病历复印件</div>
            <div class="infoTitle">3.医疗助产机构出具的流产或引产时间证明复印件</div>
        </div>
    </div>

</template>
      
    
<script>
export default {
    created() {
        this.type = this.$route.query.type;
        console.log("type:", this.type)
    },
    data() {
        return {
            type: '',
            picArr: [],
            imgUrl: ''
        }
    },
    methods: {
        // 查看大图
        showBigPhoto(val){
            this.imgUrl = val;
            this.$refs.photo.open();
        },
        // 删除图片
        deletePic(item,index){
            this.picArr.splice(index,1)
            this.picArrNum.splice(index,1)
            let picArrNum = JSON.parse(JSON.stringify(this.$store.state.SET_SMALL_REIM_2));
            picArrNum.invoicesImg = this.picArrNum
            this.$store.dispatch('SET_SMALL_REIM_2',picArrNum)

            let picArr = JSON.parse(JSON.stringify(this.$store.state.SET_ENCLOSURE));
            picArr = this.picArr
            this.$store.dispatch('SET_SMALL_REIM_2',picArr)
        },
        uploadImg() {

        }
        
    }

}
</script>
    
<style lang="less" scoped>
.SurgicalDetail {
    .Content {
        background-color: #FFF;
        padding-top: .2rem;
        .infoTitle {
            font-size: .28rem;
            text-align: left;
            margin-top: .2rem;
            margin-left: .3rem;
        }
        .down {
            font-size: 0.28rem;
            text-align: right;
            margin-top: 0.2rem;
            width: 1.9rem;
            height: .5rem;
            border: 1px solid #1492FF;
            text-align: center;
            background: #1492FF;
            color: white;
            border-radius: .06rem;
            line-height: .5rem;
            margin-right: .3rem;
        }
        .dataUpload{
            background: #FFF;
            margin: 0 0 1.4rem 0;
            padding: .37rem .4rem;
            .picWrap{
                display: flex;
                flex-wrap: wrap;
                margin-top: .2rem;
                .uploadBtn{
                    position: relative;
                    height: 1.5rem;
                    width: 1.5rem;
                    margin: .1rem .15rem 0 0;
                    img{
                        height: 100%;
                        width: 100%;
                    }
                    .svg-icon{
                            position: absolute;
                            height: .4rem;
                            width: .4rem;
                            top: -0.2rem;
                            right: -0.2rem;
                    }
                }
                .svg-icon{
                    margin: .1rem .15rem 0 0;
                    height: 1.5rem;
                    width: 1.5rem;
                }
            }
        }
    }
}
</style>