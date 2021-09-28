
exports.apiDir = './out'
exports.viewsDir = './out'
exports.routeDir = './out'
exports.entityDir = './out'
exports.repositoryDir = './out'

const basePackage = 'com.hs.auth'

exports.entity = {
	entityPackage: `${basePackage}.entity`,
	repositoryPackage: `${basePackage}.repository`,
	path: '/temp/index',
	name: 'temp',
	fields: [
		{ name: 'username', type: 'String', desc: '用户名', el: 'input', rule: {required: true}, unique: true },
		{ name: 'phone', type: 'String', desc: '联系电话', el: 'input', rule: {required: true}, unique: true },
		{ name: 'role', type: 'String', desc: '角色', el: 'input', rule: {required: true} },
	]
}