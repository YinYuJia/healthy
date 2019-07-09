<template>
	<div class="elseWhereHospital">
		<div class="InfoLine" v-for="(item,index) in List" :key="index">
			<div class="InfoBox">
				<div class="HospitalName">{{item.hospital}}</div>
				<div class="AddressName">{{item.address}}</div>
				<div class="Btn">{{item.type}}</div>
			</div>
			<div class="distBox">{{item.dist}}</div>
		</div>
	</div>
</template>

<script>
export default {
	data(){
		return{
			List:[
				{
					hospital: '桐君堂（武林馆）',
					address: '杭州市上城区浣纱路261号',
					type: '二级医院',
					dist: '401.3m'
				},
				{
					hospital: '杭州市中医院',
					address: '杭州市上城区浣纱路261号',
					type: '三级甲等',
					dist: '558.0m'
				},
				{
					hospital: '浙江中医药大学附属第二医院（浙江省新华医院）',
					address: '杭州市上城区浣纱路261号',
					type: '三级甲等',
					dist: '1.7km'
				},
				{
					hospital: '桐君堂（武林馆）',
					address: '杭州市上城区浣纱路261号',
					type: '二级医院',
					dist: '401.3m'
				}
			]
		}
	}
}
</script>

<style lang="less" scoped>
.elseWhereHospital{
	width: 100%;
	height: auto;
	background: #FFF;
	padding: 0 .2rem;
	.InfoLine{
		height: 1.6rem;
		display: flex;
		justify-content: space-between;
		border-bottom: .01rem solid #DDDDDD;
		.InfoBox{
			height: 100%;
			width: 6.5rem;
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			justify-content: space-around;
			.HospitalName{
				font-size: .28rem;
				color: #000000;
				letter-spacing: 0;
				text-align: left;
			}
			.AddressName{
				font-size: .24rem;
				color: #999999;
				letter-spacing: 0;
				text-align: left;
			}
			.Btn{
				height: .4rem;
				line-height: .4rem;
				width: 1.2rem;
				background: #DCEFFF;
				font-size: .24rem;
				color: #1492FF;
				letter-spacing: 0;
				text-align: center;
			}
		}
		.distBox{
			line-height: 1.6rem;
			font-size: .24rem;
			color: #999999;
			letter-spacing: 0;
			text-align: right;
		}
	}
}
</style>