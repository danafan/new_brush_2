<template>
	<div>
		<div class="toast_content">
			<div class="toast_title">请先浏览以下注意事项，浏览完成后开始任务</div>
			<div class="toast_item">
				禁止点直通车（左上角有hot）进入，点直通车的扣除佣金。
			</div>
			<div class="toast_item">
				禁止搜索店铺名进店，一定要搜索关键词搜索进入。
			</div>
			<div class="toast_item">
				禁止使用淘金币，红包。淘金币红包部分不返款。
			</div>
			<div class="toast_item">
				禁止使用红包天猫积分，优享礼金。月卡，返利，等等。
			</div>
			<div class="toast_item">
				以下图例为直通车HOT标，见此标的不能点。
			</div>
			<div class="img_content">
				<img class="toast_img" src="http://upload.gxk8090.com/toast_img.png">
			</div>
			
		</div>
		<div class="but_box">
			<div class="next" @click="next">确定</div>
		</div>
	</div>
</template>
<style lang="less" scoped>
.toast_content{
	margin-top: .28rem;
	margin-bottom: 1.44rem;
	background: #fff;
	padding: .36rem .26rem;
	.toast_title{
		font-weight: 500;
		margin-bottom: .6rem;
		font-size: .3rem;
		color:#FA6400;
	}
	.toast_item{
		font-weight: 500;
		font-size: .3rem;
		color:#333333;
	}
	.img_content{
		margin-top: .5rem;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		.toast_img{
			width: 6.28rem;
			height: 7.26rem;
		}
	}
}
.but_box{
	position: fixed;
	left: 0;
	bottom: 0;
	background: #fff;
	width: 100%;
	height: 1.44rem;
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 1;
	.next{
		background: #6785EF;
		border-radius:.08rem;
		width: 6.2rem;
		height: .9rem;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: .32rem;
		color:#fff;
	}
}
</style>
<script>
	export default{
		data(){
			return{
				task_id:""
			}
		},
		created(){
			this.task_id = this.$route.query.task_id;
		},
		methods:{
			next(){
				this.$router.push('/order_detail?task_id=' + this.task_id);
			}
		}
	}
</script>