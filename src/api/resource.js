import http from './request.js'
let path = {	
	getUserStatus:'user/task/getuserinfo',					//获取用户信息
	login:'user/index/login',								//登录
	applyTask:'user/task/applytask',							//申请任务
	cancelApply:'user/task/cancelapply',						//取消申请
	noConfirmTask:'user/task/noconfirmtask',					//首页取消
	confirmTask:'user/task/confirmtask',						//首页确定
	getUserTask:'user/task/getusertask',						//获取用户任务
	taskDetail:'user/task/getdetail',						//任务详情
	abandonTask:'user/task/abandontask',						//取消任务
	checkTask:'user/task/taskcheck',							//任务检查
	commitTask:'user/task/taskcommit',						//提交任务
	getLatestNotice:'user/usernotice/getlatestnotice',		//获取公告
	getPopup:'user/task/getpopup',							//获取首页弹窗
	getEvaluateTask:'user/evaluate/getevaluatetask',			//获取买家秀任务
	getEvaluateDetail:'user/evaluate/getevaluatedetail',		//买家秀详情
	uploadFile:'user/file/fileuploadqn',							//上传文件
	delFile:'user/file/filedeleteqn',									//删除文件
	submitEvaluate:'user/evaluate/submitevaluate',				//提交买家秀
	cancelEvaluate:'user/evaluate/cancelevaluate',				//取消买家秀
	getEvaluateNum:'user/evaluate/getevaluatestatus',				//获取买家秀状态

}
export default{
	//获取用户信息
	getUserStatus(params){
		return http.get(path.getUserStatus, params)
	},
	//登录
	login(params){
		return http.post(path.login, params)
	},
	//申请任务
	applyTask(params){
		return http.get(path.applyTask, params)
	},
	//取消申请
	cancelApply(params){
		return http.get(path.cancelApply, params)
	},
	//首页取消
	noConfirmTask(params){
		return http.post(path.noConfirmTask, params)
	},
	//首页确定
	confirmTask(params){
		return http.post(path.confirmTask, params)
	},
	//获取用户任务
	getUserTask(params){
		return http.get(path.getUserTask, params)
	},
	//获取任务详情
	taskDetail(params){
		return http.get(path.taskDetail, params)
	},
	//取消任务
	abandonTask(params){
		return http.post(path.abandonTask, params)
	},
	//任务检查
	checkTask(params){
		return http.post(path.checkTask, params)
	},
	//提交任务
	commitTask(params){
		return http.post(path.commitTask, params)
	},
	//获取公告
	getLatestNotice(params){
		return http.get(path.getLatestNotice, params)
	},
	//获取首页弹窗
	getPopup(params){
		return http.get(path.getPopup, params)
	},
	//获取买家秀任务
	getEvaluateTask(params){
		return http.get(path.getEvaluateTask, params)
	},
	//买家秀详情
	getEvaluateDetail(params){
		return http.get(path.getEvaluateDetail, params)
	},
	//上传文件
	uploadFile(params){
		return http.post(path.uploadFile, params)
	},
	//删除文件
	delFile(params){
		return http.post(path.delFile, params)
	},
	//提交买家秀
	submitEvaluate(params){
		return http.post(path.submitEvaluate, params)
	},
	//取消买家秀
	cancelEvaluate(params){
		return http.post(path.cancelEvaluate, params)
	},
	//买家秀状态
	getEvaluateNum(params){
		return http.get(path.getEvaluateNum, params)
	},

}