// 中国省市县ArrayData
import ChinaJson from './ChinaArray'
import addressList from './address' //所有地区
import zjAddress from './zjAddress' //浙江地区
import tzAddress from './tzAddress' //台州地区
import excludeZj from './excludeZj' //浙江以外地区
import workYear from './workYear' //工龄
import excludeProvince from './excludeProvince' //排除省本级
import  Vuex from '../../vuex/vuex' 
export default {
    // 登录方法
    login:function(a){
        console.log(a);
    },
    // 公用请求地址

    ApiUrl:function() {
        // return 'http://10.85.159.203:13030' // 吴学文
        console.log('process.env.NODE_ENV',process.env.NODE_ENV)
        if(process.env.NODE_ENV == 'development') {
          // return 'http://47.98.48.185:9000/api'  //服务器185 对应后端203
          return 'http://47.98.234.226:8000/api/api'  //服务器226   对应后端206
          // return 'http://192.168.1.199:13030' //吴学文
          // return 'http://ybj.zjzwfw.gov.cn/api'//正式库地址
        }else{
          return ''
        }
    },
    
    // 公共请求参数封装 nativemsg 原生公共报文头 data 我们要穿的参数  tradeCode 交易号码
    commonRequsetData(nativemsg,data , tradeCode) {
          let commonData = {
            tradeCode:tradeCode,
            data:data,
            ...nativemsg
          }
        return commonData
    },
    setTitle(title){
        dd.ready({
          developer: 'daip@dtdream.com',
          usage: [
            'dd.biz.navigation.setTitle',
          ],
          remark: '描述业务场景'
        }, function() {
          dd.biz.navigation.setTitle({
            title: title,
            onSuccess: function(data) {
            },
            onFail: function(error) {}
        })
        })
    },
    IndexList:function() {
         return {
            "code": 1,
            "data": [
              {
                "name": "办事指南",
                "id": 1,
                "clist": [
                  {
                    "id": 1,
                    "name": "设立依据"
                  },
                  {
                    "id": 2,
                    "name": "受理条件"
                  },
                  {
                    "id": 3,
                    "name": "申请材料"
                  },
                  {
                    "id": 4,
                    "name": "办理流程"
                  },
                  {
                    "id": 5,
                    "name": "办理时限"
                  },
                  {
                    "id": 6,
                    "name": "资讯电话"
                  }
                ]
              },
              {
                "name": "政策解读",
                "id": 2,
                "clist": [
                    {
                        "id": 1,
                        "name": "政策解读1"
                      },
                      {
                        "id": 2,
                        "name": "政策解读2"
                      },
                      {
                        "id": 3,
                        "name": "政策解读3"
                      },
                      {
                        "id": 4,
                        "name": "政策解读4"
                      },
                      {
                        "id": 5,
                        "name": "政策解读5"
                      },
                      {
                        "id": 6,
                        "name": "政策解读6"
                      }
                ]
              },
              {
                "name": "案例分析",
                "id": 3,
                "clist": [
                  {
                    "id": 1,
                    "name": "案例分析1"
                  },
                  {
                    "id": 2,
                    "name": "案例分析2"
                  },
                  {
                    "id": 3,
                    "name": "案例分析3"
                  },
                  {
                    "id": 4,
                    "name": "案例分析4"
                  },
                  {
                    "id": 5,
                    "name": "案例分析5"
                  },
                  {
                    "id": 6,
                    "name": "案例分析6"
                  }
                ]
              },
              {
                "name": "常见问题",
                "id": 4,
                "clist": [
                  {
                    "id": 1,
                    "name": "常见问题1"
                  },
                  {
                    "id": 2,
                    "name": "常见问题2"
                  },
                  {
                    "id": 3,
                    "name": "常见问题3"
                  },
                  {
                    "id": 4,
                    "name": "常见问题4"
                  },
                  {
                    "id": 5,
                    "name": "常见问题5"
                  },
                  {
                    "id": 6,
                    "name": "常见问题6"
                  }
                ]
              }
            ]
          }
 },
    // 中国省市县json转换
    ChinaJsonDatas:function() {
        const dataArray = []
        // 中国省市县json数据
        ChinaJson.map((item,index) => {
           const dataArray2 = []
           item.city.map((item2,index2) => {
             const dataArray3 = []
             item2.area.map((item3,index3) =>{
                 dataArray3.push({
                   label:item3,
                   value:item3
                 })
             })
             dataArray2.push({
               label:item2.name,
               value:item2.name,
               children:dataArray3
             })
           })
           dataArray.push({
             label:item.name,
             value:item.name,
             children:dataArray2
           })
        })
        return dataArray
    },  

    addressList: function(){
      return addressList;
    },
    zjAddress: function(){
      return zjAddress;
    },
    tzAddress: function(){
      return tzAddress;
    },
    excludeZj: function(){
      return excludeZj;
    },
    excludeProvince: function(){
      return excludeProvince;
    },
    workYear: function(){
      return workYear;
    },
}