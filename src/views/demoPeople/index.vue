<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="姓名" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入姓名"
          clearable
          size="small"
          @keyup.enter.native="handleList"
        />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select
          v-model="queryParams.status"
          placeholder="状态"
          clearable
          style="width: 240px"
        >
          <el-option
            v-for="dict in dict.type.dict_common_status"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>


      <el-form-item label="备注" prop="remark">
        <el-input
          v-model="queryParams.remark"
          placeholder="请输入备注"
          clearable
          size="small"
          @keyup.enter.native="handleList"
        />
      </el-form-item>

      <el-form-item label="性别" prop="sex">
        <el-select v-model="queryParams.sex" placeholder="性别" clearable style="width: 240px">
          <el-option v-for="dict in dict.type.dict_demo_people_sex" :key="dict.value" :label="dict.label"
                     :value="dict.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="创建时间">
        <el-date-picker
          v-model="dateRange"
          size="small"
          style="width: 240px"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['00:00:00', '23:59:59']"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleList">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
        >新增
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleEdit"
        >修改
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDel"
        >删除
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          @click="handleDelAll"
        >全部删除
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="info"
          plain
          icon="el-icon-upload2"
          size="mini"
          @click="handleImport"
        >导入
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
        >导出
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-key"
          size="mini"
          :disabled="multiple"
          @click="handleTestCall"
        >呼叫测试
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-s-help"
          size="mini"
          :disabled="multiple"
          @click="handleCopyInfo"
        >复制人员信息
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getPage"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="dataList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="id" align="center" prop="id"/>
      <el-table-column label="姓名" align="center" prop="name"/>
      <el-table-column label="年龄" align="center" prop="age"/>
      <el-table-column label="性别" align="center" prop="sex">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.dict_demo_people_sex" :value="scope.row.sex"/>
        </template>
      </el-table-column>
      <el-table-column label="到期时间" align="center" prop="expireTime" width="160">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.expireTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center" key="status">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-value="0"
            inactive-value="1"
            @change="handleStatusChange(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center" prop="remark" :show-overflow-tooltip="true"/>
      <el-table-column label="创建时间" align="center" prop="createTime" width="160">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="right" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleEdit(scope.row)"
          >修改
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDel(scope.row)"
          >删除
          </el-button>
          <el-dropdown size="mini" @command="(command) => handleCommand(command, scope.row)" >
            <el-button size="mini" type="text" icon="el-icon-d-arrow-right">更多</el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="testCall" icon="el-icon-key">呼叫测试</el-dropdown-item>
              <el-dropdown-item command="copyInfo" icon="el-icon-s-help">复制人员信息</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getPage"
    />

    <!-- 添加或修改测试数据对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="900px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">

        <el-divider content-position="left">🔒 基础信息</el-divider>

        <el-row>
          <el-col :span="12">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="form.name" placeholder="请输入姓名"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="年龄" prop="age">
              <el-input v-model="form.age" placeholder="请输入年龄"/>
            </el-form-item>
          </el-col>
        </el-row>



        <el-divider content-position="left">🎁 更多</el-divider>

        <el-row>
          <el-col :span="12">
            <el-form-item label="性别" prop="sex">
              <el-select v-model="form.sex" placeholder="请选择性别">
                <el-option v-for="item in dict.type.dict_demo_people_sex" :key="item.value" :label="item.label"
                           :value="item.value" :disabled="item.status == 1"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="到期时间" prop="expireToTime">
              <el-date-picker clearable size="small"
                              v-model="form.expireTime"
                              type="datetime"
                              value-format="yyyy-MM-dd HH:mm:ss"
                              placeholder="留空则永久">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>


        <el-divider content-position="left">🎨 其他</el-divider>

        <el-row>
          <el-col :span="24">
            <el-form-item label="状态" prop="status">
              <el-radio-group v-model="form.status">
                <el-radio
                  v-for="dict in dict.type.dict_common_status"
                  :key="dict.value"
                  :label="dict.value"
                >{{dict.label}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="备注" prop="remark">
              <el-input v-model="form.remark" type="textarea" placeholder="请输入备注"></el-input>
            </el-form-item>
          </el-col>
        </el-row>



      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button :loading="buttonLoading" type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 导入对话框 -->
    <el-dialog :title="upload.title" :visible.sync="upload.open" width="400px" append-to-body>
      <el-upload
        ref="upload"
        :limit="1"
        accept=".xlsx, .xls"
        :headers="upload.headers"
        :action="upload.url + '?updateSupport=' + upload.updateSupport"
        :disabled="upload.isUploading"
        :on-progress="handleFileUploadProgress"
        :on-success="handleFileSuccess"
        :auto-upload="false"
        drag
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip text-center" slot="tip">
          <span>仅允许导入xls、xlsx格式文件。</span>
          <el-link type="primary" :underline="false" style="font-size:12px;vertical-align: baseline;"
                   @click="handleImportTemplate"
          >下载模板
          </el-link>
        </div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFileForm">确 定</el-button>
        <el-button @click="upload.open = false">取 消</el-button>
      </div>
    </el-dialog>






    <!-- 复制人员信息对话框 -->
    <el-dialog :title="titleCopy" :visible.sync="openCopy" width="900px" append-to-body>
      <el-form ref="form" :model="formCopy" :rules="rulesCopy" label-width="120px">

        <el-divider content-position="left">🎁 复制人员信息</el-divider>


        <el-row>
          <el-col :span="12">
            <el-form-item label="姓名是否脱敏" prop="hideName">
              <el-select v-model="formCopy.hideName" placeholder="请选择姓名是否脱敏">
                <el-option v-for="item in dict.type.dict_common_yes_no" :key="item.value" :label="item.label"
                           :value="item.value" :disabled="item.status == 1"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>



        <el-row>
          <el-col :span="24">
            <el-form-item label="生成格式" prop="format">
              <el-input v-model="formCopy.format" type="textarea"  :rows="3" placeholder="变量：【姓名】、【年龄】、【性别】、【信息】"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-divider content-position="left">🎁 生成结果（一行一个）</el-divider>

        <el-row>
          <el-col :span="24">
            <el-form-item label="人员信息" prop="copyStr">
              <el-input v-model="formCopy.copyStr" type="textarea"  :rows="8" placeholder="生成结果"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button :loading="buttonLoading" type="primary" @click="handleCopyInfoSubmit">生 成</el-button>
        <el-button @click="cancelCopy">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  page,
  query,
  add,
  edit,
  del,
  delAll,
  changeStatus,
  testCall,
  copyInfo,
  exportData,
  importData,
  importTemplate
} from '@/api/demoPeople/demoPeople'
import { getToken } from '@/utils/auth'

export default {
  name: 'DemoPeople',
  dicts: [
    , 'dict_demo_people_sex'
    , 'dict_common_yes_no'
    , 'dict_common_status'
  ],
  components: {},
  data() {
    return {
      //按钮loading
      buttonLoading: false,
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 选中数组
      titles: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 测试数据表格数据
      dataList: [],
      // 弹出层标题
      title: '',
      // 弹出层标题
      titleCopy: '',
      // 是否显示弹出层
      open: false,
      // 是否显示弹出层
      openCopy: false,
      // 创建时间时间范围
      dateRange: [],
      // 用户导入参数
      upload: {
        // 是否显示弹出层（用户导入）
        open: false,
        // 弹出层标题（用户导入）
        title: '',
        // 是否禁用上传
        isUploading: false,
        // 设置上传的请求头部
        headers: { Authorization: 'Bearer ' + getToken() },
        // 上传的地址
        url: process.env.VUE_APP_BASE_API + importData
      },
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        name: undefined,
        remark: undefined,
        sex: undefined,
        status: undefined,
        createTime: undefined,
        startTime: undefined,
        endTime: undefined
      },
      // 表单参数
      form: {},
      // 复制人员信息
      formCopy: {},
      // 表单校验
      rules: {
        name: [
          { required: true, message: '姓名不能为空', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '性别不能为空', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '状态不能为空', trigger: 'blur' }
        ]
      },
      // 表单校验
      rulesCopy: {
        hideName: [
          { required: true, message: '姓名是否脱敏不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getPage()
  },
  methods: {
    /** 分页列表 */
    getPage() {
      this.loading = true
      this.dateRange = Array.isArray(this.dateRange) ? this.dateRange : []
      this.queryParams.startTime = this.dateRange[0]
      this.queryParams.endTime = this.dateRange[1]
      page(this.queryParams).then(response => {
        this.dataList = response.data.records
        this.total = response.data.total
        this.loading = false
      })
    },
    // 取消按钮
    cancel() {
      this.open = false
      this.reset()
    },
    // 取消按钮
    cancelCopy() {
      this.openCopy = false
    },
    // 表单重置
    reset() {
      this.form = {}
      this.formCopy = {}
      this.resetForm('form')
      this.resetForm('formCopy')
    },
    /** 搜索 按钮操作 */
    handleList() {
      this.queryParams.pageNum = 1
      this.getPage()
    },
    /** 重置 按钮操作 */
    resetQuery() {
      this.dateRange = []
      this.resetForm('queryForm')
      this.handleList()
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 更多操作 按钮操作 */
    handleCommand(command, row) {
      switch (command) {
        case "testCall":
          this.handleTestCall(row);
          break;
        case "copyInfo":
          this.handleCopyInfo(row);
          break;
        default:
          break;
      }
    },
    /** 状态按钮操作 */
    handleStatusChange(row) {
      let text = row.status === "0" ? "启用" : "停用";
      this.$modal.confirm('确认要 ' + text + ' ' + row.username + ' 用户吗？').then(function() {
        return changeStatus(row.id, row.status);
      }).then(() => {
        this.$modal.msgSuccess(text + "成功");
      }).catch(function() {
        row.status = row.status === "0" ? "1" : "0";
      });
    },
    /** 新增 按钮操作 */
    handleAdd() {
      this.reset()
      this.open = true;
      this.title = "添加";
    },
    /** 修改 按钮操作 */
    handleEdit(row) {
      this.loading = true
      this.reset()
      const id = row.id || this.ids
      query(id).then(response => {
        this.loading = false
        this.form = response.data
        this.open = true
        this.title = '修改'
      })
    },
    /** 提交 按钮操作 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.buttonLoading = true
          if (this.form.id != null) {
            edit(this.form).then(response => {
              this.$modal.msgSuccess('修改成功')
              this.open = false
              this.getPage()
            }).finally(() => {
              this.buttonLoading = false
            })
          } else {
            add(this.form).then(response => {
              this.$modal.msgSuccess('新增成功')
              this.open = false
              this.getPage()
            }).finally(() => {
              this.buttonLoading = false
            })
          }
        }
      })
    },
    /** 删除 按钮操作 */
    handleDel(row) {
      const ids = row.id ? [row.id] : this.ids
      //获取ids的数量
      const num = ids.length
      this.$modal.confirm('是否确认删除这 ' + num + ' 条数据 ？').then(() => {
        this.loading = true
        return del(ids)
      }).then(() => {
        this.loading = false
        this.getPage()
        this.$modal.msgSuccess('删除成功')
      }).finally(() => {
        this.loading = false
      })
    },
    /** 全部删除 按钮操作 */
    handleDelAll() {
      this.$modal.confirm('是否确认删除全部数据 ？').then(() => {
        this.loading = true
        return delAll()
      }).then(() => {
        this.loading = false
        this.getPage()
        this.$modal.msgSuccess('删除全部数据成功')
      }).finally(() => {
        this.loading = false
      })
    },
    /** 呼叫测试 按钮操作 */
    handleTestCall(row) {
      const ids = row.id ? [row.id] : this.ids
      //获取ids的数量
      const num = ids.length
      this.$modal.confirm('是否确认测试这 ' + num + ' 条数据 ？').then(() => {
        this.loading = true
        return testCall(ids)
      }).then(() => {
        this.loading = false
        this.getPage()
        this.$modal.msgSuccess('提交测试成功，请稍后刷新查看')
      }).finally(() => {
        this.loading = false
      })
    },
     /** 复制人员信息 按钮操作 */
    handleCopyInfo(row) {
      this.reset()
      const ids = row.id ? [row.id] : this.ids
      const num = ids.length
      this.formCopy.ids = ids;
      this.openCopy = true
      this.titleCopy = '复制人员信息，已选中'+ num + '条数据'
    },
     /** 复制人员信息-生成 按钮操作 */
    handleCopyInfoSubmit() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.buttonLoading = true
          this.formCopy.copyStr = "";
          copyInfo(this.formCopy).then(response => {
            this.$modal.msgSuccess('生成成功')
            this.formCopy.copyStr = response.data.copyStr;
          }).finally(() => {
            this.buttonLoading = false
          })
        }
      })
    },

    /** 导入 按钮操作 */
    handleImport() {
      this.upload.title = '导入'
      this.upload.open = true
    },
    /** 下载模板 按钮操作 */
    handleImportTemplate() {
      this.download(importTemplate, {}, `template_${new Date().getTime()}.xlsx`)
    },
    /** 导出 按钮操作 */
    handleExport() {
      this.download(exportData, {
        ...this.queryParams
      }, `data_${new Date().getTime()}.xlsx`)
    },
    // 文件上传中处理
    handleFileUploadProgress(event, file, fileList) {
      this.upload.isUploading = true
    },
    // 文件上传成功处理
    handleFileSuccess(response, file, fileList) {
      this.upload.open = false
      this.upload.isUploading = false
      this.$refs.upload.clearFiles()
      this.$alert( response.msg + "->" + response.data, "导入结果", { dangerouslyUseHTMLString: true });
      this.getPage()
    },
    // 提交上传文件
    submitFileForm() {
      this.$refs.upload.submit()
    },
  }
}
</script>
