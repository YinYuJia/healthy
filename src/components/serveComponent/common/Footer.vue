<template>
    <div>
        <footer class="Footer" v-if="btnType == 1">
            <div class="SubmitBtn" @click="submit()" :class="{'active': canSubmit == true}">
                <span>{{btnText}}</span>
            </div>
        </footer>
        <!-- <footer class="Footer" v-if="btnType == 2">
            <div class="Btn">
                <div class="ResetBtn" @click="backout()">撤销</div>
                <div class="EditBtn" @click="edit()">编辑</div>
            </div>
        </footer> -->
        <footer class="SecondFooter" v-if="btnType == 2">
            <div class="Btn">
                <button class="ResetBtn" @click="backout()" :disabled="isAble">撤销</button>
            </div>
        </footer>
    </div>
</template>

<script>
export default {
    props:{
        canSubmit:{
            type: Boolean,
            default: false
        },
        btnType:{
            type: Number,
            default: 1
        },
        btnText:{
            type: String,
            default: '确认提交'
        },
        handleNumber:{
            type: Number|String,
            default: ''
        }
    },
    data(){
        return{
            isAble: false,
        }
    },
    methods:{
        submit(){
            this.$emit('submit');
        },
        backout(){
            // this.$emit('backout');
            if(this.handleNumber){
                this.$messagebox.confirm('确定撤销吗?').then(() => {
                    const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader,{BKZ019:this.handleNumber},'1032');
                    this.$axios.post( this.epFn.ApiUrl() +  '/h5/jy1032/businessCancel', params)
                    .then((resData) => {
                        if(resData.enCode==1000){
                            this.$router.push('/');
                            this.$toast('撤销成功');
                        }else{
                            this.isAble = true;
                        }
                    })
                });
            }else{
                this.$toast('没有信息，不可撤销');
            }
        },
        edit(){
            this.$emit('edit');
        },
    }
}
</script>

<style lang="less" scoped>
.Footer {
    user-select:none;
    height: 1.31rem;
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 199;
    display: flex;
    justify-content: center;
    padding: 0 0.2rem;
    box-sizing: border-box;
    .SubmitBtn {
        height: 1.05rem;
        width: 100%;
        border-radius: .05rem;
        line-height: 1.05rem;
        background: #F2F2F2;;
        font-family: PingFangSC-Regular;
        font-size: .36rem;
        color: #B4B4B4;
        letter-spacing: 0;
        text-align: center;
    }
    .active{
        background: #1492FF;
        color: #FFFFFF;
    }
}
// 底部
.SecondFooter {
    display: none;
    height: 1.31rem;
    width: 100%;
    padding: 0 .2rem;
    box-sizing: border-box;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 199;
    .Btn{
        width: 100%;
        display: flex;
        justify-content: space-between;
        .ResetBtn {
            height: 1.05rem;
            width: 100%;
            border-radius: .05rem;
            line-height: 1.05rem;
            background: #FFF;;
            font-family: PingFangSC-Regular;
            font-size: .36rem;
            color: #666;
            letter-spacing: 0;
            text-align: center;
            border: .01rem solid #C9C9C9;
            outline-style: none;
        }
        .EditBtn{
            height: 1.05rem;
            width: 3.45rem;
            border-radius: .05rem;
            line-height: 1.05rem;
            background: #F2F2F2;;
            font-family: PingFangSC-Regular;
            font-size: .36rem;
            background: #1492FF;
            color: #FFF;
            letter-spacing: 0;
            text-align: center;
        }
    }
}
</style>
