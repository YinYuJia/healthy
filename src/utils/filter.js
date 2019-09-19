export function tuoMin(str, front, back) {
    if (typeof str == 'string') { //参数为字符串类型
        if (str.length == 3) {
            let t = "************************"
            let ruten = str.substr(front, (str.length - front - back)); //提取字符串下标之间的字符。
            console.log('ruten',ruten)
            return str.replace(ruten, t.substr(0,  1 ))
        }
        else if ( str.length == 2) {
            let t = "************************"
            let ruten = str.substr(0,1); //提取字符串下标之间的字符。
            console.log('ruten2',ruten)
            return str.replace(ruten, t.substr(0, ruten.length < 3 ? 1 : ruten.length))
        }else{
            let t = "************************"
            let ruten = str.substr(front, (str.length - front - back)); //提取字符串下标之间的字符。
            return str.replace(ruten, t.substr(0, ruten.length < 3 ? 3 : ruten.length)); //字符串中用字符替换另外字符，或替换一个与正则表达式匹配的子串。
        }

    }
    return str;
}

// 绑定关系
export function relationship(val) {
    let obj = {
      "1": "配偶",
      "2": "子女",
      "5": "父母"
    }
    return obj[val]
  }

// 是否邮寄
export function isMail(val) {
    let obj = {
      "1": "自取",
      "2": "邮寄"
    }
    return obj[val]
  }

  // 项目类型
export function projectType(val) {
  let obj = {
    "1": "药品",
    "2": "诊疗"
  }
  return obj[val]
}

// 用药时期
export function medicationDate(val) {
  let obj = {
    "0": "其它",
    "1": "治疗期",
    "2": "维护期",
    "3": "住院期",
  }
  return obj[val]
}

// 特药特质类型
export function specialType(val) {
  let obj = {
    "24": "高强度超声聚焦刀治疗",
    "23": "太空仓全身红外热疗",
    "22": "89锶-骨转移治疗",
    "16": "盐酸埃克替尼片",
    "15": "金黄色葡萄球菌滤液制剂",
    "14": "聚肌胞",
    "13": "胸腺肽",
    "28": "特殊康复",
    "12": "聚乙二醇干扰素",
    "21": "催眠治疗"
  }
  return obj[val]
}

// 特药特质类型 AKC030 
export function AKC030 (val) {
  let obj = {
    "1": "退休异地安置",
    "2": "在职驻外工作",
    "3": "异地探亲",
    "4": "异地生育",
    "5": "子女统筹异地学习/抚养"
  }
  return obj[val]
}
// 就诊疗程 BKE255
export function medicaladvice (val) {
  let obj = {
    "1": "初诊",
    "2": "复诊",
  }
  return obj[val]
}

// 报销状态
export function BKE586 (val) {
  let obj = {
    "0": "无记录",
    "1": "有记录未报销",
    "2": "报销中",
    "3": "已报销",
    "9": "已作废",
  }
  return obj[val]
}

// 备案信息来源字典
export function BKE520( val ) {
  let obj = {
    // "0": "中心备案",
    "1": "掌上",
    "2": "网上",
    "3": "柜面",
    undefined: "暂无"
  }
  return obj[val]
 }
 //异地定点医院医疗机构等级
 export function level( val ) {
  let obj = {
    "X": "社区",
    "0": "未定",
    "1": "一级",
    "2": "二级",
    "3": "三级",
    undefined: "暂无"
  }
  return obj[val]
 }
 //医院等级
 export function AKB100( val ) {
  let obj = {
    "9": "其他",
    "0": "特等",
    "1": "甲等",
    "2": "乙等",
    "3": "丙等",
  }
  return obj[val]
 }
 //医院是否异地
 export function BKB024( val ) {
  let obj = {
    "0": "",
    "1": "异地就医",
  }
  return obj[val]
 }
 //权力事项类型
 export function matType( val ) {
  let obj = {
    "01": "行政许可",
    "03": "行政处罚",
    "04": "行政强制",
    "05": "行政征收",
    "06": "行政给付",
    "07": "行政裁决",
    "08": "行政确认",
    "09": "行政奖励",
    "10": "其他行政权力",
    "13": "审核转报",
    "14": "公共服务",
    "15": "内部管理",
    "16": "联办事项",
  }
  return obj[val]
 }
  //权力来源
  export function rightSource( val ) {
    let obj = {
      "1": "法定本级行使",
      "2": "中央下放到省级",
      "3": "省级下放到设区市",
      "4": "省级下放到县(市、区)",
      "5": "设市区下放到县(市、区)",
      "6": "中央下放到设市区",
      "7": "中央下放到县(市、区)",
    }
    return obj[val]
   }
  //办件类型
  export function rightAttribute( val ) {
    let obj = {
      "1": "即办件",
      "2": "承诺件",
      "3": "其他",
    }
    return obj[val]
   }
 //距离
 export function ifKL( val ) {
     if ( val < 1) {
       return Math.floor(val * 1000) + 'm'
     }else{
      return Math.floor(val * 100) / 100 + "km"
     }
 }
//特治特药康复疗程
export function BKE239( val ) {
      let obj = {
        "0": "第一疗程",
        "1": "第二疗程",
      }
      return obj[val]
}
//缴费年限核定用户性别
export function AAC004( val ) {
  let obj = {
    "女": "女士",
    "男": "先生",
  }
  return obj[val]
}
//缴费年限核定用户性别
export function BKE810( val ) {
  let obj = {
    "0": "否",
    "1": "因病",
    "2": "特殊工种",
    "3": "符合公务员法",
    "4": "符合浙委办",
  }
  return obj[val]
}
//缴费年限核定用户性别
export function AKC423( val ) {
  let obj = {
    "0": "无",
    "1": "劳教",
    "2": "劳改",
    "3": "开除",
    "4": "除名",
    "5": "自动离职",
    "6": "辞职",
    "7": "长病假",
  }
  return obj[val]
}
//零星报销邮寄方式
export function BKE200( val ) {
  let obj = {
    "1": "邮寄",
    "2": "自送",
  }
  return obj[val]
}

/*退休类别过滤*/
export function trtireType(value) {
  let str = "";
  switch (parseInt(value)) {
    case 0:
      str = "否";
      break;  

    case 1:
      str = "因病";
      break;

    case 3:
      str = "特殊工种";
      break;

    case 4:
      str = "符合浙委办[2009]14号";
      break;

    case 5:
      str = "其他";
      break;

    case 6:
      str = "浙政发[2015]37号";
      break;

      
    default:
      break;
  }
  return str;
}
//平产AMC029 生育类型
export function AMC029( val ) {
  let obj = {
    "01": "平产、顺产",
    "02": "助娩产",
    "03": "剖宫产",
    "04": "三个月以下流产",
    "05": "三个月以上四个月以下流产",
    "06": "满四个月流产",
    "11": "放置宫内节育器",
    "12": "取出宫内节育器",
    "13": "人工流产",
    "14": "中期终止妊娠",
    "15": "单纯输卵管结扎",
    "16": "产后输卵管结扎",
    "17": "人工流产同时放置宫内节育器",
    "18": "中期终止妊娠同时放置宫内节育器",
    "19": "人工流产同时输卵管结扎",
    "20": "中期终止妊娠同时输卵管结扎",
    "21": "人工流产同时取出宫内节育器",
    "22": "中期终止妊娠同时取出宫内节育器",
    "23": "输精管结扎"
  }
  return obj[val]
}
//AMC099 生育分类
export function AMC099( val ) {
  let obj = {
    "1": "生育",
    "2": "计划内流产",
    "3": "计划外流产",
    "4": "节育、复通"
  }
  return obj[val]
}

//平产AMC027 是否晚育
export function AMC027( val ) {
  let obj = {
    "0": "否",
    "1": "是",
  }
  return obj[val]
}

//AAC009户籍类型
export function AAC009( val ) {
  let obj = {
    "1": "城镇（非农业户口）",
    "2": "农村（农业户口）",
    "3": "其他",
  }
  return obj[val]
}

//ACC002医保类型
export function ACC002( val ) {
  let obj = {
    "1": "职工医保",
    "2": "居民医保",
    "5": "其他",
  }
  return obj[val]
}