<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="300px" style="" label-position="top">

      <el-row>
        <el-col :span="24">
          <el-card class="box-card" style="margin: 10px">
            <div slot="header" class="clearfix"><span>系统</span></div>
            <el-row>
              <el-col :span="6">
                <el-form-item label="后端API地址" prop="backApiUrl">
                  <el-input v-model="form.backApiUrl" placeholder="请输入后端API地址"/>
                </el-form-item>
              </el-col>
            </el-row>

          </el-card>
        </el-col>
      </el-row>


      <el-row>
        <el-col :span="12">

          <el-card class="box-card" style="margin: 10px">
            <div slot="header" class="clearfix"><span>后台管理API</span></div>
            <el-row>
              <el-col :span="12">
                <el-form-item label="后台管理API开关" prop="managerApiLock">
                  <el-select v-model="form.managerApiLock" placeholder="请选择">
                    <el-option v-for="item in dict.type.dict_common_lock" :key="item.value" :label="item.label"
                               :value="item.value" :disabled="item.status == 1"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="后台管理API秘钥" prop="managerApiKey" v-show="form.managerApiLock == 0">
                  <el-input v-model="form.managerApiKey" placeholder="请输入后台管理API秘钥"/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-card>


        </el-col>
        <el-col :span="12">





        </el-col>
      </el-row>


      <el-form-item>
        <el-button :loading="buttonLoading" type="primary" @click="submitForm">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  apiQuery,
  apiEdit
} from '@/api/system/systemConfig'
import { getToken } from '@/utils/auth'

export default {
  name: 'EmailConfig',
  dicts: [
    'dict_common_status'
    , 'dict_common_lock'
    , 'dict_common_save'
    , 'dict_common_need'
  ],
  components: {},
  data() {
    return {
      //按钮loading
      buttonLoading: false,

      // 表单校验
      rules: {},
      form: {}
    }
  },
  created() {
    this.queryConfig()
  },
  methods: {
    queryConfig() {
      apiQuery().then(response => {
        this.form = response.data
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.buttonLoading = true
          apiEdit(this.form).then(response => {
            this.$modal.msgSuccess('修改成功')
            this.open = false
            this.queryConfig()
          }).finally(() => {
            this.buttonLoading = false
          })
        }
      })
    }
  }

}
</script>
