<template>
  <div class="elseWhereHospital">
    <div class="SearchContent" id="searchContent">
      <div class="SearchBox">
        <svg-icon icon-class="serveComponent_search" />
        <input class="InputContent" v-model="NAME" :placeholder="'查找'">
        <svg-icon class="deleteIcon" @click="deleteSearch()" icon-class="serveComponent_delete"></svg-icon>
        <div class="SearchBtn" @click="search">搜索</div>
      </div>
    </div>
    <div class="content1" :style="{height:height,fontSize:'24px'}">
      <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
        <ul class="ListContent">
          <li class="InfoLine" v-for="(item,index) in List" :key="index">
            <div class="InfoBox">
              <div class="HospitalName">{{item.AKB021}}</div>
              <div class="AddressName">{{item.AAE006||"暂无"}}</div>
                <!-- <div class="Btn2">{{item.AKB100|AKB100()}}</div> -->
            </div>
            <div class="distBox">{{item.JL|ifKL()}}</div>
          </li>
        </ul>
      </mt-loadmore>
      <div class="footer" v-if="isShow">没有更多数据了~</div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        NAME: "",
        List: [],
        smallReimForm: {}, // 零星报销对象
        params: {
          PAGE: 1,
          OUTNUMBER: 15,
          AAA102: "",
        },
        allLoaded: true,
        heightTop: 0,
        height: 0,
        isShow: false,
        lat: "",
        lng: ""
      }
    },
    created() {
      this.epFn.setTitle('定点药店')
      if (this.$route.query.param) {
        console.log("有传过来参数")
        console.log("传参", this.$route.query.param)
        this.lat = this.$route.query.param.lat
        this.lng = this.$route.query.param.lng
        console.log("lat", this.lat)
        console.log("lng", this.lng)
      }
      this.fun();
      this.getList();
    },
    destroyed() {
      window.removeEventListener('popstate', this.back, false); //false阻止默认事件
    },
    methods: {
      deleteSearch() {
        this.NAME = '';
        this.isShow = false
        this.allLoaded = true;
        this.List = [];
        this.params.PAGE = 1;
        this.getList();
        console.log("清空List", this.List)
        // }else{
        //   this.$toast("请输入查询条件")
        // }
      },
      search() {
        // if(this.params.AAA102){
        this.isShow = false
        this.allLoaded = true;
        this.List = [];
        this.params.PAGE = 1;
        this.getList();
        console.log("清空List", this.List)
        // }else{
        //   this.$toast("请输入查询条件")
        // }
      },
      fun() {
        this.height = window.innerHeight + "px";
      },
      // 获取药品列表
      getList() {
        console.log(8888888888)
        // 封装数据
        let params = this.formatSubmitData();
        // 开始请求
        this.$axios.post(this.epFn.ApiUrl() + "/H5/jy9022/getRecord", params).then(resData => {
          console.log("返回成功信息11", resData);
          console.log("返回成功信息", resData.LS_DS);
          //   成功   1000
          if (resData.enCode == 1000) {
            // this.$toast("提交成功");
            if (resData.LS_DS.length > 0) {
              this.List = [...this.List, ...resData.LS_DS];
              // let PAGE = Math.ceil(this.List.length / this.params.OUTNUMBER);
              // //向上取整
              // this.params.PAGE = PAGE;
              // 总页数
              console.log("距离：", this.List)
              if (resData.LS_DS.length == 15) {
                this.params.PAGE += 1;
                this.allLoaded = false;
                sessionStorage.setItem("params", JSON.stringify(this.params));
                // sessionStorage.setItem("pointList", JSON.stringify(this.List));
              } else {
                this.isShow = true
              }
              if (resData.LS_DS.length < 15) {
                this.isShow = true
                this.allLoaded = true;
              }
              sessionStorage.setItem("pointList", JSON.stringify(this.List));
              sessionStorage.setItem("params", JSON.stringify(this.params));
              // sessionStorage.setItem("params", JSON.stringify(this.params));
            } else {
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
      loadBottom() {
        // 加载更多数据
        console.log('加载')
        if (!this.allLoaded) {
          this.getList();
        }
        this.allLoaded = true; // 若数据已全部获取完毕
        this.$refs.loadmore.onBottomLoaded();
      },
      // 搜索
      search() {
        // if(this.params.AAA102){
        this.isShow = false
        this.allLoaded = true;
        this.List = [];
        this.params.PAGE = 1;
        this.getList();
        console.log("清空List", this.List)
        // }else{
        //   this.$toast("请输入查询条件")
        // }
      },
      formatSubmitData() {
        let submitForm = {};
        submitForm.PAGE = this.params.PAGE; //查询页数
        // submitForm.AKA101 = this.params.AKA101; //医疗机构等级
        submitForm.OUTNUMBER = this.params.OUTNUMBER; //每页输出记录条数
        submitForm.JD = this.lng; //经度
        submitForm.WD = this.lat; //纬度
        submitForm.NAME = this.NAME; //医院名称
        // submitForm.AAA102 = this.params.AAA102; //模糊查询
        // submitForm.AAA100 = this.type; //机构参数
        // submitForm.AAE013 = this.AAE013 //关联性类别码
        // submitForm.AAA052 = this.AAA052  //关联性类别值
        // 请求参数封装
        const params = this.epFn.commonRequsetData(
          this.$store.state.SET_NATIVEMSG.PublicHeader,
          submitForm,
          "9022"
        );
        return params;
      },
      open() {
        //     this.allLoaded = true
        //     // this.showSearch = true;
        //     this.params.PAGE = 1
        //     this.getList();
        //     if (window.history && window.history.pushState) {
        //       history.pushState(null, null, document.URL);
        //       window.addEventListener('popstate', this.back, false);//false阻止默认事件
        //     }
      },
      back() {
        this.List = []
        // this.showSearch = false;
      },
      // chooseHospital(item) {
      //     this.List = []
      //     // this.showSearch = false
      //     this.$router.push({
      //     path:"/medicalDetail",//领取就医凭证
      //     query:{
      //         param: item
      //     }
      //   });
      // }
    }
  }
</script>

<style lang="less" scoped>
  .elseWhereHospital {
    // height: 100%;
    background: #FFF;
    padding: 0 .2rem;
    .SearchContent {
      height: 1.18rem; // width: 7.5rem;
      margin-bottom: 0.15rem;
      background: #fff;
      display: flex;
      justify-content: center;
      align-items: flex-end; // position: relative;
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
        .deleteIcon {
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
    .mint-loadmore{
        font-size: .28rem;
    }
    .content1 {
      overflow: auto; // width: 7.5rem;
      height: 100%;
      background: #FFFFFF;
      .ListContent{
        padding: 0 .2rem;
        .InfoLine {
          height: auto;
          display: flex;
          background: #FFF;
          justify-content: space-between;
          border-bottom: .01rem solid #DDDDDD;
          overflow: auto;
          border-bottom: 1px solid #ddd;
          .InfoBox {
            height: 100%;
            width: 6rem;
            .HospitalName {
              margin-top: .2rem;
              font-size: .27rem;
              color: #000000;
              letter-spacing: 0;
              text-align: left;
            }
            .AddressName {
              margin-top: .115rem;
              font-size: .24rem;
              color: #999999;
              letter-spacing: 0;
              text-align: left;
            }
            .Btn {
              float: left;
              height: .4rem;
              line-height: .4rem;
              width: 1.2rem;
              background: #ECFFF1;
              font-size: .24rem;
              color: #26A88F;
              letter-spacing: 0;
              text-align: center;
            }
            .Btn1 {
              float: left;
              margin-left: .1rem;
              height: .4rem;
              line-height: .4rem;
              width: 1.2rem;
              background: #DCEFFF;
              font-size: .24rem;
              color: #1492FF;
              letter-spacing: 0;
              text-align: center;
            }
            .Btn2 {
              float: left;
              margin-left: .1rem;
              height: .4rem;
              line-height: .4rem;
              width: 1.2rem;
              background: #FFF1E2;
              font-size: .24rem;
              color: #FD9933;
              letter-spacing: 0;
              text-align: center;
            }
          }
          .distBox {
            line-height: 1.6rem;
            font-size: .24rem;
            color: #999999;
            letter-spacing: 0;
            text-align: right;
            
          }
        }
        
      }
      .footer {
        border-top: 0.01rem solid #d5d5d5;
        padding: 8px 0;
        background: white;
        font-size: 14px;
        text-align: center;
        font-size: .28rem;
        line-height: .5rem;
        color: #999;
      }
    }
  }
</style>