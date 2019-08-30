<template>
  <div class="legalChange">
    <Title :title="'参保登记'" :backRouter="'/'"></Title>
    <!-- MintUI弹出框区域 -->
    <mt-datetime-picker 
    type="date" ref="startPicker" 
    v-model="dateVal" 
    @confirm="handleStartConfirm">
    </mt-datetime-picker>
    <mt-datetime-picker 
    type="date" 
    ref="startPicker1" 
    v-model="dateVal1" 
    @confirm="handleStartConfirm1">
    </mt-datetime-picker>
    <mt-popup class="cityPicker" v-model="showCityPicker" position="bottom">
      <mt-picker :showToolbar="true" :slots="chooseArr" valueKey="AAA103" @change="onChooseChange">
        <div class="btnBox">
          <div class="btn" @click="showCityPicker=!showCityPicker">取消</div>
          <div class="btn" @click="chooseData()">确定</div>
        </div>
      </mt-picker>
    </mt-popup>

    <SelectCity :type="3" ref="cityPicker" :jy9028="true" @confirm="chooseCity"></SelectCity>
    <div class="Content">
      <!-- 基本信息 -->
      <UserBaseInfo></UserBaseInfo>
      <!-- 变更信息 -->
      <div class="ChangeInfo">
        <div class="panel">
          <h2 class="infoTitle">基本信息</h2>
          <div class="InfoLine">
            <div class="InfoName">
              <span>统一社会信用代码：</span>
            </div>
            <div class="InfoText">
              <input v-model="form.AAB003" type="text" @blur="check()" maxlength="20" placeholder="请输入"  />
            </div>
          </div>
          <div class="InfoLine">
            <div class="InfoName">
              <span>单位名称：</span>
            </div>
            <div class="InfoText">
              <input v-model="form.AAB004" type="text" maxlength="50" placeholder="请输入"  />
            </div>
          </div>

          <div class="InfoLine">
            <div class="InfoName">
              <span>联系电话：</span>
            </div>
            <div class="InfoText">
              <input v-model="form.AAE005" type="tel" maxlength="13" placeholder="请输入"  />
            </div>
          </div>
          <div class="InfoLine">
            <div class="InfoName">
              <span>单位地址：</span>
            </div>
            <div class="InfoText">
              <input v-model="params.address" @click="openPickerCity" type="text" placeholder="请选择" readonly  />
              <svg-icon icon-class="serveComponent_arrowRight"></svg-icon>
            </div>
          </div>
          <div class="InfoLine">
            <div class="InfoName">
              <span>地址详情：</span>
            </div>
            <div class="InfoText">
              <input v-model="params.addressDetail" type="text" maxlength="50" placeholder="请输入"  />
            </div>
          </div>
          <div class="InfoLine">
            <div class="InfoName">
              <span>邮政编码：</span>
            </div>
            <div class="InfoText">
              <input v-model="form.AAE007" type="tel" maxlength="6" placeholder="请输入"  />
            </div>
          </div>
          <div class="bgc"></div>
        </div>
        <div class="panel">
          <h2 class="infoTitle">单位属性</h2>
          <div class="InfoLine">
            <div class="InfoName">
              <span>单位类型：</span>
            </div>
            <div class="InfoText">
              <input v-model="form.AAB019VALUE" @click="openPicker('AAB019')" type="text" placeholder="请选择" readonly  />
              <svg-icon icon-class="serveComponent_arrowRight"></svg-icon>
            </div>
          </div>
          <div class="InfoLine">
            <div class="InfoName">
              <span>主管部门/总机构：</span>
            </div>
            <div class="InfoText">
              <input v-model="form.AAB023" type="text" maxlength="50" placeholder="请输入"  />
            </div>
          </div>
          <div class="InfoLine">
            <div class="InfoName">
              <span>经济类型：</span>
            </div>
            <div class="InfoText">
              <input v-model="form.AAB020VALUE" @click="openPicker('AAB020')" type="text" placeholder="请选择" readonly  />
              <svg-icon icon-class="serveComponent_arrowRight"></svg-icon>
            </div>
          </div>
          <div class="InfoLine">
            <div class="InfoName">
              <span>隶属关系：</span>
            </div>
            <div class="InfoText">
              <input v-model="form.AAB021VALUE" @click="openPicker('AAB021')" type="text" placeholder="请选择" readonly  />
              <svg-icon icon-class="serveComponent_arrowRight"></svg-icon>
            </div>
          </div>
          <div class="InfoLine">
            <div class="InfoName">
              <span>经济来源：</span>
            </div>
            <div class="InfoText">
              <input v-model="form.BAB451VALUE" @click="openPicker('BAB451')" type="text" placeholder="请选择" readonly  />
              <svg-icon icon-class="serveComponent_arrowRight"></svg-icon>
            </div>
          </div>
          <div class="InfoLine">
            <div class="InfoName">
              <span>行业代码：</span>
            </div>
            <div class="InfoText">
              <input v-model="form.AAB022VALUE" @click="openPicker('AAB022')" type="text" placeholder="请选择" readonly  />
              <svg-icon icon-class="serveComponent_arrowRight"></svg-icon>
            </div>
          </div>
          <div class="bgc"></div>
        </div>
        <div class="panel">
          <h2 class="infoTitle">证件信息</h2>
          <div class="InfoLine">
            <div class="InfoName">
              <span>法人登记证种类：</span>
            </div>
            <div class="InfoText">
              <input v-model="form.AAB006VALUE" @click="openPicker('AAB006')" type="text" placeholder="请选择" readonly  />
              <svg-icon icon-class="serveComponent_arrowRight"></svg-icon>
            </div>
          </div>
          <div class="InfoLine">
            <div class="InfoName">
              <span>发证日期：</span>
            </div>
            <div class="InfoText">
              <input @click="openStartPicker" type="text" v-model="form.AAB036" placeholder="请选择" readonly  />
              <svg-icon icon-class="serveComponent_arrowRight"></svg-icon>
            </div>
          </div>
          <div class="InfoLine">
            <div class="InfoName">
              <span>批准成立单位：</span>
            </div>
            <div class="InfoText">
              <input v-model="form.AAE048" type="text" maxlength="50" placeholder="请输入"  />
            </div>
          </div>
          <div class="InfoLine">
            <div class="InfoName">
              <span>批准日期：</span>
            </div>
            <div class="InfoText">
              <input @click="openStartPicker1" type="text" v-model="form.AAB011" placeholder="请选择" readonly  />
              <svg-icon icon-class="serveComponent_arrowRight"></svg-icon>
            </div>
          </div>
          <div class="InfoLine">
            <div class="InfoName">
              <span>批准文号：</span>
            </div>
            <div class="InfoText">
              <input v-model="form.AAB012" type="text" maxlength="50" placeholder="请输入"  />
            </div>
          </div>
          <div class="bgc"></div>
        </div>
        <div class="panel">
          <h2 class="infoTitle">人员信息</h2>
          <div class="InfoLine">
            <div class="InfoName">
              <span>法人代表姓名：</span>
            </div>
            <div class="InfoText">
              <input v-model="form.AAB013" type="text" maxlength="50" placeholder="请输入"  />
            </div>
          </div>
          <div class="InfoLine">
            <div class="InfoName">
              <span>法人代表身份证号：</span>
            </div>
            <div class="InfoText">
              <input v-model="form.BAB014" type="text" maxlength="20" placeholder="请输入"  />
            </div>
          </div>
          <div class="InfoLine">
            <div class="InfoName">
              <span>法人代表电话：</span>
            </div>
            <div class="InfoText">
              <input v-model="form.BKE280" type="tel" maxlength="11" placeholder="请输入"  />
            </div>
          </div>
          <div class="InfoLine">
            <div class="InfoName">
              <span>专管员姓名：</span>
            </div>
            <div class="InfoText">
              <input v-model="form.BKE281" type="text" maxlength="50" placeholder="请输入"  />
            </div>
          </div>
          <div class="InfoLine">
            <div class="InfoName">
              <span>专管员手机：</span>
            </div>
            <div class="InfoText">
              <input v-model="form.BKE283" type="tel" maxlength="11" placeholder="请输入"  />
            </div>
          </div>
          <div class="InfoLine">
            <div class="InfoName">
              <span>专管员所在部门：</span>
            </div>
            <div class="InfoText">
              <input v-model="form.BKE285" type="text" maxlength="50" placeholder="请输入"  />
            </div>
          </div>
          <div class="bgc"></div>
        </div>
        <div class="panel">
          <h2 class="infoTitle">银行信息</h2>
          <div class="InfoLine">
            <div class="InfoName">
              <span>缴费开户银行：</span>
            </div>
            <div class="InfoText">
              <input v-model="form.AAE008VALUE" @click="chooseBank()" type="text"  placeholder="请选择" readonly  />
              <svg-icon icon-class="serveComponent_arrowRight"></svg-icon>
            </div>
          </div>
          <div class="InfoLine">
            <div class="InfoName">
              <span>缴费开户名：</span>
            </div>
            <div class="InfoText">
              <input v-model="form.AAE009" type="text" maxlength="50" placeholder="请输入"  />
            </div>
          </div>
          <div class="InfoLine">
            <div class="InfoName">
              <span>缴费银行账号：</span>
            </div>
            <div class="InfoText">
              <input v-model="form.AAE010" type="text" maxlength="50" placeholder="请输入"  />
            </div>
          </div>
          <div class="bgc"></div>
        </div>
      </div>
    </div>
    <Footer btnText="下一步" :canSubmit="canSubmit" @submit="submit()"></Footer>
    <SearchInfoPage ref="bank" :bank='true' @childrenClick="bankClick" title="选择银行"></SearchInfoPage>
  </div>
</template>

<script>
export default {
  data () {
    return {
      asd:true,
      showCityPicker: false,
      selectName: '',
      label: '',
      value: '',
      selectObject: {},
      chooseArr: [
        {
          flex: 1,
          values: [],
          className: 'slot1'
        }
      ],
      dateVal: '',
      dateVal1: '',
      params:{
        address: '',
        addressDetail:'',//详细地址
      },
      form: {
        AAB003: '', // 统一社会信用代码
        AAB004: '', // 单位名称
        AAB023: '', // 主管部门或总机构
        AAB019: '', // 单位类型
        AAB019VALUE: '', // 单位类型
        AAE007: '', // 邮政编码
        AAB020: '', // 经济类型
        AAB020VALUE: '', // 经济类型
        AAB021: '', // 隶属关系
        AAB021VALUE: '', // 隶属关系
        AAB022: '', // 行业代码
        AAB022VALUE: '', // 行业代码
        AAB006: '', // 法人登记证种类
        AAB006VALUE: '', // 法人登记证种类
        AAB036: '', // 发证日期
        AAE048: '', // 批准成立单位
        AAB011: '', // 批准日期
        AAB012: '', // 批准文号
        AAB013: '', // 法人代表姓名
        BAB014: '', // 法人身份证号码
        BKE280: '', // 法人电话
        BKE281: '', // 单位专管员姓名
        BKE283: '', // 单位专管员手机
        BKE285: '', // 单位专管员所在部门
        AAE005: '', // 联系电话
        AAE008: '', // 缴费开户银行
        AAE008VALUE: '', // 缴费开户银行
        AAE009: '', // 缴费银行户名
        AAE010: '', // 缴费银行账号
        BAB451: '', // 经济来源
        BAB451VALUE: '', // 经济来源
        AAE006: '', // 联系地址
        BKZ019:''//经办编号
      },
      form1:{},
      startDate: new Date(),
      canSubmit: false,
    }
  },
  watch: {
    form: {
      handler: function (val) {
        if(val.AAB023!=''&&val.AAB019!=''&&val.AAE007!=''&&val.AAB020!=''&&val.AAB021!=''&&val.AAB022!=''
        &&val.AAB006!=''&&val.AAB036!=''&&val.AAE048!=''&&val.AAB011!=''&&val.AAB012!=''&&val.AAB013!=''&&val.BAB014!=''&&val.BKE280!=''&&val.BKE281!=''
        &&val.BKE283!=''&&val.BKE285!=''&&val.AAE005!=''&&val.AAE008!=''&&val.AAE009!=''&&val.AAE010!=''&&val.BAB451!=''&&val.AAE006!=''&&val.AAB003){
          this.canSubmit = true
        }else{
          this.canSubmit = false
        }
      },
      deep: true
    },
    params:{
      handler:function(val){
        console.log(val)
        if(val.address!=''&&val.addressDetail!=''){
          this.form.AAE006=val.address+'|'+val.addressDetail;
          console.log(this.form.AAE006)
        }
      },
      deep:true
    }
  },
  created () {
    this.epFn.setTitle('单位参保登记')
    console.log("22",JSON.stringify(this.form1)=='{}')
    this.getSelectInfo('AAB019')
    this.getSelectInfo('AAB020')
    this.getSelectInfo('AAB021')
    this.getSelectInfo('AAB022')
    this.getSelectInfo('AAB006')
    this.getSelectInfo('AAE008')
    this.getSelectInfo('BAB451')
    this.getFromInfo()
  },
  methods: {
    check(){
          let params = {};
          params.sydwTycode=this.form.AAB003;
          console.log('----params----',params)

          this.$axios.post( this.epFn.ApiUrl() +  '/H5/jy0006/getAreaList', params)
          .then((resData) => {

              if(resData.enCode == '1000'){
                  console.log("返回成功信息",resData)
              }else{
                  this.$toast(resData.msg)
              }
          }).catch((error) => {
              console.log(error)
          })
    },
    // 选择就诊医院
    chooseBank(){
        this.$refs.bank.open();
    },
    bankClick(name,code){
      console.log(name)
      this.form.AAE008VALUE=name;
      this.form.AAE008=name;
        // this.form.hospitalName = name
        // this.form.AKB020 = code
    },
    //个人用户登录
    changeCompanyName(str) {
        if (str) {
            MessageBox.prompt('法人姓名', '').then(({
                value,
                action
            }) => {
                this.personName=value;
                sessionStorage.setItem('personName', value);
            });
        } else {
            this.$toast("功能正在建设中")
        }
    },
    //个人用户登录
    changeCompanyCode(str) {
        if (str) {
            MessageBox.prompt('法人身份证', '').then(({
                value,
                action
            }) => {
                this.personId=value;
                sessionStorage.setItem('personId', value);
            });
        } else {
            this.$toast("功能正在建设中")
        }
    },
    // 获取回填信息
    getFromInfo () {
      const submitForm = {}
      let LegalPerson = JSON.parse(sessionStorage.getItem("LegalPerson"));
      console.log("LegalPerson",LegalPerson)
      submitForm.AAC003 = LegalPerson.attnName 
      if( LegalPerson.xzqh == '330000') {
        submitForm.AAB301 = '339900'
      }else{
        submitForm.AAB301 = LegalPerson.xzqh
      }
     
      submitForm.AAE135 = LegalPerson.attnIDNo 
      const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader, submitForm, '9100-3')
      this.$axios.post(this.epFn.ApiUrl() + '/h5/jy9100/getDetail', params).then(resData => {
        if (resData.enCode == 1000) {
          console.log("结果",resData)
          this.form1=resData.LS_DS_16;
          // for (var key in this.form) {
          //     // this.form=resData.LS_DS_16;
          // }
        // address: '',
        // addressDetail:'',//详细地址
        // AAB003: '', // 统一社会信用代码
        // AAB004: '', // 单位名称
        // AAB023: '', // 主管部门或总机构
        // AAB019: '', // 单位类型
        // AAB019VALUE: '', // 单位类型
        // AAE007: '', // 邮政编码
        // AAB020: '', // 经济类型
        // AAB020VALUE: '', // 经济类型
        // AAB021: '', // 隶属关系
        // AAB021VALUE: '', // 隶属关系
        // AAB022: '', // 行业代码
        // AAB022VALUE: '', // 行业代码
        // AAB006: '', // 法人登记证种类
        // AAB006VALUE: '', // 法人登记证种类
        // AAB036: '', // 发证日期
        // AAE048: '', // 批准成立单位
        // AAB011: '', // 批准日期
        // AAB012: '', // 批准文号
        // AAB013: '', // 法人代表姓名
        // BAB014: '', // 法人身份证号码
        // BKE280: '', // 法人电话
        // BKE281: '', // 单位专管员姓名
        // BKE283: '', // 单位专管员手机
        // BKE285: '', // 单位专管员所在部门
        // AAE005: '', // 联系电话
        // AAE008: '', // 缴费开户银行
        // AAE008VALUE: '', // 缴费开户银行
        // AAE009: '', // 缴费银行户名
        // AAE010: '', // 缴费银行账号
        // BAB451: '', // 经济来源
        // BAB451VALUE: '', // 经济来源
        // AAE006: '', // 联系地址
          this.form.AAB003 = resData.LS_DS_16.AAB003;
          this.params.address = resData.LS_DS_16.AAE006.split('|')[0];
          this.params.addressDetail =  resData.LS_DS_16.AAE006.split('|')[1];
          this.form.AAB004 = resData.LS_DS_16.AAB004;
          this.form.AAB023 = resData.LS_DS_16.AAB023;
          this.form.AAB004 = resData.LS_DS_16.AAB004;
          this.form.AAB019 = resData.LS_DS_16.AAB019;
          this.form.AAB019VALUE = resData.LS_DS_16.AAB019VALUE;
          this.form.AAE007 = resData.LS_DS_16.AAE007;
          this.form.AAB020 = resData.LS_DS_16.AAB020;
          this.form.AAB020VALUE = resData.LS_DS_16.AAB020VALUE;
          this.form.AAB021 = resData.LS_DS_16.AAB021;
          this.form.AAB021VALUE = resData.LS_DS_16.AAB021VALUE;
          this.form.AAB022 = resData.LS_DS_16.AAB022;
          this.form.AAB022VALUE = resData.LS_DS_16.AAB022VALUE;
          this.form.AAB006 = resData.LS_DS_16.AAB006;
          this.form.AAB006VALUE = resData.LS_DS_16.AAB006VALUE;
          this.form.AAB036 = resData.LS_DS_16.AAB036;
          this.form.AAE048 = resData.LS_DS_16.AAE048;
          this.form.AAB011 = resData.LS_DS_16.AAB011;
          this.form.AAB012 = resData.LS_DS_16.AAB012;
          this.form.AAB013 = resData.LS_DS_16.AAB013;
          this.form.BAB014 = resData.LS_DS_16.BAB014;
          this.form.BKE280 = resData.LS_DS_16.BKE280;
          this.form.BKE281 = resData.LS_DS_16.BKE281;
          this.form.BKE283 = resData.LS_DS_16.BKE283;
          this.form.BKE285 = resData.LS_DS_16.BKE285;
          this.form.AAE005 = resData.LS_DS_16.AAE005;
          this.form.AAE008 = resData.LS_DS_16.AAE008;
          this.form.AAE008VALUE = resData.LS_DS_16.AAE008VALUE;
          this.form.AAE009 = resData.LS_DS_16.AAE009;
          this.form.AAE010 = resData.LS_DS_16.AAE010;
          this.form.BAB451 = resData.LS_DS_16.BAB451;
          this.form.BAB451VALUE = resData.LS_DS_16.BAB451VALUE;
          this.form.AAE006 = resData.LS_DS_16.AAE006;
          this.form.BKZ019 = resData.LS_DS_16.BKZ019;
          
        } else if (resData.enCode == 1001) {
          //   失败  1001
          console.log('返回信息失败', resData)
          // this.$toast(resData.msg)
        } else {
          this.$toast('业务出错')
        }
      })
    },
    // 获取下拉选项
    getSelectInfo (val) {
      const submitForm = {
        'AAA102': '',
        'AAA100': val,
        'pageNum': '0',
        'AAE013': '',
        'AAA052': '',
        'pageSize':'40'
      }
      const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader, submitForm, '2001')
      this.$axios.post(this.epFn.ApiUrl() + '/h5/jy2001/optionInformationList', params).then(resData => {
        if (resData.enCode == 1000) {
          this.selectObject[val] = resData.LS_DS
        } else if (resData.enCode == 1001) {
          //   失败  1001
          console.log('返回信息失败', resData)
          this.$toast(resData.msg)
        } else {
          this.$toast('业务出错')
        }
      })
    },
    handleStartConfirm (val) {
      let date = this.util.formatDate(val, 'yyyy-MM-dd')
      this.form.AAB036 = date
    },
    handleStartConfirm1 (val) {
      let date = this.util.formatDate(val, 'yyyy-MM-dd')
      this.form.AAB011 = date
    },
    openStartPicker () {
      this.$refs.startPicker.open()
    },
    openStartPicker1 () {
      this.$refs.startPicker1.open()
    },
    // 选择框的确认事件，加VALUE中文显示
    chooseData () {
      this.form[this.selectName + 'VALUE'] = this.label
      this.form[this.selectName] = this.value
      // this.selectName
      this.showCityPicker = false
    },
    // 选择城市
    openPickerCity () {
      this.$refs.cityPicker.open()
    },
    openPicker (value) {
      console.log(this.selectObject)

      this.selectName = value
      this.showCityPicker = true
      this.chooseArr[0].values = this.selectObject[value]
    },
    chooseCity (val) {
      console.log("选择城市",val)
      // 这里有地址的汉字和code
      this.params.address = val.name
    },
    onChooseChange (picker, values) {
      if (values[0] !== undefined) {
        this.label = values[0].AAA103
        this.value = values[0].AAA102
      }
    },
    // 提交
    submit () {
      if (this.canSubmit === false) {
        return false
      }else{
            //法人电话BKE280
            if(this.form.BKE280&&this.form.BKE280.length==11){
                if(!this.util.checkPhone(this.form.BKE280)){
                    this.$toast('请填写正确的手机号码')
                    return false;
                    }
            }else if(this.form.BKE280&&(this.form.BKE280.length==7||this.form.BKE280.length==8)){
                if(!this.util.checkHomePhone(this.form.BKE280)){
                    this.$toast('请填写正确的电话号码')
                    return false;
                    }
            }else if(this.form.BKE280&&(this.form.BKE280.length!=7||this.form.BKE280.length!=8||this.form.BKE280.length!=11)){
                    this.$toast('请确认填写的号码位数是否正确')
                    return false;
            }
            //专管员电话BKE283
            if(this.form.BKE283&&this.form.BKE283.length==11){
                if(!this.util.checkPhone(this.form.BKE283)){
                    this.$toast('请填写正确的手机号码')
                    return false;
                    }
            }else if(this.form.BKE283&&(this.form.BKE283.length==7||this.form.BKE283.length==8)){
                if(!this.util.checkHomePhone(this.form.BKE283)){
                    this.$toast('请填写正确的电话号码')
                    return false;
                    }
            }else if(this.form.BKE283&&(this.form.BKE283.length!=7||this.form.BKE283.length!=8||this.form.BKE283.length!=11)){
                    this.$toast('请确认填写的号码位数是否正确')
                    return false;
            }
            //联系电话AAE005
            if(this.form.AAE005&&this.form.AAE005.length==11){
                if(!this.util.checkPhone(this.form.AAE005)){
                    this.$toast('请填写正确的手机号码')
                    return false;
                    }
            }else if(this.form.AAE005&&(this.form.AAE005.length==7||this.form.AAE005.length==8)){
                if(!this.util.checkHomePhone(this.form.AAE005)){
                    this.$toast('请填写正确的电话号码')
                    return false;
                    }
            }else if(this.form.AAE005&&(this.form.AAE005.length!=7||this.form.AAE005.length!=8||this.form.AAE005.length!=11)){
                    this.$toast('请确认填写的号码位数是否正确')
                    return false;
            }      
            if (this.form.AAE007.toString.length == 6) {
                  this.$toast('请填写正确的邮政编码')
                  return false
            }      
            if (!this.util.idCard(this.form.BAB014)) {
                  this.$toast('请填写正确的法人代表身份证号')
                  return false
            }
            // for(let item in this.form){
            //   if(this.form[item] != this.form1[item]){
            //     console.log("999999999",this.form[item],this.form1[item])
            //   }
            // }
            let params = this.formatSubmitData()
            this.$axios.post(this.epFn.ApiUrl() + '/h5/jy9100/getRecord ', params).then(resData => {
              //   成功   1000
              if (resData.enCode == 1000) {
              if(JSON.stringify(this.form1)=='{}'){
                  console.log('首次参保')
              }else{
                for(let item in this.form){
                  if(this.form[item] != this.form1[item]){
                    console.log("999999999",this.form[item],this.form1[item])
                    this.$toast('信息有修改，请重新下载并上传')
                  }
                }
              }
                console.log('返回信息成功', resData)
                this.$store.dispatch('REGISTER_INFO', resData)
                this.$router.push({ path: '/registerTwo' })
              } else if (resData.enCode == 1001) {
                //   失败  1001
                console.log('返回信息失败', resData)
                this.$toast(resData.msg)
              } else {
                this.$toast('业务出错')
              }
            })

      }

      // this.$router.push('/legalChangeDetail');
    },
    formatSubmitData () {
      // 请求参数封装
      let submitForm = Object.assign({}, this.form)
      const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader, submitForm, '9100') // 加入用户名和电子社保卡号
      let LegalPerson = JSON.parse(sessionStorage.getItem("LegalPerson"));
      console.log("person",LegalPerson)
      // console.log("9999",LegalPerson)
      submitForm.AAC003=LegalPerson.attnName;//单位名称
      submitForm.userId=LegalPerson.userId;//userId
      if(LegalPerson.xzqh =='330000' ) {
        submitForm.AAB301 = '339900'
      }else{
      submitForm.AAB301=LegalPerson.xzqh//统筹区
      }

      submitForm.AAE135=LegalPerson.attnIDNo;//身份证号
      submitForm.BKE520='1'//数据来源
      

      return params
    }
  }
}
</script>

<style lang="less" scoped>
.legalChange {
  width: 100%;
  .cityPicker {
    width: 100%;
    .btnBox {
      display: flex;
      .btn {
        height: 40px;
        width: 50%;
        color: #26a2ff;
        line-height: 40px;
        font-size: 16px;
      }
    }
  }
  .Content {
    height: 100%;
    margin-bottom: 1.1rem;
    .ChangeInfo {
      width: 100%;
      padding: 0 0.3rem;
      background: white;
      .panel {
        margin-bottom: 0.32rem;
      }
      .bgc {
        background: #f5f5f5;
        height: 10px;
        margin: 0 -0.3rem;
      }
      .infoTitle {
        font-size: 0.34rem;
        text-align: left;
        line-height: 1;
        padding-top: 0.32rem;
      }
      .InfoLine {
        height: 1.2rem;
        position: relative;
        font-family: PingFangSC-Regular;
        font-size: 0.3rem;
        display: flex;
        justify-content: space-between;
        border-bottom: 0.01rem solid #d5d5d5;
        .InfoName {
          opacity: 0.85;
          line-height: 1.2rem;
          span {
            height: 0.6rem;
            line-height: 0.6rem;
            color: #000000;
            letter-spacing: 0;
            white-space: nowrap;
          }
        }
        .InfoText {
          opacity: 0.85;
          line-height: 1.2rem;
          display: flex;
          position: relative;
          align-items: center;
          input {
            width: 4rem;
            height: 0.6rem;
            opacity: 0.85;
            font-family: PingFangSC-Regular;
            font-size: 0.3rem;
            color: #000000;
            letter-spacing: 0;
            text-align: right;
            border: none;
          }
        }
        &:last-of-type(2) {
          border-bottom: none;
        }
      }
      .changeUserBtn {
          display: flex;
          justify-content: space-around;
          .btn {
              height: .6rem;
              line-height: .6rem;
              width: 3.5rem;
              border: 1px solid #DDD;
              font-size: .36rem;
              border-radius: .2rem;
              background: #FFF;
          }
      }
    }
    .Hint {
      margin-top: 0.45rem;
      padding: 0 0.3rem;
      opacity: 0.45;
      font-family: PingFangSC-Regular;
      font-size: 0.24rem;
      color: #000000;
      text-align: left;
      .HintTitle {
        i {
          margin-right: 0.2rem;
          letter-spacing: 0;
        }
      }
      .HintText {
        margin-top: 0.28rem;
        letter-spacing: 0;
      }
    }
  }
  // 资料上传
  .dataUpload {
    background: #fff;
    margin: 0;
    padding: 0.37rem 0;
    .picWrap {
      display: flex;
      flex-wrap: wrap;
      margin-top: 0.2rem;
      .uploadBtn {
        position: relative;
        height: 1.5rem;
        width: 1.5rem;
        margin: 0.1rem 0.15rem 0 0;
        img {
          height: 100%;
          width: 100%;
        }
        .svg-icon {
          position: absolute;
          height: 0.4rem;
          width: 0.4rem;
          top: -0.2rem;
          right: -0.2rem;
        }
      }
      .svg-icon {
        margin: 0.1rem 0.15rem 0 0;
        height: 1.5rem;
        width: 1.5rem;
      }
    }
    .uploadHint {
      margin-top: 10px;
      font-size: 0.26em;
      text-align: left;
    }
  }
}
</style>
