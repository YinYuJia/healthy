<template>
    <!-- 城市选择 -->
    <mt-popup class="cityPicker" v-model="showCityPicker" position="bottom" >
        <mt-picker
            v-if="type=='1'"
            :showToolbar="true"
            :slots="chooseArr"
            :valueKey="'label'"
            @change="onChooseChange"
            >
            <div class="btnBox">
                <div class="btn" @click="showCityPicker=!showCityPicker">取消</div>
                <div class="btn" @click="chooseData()">确定</div>
            </div>
        </mt-picker>
        <mt-picker
            v-if="type=='2'"
            :showToolbar="true"
            :slots="insuredCity"
            :valueKey="'name'"
            @change="onInsuredChange"
            >
            <div class="btnBox">
                <div class="btn" @click="showCityPicker=!showCityPicker">取消</div>
                <div class="btn" @click="confirm()">确定</div>
            </div>
        </mt-picker>
        <mt-picker 
            v-if="type=='3'"
            :showToolbar="true"
            :slots="fullCity"
            :valueKey="'name'"
            @change="onInsuredChange"
            >
            <div class="btnBox">
                <div class="btn" @click="showCityPicker=!showCityPicker">取消</div>
                <div class="btn" @click="confirm()">确定</div>
            </div>
        </mt-picker>
    </mt-popup>
</template>

<script>
export default {
    name: 'selectCity',
    props:{
        type:{
            type: Number,
            required: true
        },
        propArr:{
            type: Array
        },
        onlyZJ:{
            type: Boolean,
            default: false
        },
        onlyTZ:{
            type: Boolean,
            default: false
        },
        jy7206:{
            type: Boolean,
            default: false
        },
        jy7209:{
            type: Boolean,
            default: false
        },
        jy7100:{
            type: Boolean,
            default: false
        },
        work:{
            type: Boolean,
            default: false
        }
    },
    data(){
        return {
            showCityPicker: false,
            // 省市数据
            insuredCity:[
                {
                    flex: 1,
                    values: [],
                    code:[],
                    className: 'slot1'
                },{
                    divider: true,
                    content: '-',
                    className: 'slot2'
                },{
                    flex: 1,
                    values: [],
                    code:[],
                    className: 'slot3'
                }
            ],  //339900省本级
                //330100杭州市
            // 省市区数据
            fullCity:[
                {
                    flex: 1,
                    values: [],
                    code:[],                    
                    className: 'slot1',
                },{
                    divider: true,
                    content: '-',
                    className: 'slot2'
                },{
                    flex: 1,
                    values: [],
                    code:[],
                    className: 'slot3'
                },{
                    divider: true,
                    content: '-',
                    className: 'slot4'
                },
                {
                    flex: 1,
                    values: [],
                    className: 'slot5'
                }
            ],
            chooseArr:[
                {
                    flex: 1,
                    values: [],
                    className: 'slot1',
                }
            ],
            province: '', //省
            city: '', //市
            country: '', //区,县
            codeProvice: '',
            codeCity: '',
            codeCountry: '',
            label: '', //用户选择的选项
            value: '', //选项绑定的值
        }
    },

    created(){
        console.log(this.epFn.tzAddress());
        this.$nextTick(() =>{
            if(this.onlyZJ){
                this.insuredCity[0].values = this.epFn.zjAddress();
                this.fullCity[0].values = this.epFn.zjAddress();
                this.fullCity[0].defaultIndex=0;
                this.insuredCity[0].defaultIndex=0;
            }else if(this.onlyTZ){
                this.insuredCity[0].values = this.epFn.tzAddress();
                this.fullCity[0].values = this.epFn.tzAddress();
                this.fullCity[0].defaultIndex=0;
                this.insuredCity[0].defaultIndex=0;
            }else if(this.jy7206){
                this.request('7206')
                // this.insuredCity[0].values = this.epFn.excludeZj();
                // this.fullCity[0].values = this.epFn.excludeZj();
                // this.fullCity[0].defaultIndex = 0;
                // this.insuredCity[0].defaultIndex = 0;
            }else if(this.jy7209){
                this.request('7209')
                // this.insuredCity[0].values = this.epFn.excludeProvince();
                // this.fullCity[0].values = this.epFn.excludeProvince();
                // this.fullCity[0].defaultIndex = 10;
                // this.insuredCity[0].defaultIndex = 10;
            }else if(this.jy7100){
                this.request('7100')
            }else if(this.work){
                this.insuredCity[0].values= this.epFn.workYear();
                this.fullCity[0].values= this.epFn.workYear();
                this.fullCity[0].defaultIndex = 0;
                this.insuredCity[0].defaultIndex = 0;
            }
            // else{
            //     this.insuredCity[0].values = this.epFn.addressList();
            //     this.fullCity[0].values = this.epFn.addressList();
            //     this.fullCity[0].defaultIndex=10;
            //     this.insuredCity[0].defaultIndex=10;
            // }
        })
    },
    methods:{
        // 选择参保地
        onInsuredChange(picker, values){
            this.country = "";
            this.codeCountry = "";
            if(values[0] !== undefined){
                picker.setSlotValues(1, values[0].children);
                this.province = values[0].name;
                this.codeProvince = values[0].code;
                if(values[1] !== undefined){
                    picker.setSlotValues(2, values[1].children);
                    this.city = values[1].name;
                    this.codeCity = values[1].code;
                }
                if(values[2] !== undefined){
                    this.country = values[2].name;
                    this.codeCountry = values[2].code;
                }
            }
        },
        onChooseChange(picker, values){
            if(values[0]!=undefined){
                this.label = values[0].label;
                this.value = values[0].value;
            }
        },
        open(){
            this.showCityPicker = true;
            if(this.propArr != undefined){
                this.chooseArr[0].values = JSON.parse(JSON.stringify(this.propArr));
                // this.chooseArr[0].defaultIndex=0
            }
        },
        confirm(){
            this.showCityPicker = false;
            if(this.type == 2){
                let address = this.province + this.city;
                let code = [];
                code.push(this.codeProvince,this.codeCity);
                let obj = {
                    name: address,
                    code: code
                };
                this.$emit('confirm',obj);
            }else{
                let address = this.province + this.city + this.country;
                let code = [];
                code.push(this.codeProvince,this.codeCity,this.codeCountry);
                let obj = {
                    name: address,
                    code: code
                };
                this.$emit('confirm',obj);
            }
        },
        chooseData(){
            this.showCityPicker = false;
            let obj = {
                label: this.label,
                value: this.value
            };
            this.$emit('confirm',obj);
        },
        request(type){
            // 封装数据
            let params = this.formatSubmitData(type);
            // 开始请求
            console.log('parmas------',params)
            this.$axios.post(this.epFn.ApiUrl() + '/H5/jy9099/distanceHospital', params).then((resData) => {
                console.log('返回成功信息',resData)
                //   成功   1000
                if ( resData.enCode == 1000 ) {
                    this.insuredCity[0].values =resData.LS_DS;
                    this.fullCity[0].values =resData.LS_DS;
                    this.fullCity[0].defaultIndex = 0;
                    this.insuredCity[0].defaultIndex = 0;
                }else if (resData.enCode == 1001 ) {
                //   失败  1001
                    this.$toast(resData.msg);
                    return;
                }else{
                    this.$toast('业务出错');
                    return;
                }
            })
        },
        formatSubmitData(type){
            let submitForm = {};
            submitForm.TRANSTYPE=type
            // 请求参数封装
            const params = this.epFn.commonRequsetData(submitForm);
            return params;
        },
    }
}
</script>

<style lang="less" scoped>
.cityPicker{
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
</style>