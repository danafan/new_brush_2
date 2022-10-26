<template>
	<div class="menu_container">
		<div class="page_content">
			<router-view></router-view>
		</div>
		<div class="menu_row">
			<div class="menu_item" @click="active_index = '/index'">
				<img class="menu_icon" src="../static/index_icon_active.png" v-if="active_index == '/index'">
				<img class="menu_icon" src="../static/index_icon.png" v-else>
				<div class="menu_text" :class="{'active_text':active_index == '/index'}">接单</div>
			</div>
			<div class="menu_item" @click="active_index = '/mjx'">
				<div class="yuan" v-if="evaluate_order_num > 0"></div>
				<img class="menu_icon" src="../static/mjx_icon_active.png" v-if="active_index == '/mjx'">
				<img class="menu_icon" src="../static/mjx_icon.png" v-else>
				<div class="menu_text" :class="{'active_text':active_index == '/mjx'}">买家秀</div>
			</div>
		</div>
	</div>
</template>
<style lang="less" scoped>
.menu_container{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	.page_content{
		width: 100%;
		flex:1;
		position: relative;
	}
	.menu_row{
		background: #ffffff;
		width: 100%;
		height: 1rem;
		display: flex;
		align-items: center;
		justify-content: space-around;
		.menu_item{
			display: flex;
			flex-direction: column;
			align-items: center;
			position: relative;
			.yuan{
				position: absolute;
				top: .05rem;
				right: .2rem;
				background: #F22E00;
				border-radius: 50%;
				width: .12rem;
				height: .12rem;
			}
			.menu_icon{
				width: .48rem;
				height: .48rem;
			}
			.menu_text{
				font-size: .24rem;
				color: #999999;
			}
			.active_text{
				color: #333333;
			}
		}
	}
}
</style>
<script>
	import resource from '../api/resource.js'
	export default{
		data(){
			return{
				active_index:'/index',
				evaluate_order_num:0,	//待处理的买家秀任务数量
			}
		},
		created(){
			this.active_index = this.$route.path == '/tab_menu'?'/index':this.$route.path;
			this.$router.push(this.active_index);
			//获取待处理的买家秀任务数量
			this.getEvaluateNum();
		},
		methods:{
			//获取待处理的买家秀任务数量
			getEvaluateNum(){
				resource.getEvaluateNum().then(res => {
					if(res.data.code == 1){
						this.evaluate_order_num = res.data.data.evaluate_order_num;
					}else{
						this.$toast(res.data.msg);
					}
				})
			},
		},
		watch:{
			active_index:function(n,o){
				this.active_index = n;
				if(n == '/index'){
					this.title = '接单';
				}else if(n == '/mjx'){
					this.title = '买家秀';
				}
				this.$router.push(n)
			}
		}
	}
</script>

