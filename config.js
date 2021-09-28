
exports.apiDir = './out'
exports.viewsDir = './out'
exports.routeDir = './out'

exports.entity = {
	path: '/user/index',
	name: 'user',
	fields: [
		{ name: 'username', type: 'String', desc: '用户名', el: 'input', rule: {required: true} },
		{ name: 'role', type: 'String', desc: '角色', el: 'input', rule: {required: true} },
	]
}