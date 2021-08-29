
exports.apiDir = 'C:\\Users\\11693\\Desktop\\vue-admin-template\\src\\api'
exports.viewsDir = 'C:\\Users\\11693\\Desktop\\vue-admin-template\\src\\views'
exports.routeDir = './out'

exports.entity = {
	path: '/user/index',
	name: 'user',
	fields: [
		{ name: 'username', type: 'String', desc: '用户名', el: 'input' },
		{ name: 'role', type: 'String', desc: '角色', el: 'input' },
	]
}