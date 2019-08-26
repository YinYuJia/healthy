<template>
  <div class="SearchInfoPage" v-if="showSearch">
    <!-- 标题 -->
    <div class="Title" id="title">
        <el-row>
            <el-col :span="6">
                <div class="BackIcon" @click="back()">
                    <svg-icon icon-class="serveComponent_back" />
                    <span>返回</span>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="NameTitle">{{title}}</div>
            </el-col>
            <el-col :span="6">
            </el-col> 
        </el-row>
    </div>
    <div class="SearchContent" id="searchContent">
      <div class="SearchBox">
        <svg-icon icon-class="serveComponent_search"/>
        <input class="InputContent" v-model="params.AAA102" :placeholder="'查找'+title">
        <svg-icon v-if="params.AAA102.length>0" class="deleteIcon" @click="deleteSearch()" icon-class="serveComponent_delete"></svg-icon>
        <div class="SearchBtn" @click="search">搜索</div>
      </div>
    </div>
    <div class="content1" :style="{height:height,fontSize:'16px'}" v-if="jy9015">
        <mt-loadmore
          :bottom-method="loadBottom"
          :bottom-all-loaded="allLoaded"
          ref="loadmore"
        >
          <ul class="ListContent">
            <li
              class="List"
              v-for="(item,index) in List"
              :key="index"
              @click="chooseHospital(item.AAA102,item.AAA103)"
            >{{ item.AAA103 | tooLong}}</li>
          </ul>
        </mt-loadmore>
        <div class="footer" v-if="isShow">没有更多数据了~</div>
    </div>
    <div class="content1" :style="{height:height,fontSize:'16px'}" v-if="bank">
        <mt-loadmore
          :bottom-method="loadBottom"
          :bottom-all-loaded="allLoaded"
          ref="loadmore"
        >
          <ul class="ListContent">
            <li
              class="List"
              v-for="(item,index) in List"
              :key="index"
              @click="chooseHospital(item.BAC048,item.AAE008)"
            >{{ item.BAC048 | tooLong}}</li>
          </ul>
        </mt-loadmore>
        <div class="footer" v-if="isShow">没有更多数据了~</div>
    </div>
    <div class="content1" :style="{height:height,fontSize:'16px'}" v-if="showHospital">
        <mt-loadmore
          :bottom-method="loadBottom"
          :bottom-all-loaded="allLoaded"
          ref="loadmore"
        >
          <ul class="ListContent">
            <li
              class="List"
              v-for="(item,index) in List"
              :key="index"
              @click="chooseHospital(item.AKB020,item.AKB021)"
            >{{ item.AKB021 | tooLong}}</li>
          </ul>
        </mt-loadmore>
        <div class="footer" v-if="isShow">没有更多数据了~</div>
    </div>
  </div>
</template>

<script>
// import { nextTick } from 'q';
export default {
  data() {
    return {
      List: [],
      smallReimForm: {}, // 零星报销对象
      params: {
        pageSize: 15,
        pageNum: "1",
        AAA102: "",
        AAE013: "",
        AAA052: ""
      },
      allLoaded: true,
      showSearch: false,
      heightTop:0,
      height: 0,
      isShow:false,
      showHospital:false
    };
  },
  filters:{
    tooLong: function(val){
      if(val.length>20){
        return val.substring(0,20)+'...';
      }
      return val;
    }
  },
  props: {
    type: {
      type: String,
      default: 'AKB020'
    },
    AAE013: {
      type: String|Number,
      default: ''
    },
    AAA052: {
      type: String|Number,
      default: ''
    },
    title:{
        type: String,
        default: "搜索"
    },
    //获取开户银行  单位新参保的银行列表
    bank:{
        type: Boolean,
        default:false
    },
    //特治特药7211
    jy7211:{
        type: Boolean,
        default:false
    },
    //转外就医7209
    jy7209:{
        type: Boolean,
        default:false
    },
    //出国带药7208
    jy7208:{
        type: Boolean,
        default:false
    },
    //出国带药7208
    jy9015:{
        type: Boolean,
        default:false
    },
    //费用信息查询7603
    jy7603:{
        type: Boolean,
        default:false
    }
  },
  watch:{
    showSearch(){
      if(this.showSearch){
          this.$nextTick(()=>{
            let heightTop =  document.getElementById("searchContent").offsetHeight + document.getElementById("title").offsetHeight
            console.log(heightTop);
            
            this.height = window.innerHeight -heightTop + "px"
          })
      }
    }
  },
  mounted() {
    
    // document.getElementById("SearchContent").offsetHeight
    // document.getElementById("title").offsetHeight
    //如果有保存医院列表就从session里获取，没有就发起请求
    // let List = JSON.parse(sessionStorage.getItem("pointList"));
    // let params = JSON.parse(sessionStorage.getItem("params"));

    // // let start =JSON.parse(sessionStorage.getItem('start'))
    // // console.log("start",start)
    // // console.log("params",params)
    

    // if (List) {
    //   this.List = List;
    //   let pageNum=Math.ceil(this.List.length/params.pageSize);

    //   this.params = params;
    //     if(List[0].pages>pageNum){
    //     this.allLoaded=false
    //     }else{
    //     this.allLoaded=true
    //   }
    // }
    
  },
  created() {
    // this.$nextTick(() => {
    //   document.body.addEventListener('touchmove',function(e){
    //     e.preventDefault(); //阻止默认事件(上下滑动)
    //   })
    // })
  },
  mounted () {
    // document.body.addEventListener('touchmove', function (e) {
    //     e.preventDefault() // 阻止默认的处理方式(阻止下拉滑动的效果)
    // }, {passive: false}) // passive 参数不能省略，用来兼容ios和android
  },
  destroyed(){
    window.removeEventListener('popstate', this.back, false);//false阻止默认事件
  },
  methods: {
    // 获取医院列表
    getList() {
      if(this.bank){
        this.request()//获取开户银行  单位新参保的银行列表
      }else if(this.jy7211){
        this.showHospital=true;
        this.request1();
      }else if (this.jy7209){
        this.showHospital=true;
        this.request1();
      }else if (this.jy7208){
        this.showHospital=true;
        this.request1();
      }else if (this.jy7603){
        //接口未出
      }else if(this.jy9015){
        // 封装数据
        let params = this.formatSubmitData();
        // 开始请求
        this.$axios.post(this.epFn.ApiUrl()+"/h5/jy2001/optionInformationList",params).then(resData => {
            console.log("返回成功信息", resData.LS_DS);
            //   成功   1000
            if (resData.enCode == 1000) {
              
              // this.$toast("提交成功");
              if (resData.LS_DS.length > 0) {
                this.List = [...this.List, ...resData.LS_DS];
                let pageNum = Math.ceil(this.List.length / this.params.pageSize);
                //向上取整
                this.params.pageNum = pageNum;
                // 总页数
                if (resData.pages > pageNum) {
                  this.params.pageNum += 1;
                  this.allLoaded = false;
                  sessionStorage.setItem("params", JSON.stringify(this.params));
                  // sessionStorage.setItem("pointList", JSON.stringify(this.List));
                }else{
                  this.isShow = true
                }
                if(resData.pages<=15){
                  this.isShow = true
                  this.allLoaded = true;
                }
                sessionStorage.setItem("pointList", JSON.stringify(this.List));
                sessionStorage.setItem("params", JSON.stringify(this.params));
                // sessionStorage.setItem("params", JSON.stringify(this.params));
              }else{
                  this.isShow = true
              }
            } else if (resData.enCode == 1001) {
              //   失败  1001
              this.$toast(resData.msg);
              return;
            } else {
              this.$toast("业务出错");
              return;
            }
          });
      }else{
        // 封装数据
        let params = this.formatSubmitData();
        // 开始请求
        this.$axios.post(this.epFn.ApiUrl()+"/h5/jy2001/optionInformationList",params).then(resData => {
            console.log("返回成功信息", resData.LS_DS);
            //   成功   1000
            if (resData.enCode == 1000) {
              
              // this.$toast("提交成功");
              if (resData.LS_DS.length > 0) {
                this.List = [...this.List, ...resData.LS_DS];
                let pageNum = Math.ceil(this.List.length / this.params.pageSize);
                //向上取整
                this.params.pageNum = pageNum;
                // 总页数
                if (resData.pages > pageNum) {
                  this.params.pageNum += 1;
                  this.allLoaded = false;
                  sessionStorage.setItem("params", JSON.stringify(this.params));
                  // sessionStorage.setItem("pointList", JSON.stringify(this.List));
                }else{
                  this.isShow = true
                }
                if(resData.pages<=15){
                  this.isShow = true
                  this.allLoaded = true;
                }
                sessionStorage.setItem("pointList", JSON.stringify(this.List));
                sessionStorage.setItem("params", JSON.stringify(this.params));
                // sessionStorage.setItem("params", JSON.stringify(this.params));
              }else{
                  this.isShow = true
              }
            } else if (resData.enCode == 1001) {
              //   失败  1001
              this.$toast(resData.msg);
              return;
            } else {
              this.$toast("业务出错");
              return;
            }
          });
      }
    },
    request(){
      // 封装数据
      let params = this.formatSubmitData1();
      // 开始请求
      this.$axios.post(this.epFn.ApiUrl()+"/H5/jy9101/9101",params).then(resData => {
          console.log("返回成功信息", resData.LS_DS);
          //   成功   1000
          if (resData.enCode == 1000) {
            
            // this.$toast("提交成功");
            if (resData.LS_DS.length > 0) {
              this.List = [...this.List, ...resData.LS_DS];
              let pageNum = Math.ceil(this.List.length / 20);
              //向上取整
              this.params.pageNum = pageNum;
              // 总页数
              if (resData.SPAGE > pageNum) {
                this.params.pageNum += 1;
                this.allLoaded = false;
                sessionStorage.setItem("params", JSON.stringify(this.params));
                // sessionStorage.setItem("pointList", JSON.stringify(this.List));
              }else{
                this.isShow = true
              }
              if(resData.pages<=20){
                this.isShow = true
                this.allLoaded = true;
              }
              sessionStorage.setItem("pointList", JSON.stringify(this.List));
              sessionStorage.setItem("params", JSON.stringify(this.params));
              // sessionStorage.setItem("params", JSON.stringify(this.params));
            }else{
                this.isShow = true
            }
          } else if (resData.enCode == 1001) {
            //   失败  1001
            this.$toast(resData.msg);
            return;
          } else {
            this.$toast("业务出错");
            return;
          }
        });
    },
    request1(){
      // 封装数据
      let params = this.formatSubmitData2();
      // 开始请求
      this.$axios.post(this.epFn.ApiUrl()+"/H5/jy9021/getRecord",params).then(resData => {
          console.log("返回成功信息1111", resData);
          //   成功   1000
          if (resData.enCode == 1000) {
            
            // this.$toast("提交成功");
            if (resData.LS_DS.length > 0) {
              this.List = [...this.List, ...resData.LS_DS];
              let pageNum = Math.ceil(this.List.length / this.params.pageSize);
              //向上取整
              this.params.pageNum = pageNum;
              // 总页数
              if (resData.SPAGE > pageNum) {
                this.params.pageNum += 1;
                this.allLoaded = false;
                sessionStorage.setItem("params", JSON.stringify(this.params));
                // sessionStorage.setItem("pointList", JSON.stringify(this.List));
              }else{
                this.isShow = true
              }
              if(resData.SCOUNT<=15){
                this.isShow = true
                this.allLoaded = true;
              }
              sessionStorage.setItem("pointList", JSON.stringify(this.List));
              sessionStorage.setItem("params", JSON.stringify(this.params));
              // sessionStorage.setItem("params", JSON.stringify(this.params));
            }else{
                this.isShow = true
            }
          } else if (resData.enCode == 1001) {
            //   失败  1001
            this.$toast(resData.msg);
            return;
          } else {
            this.$toast("业务出错");
            return;
          }
        });
    },
    deleteSearch(){
      this.params.AAA102 = '';
        this.isShow=false
        this.allLoaded = true;
        this.List = [];
        this.params.pageNum = 1;
        this.getList();
    },
    loadBottom() {
        // 加载更多数据
        console.log('加载')
      if (!this.allLoaded) {
            this.getList();
      }
        this.allLoaded = true;// 若数据已全部获取完毕
        this.$refs.loadmore.onBottomLoaded();
        
    },
    // 搜索
    search() {
      // if(this.params.AAA102){
        this.isShow=false
        this.allLoaded = true;
        this.List = [];
        this.params.pageNum = 1;
        this.getList();
      // }else{
      //   this.$toast("请输入查询条件")
      // }
      
    },
    formatSubmitData() {
      let submitForm = {};
      submitForm.AAA102 = this.params.AAA102; //模糊查询
      submitForm.AAA100 = this.type; //机构参数
      submitForm.pageNum = this.params.pageNum; //页码
      submitForm.AAE013 = this.AAE013 //关联性类别码
      submitForm.AAA052 = this.AAA052  //关联性类别值
      // 加入用户名和电子社保卡号
      if (this.$store.state.SET_NATIVEMSG.name !== undefined) {
        submitForm.AAC003 = this.$store.state.SET_NATIVEMSG.name;
        submitForm.AAE135 = this.$store.state.SET_NATIVEMSG.idCard;
      } else {
        this.$toast("未获取到人员基本信息");
      }
      // 请求参数封装
      const params = this.epFn.commonRequsetData(
        this.$store.state.SET_NATIVEMSG.PublicHeader,
        submitForm,
        "2001"
      );
      return params;
    },
    formatSubmitData1() {
      let submitForm = {};
      submitForm.BAC048=this.params.AAA102//模糊查询
      submitForm.OUTNUMBER = '20'; 
      submitForm.PAGE = this.params.pageNum.toString();
      // 请求参数封装
      const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader, submitForm, '9101')
      return params;
    },
    formatSubmitData2() {
      let submitForm = {};
      submitForm.NAME = this.params.AAA102; //查询关键字
      submitForm.OUTNUMBER = 15; //每页输出记录条数
      submitForm.PAGE = this.params.pageNum; //页码
      submitForm.JD = '1'; 
      submitForm.WD = '1'; 
      // 请求参数封装
      const params = this.epFn.commonRequsetData(
        this.$store.state.SET_NATIVEMSG.PublicHeader,
        submitForm,
        "9021"
      );
      return params;
    },
    open(){
      this.allLoaded = true
      this.showSearch = true;
      this.params.pageNum = 1
      this.getList();
      if (window.history && window.history.pushState) {
        history.pushState(null, null, document.URL);
        window.addEventListener('popstate', this.back, false);//false阻止默认事件
      }
    },
    back(){
      this.List = []
      this.showSearch = false;
    },
    chooseHospital(code, name) {
        this.$emit('childrenClick',code,name);
        this.List = []
        this.showSearch = false
    }
  }
};
</script>

<style lang="less" scoped>
.SearchInfoPage {
  background: #FFF;
  z-index: 999;
  position: fixed;
  top: 0;
  height: 100%;
  .Title {
    display: none;
    height: .8rem;
    background-color: white;
    line-height: .8rem;
    .BackIcon{
        display: flex;
        align-items: center;
        color: #1492FF;
        font-size: .32rem;
        .svg-icon{
            height: .5rem;
            width: .5rem;
        }
    }
    .NameTitle {
        color: #000000;
        letter-spacing: 0;
        font-size: .36rem;
    }
}
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
      width: 6.7rem;
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
  .content1{
    overflow: auto;
    // position: fixed;
    // top: 2rem;
    // height: 100%;
    .ListContent {
      width: 7.5rem;
      background: #fff;
      padding: 0 0.37rem;
      .List {
        height: 1.2rem;
        font-size: 0.28rem;
        color: #000;
        letter-spacing: 0;
        line-height: 1.2rem;
        text-align: left;
        border-bottom: 0.01rem solid #d5d5d5;
        &:last-child {
          border-bottom: none;
        }
      }
    }  
  }
  
}
.footer {
  border-top: 0.01rem solid #d5d5d5;
  padding: 8px 0;
  background: white;
  font-size: 14px;
  text-align: center;
}

</style>