<template>
    <div class="natureApprovalSupplement">

    </div>
</template>

<script>
export default {
    data () {
        return {
            
        }
    },
    methods: {
        submit(){
            // 封装数据
            let params = this.formatSubmitData();
            // 开始请求
            console.log('parmas------',params)
            this.$axios.post(this.epFn.ApiUrl() + '/h5/jy7212/getRecord', params).then((resData) => {
                console.log('返回成功信息',resData)
                   //   成功   1000
                if ( resData.enCode == 1000 ) {
                    this.epFn.setSession('NATURE_BKZ019',resData.BKZ019)
                    this.$refs.success.open();
                    console.log("form",this.form)
                }else if (resData.enCode == 1001 ) {
                //   失败  1001
                    this.$message({
                        message: resData.msg,
                        type: 'warning'
                    });
                    return;
                }else{
                    this.$message({
                        message: '业务出错',
                        type: 'warning'
                    });
                    return;
                }
            });
        },
        formatSubmitData(){
            let submitForm ={};
            if(this.form.AMC029=='01'){
                submitForm.AGA002 ='给付-00142-001-01'//平产
            }else if(this.form.AMC029=='02'){
                submitForm.AGA002 = '给付-00142-001-02'//剖宫产
            }else if(this.form.AMC029=='03'){
                submitForm.AGA002 = '给付-00142-001-03'//助娩产
            }
            // submitForm.AGA002 =  "330600007019";
            //从进度查询页面进入接收传参
            if(this.$route.query.param){
                submitForm.lx="1";
                submitForm.BKZ019=this.$route.query.param||"";
            }else{
                submitForm.lx="2";
                submitForm.BKZ019="";
            }
            let legalPerson=JSON.parse(sessionStorage.getItem("LegalPerson"))
            submitForm.AAC002 = form.AAE135//被操作人员身份证号
            submitForm.AAC004 = form.AAC004//性别
            submitForm.AAC006 = form.AAC006//出生日期
            submitForm.BMC061 = form.BMC061//生育类别 0生育女职工,1男职工配偶
            submitForm.BMC131 = form.BMC131//生育日期
            submitForm.AMC029 = form.AMC029//生育类别 01平产、02助娩产、03剖宫产
            submitForm.AMC028 = form.AMC028//胎儿数
            submitForm.AMC031 = form.AMC031//胎次
            submitForm.BMC046 = form.BMC046//其中死胎
            submitForm.BMC211 = form.BMC211//实际发生费用
            submitForm.BMC033 = form.BMC033//实际住院天数
            submitForm.AMC027 = form.AMC027//晚育标志 0否1是
            submitForm.BMC035 = form.BMC035//准生证号
            submitForm.AMC022 = form.AMC022//出生证编号
            submitForm.BMC065 = form.BMC065//医疗机构
            submitForm.AAE135 = legalPerson.attnIDNo;//经办人证件号码
            submitForm.AAE011 = legalPerson.attnName
            submitForm.AAB301 = legalPerson.xzqh
            submitForm.userId = legalPerson.userId
            
            
            submitForm.BKE520 = '1'//申请渠道
            submitForm.applicationFormUrl = this.epFn.getSession('NATURE_applicationFormIdUrl')[0]//申请表
            submitForm.medicalUrl =this.epFn.getSession('NATURE_medicalIdUrl')[0]//证明
            // 请求参数封装
            const params = this.epFn.commonRequsetData(submitForm,"7212");

            return params;
        },
    }    
}

</script>
<style lang="less" scoped>

</style>