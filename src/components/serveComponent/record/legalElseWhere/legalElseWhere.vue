<template>
	<div class="legalElseWhere">
		<!-- 离开日期 -->
		<mt-datetime-picker
            type="date"
            ref="startPicker"
            :startDate="startDate"
            v-model="dateVal"
            @confirm="handleStartConfirm">
        </mt-datetime-picker>
    <!--回来日期-->
    <mt-datetime-picker
      type="date"
      ref="endPicker"
      :startDate="startDate"
      v-model="dateVal"
      @confirm="handleEndConfirm">
    </mt-datetime-picker>
    <!--前往城市-->
    <SelectCity
      :type="2"
      ref="cityPicker"
      :jy7206="true"
      @confirm="chooseCity"
    >
    </SelectCity>
    <!--申请原因-->
    <SelectCity
      :type="1"
      ref="reasonPicker"
      :propArr="reportReason"
      @confirm="handleReasonConfirm"
    >
    </SelectCity>
		<div class="Content">
			<!-- 搜索框 -->
			<div class="SearchContent" id="searchContent">
				<div class="SearchBox">
					<svg-icon icon-class="serveComponent_search" />
					<input v-model="searchWord" class="InputContent"  :placeholder="'请输入身份证号'" />
					<svg-icon class="deleteIcon" icon-class="serveComponent_delete" @click="clear"></svg-icon>
					<div class="SearchBtn" @click="search">搜索</div>
				</div>
			</div>
			<!-- 用户基本信息 -->
			<div class="userBaseInfo" v-if="messageVisible == true">
                <div class="infoBox">
                    <svg-icon icon-class="payLimit_bg"/>
                    <div class="infoName">
                        <span class="name">张乐军</span>
                        <span class="sex">/先生</span>
                    </div>
                    <div class="infoAddress">
                        <div class="IconImg">
                            <svg-icon icon-class="payLimit_compony"/>
                        </div>
                        <span>浙江网新恩普有限公司</span>
                    </div>
                    <div class="infoAddress">
                        <div class="IconImg">
                            <svg-icon icon-class="serveComponent_birthday"/>
                        </div>
                        <span>1994-10-16</span>
                    </div>
                </div>
            </div>
			<!-- 填写信息 -->
			<div class="ReportInfo" v-if="messageVisible == true">
                <div class="InfoLine">
                    <div class="InfoName"><span>参保地</span></div>
                    <div class="InfoText">
                        <input  type="text" v-model="AAB301000" placeholder="请选择" readonly>
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>离开日期</span></div>
                    <div class="InfoText">
                        <input @click="openStartPicker" type="text" v-model="form.AAE030" placeholder="请选择" readonly><svg-icon icon-class="serveComponent_arrowRight"></svg-icon>
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>回来日期</span></div>
                    <div class="InfoText">
                        <input @click="openEndPicker" type="text" v-model="form.AAE031" placeholder="请选择" readonly><svg-icon icon-class="serveComponent_arrowRight"></svg-icon>
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>前往城市</span></div>
                    <div class="InfoText">
                        <input @click="openCityPicker" type="text" v-model="AAS011000" placeholder="请选择" readonly><svg-icon icon-class="serveComponent_arrowRight"></svg-icon>
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>详细地址</span></div>
                    <div class="InfoText">
                        <textarea v-model="form.AAE006" placeholder="请输入"></textarea>
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>申请原因</span></div>
                    <div class="InfoText">
                        <input @click="openReasonPicker()" type="text" v-model="AKC030VALUE" placeholder="请选择" readonly><svg-icon icon-class="serveComponent_arrowRight"></svg-icon>
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>联系人</span></div>
                    <div class="InfoText"><input type="text" v-model="form.AAE004" placeholder="请输入"></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>联系电话</span></div>
                    <div class="InfoText"><input type="tel" maxlength="11" v-model="form.AAE005" placeholder="请输入"></div>
                </div>
            </div>
		</div>
    <!-- 按钮 -->
        <Footer v-if="messageVisible == true" :canSubmit='canSubmit' @submit="submit()"></Footer>
	</div>
</template>

<script>
export default {
  watch: {
    form: {
      handler: function(val) {
        // 判断不为空
        if (val.AAE030 != '' && val.AAE031 != '' && val.AAS011 != ''
          && val.AAE011 != '' && val.AAE006 != ''
          && val.AKC030 != '' && val.AAE004 != '' && val.AAE005 != ''
          && val.AAS301 != '' && val.AAB301 != '') {
          this.canSubmit = true;
        } else {
          this.canSubmit = false;
        }
        // 判断时间间隔
        if (val.AAE030 != '' && val.AAE031 != '') {
          let AAE030 = new Date(val.AAE030);
          let AAE031 = new Date(val.AAE031);
          let month = 24 * 3600 * 1000 * 30;
          let gap = AAE031 - AAE030;
          if (gap < month) {
            this.$toast('备案时间至少一个月且不能小于拟离杭日期');
            this.form.AAE031 = '';
          }
        }
        if(val.AAE005.length>11){
          this.$toast('手机号码不能超过11位');
        }
        // 判断转入转出地
        if (val.AAE011 != '' && val.AAB301 != '') {
          if(val.AAE011==val.AAB301){
            this.$toast('申请地市不能与参保地相同');
            this.AAS011000 = '';
            this.form.AAS011="";
            this.form.AAE011="";
            this.form.AAQ011="";
          }
        }
      },
      deep: true
    },
  },
	data() {
		return{
      messageVisible: false,
		  searchWord: '',
      AAB301000: '',// 参保地，
      AAS011000: '',// 前往城市
      AKC030VALUE: '',// 申请原因
      form: {
                AAE030: '', //离杭日期
                AAE031: '', //回杭日期
                AAS011: '', //前往城市省
                AAE011: '', //前往城市市
                AAQ011: '', //前往城市地区
                AAE004: '', //联系人
                AKC030: '', //申请原因
                AAE006: '', //详细地址
                AAE005: '', //联系电话
                AAB301: '',//参保地市
                AAS301: '',//参保地省
			},
			startDate: new Date(),
      dateVal: new Date(),
      canSubmit: false,
      reportReason: [{
        value: '1',
        label: '退休异地安置'
      },
        {
          value: '2',
          label: '在职驻外工作学习'
        },
        {
          value: '3',
          label: '异地探亲'
        },
        {
          value: '4',
          label: '异地生育'
        },
        {
          value: '5',
          label: '子女统筹异地学习/抚养'
        },
      ],
		}
	},
	methods: {
    //清空搜索框
    clear() {
      this.searchWord = ''
    },
    // 搜素
    search(item) {
      console.log(item)
    },
    // 提交
    submit() {
      this.$router.push({path: '/legalElseDetail'})
    },
		// 选择离开日期
		openStartPicker(){
            this.$refs.startPicker.open();
        },
        handleStartConfirm(val){
            let date = this.util.formatDate(val,'yyyy-MM-dd');
            console.log("data",date)
            this.form.AAE030 = date;
          this.$refs.startPicker.close();
        },
    //选择回来日期
    openEndPicker(){
      this.$refs.endPicker.open();
    },
    handleEndConfirm(val){
      let date = this.util.formatDate(val,'yyyy-MM-dd');
      console.log("data2",date)
      this.form.AAE031 = date;
      this.$refs.endPicker.close();
    },
    openCityPicker(e) {
      this.$refs.cityPicker.open();
    },
    openReasonPicker(e) {
      this.$refs.reasonPicker.open();
    },
    chooseCity(val){
      this.AAS011000= val.name;
      this.form.AAS011=val.code[0]
      this.form.AAE011=val.code[1]
      this.form.AAQ011=val.code[2]
      console.log("9999",val)
    },
    handleReasonConfirm(val){
      console.log(val);
      this.form.AKC030 = val.value;
      this.AKC030VALUE = val.label;
    },
	}
};
</script>

<style lang="less" scoped>
.legalElseWhere{
	.Content{
		height: 100%;
        margin-bottom: 1.4rem;
        .SearchContent {
                height: 1.18rem;
                width: 7.5rem;
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
                  cursor: pointer;
                  z-index: 99;
                }
            }
		}
		// 用户基本信息
		.userBaseInfo{
            margin-top: .15rem;
            height: 3rem;
            width: 7.5rem;
            background: #fff;
            display: flex;
            justify-content: center;
            align-items: flex-end;
            position: relative;
            z-index: -2;
            .infoBox{
                font-size: .3rem;
                position: relative;
                height: 100%;
                width: 7rem;
                padding: 0 .15rem;
                color: #ffffff;
                border-radius: 0.05rem;
                display: flex;
                flex-direction: column;
                // align-items: left;
                .svg-icon{
                    display: block;
                    width:100%;
                    height: 100%;
                    position: absolute;
                    left:0;
                    z-index: -1;
                }
                .infoName{
                    width: 5rem;
                    height: .5rem;
                    text-align: left;
                    margin-top: .35rem;
                    margin-left: .2rem;
                    .name{
                        font-size: .4rem;
                    }
                    .sex{
                        font-size: .24rem;
                    }
                }
                .infoAddress{
                    margin-top: .2rem;
                    width: 5rem;
                    text-align: left;
                    padding-left: .3rem;
                    span{
                        line-height:.4rem;
                        height: .4rem;
                        font-size: .24rem;
                    }
                    .IconImg{
                        width: .4rem;
                        height: .4rem;
                        display: inline-block;

                        .svg-icon{
                            padding-left: .3rem;
                            display:block;
                            width: .4rem;
                            height: .4rem;

                        }
                    }
                }
                .infoMessage{
                    display: flex;
                    justify-content: space-around;
                    height: 1.8rem;
                    .birth{
                        display: flex;
                        flex-direction: column;
                        .infoMessageBirth{
                            height: .8rem;
                            line-height: .8rem;
                        }
                        .infoMessageText{
                            font-size: .24rem;
                        }
                    }
                    .work{
                        .infoMessageWork{
                            height: .8rem;
                            line-height: .8rem;
                        }
                        .infoMessageText{
                            font-size: .24rem;
                        }
                    }
                }
            }
		}
		// 填写信息
		.ReportInfo {
            height: 10rem;
            width: 100%;
            padding: 0 .3rem;
            background: white;
            .InfoLine {
                height: 1.2rem;
                position: relative;
                font-size: .28rem;
                display: flex;
                justify-content: space-between;
                border-bottom: .01rem solid #D5D5D5;
                .InfoName {
                    line-height: 1.2rem;
                    span {
                        height: .6rem;
                        line-height: .6rem;
                        color: #000000;
                        letter-spacing: 0;
                    }
                }
                .InfoText {
                    line-height: 1.2rem;
                    display: flex;
                    position: relative;
                    align-items: center;
                    input {
                        width: 4rem;
                        height: .6rem;
                        font-size: .28rem;
                        color: #000000;
                        letter-spacing: 0;
                        text-align: right;
                        border: none;
                    }
                }
                &:nth-child(5) {
                    height: 1.6rem;
                    textarea {
                        height: .84rem;
                        width: 4rem;
                        padding: 0;
                        font-size: .28rem;
                        color: #000000;
                        line-height: .42rem;
                        text-align: right;
                    }
                }
                &:last-child {
                    border-bottom: none;
                }
            }
        }
	}
}
</style>
