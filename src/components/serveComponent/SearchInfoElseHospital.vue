<template>
  <div class="elseWhereHospital">
    <div class="SearchContent" id="searchContent">
      <div class="SearchBox">
        <svg-icon icon-class="serveComponent_search" />
        <input class="InputContent" v-model="NAME" :placeholder="'查找'">
        <svg-icon class="deleteIcon" @click="deleteSearch()" icon-class="serveComponent_delete" v-if="NAME"></svg-icon>
        <div class="SearchBtn" @click="search">搜索</div>
      </div>
    </div>
    <div class="IndexMenu"  id="titleContent">
      <div class="MenuLine">
          <div class="MenuCell" @click="changeIndex(1)" :class="{'active': activeIndex == 1}">距离优先</div>
          <div class="MenuCell" @click="changeIndex(2)" :class="{'active': activeIndex == 2}">异地优先</div>
          <div class="MenuCell" @click="changeIndex(3)" :class="{'active': activeIndex == 3}">等级优先</div>
      </div>
    </div>
    <div class="content1" :style="{height:height,fontSize:'16px'}">
      <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
        <ul class="ListContent">
          <li class="InfoLine" v-for="(item,index) in List" :key="index">
            <div class="InfoBox">
              <div class="HospitalName">{{item.AKB021}}</div>
              <div class="AddressName">{{item.AAE006||"暂无"}}</div>
              <div>
                <div class="Btn">{{item.AKA101|level()}}</div>
                <div class="Btn1" v-if="item.BKB024 == '1'">{{item.BKB024|BKB024()}}</div>
                <!-- <div class="Btn2">{{item.AKB100|AKB100()}}</div> -->
              </div>
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
        lng: "",
        activeIndex:1,
        orderParam: '1',//排序参数
        orderType: '1'
      }
    },
    created() {
      this.epFn.setTitle('定点医院')
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
      changeIndex(index){
        this.params.PAGE = 1;
        this.List = []
        this.activeIndex = index;
        if(index == '1') {
          this.orderParam = '1'
          this.orderType = '1'
        } else if (index == '2') {
          this.orderParam = '3'
          this.orderType = '2'
        } else if (index == '3') {
          this.orderParam = '2'
          this.orderType = '2'
        }
        this.getList()
      },
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
        // 封装数据
        let params = this.formatSubmitData();
        console.log('8888888888',params)
        // 开始请求
        this.$axios.post(this.epFn.ApiUrl() + "/H5/jy9110/getRecord", params).then(resData => {
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
              } else {
                this.isShow = true
              }
              if (resData.SCOUNT <= 15) {
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
        submitForm.AKA101 = this.params.AKA101; //医疗机构等级
        submitForm.OUTNUMBER = this.params.OUTNUMBER; //每页输出记录条数
        submitForm.JD = this.lng; //经度
        submitForm.WD = this.lat; //纬度
        submitForm.NAME = this.NAME; //医院名称
        submitForm.orderParam = this.orderParam;// 排序参数
        submitForm.orderType = this.orderType
        // submitForm.AAA102 = this.params.AAA102; //模糊查询
        // submitForm.AAA100 = this.type; //机构参数
        // submitForm.AAE013 = this.AAE013 //关联性类别码
        // submitForm.AAA052 = this.AAA052  //关联性类别值
        // 请求参数封装
        const params = this.epFn.commonRequsetData(
          this.$store.state.SET_NATIVEMSG.PublicHeader,
          submitForm,
          "9110"
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
    .IndexMenu {
        height: 1.2rem;
        width: 100%;
        background: #FFF;
        display: flex;
        align-items: center;
        justify-content: center;
        .MenuLine {
            height: .62rem;
            width: 95%;
            background: #FFFFFF;
            border-radius: .05rem;
            display: flex;
            .MenuCell {
                line-height: .62rem;
                width: 100%;
                color: #1492FF;
                text-align: center;
                letter-spacing: 0;
                font-size: .28rem;
                border-right: 1px solid #1492FF;
                border-top: 1px solid #1492FF;
                border-bottom: 1px solid #1492FF;
                &:first-child {
                    border-top-left-radius: .05rem;
                    border-bottom-left-radius: .05rem;
                    border: 1px solid #1492FF;
                }
                &:last-child {
                    border-top-right-radius: .05rem;
                    border-bottom-right-radius: .05rem;
                    border-right: none;
                    border-right: 1px solid #1492FF;
                }
            }
            .active {
                color: #FFF;
                background: #1492FF;
            }
        }
    }
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
    .content1 {
      overflow: auto; // width: 7.5rem;
      height: 100%;
      background: #FFFFFF;
      .ListContent{
        padding: 0 .2rem;
        .InfoLine {
          height: 1.7rem;
          display: flex;
          background: #FFF;
          justify-content: space-between;
          border-bottom: .01rem solid #DDDDDD;
          overflow: auto;
          border-bottom: 1px solid #ddd;
          .InfoBox {
            height: 100%;
            width: 6rem;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            justify-content: space-around;
            .HospitalName {
              font-size: .28rem;
              color: #000000;
              letter-spacing: 0;
              text-align: left;
            }
            .AddressName {
              font-size: .24rem;
              color: #999999;
              letter-spacing: 0;
              text-align: left;
            }
            .Btn {
              float: left;
              height: .24rem;
              line-height: .24rem;
              width: 1.2rem;
              background: #DCEFFF;
              font-size: .24rem;
              font-family: FZLTXHKM;
              color: #1492FF;
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
              font-family: FZLTXHKM;
              font-size: .24rem;
              color:  #26A88F;
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
      }
    }
  }
</style>