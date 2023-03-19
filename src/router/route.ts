/**
 * 定义404、401界面
 * @link 参考：https://next.router.vuejs.org/zh/guide/essentials/history-mode.html#netlify
 */
 export const notFoundAndNoPower = [
	// {
	// 	path: '/:path(.*)*',
	// 	name: 'notFound',
	// 	component: () => import('/@/views/error/404.vue'),
	// 	meta: {
	// 		title: 'message.staticRoutes.notFound',
	// 		isHide: true,
	// 	},
	// },
	// {
	// 	path: '/401',
	// 	name: 'noPower',
	// 	component: () => import('/@/views/error/401.vue'),
	// 	meta: {
	// 		title: 'message.staticRoutes.noPower',
	// 		isHide: true,
	// 	},
	// },
];

/**
 * 定义静态路由（默认路由）
 * 此路由不要动，前端添加路由的话，请在 `dynamicRoutes 数组` 中添加
 * @description 前端控制直接改 dynamicRoutes 中的路由，后端控制不需要修改，请求接口路由数据时，会覆盖 dynamicRoutes 第一个顶级 children 的内容（全屏，不包含 layout 中的路由出口）
 * @returns 返回路由菜单数据
 */
export const staticRoutes: Array<RouteRecordRaw> = [
	{
		path: '/login',
		name: 'login',
		component: () => import('@/views/login/index.vue'),
		meta: {
			title: '登录',
		},
	},
];