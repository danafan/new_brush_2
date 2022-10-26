<template>
	<div class="index_container">
		<div class="title_box">
			<div class="title_text">接单</div>
		</div>
		<!-- 公告 -->
		<div class="announcement" v-if="announcement != ''" @click="showNotice">
			<div class="left">
				<img class="announcement_icon" src="../static/announcement.png">
				<div class="announcement_text">{{announcement}}</div>
			</div>
			<img class="right_icon" src="../static/right.png">
		</div>
		<!-- 公告内容 -->
		<div class="announcement_box" v-if="showAnnouncement" @click="showAnnouncement = false">
			<div class="announcement_content">
				<div class="top">{{notice_text}}</div>
				<div class="ok">确认</div>
			</div>
		</div>
		<!-- 接单模块 -->
		<div class="order_content">
			<img class="index_img" src="../static/index_img.png">
			<div class="countdown" v-if="userInfo.task_status == 1">结束时间：{{userInfo.apply_expiration_time}}</div>
			<div class="order_but has_order_but" v-if="userInfo.task_status == 1" @click="cancelApply">取消</div>
			<div class="order_but" v-if="userInfo.task_status == 0" @click="applyTask">接单</div>
			<div class="order_but hui_order_but" v-if="userInfo.task_status == 2" @click="$toast('您有未完成订单');">已接单</div>
			<div class="order_but hui_order_but" v-if="userInfo.task_status == 3" @click="$toast('您目前不可接单');">不可接单</div>
		</div>
		<!-- 中间模块 -->
		<div class="list_content">
			<div class="order_item" v-for="item in taskList" @click="taskDetail(item.usertask_id,item.status)">
				<div class="order_status" v-if="item.status == 0">已接</div>
				<div class="order_status" v-if="item.status == 1">待审核</div>
				<div class="order_status" v-if="item.status == 2">已完成</div>
				<div class="order_status" v-if="item.status == 3">已取消</div>
				<img class="goods_img" :src="item.goods_img">
				<div class="goods_content">
					<div class="content_row">
						<div class="keyword">{{item.keyword}}</div>
					</div>
					<div class="content_row">
						<div class="keyword">任务编号：{{item.usertask_id}}</div>
					</div>
					<div class="content_row">
						<div class="create_time">{{item.apply_time}}</div>
					</div>
					<div class="content_row">
						<div class="toast">{{item.msg}}</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 已经接到任务 -->
		<div class="check_order" v-if="checkOrder">
			<div class="order_content_box">
				<div class="content_info">
					<div class="info_text">您接到一个新的任务订单，确认要开始吗？
					超过{{confirm_wait_time}}分钟不确认将取消该任务订单</div>
					<div class="countdown">
						<div class="mm">{{mm}}</div>
						<div class="dian">:</div>
						<div class="ss">{{ss}}</div>
					</div>
				</div>
				<div class="buts">
					<div class="but" @click="noConfirmTask">取消接单</div>
					<div class="line"></div>
					<div class="but ok_order" @click="confirmTask">确认接单</div>
				</div>
			</div>
		</div>
	</div>
</template>
<style lang="less" scoped>
.index_container{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	.title_box{
		background: #fff;
		width: 100%;
		height: .88rem;
		display: flex;
		align-items: center;
		justify-content: center;
		padding-left: .2rem;
		position: relative;
		.title_text{
			font-size: .32rem;
			color: #38393A;
			font-weight:500;
		}
		.service{
			position: absolute;
			left: .2rem;
			font-size: .28rem;
			color: #000000;
		}
		.route_title{
			position: absolute;
			right: .2rem;
			font-size: .28rem;
			color: #000000;
		}
	}
	.announcement{
		border-top:1px solid #E8E8E8;
		background: #fff;
		width: 100%;
		height: .64rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-left: .22rem;
		padding-right: .22rem;
		.left{
			display: flex;
			align-items: center;
			.announcement_icon{
				margin-right: .1rem;
				width: .36rem;
				height: .36rem;
			}
			.announcement_text{
				flex:1;
				font-size: .24rem;
				color: #333333;
				display: -webkit-box;
				-webkit-line-clamp: 1;
				-webkit-box-orient: vertical;
				text-overflow: ellipsis;
				overflow: hidden;
			}
		}
		.right_icon{
			margin-left: .1rem;
			width: .36rem;
			height: .36rem;
		}
	}
	.order_content{
		margin-top: .12rem;
		background: #fff;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: .48rem;
		padding-bottom: .48rem;
		.index_img{
			width: 4.4rem;
			height: 3.08rem;
		}
		.countdown{
			margin-top: .34rem;
			font-weight:500;
			font-size: .32rem;
			color:#91A9FF;
		}
		.order_but{
			margin-top: .4rem;
			background: #6785EF;
			border-radius:.08rem;
			width: 2.92rem;
			height: 0.76rem;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: .32rem;
			color:#FFFFFF;
		}
		.has_order_but{
			background: #91A9FF;
		}
		.hui_order_but{
			background: #8a8a8a;
		}
	}
	.list_content{
		flex:1;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		overflow-y: scroll;
		width: 100%;
		padding: .3rem;
		.order_item{
			position: relative;
			margin-bottom: .3rem;
			background: #fff;
			border-radius:.12rem;
			width: 3.28rem;
			display: flex;
			flex-direction: column;
			align-items: center;
			overflow: hidden;
			padding: .1rem;
			.order_status{
				position: absolute;
				top: -.12rem;
				right: -.57rem;
				transform: rotate(45deg);
				font-size: .16rem;
				color: #fff;
				height: 0.86rem;
				line-height: 1.06rem;
				background: #6785EF;
				width:1.8rem;
				text-align:center;
			}
			.goods_img{
				border-radius:50%;
				height: 1.12rem;
				width: 1.12rem;
			}
			.goods_content{
				.content_row{
					margin-bottom: .1rem;
					width: 100%;
					display: flex;
					flex-direction: column;
					align-items: center;
					.keyword{
						font-size: .24rem;
						color:#333333;
						display: -webkit-box;
						-webkit-line-clamp: 1;
						-webkit-box-orient: vertical;
						text-overflow: ellipsis;
						overflow: hidden;
					}
					.create_time{
						font-size: .24rem;
						color:#999;
					}
					.toast{
						font-size: .24rem;
						color:#333;
					}
				}
			}
		}
	}
	.announcement_box{
		background: rgba(0, 0, 0, 0.5);;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1;
		.announcement_content{
			border-radius: .12rem;
			background: #fff;
			width: 5.8rem;
			.top{
				padding:.3rem .24rem;
				font-size: .24rem;
				color:#333333;
			}
			.ok{
				border-top: 1px solid #F2F2F2;
				width: 100%;
				text-align: center;
				height: .86rem;
				line-height: .86rem;
				color:#6785EF;
				font-size: .3rem;
				font-weight:600;
			}
		}
	}
}
.check_order{
	background: rgba(0,0,0,.5);
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	.order_content_box{
		border-radius: .12rem;
		background: #fff;
		width: 5.8rem;
		.content_info{
			padding: .26rem .24rem 0;
			display: flex;
			flex-direction: column;
			align-items: center;
			.info_text{
				font-size: .28rem;
				color:#333333;
			}
			.countdown{
				margin-bottom: .86rem;
				margin-top: .56rem;
				display: flex;
				align-items: center;
				justify-content: center;
				.mm,.ss{
					border-radius:.08rem;
					background: #6785EF;
					width: 1.04rem;
					text-align: center;
					height: 1.04rem;
					line-height: 1.04rem;
					font-size: .64rem;
					color: #fff;
				}
				.dian{
					margin-left: .1rem;
					margin-right: .1rem;
					font-size: .64rem;
					color: #000;
				}
			}
		}
		.buts{
			border-top: .02rem solid #F2F2F2;
			height: .84rem;
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-around;
			font-size: .3rem;
			color:#333333;
			font-weight: 600;
			.line{
				border-left: .02rem solid #F2F2F2;
				height: .84rem;
			}
			.ok_order{
				color: #6785EF;
			}
		}
	}
}
</style>
<script>
	import { MessageBox } from 'mint-ui';
	import resource from '../api/resource.js'
	export default{
		data(){
			return{
				userInfo:{},		//用户信息
				copy_value:"qweqwe",		//复制内容
				taskList:[],		//任务列表
				settimeout:null,	//刷新用户信息
				setinterval:null,	//倒计时
				confirm_wait_time:"",
				showAnnouncement:false,
				checkOrder:false,
				announcement:"",
				notice_text:"",
				mm:"",
				ss:""
			}
		},
		created(){
			//获取首页弹窗
			this.getPopup();
			//获取用户信息
			this.getUserInfo();
			//获取用户任务
			this.getUserTask();
		},
		beforeDestroy(){
			clearTimeout(this.settimeout);
		},
		methods:{
			//获取首页弹窗
			getPopup(){
				resource.getPopup().then(res => {
					if(res.data.code == 1){
						if(res.data.popup_text != ''){
							MessageBox({
								title: '提示',
								message: res.data.popup_text,
								confirmButtonText:'我已知晓'
							});
						}
					}else{
						this.$toast(res.data.msg);
					}
				})
			},
			//点击显示公告
			showNotice(){
				this.notice_text = this.announcement;
				this.showAnnouncement = true;
			},
			//获取用户信息
			getUserInfo(){
				resource.getUserStatus().then(res => {
					if(res.data.code == 1){
						this.userInfo = res.data.data;
						this.copy_value = this.userInfo.copy_text;
						this.announcement = this.userInfo.user_notice;
						let tips = this.userInfo.tips;
						if(tips){
							let tip_id = sessionStorage.getItem('tip_id');
							if(tips.id != tip_id){
								sessionStorage.setItem('tip_id',tips.id);
								this.notice_text = tips.content;
								this.showAnnouncement = true;
							}
						}
						if(this.userInfo.task_status == 1){
							this.settimeout = setTimeout(() => {
								//获取用户信息
								this.getUserInfo();
							},10000)
						}else if(this.userInfo.task_status == 2){
							//获取用户任务
							this.getUserTask();
						}
					}else{
						this.$toast(res.data.msg);
					}

				})
			},
			//获取用户任务
			getUserTask(){
				resource.getUserTask().then(res => {
					if(res.data.code == 1){
						let data = res.data.data;
						if(data.wait_confirm == '1'){	//有未确定的任务
							this.confirm_wait_time = data.confirm_wait_time;
							//倒计时
							clearTimeout(this.settimeout);
							this.countDown(data.confirm_end_time);
						}else{
							clearInterval(this.setinterval);
							this.checkOrder = false;
							this.taskList = data.usertasks;
						}
					}else{
						this.$toast(res.data.msg);
					}
				})
			},
			checkTime(i){
				if (i <10) {
					i = "0" + i;
				}
				return i;
			},
			countDown(endTime){
				this.setinterval = setInterval(() => {
					let startTime = Date.parse(new Date())/1000;
        			let ts = endTime - startTime;//计算剩余的毫秒数
        			this.checkOrder = true;
        			if(ts <= 0){
        				this.mm = '00';
        				this.ss = '00';
        				//获取用户任务
        				this.getUserTask();
        			}else{
        				var mm = parseInt(ts  / 60 % 60, 10);//计算剩余的分钟数
        				var ss = parseInt(ts  % 60, 10);//计算剩余的秒数
        				mm = this.checkTime(mm);
        				ss = this.checkTime(ss);
        				this.mm = mm;
        				this.ss = ss;
        			}
        		},1000);
			},
			//首页取消
			noConfirmTask(){
				resource.noConfirmTask().then(res => {
					if(res.data.code == 1){
						clearInterval(this.setinterval);
						this.checkOrder = false;
						//获取用户信息
						this.getUserInfo();
        				//获取用户任务
        				this.getUserTask();
        			}else{
        				this.$toast(res.data.msg);
        			}
        		})
			},
			//首页确定
			confirmTask(){
				resource.confirmTask().then(res => {
					if(res.data.code == 1){
						clearInterval(this.setinterval);
						this.checkOrder = false;
						//获取用户信息
						this.getUserInfo();
        				//获取用户任务
        				this.getUserTask();
        			}else{
        				this.$toast(res.data.msg);
        			}
        		})
			},
			//申请任务
			applyTask(){
				if(this.copy_value != ''){
					this.$copyText( this.copy_value );
				}
				resource.applyTask({ww:this.userInfo.ww}).then(res => {
					if(res.data.code == 1){
						//获取用户信息
						this.getUserInfo();
					}else{
						this.$toast(res.data.msg);
					}
				})
			},
			//取消申请
			cancelApply(){
				MessageBox.confirm('确定取消?').then(action => {
					if(action == 'confirm'){
						resource.cancelApply().then(res => {
							if(res.data.code == 1){
								this.$toast(res.data.msg);
								//获取用户信息
								this.getUserInfo();
							}else{
								this.$toast(res.data.msg);
							}
						})
					}
				});
			},
			//任务详情
			taskDetail(task_id,status){
				if(this.copy_value != ''){
					this.$copyText( this.copy_value );
				}
				if(status == 0){
					this.$router.push('/toast?task_id=' + task_id);
				}else if(status == 1){
					this.$toast('任务正在审核中,请耐心等待...');
				}else if(status == 2){
					this.$toast('任务已完成');
				}else if(status == 3){
					this.$toast('任务已取消');
				}
			}
		}
	}
</script>

