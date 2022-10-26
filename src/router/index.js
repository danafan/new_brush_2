import Vue from 'vue'
import Router from 'vue-router'

const login = resolve=>System.import('@/pages/login')
const tab_menu = resolve=>System.import('@/pages/tab_menu')
const index = resolve=>System.import('@/pages/index')
const mjx = resolve=>System.import('@/pages/mjx')
const mjx_detail = resolve=>System.import('@/pages/mjx_detail')
const toast = resolve=>System.import('@/pages/toast')
const order_detail = resolve=>System.import('@/pages/order_detail')


Vue.use(Router);

const router = new Router({
	routes: [
	{
		path: '/login',
		name:"登录",
		component: login
	},
	{
		path: '/tab_menu',
		name:"导航页",
		component: tab_menu,
		children:[
		{
			path: '/index',
			name:"首页",
			component: index
		},
		{
			path: '/mjx',
			name:"买家秀",
			component: mjx
		},
		]
	},
	{
		path: '/mjx_detail',
		name:"买家秀详情",
		component: mjx_detail
	},
	{
		path: '/toast',
		name:"提示",
		component: toast
	},
	{
		path: '/order_detail',
		name:"任务详情",
		component: order_detail
	},
	]
})
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}
router.beforeEach((to, from, next) => {
	document.title = to.name;
	next();
})

export default router;
