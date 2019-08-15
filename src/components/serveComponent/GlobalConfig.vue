<template>
    <div>
        
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        },
        methods: {
            click() {
                this.$router.push("/oldindex?token=1")
            },
        },
        created() {
            // 用户类型
            const userType = this.util.paramStr('userType')
            // 具体功能
            const identifier = this.util.paramStr("identifier");
            // 孙项
            const type = this.util.paramStr("type");
            // 老网报
            const aga001 = this.util.paramStr("aga001");
            console.log('userType-----', userType)
            console.log('identifier-----', identifier)
            console.log('type-----', type)
            console.log('aga001-----', aga001)
            
            // return
            if (userType == '2') {  // 法人登录
               window.location.href = 'https://esso.zjzwfw.gov.cn/opensso/spsaehandler/metaAlias/sp?spappurl=https://ybj.zjzwfw.gov.cn/api/H5/jy2009/info?goto=?epsoft=1&userType=' + userType + '&type=' + type + '&identifier=' + identifier                       
            //    window.location.href = 'https://esso.zjzwfw.gov.cn/opensso/spsaehandler/metaAlias/sp?spappurl=https://ybj.zjzwfw.gov.cn/api/H5/jy2009/info?goto=legalPerson?aga001=' + aga001 + '&userType=' + userType + '&type=' + type + '&identifier=' + identifier                       
            } else {// 个人登录
               window.location.href = 'https://puser.zjzwfw.gov.cn/sso/mobile.do?action=oauth&scope=1&servicecode=yibaozs&goto=epsoft=1|aga001=' + aga001 + '|userType=' + userType + '|type=' + type + '|identifier=' + identifier
            }

        }
    }
</script>



