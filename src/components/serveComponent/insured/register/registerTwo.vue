<template>
    <div id="app">
		<div class="picWrap"></div>
		<div class="tips">
			<p>温馨提示</p>
			<p>请下载该登记表，并于敲章后重新上传。</p>
		</div>
		<div class="footer">
			<mt-button class="btn" type="default">default</mt-button>
			<mt-button class="btn" type="primary">primary</mt-button>
		</div>
    </div>
</template>

<script>
export default {
}
</script>

<style scoped lang="less">
#app{
	background: #fff;
	height: 100%;
	position: absolute;
	width: 100%;
}
.picWrap{
	height: 5rem;
}
.tips{
	font-size: .28rem;
	text-align: left;
	color: #666;
	line-height: 2;
}
.footer{
	position: fixed;
	bottom: 0;
	display: flex;
	justify-content: space-around;
}
</style>
