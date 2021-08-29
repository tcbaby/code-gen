const fs = require('fs');
const render = require('velocityjs').render;
const {apiDir, viewsDir, routeDir, entity} = require('./config')

fs.existsSync(apiDir) || fs.mkdirSync(apiDir)
fs.existsSync(viewsDir) || fs.mkdirSync(viewsDir)
fs.existsSync(routeDir) || fs.mkdirSync(routeDir)

let template = fs.readFileSync('template/vue/pageList.vue', {encoding: 'utf8'})
let out = render(template, entity)
let dir = `${viewsDir}/${entity.path.substring(1, entity.path.lastIndexOf('/'))}`
let file = `${viewsDir}/${entity.path}.vue`
fs.existsSync(dir) || fs.mkdirSync(dir)
fs.writeFileSync(file, out)
console.log(`成功生成文件：${file}`)

template = fs.readFileSync('template/vue/api.js', {encoding: 'utf8'})
out = render(template, entity)
file = `${apiDir}/${entity.name}.js`
fs.writeFileSync(file, out)
console.log(`成功生成文件：${file}`)

template = fs.readFileSync('template/vue/route.js', {encoding: 'utf8'})
out = render(template, entity)
file = `${routeDir}/${entity.name}Route.js`
fs.writeFileSync(file, out)
console.log(`成功生成文件：${file}`)