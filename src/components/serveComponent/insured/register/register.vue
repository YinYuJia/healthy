<template>
  <div class="legalChange">
    <Title :title="'参保登记'" :backRouter="'/'"></Title>
    <!-- MintUI弹出框区域 -->
    <mt-datetime-picker type="date" ref="startPicker" :startDate="startDate" v-model="dateVal" @confirm="handleStartConfirm"></mt-datetime-picker>
    <mt-datetime-picker type="date" ref="startPicker1" :startDate="startDate" v-model="dateVal1" @confirm="handleStartConfirm1"></mt-datetime-picker>
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
              <input v-model="form.AAB003" type="text" maxlength="20" placeholder="请输入" />
            </div>
          </div>
          <div class="InfoLine">
            <div class="InfoName">
              <span>单位名称：</span>
            </div>
            <div class="InfoText">
              <input v-model="form.AAB004" type="text" maxlength="50" placeholder="请输入" />
            </div>
          </div>

          <div class="InfoLine">
            <div class="InfoName">
              <span>联系电话：</span>
            </div>
            <div class="InfoText">
              <input v-model="form.AAE005" type="tel" maxlength="11" placeholder="请输入" />
            </div>
          </div>
          <div class="InfoLine">
            <div class="InfoName">
              <span>单位地址：</span>
            </div>
            <div class="InfoText">
              <input v-model="form.address" @click="openPickerCity" type="text" placeholder="请选择" readonly />
              <svg-icon icon-class="serveComponent_arrowRight"></svg-icon>
            </div>
          </div>
          <div class="InfoLine">
            <div class="InfoName">
              <span>地址详情：</span>
            </div>
            <div class="InfoText">
              <input v-model="form.AAE006" type="text" maxlength="50" placeholder="请输入" />
            </div>
          </div>
          <div class="InfoLine">
            <div class="InfoName">
              <span>邮政编码：</span>
            </div>
            <div class="InfoText">
              <input v-model="form.AAE007" type="tel" maxlength="6" placeholder="请输入" />
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
              <input v-model="form.AAB019VALUE" @click="openPicker('AAB019')" type="text" placeholder="请选择" readonly />
              <svg-icon icon-class="serveComponent_arrowRight"></svg-icon>
            </div>
          </div>
          <div class="InfoLine">
            <div class="InfoName">
              <span>主管部门/总机构：</span>
            </div>
            <div class="InfoText">
              <input v-model="form.AAB023" type="text" maxlength="50" placeholder="请输入" />
            </div>
          </div>
          <div class="InfoLine">
            <div class="InfoName">
              <span>经济类型：</span>
            </div>
            <div class="InfoText">
              <input v-model="form.AAB020VALUE" @click="openPicker('AAB020')" type="text" placeholder="请选择" readonly />
              <svg-icon icon-class="serveComponent_arrowRight"></svg-icon>
            </div>
          </div>
          <div class="InfoLine">
            <div class="InfoName">
              <span>隶属关系：</span>
            </div>
            <div class="InfoText">
              <input v-model="form.AAB021VALUE" @click="openPicker('AAB021')" type="text" placeholder="请选择" readonly />
              <svg-icon icon-class="serveComponent_arrowRight"></svg-icon>
            </div>
          </div>
          <div class="InfoLine">
            <div class="InfoName">
              <span>经济来源：</span>
            </div>
            <div class="InfoText">
              <input v-model="form.BAB451VALUE" @click="openPicker('BAB451')" type="text" placeholder="请选择" readonly />
              <svg-icon icon-class="serveComponent_arrowRight"></svg-icon>
            </div>
          </div>
          <div class="InfoLine">
            <div class="InfoName">
              <span>行业代码：</span>
            </div>
            <div class="InfoText">
              <input v-model="form.AAB022VALUE" @click="openPicker('AAB022')" type="text" placeholder="请选择" readonly />
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
              <input v-model="form.AAB006VALUE" @click="openPicker('AAB006')" type="text" placeholder="请选择" readonly />
              <svg-icon icon-class="serveComponent_arrowRight"></svg-icon>
            </div>
          </div>
          <div class="InfoLine">
            <div class="InfoName">
              <span>发证日期：</span>
            </div>
            <div class="InfoText">
              <input @click="openStartPicker" type="text" v-model="form.AAB036" placeholder="请选择" readonly />
              <svg-icon icon-class="serveComponent_arrowRight"></svg-icon>
            </div>
          </div>
          <div class="InfoLine">
            <div class="InfoName">
              <span>批准成立单位：</span>
            </div>
            <div class="InfoText">
              <input v-model="form.AAE048" type="text" maxlength="20" placeholder="请输入" />
            </div>
          </div>
          <div class="InfoLine">
            <div class="InfoName">
              <span>批准日期：</span>
            </div>
            <div class="InfoText">
              <input @click="openStartPicker1" type="text" v-model="form.AAB011" placeholder="请选择" readonly />
              <svg-icon icon-class="serveComponent_arrowRight"></svg-icon>
            </div>
          </div>
          <div class="InfoLine">
            <div class="InfoName">
              <span>批准文号：</span>
            </div>
            <div class="InfoText">
              <input v-model="form.AAB012" type="text" maxlength="50" placeholder="请输入" />
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
              <input v-model="form.AAB013" type="text" maxlength="50" placeholder="请输入" />
            </div>
          </div>
          <div class="InfoLine">
            <div class="InfoName">
              <span>法人代表身份证号：</span>
            </div>
            <div class="InfoText">
              <input v-model="form.BAB014" type="text" maxlength="20" placeholder="请输入" />
            </div>
          </div>
          <div class="InfoLine">
            <div class="InfoName">
              <span>法人代表电话：</span>
            </div>
            <div class="InfoText">
              <input v-model="form.BKE280" type="tel" maxlength="11" placeholder="请输入" />
            </div>
          </div>
          <div class="InfoLine">
            <div class="InfoName">
              <span>专管员姓名：</span>
            </div>
            <div class="InfoText">
              <input v-model="form.BKE281" type="text" maxlength="50" placeholder="请输入" />
            </div>
          </div>
          <div class="InfoLine">
            <div class="InfoName">
              <span>专管员手机：</span>
            </div>
            <div class="InfoText">
              <input v-model="form.BKE283" type="tel" maxlength="11" placeholder="请输入" />
            </div>
          </div>
          <div class="InfoLine">
            <div class="InfoName">
              <span>专管员所在部门：</span>
            </div>
            <div class="InfoText">
              <input v-model="form.BKE285" type="text" maxlength="51" placeholder="请输入" />
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
              <input v-model="form.AAE008VALUE" @click="openPicker('AAE008')" type="text" placeholder="请选择" readonly />
              <svg-icon icon-class="serveComponent_arrowRight"></svg-icon>
            </div>
          </div>
          <div class="InfoLine">
            <div class="InfoName">
              <span>缴费开户名：</span>
            </div>
            <div class="InfoText">
              <input v-model="form.AAE009" type="text" maxlength="50" placeholder="请输入" />
            </div>
          </div>
          <div class="InfoLine">
            <div class="InfoName">
              <span>缴费银行账号：</span>
            </div>
            <div class="InfoText">
              <input v-model="form.AAE010" type="text" maxlength="50" placeholder="请输入" />
            </div>
          </div>
          <div class="bgc"></div>
        </div>
      </div>
    </div>
    <Footer btnText="下一步" :canSubmit="canSubmit" @submit="submit()"></Footer>
  </div>
</template>

<script>
export default {
  data () {
    return {
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
      form: {
        address: '',
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
        AAE005: '', // 电话
        AAE008: '', // 缴费开户银行
        AAE008VALUE: '', // 缴费开户银行
        AAE009: '', // 缴费银行户名
        AAE010: '', // 缴费银行账号
        BAB451: '', // 经济来源
        BAB451VALUE: '', // 经济来源
        AAE006: '', // 联系地址
        BKE520: '1' // 数据来源类别
      },
      startDate: new Date(),
      canSubmit: false
    }
  },
  watch: {
    form: {
      handler: function (val) {
        for (var key in val) {
          console.log(key, val[key])

          if (!val[key]) {
            this.canSubmit = false
            break
          } else {
            this.canSubmit = true
          }
        }
      },
      deep: true
    }
  },
  created () {
    this.getSelectInfo('AAB019')
    this.getSelectInfo('AAB020')
    this.getSelectInfo('AAB021')
    this.getSelectInfo('AAB022')
    this.getSelectInfo('AAB006')
    this.getSelectInfo('AAE008')
    this.getSelectInfo('BAB451')
  },
  methods: {
    // 获取下拉选项
    getSelectInfo (val) {
      const submitForm = {
        'AAA102': '',
        'AAA100': val,
        'pageNum': '0',
        'AAE013': '',
        'AAA052': ''
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
      console.log(val)

      this.form.address = val.name
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
      }
      if (!this.util.checkPhone(this.form.AAE005)) {
        this.$toast('请填写正确的手机号码')
        return false
      }
      if (this.form.AAE007.toString.length == 6) {
        this.$toast('请填写正确的邮政编码')
        return false
      }

      if (!this.util.idCard(this.form.BAB014)) {
        this.$toast('请填写正确的法人代表身份证号')
        return false
      }
      if (!this.util.checkPhone(this.form.BKE280)) {
        this.$toast('请填写正确的法人代表电话')
        return false
      }
      if (!this.util.checkPhone(this.form.BKE283)) {
        this.$toast('请填写正确的专管员手机')
        return false
      }
      let params = this.formatSubmitData()
      this.$axios.post(this.epFn.ApiUrl() + '/h5/jy9100/getRecord ', params).then(resData => {
        //   成功   1000
        if (resData.enCode == 1000) {
          console.log('返回信息成功', resData)
          this.$store.dispatch('REGISTER_INFO', resData);
          this.$router.push({ path: '/registerTwo' })
        } else if (resData.enCode == 1001) {
          //   失败  1001
          console.log('返回信息失败', resData)
          this.$toast(resData.msg)
        } else {
          this.$toast('业务出错')
        }
      })
      // this.$router.push('/legalChangeDetail');
    },
    formatSubmitData () {
      let submitForm = Object.assign({}, this.form)
      const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader, submitForm, '9100') // 加入用户名和电子社保卡号
      submitForm.AAC003 = this.$store.state.SET_NATIVEMSG.name || '陈志相'
      submitForm.AAB301 = sessionStorage.getItem('GinsengLandCode') || '003310'
      submitForm.AAE135 = this.$store.state.SET_NATIVEMSG.idCard || '330327197412201736'
      // 请求参数封装

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
          // border-bottom: none;
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
