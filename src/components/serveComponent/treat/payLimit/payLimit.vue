<template>
    <div class="payLimit">
        <!-- 标题 -->
        <Title :title="'缴费年限核定'" :backRouter="'/'"></Title>
        <SelectCity
            :type="1"
            ref="typePicker"
            :propArr="types"
            @confirm="handleTypeConfirm"
            >
        </SelectCity>
        <SelectCity
            :type="1"
            ref="punishPicker"
            :propArr="punish"
            @confirm="handlePunishConfirm"
            >
        </SelectCity>
        <SelectCity
            :type="2"
            ref="workPicker"
            :work="true"
            @confirm="chooseWork"
            >
        </SelectCity>
        <mt-datetime-picker
            type="date"
            ref="startPicker"
            v-model="dateVal"
            @confirm="handleStartConfirm">
        </mt-datetime-picker>
        <mt-datetime-picker
            type="date"
            ref="endPicker"
            v-model="dateVal"
            @confirm="handleEndConfirm">
        </mt-datetime-picker>
        <div class="Content" >
            <!-- 基本信息 -->
            <!-- <UserBaseInfo></UserBaseInfo> -->
            <!-- 列表信息 -->
            <div class="SearchContent" id="searchContent">
            <div class="SearchBox">
                <svg-icon icon-class="serveComponent_search"/>
                <input class="InputContent" v-model="form.AAE135" :placeholder="'请输入身份证号'">
                <svg-icon v-if="form.AAE135" class="deleteIcon" @click="deleteSearch()" icon-class="serveComponent_delete"></svg-icon>
                <div class="SearchBtn" @click="search">搜索</div>
            </div>
            </div>
            <div class="userBaseInfo" v-if="showAll">
                <div class="infoBox">
                    <svg-icon icon-class="payLimit_bg"/>
                    <div class="infoName">
                        <span class="name">{{form.AAC003}}</span>
                        <span class="sex">/{{form.AAC004|AAC004}}</span>
                    </div>
                    <div class="infoAddress">
                        <div class="IconImg">
                            <svg-icon icon-class="payLimit_compony"/>
                        </div>
                        <span class="titleText">工作单位：</span>
                        <span>{{form.AAB004}}</span>
                    </div>
                    <div class="infoAddress">
                        <div class="IconImg">
                            <svg-icon icon-class="serveComponent_birthday"/>
                        </div>
                        <span class="titleText">出生日期：</span>
                        <span>{{form.AAC006}}</span>
                    </div>
                    <div class="infoAddress">
                        <div class="IconImg">
                            <svg-icon icon-class="payLimit_work"/>
                        </div>
                        <span class="titleText">参加工作：</span>
                        <span>{{form.AAC007}}</span>
                    </div>

                </div>
            </div>
            <div class="ReportInfo" v-if="showAll">
                <div class="InfoLine">
                    <div class="InfoName"><span>连续工龄:</span></div>
                    <div class="InfoText">
                        <input type="tel" v-model="form.BKEVALUE" placeholder="请输入"  readonly>
                        <!-- <svg-icon icon-class="serveComponent_arrowRight"></svg-icon> -->
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>视作缴费年限:</span></div>
                    <div class="InfoText"><input type="tel"  @blur="setYear" maxlength="3" v-model="form.AKC412" placeholder="请输入">个月</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>退休工资:</span></div>
                    <div class="InfoText"><input type="number"  @blur="setMoney"  v-model="form.AAE041" placeholder="请输入">元</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName">
                        <svg-icon icon-class="payLimit_uncheck" v-if="uncheck" @click="uncheck1" ></svg-icon>
                        <svg-icon icon-class="payLimit_check" v-if="check" @click="check1"></svg-icon>
                        <span>提前退休</span>
                    </div>
                </div>
                <div class="InfoLine" v-if="isShow">
                    <div class="InfoName"><span>提前退休原因:</span></div>
                    <div class="InfoText">
                        <div class="InfoText"><input @click="openTypePicker()" type="text" v-model="BKE810VALUE" placeholder="请选择" readonly></div>
                        <svg-icon icon-class="serveComponent_arrowRight"></svg-icon>
                        <!-- <el-select v-model="form.BKE810" placeholder="请选择">
                            <el-option v-for="item in types" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select> -->
                    </div>
                </div>
            </div>
            <div  v-if="showAll">
            <div class="simpleNote" v-for="(item,index) in LS_DS" :key=index  >
                <div class="InfoTitle">
                    <div class="InfoName"><span>简历{{index+1}}</span></div>
                    <div class="InfoText">
                        <svg-icon icon-class="payLimit_delete" @click="deleted(index)" class="svg-icon-delete"></svg-icon>
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>开始工作时间:</span></div>
                    <div class="InfoText">
                        <input type="text" @click="openStartPicker(index)"  v-model="item.timeStart" placeholder="请输入" readonly>
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>结束工作时间:</span></div>
                    <div class="InfoText">
                        <input type="text" @click="openEndPicker(index)"  v-model="item.timeEnd" placeholder="请输入" readonly>
                    </div>
                    <input type="text" id="timeAll"  v-model="item.AKC421" placeholder="请输入">
                </div>

                <div class="InfoLine">
                    <div class="InfoName"><span>单位:</span></div>
                    <div class="InfoText"><input type="text"  v-model="item.AKC422" placeholder="请输入"></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>职位:</span></div>
                    <div class="InfoText"><input type="text"  v-model="item.AKC424" placeholder="请输入"></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>证明人:</span></div>
                    <div class="InfoText">
                        <div class="InfoText"><input  type="text" v-model="item.AKC425" placeholder="请输入" ></div>
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>处分:</span></div>
                    <div class="InfoText">
                        <div class="InfoText"><input @click="openPunishPicker(index)" type="text" v-model="item.AKC423VALUE" placeholder="请选择" readonly></div>
                        <svg-icon icon-class="serveComponent_arrowRight"></svg-icon>
                    </div>
                </div>
            </div>
            </div>
            <div class="newSimpleNote" v-if="showAll">
                <div class="newAdd" @click="newSimpleNote()" :class="{'active': canSubmit == true}">
                <span>+ 添加简历</span>
                </div>
            </div>
            <div class="footer">
                <div class="SubmitBtn" @click="goto()" :class="{'active': canSubmit == true}">
                    <span>下一步</span>
                </div>
            </div>
        </div>
        <!-- 办事指南 -->
        <GuideIcon AGA002="330800123004"></GuideIcon>
        <!-- 按钮 -->
        <!-- 法人绑定 -->
        <!-- <Binding :flag="bindingFlag" @changeFlag="changeFlag"></Binding> -->
         <!-- 判断是否绑定经办组建-->
        <BindingAgency></BindingAgency>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // bindingFlag: false,
            showAll:false,//展示所有内容
            isShow:false,//显示提前退休原因
            dateVal: new Date(), //默认绑定的时间
            check:false,//勾选图标
            uncheck:true,//勾选图标
            // 提交信息
            BKE810VALUE:"",//提前退休原因中文
            form: {
                AAE135:'',//社会保障号
                BKEVALUE:'',//连续工龄中文
                AKC412:'',//视作缴费年限
                AAB001:'',//单位编码
                BKE703:'',//连续工龄(年)
                BKE704:'',//连续工龄(月)
                AAE041:'',//退休工资
                BKE810:'0',//提前退休
            },
            index:0,//第几项
            flag:false,//判断基础信息是否填写完整
            LSflag:false,//判断简历信息是否填写完整
            btnText:'确认提交',
            LS_DS:[{
                AKC421:'',//时间
                AKC422:'',//单位
                AKC424:'',//职务
                AKC425:'',//证明人
                AKC423:'0',//处分数值
                AKC423VALUE:'无',//处分中文
            }],
            canSubmit: false,
            punish:[
                {
                    value: '0',
                    label:'无'
                },
                {
                    value: '1',
                    label:'劳教'
                },
                {
                    value: '2',
                    label:'劳改'
                },
                {
                    value: '3',
                    label:'开除'
                },
                {
                    value: '4',
                    label:'除名'
                },
                {
                    value: '5',
                    label:'自动离职'
                },
                {
                    value: '6',
                    label:'辞职'
                },
                {
                    value: '7',
                    label:'长病假'
                }
            ],
            types: [
                {
                    value: '0',
                    label: '无'
                },
                {
                    value: '1',
                    label: '因病'
                },
                {
                    value: '2',
                    label: '特殊工种'
                },
                {
                    value: '3',
                    label: '符合公务员法'
                },
                {
                    value: '4',
                    label: '符合浙委办'
                }
            ],
            aa:false,
            AAB019:""//单位类型  11表示机关单位
        }
    },
    watch:{
        form:{
            handler:function(val){
                
                    // val.AAE135 != '' && val.BKEVALUE != '' && val.AKC412 != ''&& val.AAB001!=''&&
                    // val.BKE703 != '' && val.BKE704 != ''&& val.AAE041 != ''
                if(val.AKC412 != ''&&val.AAE041!=''
                ){
                    this.flag = true;
                    console.log("flag",this.flag)
                    console.log("111121",this.form)
                }else{
                    this.flag = false;
                    console.log("flag",this.flag)
                    console.log("111",this.form)
                }
                if(this.flag==true&&this.LSflag==true){
                    this.canSubmit = true;
                }else{
                    this.canSubmit = false
                }
            },
            deep: true
        },
        LS_DS:{
            handler:function(val){
                // if(this.isEmpty(val)){
                // this.LSflag=false;
                // console.log("LSflag",this.LSflag)
                // }else{
                //     this.LSflag=true;
                //     console.log("LSflag",this.LSflag)
                // }

                if(val[this.index].AKC421!=''&&val[this.index].AKC422!='' &&val[this.index].AKC424!=''
                && val[this.index].AKC425!=''&&val[this.index].AKC423!=''&&val[this.index].AKC423VALUE!=''){
                    this.LSflag=true;
                    this.canSubmit = true;
                    console.log("LSflag",this.LSflag)
                }else{
                    this.LSflag=false;
                    this.canSubmit = false;
                    console.log("LSflag",this.LSflag)
                }
                if(this.flag==true&&this.LSflag==true){
                    this.canSubmit = true;
                }else{
                    this.canSubmit = false
                }
            },
            deep:true
        }
    },
    created(){
        this.checkJump();
        console.log('payLimitDetail',sessionStorage.getItem('payLimitDetail'))
        console.log('ifRequestPayLimit',sessionStorage.getItem('ifRequestPayLimit'))
        //从详情页回退到搜索页  不重新搜索
        if(sessionStorage.getItem('payLimitDetail')=='true'){
            sessionStorage.setItem('ifRequestPayLimit',false)
        }
        this.epFn.setTitle('缴费年限核定');
        //判断到上传附件页面后返回  是否要重新请求
        if(sessionStorage.getItem('ifRequestPayLimit')!='false'){
            this.search()
        }
    },
    methods:{
        goto(){
            console.log('ls_DS',this.LS_DS);
            if(this.index==-1){
                this.$toast('必须填写一份简历')
            }else{
                if(this.isEmpty(this.LS_DS)){
                    this.$toast('简历中还有信息未填写完整')
                    return false
                }else{
                    if(this.canSubmit == false){
                        this.$toast('信息未填写完整');
                        return false;
                    }else{
                        sessionStorage.setItem('payLimitList',JSON.stringify(this.LS_DS))
                        sessionStorage.setItem('payLimitAAE041',this.form.AAE041)
                        sessionStorage.setItem('payLimitBKE810',this.form.BKE810)
                        this.$router.push({
                            path:'/payLimitPic',
                            query:{
                                    AAB019:this.AAB019
                            }
                        })
                    }
                }

            }
        },
      // 绑定成功后执行的请求
    //   changeFlag(val){
    //     this.bindingFlag = val;
    //     let user = JSON.parse(sessionStorage.getItem("LegalPerson"));
    //   },
        // 跳转前检查用户是否法人绑定
        checkJump(){
            let user = JSON.parse(sessionStorage.getItem("LegalPerson"));
            let params = {
                OTHERINFO: user.userId
            }
            this.$axios.post(this.epFn.ApiUrl() + "/H5/jy9102/distanceHospital", params).then((resData) => {
                console.log('绑定',resData)
                if(resData.enCode == 1000){
                    if(resData.LS_DS[0].USEGUL == '1'){
                        sessionStorage.setItem('LOGINNAME',resData.LS_DS[0].LOGINNAME);
                        this.bindingFlag = false;
                    }else{
                        this.bindingFlag = true;
                    }
                }else if (resData.enCode == 1001 ) {
                    //   失败  1001
                    this.bindingFlag = true;
                }else{
                    this.$toast('业务出错');
                    this.bindingFlag = true;
                    return false;
                }
            })
        },
        setYear(){
            if(!/^[0-9]+$/.test(this.form.AKC412)){
                this.form.AKC412='';
                this.$toast("缴费年限只能输入数字");
            }
        },
        setMoney(){
            if(!/^\d*\.{0,1}\d{0,5}$/.test(this.form.AAE041)){
                this.form.AAE041='';
                this.$toast("退休工资只能输入数字");
            }
        },
        // 开始工作时间
        openStartPicker(index){
            this.index=index;
            console.log(this.index)
            this.$refs.startPicker.open();
            this.$refs.startPicker.$el.getElementsByClassName('picker-slot')[2].style.display='none';
        },
        handleStartConfirm(val){
            console.log("start",this.util.formatDate(val,'yyyyMM'))
            let date = this.util.formatDate(val,'yyyyMM');
            let newLS_DS = this.LS_DS[this.index];
            newLS_DS.timeStart = date;
            this.LS_DS.splice(this.index,1,newLS_DS);
            this.LS_DS[this.index].timeStart=date;
            let start=this.LS_DS[this.index].timeStart;
            let end=this.LS_DS[this.index].timeEnd;
            // let start=new Date(this.LS_DS[this.index].timeStart);
            console.log("start",start)
            // let end=new Date(this.LS_DS[this.index].timeEnd);
            console.log("end",end)
            if(start&&end){
                if(start-end>=0){
                    this.$toast('开始工作时间请小于结束工作时间');
                    this.LS_DS[this.index].timeStart= '';
                }else{
                    this.LS_DS[this.index].AKC421=start+"-"+end
                    console.log("AKC421",this.LS_DS[this.index].AKC421)
                }
            }
            let data=new Date()
            this.LS_DS[this.index].BKE700=this.form.AAC003;
            this.LS_DS[this.index].BKE701=this.util.formatDate(data,'yyyy-MM-dd hh:mm:ss')

        },
        // 结束工作时间
        openEndPicker(index){
            this.index=index;
            console.log(this.index)
            this.$refs.endPicker.open();
            this.$refs.endPicker.$el.getElementsByClassName('picker-slot')[2].style.display='none';
        },
        handleEndConfirm(val){
            console.log("end",this.util.formatDate(val,'yyyyMM'))
            let date = this.util.formatDate(val,'yyyyMM');
            let newLS_DS = this.LS_DS[this.index];
            newLS_DS.timeEnd = date;
            this.LS_DS.splice(this.index,1,newLS_DS);
            this.LS_DS[this.index].timeEnd=date;
            let start=this.LS_DS[this.index].timeStart;
            let end=this.LS_DS[this.index].timeEnd;
            // let start=new Date(this.LS_DS[this.index].timeStart);
            console.log("start",start)
            // let end=new Date(this.LS_DS[this.index].timeEnd);
            console.log("end",end)
            if(start&&end){
                if(end-start<=0){
                    this.$toast('结束工作时间请大于开始工作时间');
                    this.LS_DS[this.index].timeEnd= '';
                }else{
                this.LS_DS[this.index].AKC421=start+"-"+end
                console.log("AKC421",this.LS_DS[this.index].AKC421)
                }
            }

        },
        // 工龄
        openWorkPicker(){
            this.$refs.workPicker.open();
        },
        chooseWork(val){
            console.log(val)
            this.form.BKEVALUE= val.name;
            this.form.BKE703=val.code[0];
            this.form.BKE704=val.code[1];
            console.log(this.form)
            console.log("9999",val)
        },
        //提前退休
        check1(){
            this.check=false;
            this.uncheck=true;
            this.isShow=false;
            this.form.BKE810="";
            this.BKE810VALUE="";
            console.log('check1',this.flag)
        },
        uncheck1(){
            this.uncheck=false;
            this.check=true;
            this.isShow=true;
            console.log('uncheck1',this.flag)
        },
        // 选择变更类型
        openTypePicker(){
            this.$refs.typePicker.open();
        },
        handleTypeConfirm(val){
            console.log("类型",val);
            this.form.BKE810 = val.value;
            this.BKE810VALUE = val.label;
            console.log("value",val.value)
            console.log("label",val.label)
            console.log("value1",this.form.BKE810)
            console.log("label1",this.BKE810VALUE)
            console.log(this.flag)
            console.log(this.form)

        },
        //处分类型选择
        openPunishPicker(index){
            this.index=index;
            this.$refs.punishPicker.open();
        },
        //处分值获取
        handlePunishConfirm(val){
            console.log("处分",val)
            this.LS_DS[this.index].AKC423VALUE=val.label;
            this.LS_DS[this.index].AKC423=val.value;
        },
        //新增简历
        newSimpleNote(){
            console.log('新增简历')
            console.log(this.index)
            let obj={};
            obj.AKC421='',//时间
            obj.AKC422='',//单位
            obj.AKC425='',//证明人
            obj.AKC423='0',//处分数值
            obj.AKC423VALUE='无',//处分中文
            this.index+=1;
            console.log(this.index)
            this.LS_DS.push(obj)
        },
        //删除简历
        deleted(index){
            console.log("删除简历")
            console.log("index",this.index)
            this.index-=1;
            this.LS_DS.splice(index,1);

        },
        //清空搜索框
        deleteSearch(){
            this.form.AAE135 = '';
        },
        isEmpty(arr){
            console.log("arr",arr)
            for(let i=0;i<arr.length;i++){
                const item=arr[i];
                for(const key in item){
                    if(Object.prototype.hasOwnProperty.call(item,key)){
                        let time=item[key].timeStart+"-"+item[key].timeEnd;
                        if(item[key]==null||item[key]===''||item[key]==undefined||item[key].timeEnd==""||item[key].timeStart==""){
                            console.log("key",item[key])
                            return true
                        }else{
                            console.log("key1",item[key])
                            return false
                        }
                    }
                }
            }
        },
        //搜索
        search(){
            console.log('通过身份证号请求数据')
            if(!this.util.idCard(this.form.AAE135)){
                this.$toast('请填写正确的身份证号');
                return false;
            }else{
                // 封装数据
                let params = this.formatSubmitData();
                // 开始请求
                console.log('parmas------',params)
                this.$axios.post(this.epFn.ApiUrl()+ '/H5/jy7610/getRecord', params).then((resData) => {
                    console.log('返回成功信息',resData)
                    //   成功   1000
                    if ( resData.enCode == 1000 ) {
                        let user = sessionStorage.getItem("LOGINNAME");//法人的单位编码
                      console.log("user",user);
                      console.log("AAB001",resData.LS_DS[0].AAB001)
                      if(user==resData.LS_DS[0].AAB001){//和7610里获取的单位编码进行比对，如果不匹配那么就提示这个人不是这个单位的
                        // this.form=resData.LS_DS[0]
                        this.form.AKC412=resData.LS_DS[0].AKC412M+((resData.LS_DS[0].AKC412)*12);
                        this.form.BKE703=resData.LS_DS[0].BKE703;
                        this.form.BKE704=resData.LS_DS[0].BKE704;
                        this.form.AAE135=resData.LS_DS[0].AAC002;
                        this.form.AAC004=resData.LS_DS[0].AAC004;
                        this.form.AAC006=resData.LS_DS[0].AAC006;
                        this.form.AAC007=resData.LS_DS[0].AAC007;
                        this.form.AAC003=resData.LS_DS[0].AAC003;
                        this.form.AAB004=resData.LS_DS[0].AAB004;
                        this.form.AAB001=resData.LS_DS[0].AAB001;
                        this.form.BKEVALUE=this.form.BKE703+'年'+this.form.BKE704+'个月';
                        this.AAB019=resData.LS_DS[0].AAB019//单位类型  11机关单位
                        sessionStorage.setItem('payLimitAAE135',this.form.AAE135)//身份证号
                        sessionStorage.setItem('payLimitBaseInfo',JSON.stringify(this.form))//基础信息
                        }else {
                        this.$toast('该人员不是本单位的职员，请重新查询')
                        return false
                      }
                        // console.log("LIST",resData.LS_DS[0].AKC421)
                        // console.log("LIST",resData.LS_DS[0].AKC421.split('-'))
                        // resData.LS_DS.forEach( ele => {
                        //     ele.timeStart = ele.AKC421.split('-')[0]
                        //     ele.timeEnd = ele.AKC421.split('-')[1]
                        // })
                        // console.log('form1',this.form1)
                        this.showAll=true;
                    }else if (resData.enCode == 1001 ) {
                    //   失败  1001
                        this.$toast(resData.msg);
                        return;
                    }else{
                        this.$toast('业务出错');
                        return;
                    }
                })
            }
        },

        formatSubmitData(){
            let submitForm ={}
            // 日期传换成Number
            // submitForm.AAE030 = this.util.DateToNumber(this.form.AAE030)
            submitForm.BKE520 = "1";
            if(sessionStorage.getItem('ifRequestPayLimit')=='true'){
                submitForm.AAC002=sessionStorage.getItem('payLimitAAE135')
            }else{
                submitForm.AAC002 = this.form.AAE135;
            }
            // 加入用户名和电子社保卡号
            // if (this.$store.state.SET_NATIVEMSG.name !== undefined ) {
            //     submitForm.AAC003 = this.$store.state.SET_NATIVEMSG.name;
            //     submitForm.AAE135 = this.$store.state.SET_NATIVEMSG.idCard;
            // }else {
            //     this.$toast("未获取到人员基本信息");
            // }
            // 请求参数封装
            const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,"7610");
            return params;
        },

    }
}
</script>

<style lang="less" scoped>
.payLimit {
    #timeAll{
        position: absolute;
        z-index: -1000;
    }
    .Content {
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
                width: 7rem;
                padding: 0 0.15rem;
                border: 0.01rem solid #1492ff;
                border-radius: 0.05rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
            .svg-icon {
                height: 0.5rem;
                width: 0.5rem;
            }
            .InputContent {
                height: 0.49rem;
                width: 4.1rem;
                font-size: 0.26rem;
                border: none;
                &::placeholder {
                color: #c9c9c9;
                }
            }
            .deleteIcon{
                height: .4rem;
                width: .4rem;
                position: absolute;
                right: 1.2rem;
            }
            .SearchBtn {
                height: 0.49rem;
                width: 0.99rem;
                margin-left: .2rem;
                background: #1492ff;
                border-radius: 0.04rem;
                color: white;
                font-size: 0.26rem;
                line-height: 0.49rem;
                letter-spacing: 0;
            }
            }
        }
        .userBaseInfo{
            margin-top: .15rem;
            height: 3rem;
            width: 100%;
            background: #fff;
            display: flex;
            justify-content: left;
            align-items: flex-end;
            position: relative;
            z-index: 0;
            .infoBox{
                font-size: .3rem;
                position: relative;
                height: 100%;
                width: 100%;
                color: #ffffff;
                border-radius: 0.05rem;
                display: flex;
                flex-direction: column;
                align-items: left;
                .svg-icon{
                    display: block;
                    width:100%;
                    height: 100%;
                    position: absolute;
                    left:0;
                    z-index: -1;
                }
                .infoName{
                    width: 3rem;
                    height: .5rem;
                    text-align: left;
                    margin-top: .28rem;
                    margin-left: .3rem;
                    .name{
                        width: 1.08rem;
                        height: .47rem;
                        line-height: .47rem;
                        font-size: .36rem;
                        font-family: MicrosoftYaHei;
                        color: #FFFFFF;
                        letter-spacing: 0;
                    }
                    .sex{
                        opacity: 0.65;
                        font-family: MicrosoftYaHei;
                        font-size:.24rem;
                        color: #FFFFFF;
                        letter-spacing: 0;
                    }
                }
                .infoAddress{
                    margin-top: .20rem;
                    width: 5rem;
                    text-align: left;
                    margin-left: .3rem;
                    .titleText{
                        opacity: 0.65;
                        font-family: MicrosoftYaHei;
                        font-size: .24rem;
                        color: #FFFFFF;
                        letter-spacing: 0;
                    }
                    span{
                        font-family: MicrosoftYaHei;
                        font-size: .24rem;
                        color: #FFFFFF;
                        letter-spacing: 0;
                    }
                    .IconImg{
                        width: .28rem;
                        height: .28rem;
                        display: inline-block;

                        .svg-icon{
                            padding-left: .3rem;
                            display:block;
                            width: .28rem;
                            height: .28rem;

                        }
                    }
                }
            }

        }
        .ReportInfo {
            height: 100%;
            width: 100%;
            padding:.2rem;
            background: white;
            .InfoLine {
                width: 100%;
                height: 1rem;
                position: relative;
                font-family: PingFangSC-Regular;
                font-size: .3rem;
                display: flex;
                justify-content: space-between;
                border-bottom: .01rem solid #D5D5D5;
                .InfoName {
                    opacity: 0.85;
                    line-height: 1rem;
                    span {
                        height: .6rem;
                        line-height: .6rem;
                        color: #000000;
                        letter-spacing: 0;
                    }
                }
                .InfoText {
                    opacity: 0.85;
                    line-height: 1rem;
                    display: flex;
                    position: relative;
                    align-items: center;
                    input {
                        width: 3rem;
                        height: .6rem;
                        opacity: 0.85;
                        font-family: PingFangSC-Regular;
                        font-size: .3rem;
                        color: #000000;
                        letter-spacing: 0;
                        text-align: right;
                        border: none;
                    }
                }
                &:last-child {
                    border-bottom: none;
                }
            }
        }
        .simpleNote{
            margin-top: .3rem;
            height: 7rem;
            width: 100%;
            padding:.3rem;
            background: white;
            .InfoTitle{
                height: .8rem;
                line-height: .8rem;
                position: relative;
                font-family: PingFangSC-Regular;
                font-size: .3rem;
                display: flex;
                justify-content: space-between;
                border-bottom: .01rem solid #D5D5D5;
                .InfoName {
                    opacity: 0.85;
                    line-height: 1rem;
                    span {
                        height: .6rem;
                        line-height: .6rem;
                        color: #000000;
                        letter-spacing: 0;
                    }
                }
                .InfoText {
                    opacity: 0.85;
                    line-height: .8rem;
                    display: flex;
                    position: relative;
                    align-items: center;
                    input {
                        width: 4rem;
                        height: .8rem;
                        opacity: 0.85;
                        font-family: PingFangSC-Regular;
                        font-size: .3rem;
                        color: #000000;
                        letter-spacing: 0;
                        text-align: right;
                        border: none;
                    }
                    .svg-icon-delete{
                        display: inline-block;
                        width: .6rem;
                        height: .6rem;
                    }
                }
                &:last-child {
                    border-bottom: none;
                }
            }
            .InfoLine {
                height: 1rem;
                line-height: 1rem;
                position: relative;
                width: 100%;
                font-family: PingFangSC-Regular;
                font-size: .3rem;
                display: flex;
                justify-content: space-between;
                border-bottom: .01rem solid #D5D5D5;
                padding-top: .01rem 0;
                .InfoName {
                    opacity: 0.85;
                    line-height: 1rem;
                    span {
                        height: .6rem;
                        line-height: .6rem;
                        color: #000000;
                        letter-spacing: 0;
                    }
                }
                .InfoText {
                    opacity: 0.85;
                    line-height: 1rem;
                    display: flex;
                    position: relative;
                    align-items: center;
                    input {
                        width: 4rem;
                        height: .6rem;
                        opacity: 0.85;
                        font-family: PingFangSC-Regular;
                        font-size: .3rem;
                        color: #000000;
                        letter-spacing: 0;
                        text-align: right;
                        border: none;
                    }
                }
                &:last-child {
                    border-bottom: none;
                }
            }
        }
        .newSimpleNote{
            background: #FFFFFF;
            user-select:none;
            height: 1.31rem;
            width: 100%;
            position: relative;
            bottom: 0;
            left: 0;
            display: flex;
            justify-content: center;
            padding: 0 0.2rem;
            box-sizing: border-box;
            .newAdd{
                margin-top: .29rem;
                height: .85rem;
                width: 7.1rem;
                font-family: FZLTXHKM;
                font-size: .36rem;
                color: #1492FF;
                letter-spacing: 0;
                text-align: center;
                line-height: .36;
                background: #FFFFFF;
                border: .01rem solid #1492FF;
                span{
                    position: relative;
                    top: .36rem;
                }
            }
        }
        .footer{
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
    }
}
</style>

<style>
    .payLimit .el-date-editor.el-input,
    .el-date-editor.el-input__inner {
        width: 160px;
    }
    .payLimit .el-input__prefix,
    .el-input__suffix {
        display: none;
    }
    .payLimit .el-input__inner {
        border: none;
        text-align: right;
        padding-right: 0;
        padding-left: 0;
    }
</style>
