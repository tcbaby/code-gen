#set ($name = $!name.substring(0,1).toLowerCase()+$!name.substring(1))
#set ($Name = $!name.substring(0,1).toUpperCase()+$!name.substring(1))
import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/${name}/list',
    method: 'get',
    params
  })
}

export function add${Name}(data) {
  return request({
    url: '/${name}',
    method: 'post',
    data
  })
}

export function update${Name}(data) {
  return request({
    url: '/${name}',
    method: 'put',
    data
  })
}

export function delete${Name}(id) {
  return request({
    url: `/${name}/${id}`,
    method: 'delete'
  })
}
