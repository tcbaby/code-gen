#set ($name = $!name.substring(0,1).toLowerCase()+$!name.substring(1))
#set ($Name = $!name.substring(0,1).toUpperCase()+$!name.substring(1))
<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.k" size="small" placeholder="请输入关键词" clearable class="filter-item" style="width: 200px; margin-left: 10px" />
      <el-button-group style="margin-left: 10px">
        <el-button size="small" class="filter-item" type="primary" icon="el-icon-search" @click="search">
          搜索
        </el-button>
        <el-button size="small" class="filter-item" type="primary" icon="el-icon-refresh" @click="refresh">
          重置
        </el-button>
      </el-button-group>
      <el-button size="small" class="filter-item" type="primary" icon="el-icon-plus" style="margin-left: 10px" @click="add">
        新增
      </el-button>
    </div>

    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit height="580px" class="table-container" highlight-current-row>
      #foreach( $field in $fields )
      <el-table-column align="center" width="100" label="$field.desc">
        <template slot-scope="scope">
          <span>{{ scope.row.$field.name }}</span>
        </template>
      </el-table-column>
      #end

      <el-table-column fixed="right" label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button-group>
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="edit(scope)">
              修改
            </el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="del(scope)">
              删除
            </el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.size" @pagination="fetchData" />

    <el-dialog :visible.sync="dialogVisible" width="840px" :close-on-click-modal="false" :title="dialogType === 'modify' ? '修改' : '新增'">
      <el-form ref="dataForm" :model="temp" label-width="120px" label-position="right">
        #foreach( $field in $fields )
        <el-form-item label="$field.desc">
          #if ($field.el == 'input')
          <el-input v-model="temp.$field.name" placeholder="$field.desc" />
          #elseif ($field.el == 'select')
          <select-id v-model="temp.$field.name" placeholder="$field.desc" :data="${field.name}SelectData" style="width: 100%" />
          #end
        </el-form-item>
        #end
      </el-form>
      <div style="text-align: right">
        <el-button type="danger" @click="dialogVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="submit"> 确定 </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { getList, add${Name}, update${Name}, delete${Name} } from '@/api/${name}'
import { deepClone } from '@/utils'

const _temp = {
  id: '',
  #foreach($field in $fields )
  $field.name: '',
  #end
}

export default {
  components: {
    Pagination
  },
  data() {
    return {
      total: 0,
      list: [],
      menus: [],
      listLoading: true,
      listQuery: {
        page: 1,
        size: 20,
        k: undefined,
      },
      uploadUrl: '#',
      temp: Object.assign({}, _temp),
      dialogVisible: false,
      dialogType: 'create',
      loading: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    search() {
      this.fetchData()
    },
    refresh() {
      this.listQuery = {
        page: 1,
        size: 20,
        k: undefined
      }
      this.fetchData()
    },
    fetchData() {
      this.listLoading = true
      getList(this.listQuery).then(data => {
        this.list = data.rows
        this.list.forEach(r => {
          r.time = [r.startTime, r.endTime]
        })
        this.total = data.total
        this.page = data.page
        this.listLoading = false
      })
    },
    resetTemp() {
      this.temp = Object.assign({}, _temp)
    },
    add() {
      this.resetTemp()
      this.dialogVisible = true
      this.dialogType = 'create'
      this.\$nextTick(() => {
        this.\$refs['dataForm'].clearValidate()
      })
    },
    edit(scope) {
      this.resetTemp()
      this.dialogVisible = true
      this.dialogType = 'modify'
      this.temp = deepClone(scope.row)
      this.\$nextTick(() => {
        this.\$refs['dataForm'].clearValidate()
      })
    },
    del(scope) {
      this.\$confirm('确认删除该条数据吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delete${Name}(scope.row.id).then(res => {
          this.list.splice(scope.$index, 1)
          this.\$message({
            message: '删除成功',
            type: 'success'
          })
        })
      })
    },
    async submit() {
      const isEdit = this.dialogType === 'modify'

      this.temp.startTime = this.temp.time[0]
      this.temp.endTime = this.temp.time[1]

      if (isEdit) {
        await update${Name}(this.temp)
        for (let index = 0; index < this.list.length; index++) {
          if (this.list[index].id === this.temp.id) {
            this.list.splice(index, 1, Object.assign({}, this.temp))
            break
          }
        }
      } else {
        await add${Name}(this.temp)
        this.fetchData()
      }
      this.\$message({
        message: '提交成功',
        type: 'success'
      })
      this.dialogVisible = false
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-container {
  margin: -7px 0px 7px -10px;
}
</style>
