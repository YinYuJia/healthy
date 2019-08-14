<template>
  <div class="legalChange">
    <Title :title="'参保登记'" :backRouter="'/'"></Title>
    <!-- MintUI弹出框区域 -->
    <mt-datetime-picker type="date" ref="startPicker" :startDate="startDate" v-model="dateVal" @confirm="handleStartConfirm"></mt-datetime-picker>
    <mt-popup class="cityPicker" v-model="showCityPicker" position="bottom">
      <mt-picker :showToolbar="true" :slots="chooseArr" valueKey="label" @change="onChooseChange">
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
              <input v-model="form.AAE135" type="tel" maxlength="6" placeholder="请输入" />
            </div>
          </div>
          <div class="InfoLine">
            <div class="InfoName">
              <span>单位名称：</span>
            </div>
            <div class="InfoText">
              <input v-model="form.AAB004" type="tel" maxlength="6" placeholder="请输入" />
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
              <input v-model="form.address" @click="openPicker" type="text" placeholder="请选择" readonly />
              <svg-icon icon-class="serveComponent_arrowRight"></svg-icon>
            </div>
          </div>
          <div class="InfoLine">
            <div class="InfoName">
              <span>地址详情：</span>
            </div>
            <div class="InfoText">
              <input v-model="form.AAE006" type="tel" maxlength="11" placeholder="请输入" />
            </div>
          </div>
          <div class="InfoLine">
            <div class="InfoName">
              <span>邮政编码：</span>
            </div>
            <div class="InfoText">
              <input v-model="form.AAE007" type="text" placeholder="请输入" />
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
              <input v-model="form.AAB019" @click="openPicker('AAB019')" type="text" placeholder="请选择" readonly />
              <svg-icon icon-class="serveComponent_arrowRight"></svg-icon>
            </div>
          </div>
          <div class="InfoLine">
            <div class="InfoName">
              <span>主管部门/总机构：</span>
            </div>
            <div class="InfoText">
              <input v-model="form.AAB023" type="tel" maxlength="6" placeholder="请输入" />
            </div>
          </div>
          <div class="InfoLine">
            <div class="InfoName">
              <span>经济类型：</span>
            </div>
            <div class="InfoText">
              <input v-model="form.AAB020" @click="openPicker('AAB020')" type="text" placeholder="请选择" readonly />
              <svg-icon icon-class="serveComponent_arrowRight"></svg-icon>
            </div>
          </div>
          <div class="InfoLine">
            <div class="InfoName">
              <span>隶属关系：</span>
            </div>
            <div class="InfoText">
              <input v-model="form.AAB021" @click="openPicker('AAB021')" type="text" placeholder="请选择" readonly />
              <svg-icon icon-class="serveComponent_arrowRight"></svg-icon>
            </div>
          </div>
          <div class="InfoLine">
            <div class="InfoName">
              <span>经济来源：</span>
            </div>
            <div class="InfoText">
              <input v-model="form.BAB451" @click="openPicker('BAB451')" type="text" placeholder="请选择" readonly />
              <svg-icon icon-class="serveComponent_arrowRight"></svg-icon>
            </div>
          </div>
          <div class="InfoLine">
            <div class="InfoName">
              <span>行业代码：</span>
            </div>
            <div class="InfoText">
              <input v-model="form.AAB022" @click="openPicker('AAB022')" type="text" placeholder="请选择" readonly />
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
              <input v-model="form.AAB006" @click="openPicker('AAB006')" type="text" placeholder="请选择" readonly />
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
              <input v-model="form.AAE048" type="tel" maxlength="11" placeholder="请输入" />
            </div>
          </div>
          <div class="InfoLine">
            <div class="InfoName">
              <span>批准日期：</span>
            </div>
            <div class="InfoText">
              <input v-model="form.AAB011" type="tel" maxlength="11" placeholder="请输入" />
            </div>
          </div>
          <div class="InfoLine">
            <div class="InfoName">
              <span>批准文号：</span>
            </div>
            <div class="InfoText">
              <input v-model="form.AAB012" type="tel" maxlength="11" placeholder="请输入" />
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
              <input v-model="form.AAB013" type="tel" maxlength="6" placeholder="请输入" />
            </div>
          </div>
          <div class="InfoLine">
            <div class="InfoName">
              <span>法人代表身份证号：</span>
            </div>
            <div class="InfoText">
              <input v-model="form.BAB014" type="tel" maxlength="6" placeholder="请输入" />
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
              <input v-model="form.BKE281" type="tel" maxlength="11" placeholder="请输入" />
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
              <input v-model="form.BKE285" type="text" placeholder="请输入" />
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
              <input v-model="form.AAE008" @click="openPicker('AAE008')" type="text" placeholder="请选择" readonly />
              <svg-icon icon-class="serveComponent_arrowRight"></svg-icon>
            </div>
          </div>
          <div class="InfoLine">
            <div class="InfoName">
              <span>缴费开户名：</span>
            </div>
            <div class="InfoText">
              <input v-model="form.AAE009" type="tel" maxlength="6" placeholder="请输入" />
            </div>
          </div>
          <div class="InfoLine">
            <div class="InfoName">
              <span>缴费银行账号：</span>
            </div>
            <div class="InfoText">
              <input v-model="form.AAE010" type="tel" maxlength="11" placeholder="请输入" />
            </div>
          </div>
          <div class="bgc"></div>
        </div>
        <!-- 资料上传 -->
        <!-- <div class="panel">
					<h2 class="infoTitle">附件上传</h2>
					<div class="dataUpload">
						<div class="uploadHint">1、统一社会信用代码证</div>
						<div class="picWrap">
							<div class="uploadBtn" v-for="(item,index) in picArr" :key="index">
								<img :src="item" class="pic" @click="showBigPhoto(item)" />
								<svg-icon icon-class="serveComponent_delete" @click="deletePic(item,index)" />
							</div>
							<svg-icon @click="uploadImg" icon-class="serveComponent_upload" />
						</div>
						<div class="uploadHint">2、社会保险单位参保信息登记表</div>
						<div class="picWrap">
							<div class="uploadBtn" v-for="(item,index) in picArr" :key="index">
								<img :src="item" class="pic" @click="showBigPhoto(item)" />
								<svg-icon icon-class="serveComponent_delete" @click="deletePic(item,index)" />
							</div>
							<svg-icon @click="uploadImg" icon-class="serveComponent_upload" />
						</div>
					</div>
        </div>-->
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
      selectObject: {
        type: [
          {
            key: '1',
            label: '单位'
          },
          {
            key: '2',
            label: '单位2'
          }
        ],
        address: [
          {
            key: '1',
            label: '经济1'
          },
          {
            key: '2',
            label: '经济2'
          }
        ]
      },
      chooseArr: [
        {
          flex: 1,
          values: [],
          className: 'slot1'
        }
      ],
      dateVal: '',
      form: {
        AAC003: '', // 姓名
        AAE135: '', // 社会保障号
        AAB301: '', // 统筹区编码
        AAB004: '', // 单位名称
        AAB023: '', // 主管部门或总机构
        AAB019: '', // 单位类型
        AAE007: '', // 邮政编码
        AAB020: '', // 经济类型
        AAB021: '', // 隶属关系
        AAB022: '', // 行业代码
        AAB006: '', // 法人登记证种类
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
        AAE009: '', // 缴费银行户名
        AAE010: '', // 缴费银行账号
        BAB451: '', // 经济来源
        AAE006: '', // 联系地址
        BKE520: '' // 数据来源类别
      },
      startDate: new Date(),
      canSubmit: false
    }
  },
  watch: {
    form: {
      handler: function (val) {
        if (val.address != '' && val.detailAddress != '') {
          this.form.AAE006 = val.address + val.detailAddress
        }
        // if(val.AAE007 != '' && val.address != '' && val.detailAddress != '' && val.AAB005 != ''
        if (
          val.AAE007 != '' &&
          val.detailAddress != '' &&
          val.AAB005 != '' &&
          val.BKE280 != '' &&
          val.BKE281 != '' &&
          val.BKE283 != '' &&
          val.BKB225 != '' &&
          val.AAE005 != ''
        ) {
          this.canSubmit = true
        } else {
          this.canSubmit = false
        }
      },
      deep: true
    }
  },
  created () {},
  methods: {
    handleStartConfirm (val) {
      let date = this.util.formatDate(val, 'yyyy-MM-dd')
      this.form.AAE030 = date
    },
    openStartPicker () {
      this.$refs.startPicker.open()
    },
    chooseData () {
      this.form[this.selectName] = this.label
      // this.selectName
      this.showCityPicker = false
    },
    // 选择城市
    // openPicker () {
    //   this.$refs.cityPicker.open()
    // },
    openPicker (value) {
      this.selectName = value
      this.showCityPicker = true
      this.chooseArr[0].values = this.selectObject[value]
    },
    chooseCity (val) {
      this.form.address = val.name
    },
    onChooseChange (picker, values) {
      if (values[0] !== undefined) {
        this.label = values[0].label
        this.value = values[0].value
      }
    },
    // 提交
    submit () {
      if (this.canSubmit == false) {
        return false
      }
      // 检验邮箱格式
      if (!this.util.checkMail(this.form.AAE005)) {
        this.$toast('邮箱格式不正确')
        return false
      }
      let params = this.formatSubmitData()
      this.$axios.post(this.epFn.ApiUrl() + '/h5/jy1035/getRecord', params).then(resData => {
        //   成功   1000
        if (resData.enCode == 1000) {
          console.log('返回信息成功', resData)
          this.$router.push({ path: '/legalChangeDetail' })
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
      // 加入用户名和电子社保卡号
      submitForm.AAC003 = this.$store.state.SET_NATIVEMSG.name
      submitForm.AAE135 = this.$store.state.SET_NATIVEMSG.idCard
      // 请求参数封装
      const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader, submitForm, '1035')
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
