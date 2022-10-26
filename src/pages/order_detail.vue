<template>
	<div class="container">
		<div class="content">
			<div class="content_title">
				<div class="title_text">—— 任务要求 ——</div>
			</div>
			<div class="content_box requirements">{{task_info.remark}}</div>
		</div>
		<div class="content">
			<div class="content_title">
				<div class="title_text">—— 搜索关键字 ——</div>
			</div>
			<div class="content_box keyword">
				<img class="goods_img" :src="task_info.goods_img">
				<div class="keyword_text" :class="{'is_copy':task_info.keyword_copy == false}">{{task_info.keyword}}</div>
			</div>
		</div>
		<div class="content">
			<div class="content_title">
				<div class="title_text">—— 拍下{{task_info.goods_num}}件商品 ——</div>
			</div>
		</div>
		<div class="content">
			<div class="content_title">
				<div class="title_text">—— 按任务要求操作后验证 ——</div>
			</div>
			<div class="content_box submit">
				<input class="input_box" type="text" placeholder="请输入店铺名称" v-model="store_name">
				<div class="submit_but" @click="checkTask">验证</div>
			</div>
		</div>
		<div class="content" v-if="checkSuccess">
			<div class="content_title">
				<div class="goods_price">—— 拍下价格为{{goods_price}}元的商品后提交 ——</div>
			</div>
			<div class="content_box submit">
				<div class="submit_but" @click="submitTask">提交</div>
			</div>
		</div>
		<div class="cancel" @click="cancelOrder">取消任务</div>
	</div>
</template>
<style lang="less" scoped>
.container{
	padding: .28rem .2rem;
	.content{
		margin-bottom: .28rem;
		border-radius: .16rem;
		background: #fff;
		width: 100%;
		.content_title{
			border-bottom: 1px solid #F8F8F8;
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			height: .78rem;
			.title_text{
				font-size: .3rem;
				color: #6785EF;
				font-weight:500;
			}
		}
		.content_box{
			padding: .14rem .28rem;
		}
		.requirements{
			font-size: .28rem;
			color:#333333;
		}
		.keyword{
			display: flex;
			flex-direction: column;
			align-items: center;
			.keyword_text{
				margin-top: .2rem;
				font-size: .32rem;
				color:#000;
				font-weight:500; 
			}
			.is_copy{
				word-wrap:break-word;
				-webkit-touch-callout:none;  
				-webkit-user-select:none;  
				-khtml-user-select:none;  
				-moz-user-select:none;  
				-ms-user-select:none;  
				user-select:none; 
			}
			.goods_img{
				border-radius:.08rem;
				width: 4.6rem;
				height: 4.6rem;
			}
		}
		.goods_price{
			font-size: .3rem;
			color: #6785EF;
		}
		.submit{
			display: flex;
			flex-direction: column;
			align-items: center;
			.input_box{
				border:1px solid #F1F1F1;
				border-radius: .08rem;
				background: #f8f8f8;
				width: 5.1rem;
				height: .8rem;
				padding-left: .26rem;
				border: none;
				outline: none;
				font-size: .28rem;
				box-sizing: border-box;
			}
			input::-webkit-input-placeholder {
				color: #666666;
			}
			input:-moz-placeholder {
				color: #666666;
			}
			input:-ms-input-placeholder {
				color: #666666;
			}
			.submit_but{
				margin-top: .28rem;
				border-radius:.06rem;
				background: #6785EF;
				width: 2.92rem;
				text-align: center;
				height: .6rem;
				line-height: .6rem;
				font-size: .28rem;
				color:#fff;
			}
		}
	}
	.cancel{
		margin-bottom: .28rem;
		border:1px solid #6785EF;
		border-radius:.1rem;
		background: #fff;
		width: 100%;
		text-align: center;
		height: .9rem;
		line-height: .9rem;
		font-size: .3rem;
		color:#6785EF;
	}
}
</style>
<script>
	import { MessageBox } from 'mint-ui';
	import resource from '../api/resource.js'
	export default{
		data(){
			return{
				task_id:"",
				task_info:{},
				store_name:"",
				goods_price:'',
				checkSuccess:false
			}
		},
		created(){
			this.task_id = this.$route.query.task_id;
			//获取任务详情
			this.getTaskDetail();
		},
		methods:{
			//获取任务详情
			getTaskDetail(){
				resource.taskDetail({usertask_id:this.task_id}).then(res => {
					if(res.data.code == 1){
						this.task_info = res.data.data;
					}else{
						this.$toast(res.data.msg);
					}
				})
			},
			//取消任务
			cancelOrder(){
				MessageBox.confirm('确定执行此操作?').then(action => {
					if(action == 'confirm'){
						resource.abandonTask({usertask_id:this.task_id}).then(res => {
							if(res.data.code == 1){
								this.$toast(res.data.msg);
								this.$router.go(-2);
							}else{
								this.$toast(res.data.msg);
							}
						})
					}
				});
			},
			//验证
			checkTask(){
				if(this.store_name == ''){
					this.$toast("请输入店铺名称");
				}else{
					let req = {
						usertask_id:this.task_id,
						shop_name:this.store_name
					}
					resource.checkTask(req).then(res => {
						if(res.data.code == 1){
							this.$toast(res.data.msg);
							this.goods_price = res.data.goods_price;
							this.checkSuccess = true;
						}else{
							this.$toast(res.data.msg);
						}
					})
				}
			},
			//提交
			submitTask(){
				resource.commitTask({usertask_id:this.task_id}).then(res => {
					if(res.data.code == 1){
						this.$toast(res.data.msg);
						this.$router.go(-2);
					}else{
						this.$toast(res.data.msg);
					}
				})
			}
		}
	}
</script>




