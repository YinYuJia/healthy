<template>
    <div class="SelectList">
        <mt-popup class="listPicker" v-model="showList" position="bottom" >
            <mt-picker
                :showToolbar="true"
                :slots="slots"
                :valueKey="'name'"
                @change="onValuesChange"
            >
                <div class="btnBox">
                    <div class="btn" @click="showList=!showList">取消</div>
                    <div class="btn" @click="chooseData()">确定</div>
                </div>
            </mt-picker>
        </mt-popup>
    </div>
</template>

<script>
export default {
    props: {
        list:{
            type: Array,
            default: []
        }
    },
    data() {
        return {
            showList: false,
            slots: [
                {
                    flex: 1,
                    values: [],
                    className: 'slot1',
                    textAlign: 'center'
                }
            ],
            name: '', //字段名
            value: '', //字段值
        }
    },
    methods: {
        open() {
            this.$nextTick(()=> {
                this.slots[0].values = this.list;
                this.showList = true;
            })
        },
        chooseData() {
            let obj = {
                name: this.name,
                value: this.value
            }
            this.$emit('choose', obj);
            this.showList = false;
        },
        onValuesChange(picker, values) {
            this.name = values[0].name;
            this.value = values[0].value;
        }
    }
}
</script>

<style lang="less" scoped>
.SelectList{
    .listPicker{
        width: 100%;
        .btnBox{
            display: flex;
            .btn{
                height: 40px;
                width: 50%;
                color: #26a2ff;
                line-height: 40px;
                font-size: 16px;
            }
        }
    }
}

</style>