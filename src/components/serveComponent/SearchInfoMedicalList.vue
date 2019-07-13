<template>
  <div class="SearchInfoPage">
    <!-- 标题 -->

    <div class="SearchContent" id="searchContent">
      <div class="SearchBox">
        <svg-icon icon-class="serveComponent_search"/>
        <input class="InputContent" v-model="NAME" :placeholder="'查找'">
        <svg-icon class="deleteIcon" @click="deleteSearch()" icon-class="serveComponent_delete"></svg-icon>
        <div class="SearchBtn" @click="search">搜索</div>
      </div>
    </div>
    <div class="content1" :style="{height:height,fontSize:'16px'}">
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
              @click="chooseHospital(item)"
            >
              <div class="list-left">
                  <div class="medical-name">{{item.AKA061}}</div>
                  <div class="tag-item">
                    <div class="item-tag green">西药</div>
                    <div class="item-tag blue">{{ item.AKA065}}</div>
                    <div class="item-tag pink" v-if = " item.AKA070 != '无' ">{{ item.AKA070}}</div>
                  </div>
              </div>
              <div class="list-right">
                <svg-icon icon-class="serveComponent_arrowRight"></svg-icon>
              </div>
            </li>
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
      NAME:"",
      smallReimForm: {}, // 零星报销对象
      params: {
        PAGE: 1,
        OUTNUMBER:15,
        AAA102: "",
      },
      allLoaded: true,
      heightTop:0,
      height: 0,
      isShow:false,
      lat:"",
      lng:""
    };
  },
  filters:{
    // tooLong: function(val){
    //   if(val.length>20){
    //     return val.substring(0,20)+'...';
    //   }
    //   return val;
    // }
  },
  props: {
    title:{
        type: String,
        default: "搜索"
    },
    JD:{
      type:String,
      default: ''
    },
    WD:{
      type:String,
      default: ''
    }
  },
  watch:{
    // showSearch(){
    //   if(this.showSearch){
    //       this.$nextTick(()=>{
    //         let heightTop =  document.getElementById("searchContent").offsetHeight + document.getElementById("title").offsetHeight
    //         console.log(heightTop);
            
    //         this.height = window.innerHeight -heightTop + "px"
    //       })
    //   }
    // }
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
      this.epFn.setTitle('药品目录')
      this.fun();
      this.getList();

    // this.$nextTick(() => {
    //   document.body.addEventListener('touchmove',function(e){
    //     e.preventDefault(); //阻止默认事件(上下滑动)
    //   })\
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
    fun(){
      this.height = window.innerHeight+"px";
    },
    // 获取药品列表
    getList() {
      console.log(8888888888)
      // 封装数据
      let params = this.formatSubmitData();
      // 开始请求
      this.$axios.post(this.epFn.ApiUrl()+"/H5/jy9023/drugCatalogueEnquiry",params).then(resData => {
          console.log("返回成功信息11", resData);          
          console.log("返回成功信息", resData.LS_DS);
          //   成功   1000
          if (resData.enCode == 1000) {
            
            // this.$toast("提交成功");
            if (resData.LS_DS.length > 0) {
              this.List = [...this.List, ...resData.LS_DS];
              let PAGE = Math.ceil(this.List.length / this.params.OUTNUMBER);
              //向上取整
              this.params.PAGE = PAGE;
              // 总页数
              if (resData.SPAGE > PAGE) {
                this.params.PAGE += 1;
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
      this.NAME = '';
              this.isShow=false
        this.allLoaded = true;
        this.List = [];
        this.params.PAGE = 1;
        this.getList();
        console.log("清空List",this.List)
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
        this.params.PAGE = 1;
        this.getList();
        console.log("清空List",this.List)
      // }else{
      //   this.$toast("请输入查询条件")
      // }
      
    },
    formatSubmitData() {
      let submitForm = {}; 
      submitForm.PAGE = this.params.PAGE; //查询页数
      submitForm.AKA101 = this.params.AKA101; //医疗机构等级
      submitForm.OUTNUMBER = this.params.OUTNUMBER; //每页输出记录条数
      submitForm.NAME = this.NAME; //医院名称
      console.log('---submitForm.NAME---',submitForm.NAME)
      // submitForm.AAA102 = this.params.AAA102; //模糊查询
      // submitForm.AAA100 = this.type; //机构参数
      // submitForm.AAE013 = this.AAE013 //关联性类别码
      // submitForm.AAA052 = this.AAA052  //关联性类别值
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
        "9023"
      );
      return params;
    },
    open(){
  //     this.allLoaded = true
  //     // this.showSearch = true;
  //     this.params.PAGE = 1
  //     this.getList();
  //     if (window.history && window.history.pushState) {
  //       history.pushState(null, null, document.URL);
  //       window.addEventListener('popstate', this.back, false);//false阻止默认事件
  //     }
    },
    back(){
      this.List = []
      // this.showSearch = false;
    },
    chooseHospital(item) {
        this.List = []
        // this.showSearch = false
        this.$router.push({
        path:"/medicalDetail",//领取就医凭证
        query:{
            param: item
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.SearchInfoPage {
  background: #FFF;
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
    width: 7.5rem;
    height: 100%;
    background: #FFFFFF;
    // position: fixed;
    // top: 2rem;
    // height: 100%;
    .ListContent {
      width:100%;
      height:100%;
      background: #fff;
      padding: 0 0.2rem;
      .List {
        display: flex;
        justify-content: space-between;
        width: 7.1rem;
        height: 100%;
        line-height: 1.2rem;
        font-size: 0.28rem;
        color: #000;
        letter-spacing: 0;
        line-height: 1.2rem;
        text-align: left;
        align-items: center;
        padding:0 .2rem;
        border-bottom: 1px solid #ddd; 
        &:last-child {
          border-bottom: none;
        }
        .list-left{
          display: flex;
          flex-direction: column;
          width: 100%;
          .tag-item{
            padding-top: .12rem;
            display: flex;
            height: .4rem;
            line-height: .4rem; 
            .item-tag{
            
            height: .4rem;
            }
            .green{
              width: 1.2rem;
              text-align: center;

              font-family: FZLTXHKM;
              background: #ECFFF1;
              font-size: .24rem;
              color: #26A88F;
              letter-spacing: 0;
              text-align: center;
            }
            .blue{
              width: 1.2rem;
              margin-left: .15rem;
              text-align: center;
              font-family: FZLTXHKM;
              background: #DCEFFF;
              font-size: .24rem;
              color: #1492FF;
              letter-spacing: 0;
              text-align: center;
            }
            .pink{
              width: 1.8rem;
              margin-left: .15rem;
              text-align: center;
              font-family: FZLTXHKM;
              background: #FFF1E2;
              font-size: .24rem;
              color: #FD9933;
              letter-spacing: 0;
              text-align: center;
            }
          }
          .medical-name{
            width: 100%;
            height: .37rem;
            line-height: .37rem;
            font-family: MicrosoftYaHei;
            font-size: .28rem;
            color: #000000;
            letter-spacing: 0;
          }
        }
        .list-right{
            width: 100%;
            height: 100%;
            text-align: right;
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