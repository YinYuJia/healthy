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
            
            dd.ready({
                    developer: 'daip@dtdream.com',
                    usage: [
                        'dd.biz.user.getUserType', //获取用户类型
                    ],
                    remark: '获取用户登录类型'
                },
                () => {
                    dd.biz.user.getUserType({
                        onSuccess: (data) => {
                            // 如果是0 或者1 那么是个人登录
                            console.log('data',data)
                            
                            if (data.userType == '0' || data.userType == '1') {
                                console.log("个人登录", data);
                                window.location.href = 'https://puser.zjzwfw.gov.cn/sso/mobile.do?action=oauth&scope=1&servicecode=yibaozs&goto=epsoft=1|aga001=' + aga001 + '|userType=' + userType + '|type=' + type + '|identifier=' + identifier
                            } else if (data.userType == '2') {
                                console.log("法人登录", data);
                                // return;
                                 window.location.href = 'https://esso.zjzwfw.gov.cn/opensso/spsaehandler/metaAlias/sp?spappurl=https://ybj.zjzwfw.gov.cn/api/H5/jy2009/info?goto=indexInfoList?epsoft=1&userType=' + userType + '&type=' + type + '&identifier=' + identifier                       
                            }
                        },
                        onFail: (error) => {
                            console.log("data获取用户类型", error)
                        }
                    })
                })
            // return
            if (userType == '2') { // 法人登录
                //    window.location.href = 'https://esso.zjzwfw.gov.cn/opensso/spsaehandler/metaAlias/sp?spappurl=https://ybj.zjzwfw.gov.cn/api/H5/jy2009/info?goto=legalPerson?aga001=' + aga001 + '&userType=' + userType + '&type=' + type + '&identifier=' + identifier                       
            } else { // 个人登录
            }
        }
    }
</script>



