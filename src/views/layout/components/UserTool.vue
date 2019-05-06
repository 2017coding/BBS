<template>
  <div class="user-tool">
    <!-- 未登录显示 -->
    <div v-if="!userInfo" class="login">
      <a class="bt-login" @click="handleClick('login')">立即登录</a>
      <a class="bt-registered" @click="handleClick('registered')">免费注册</a>
    </div>
    <!-- 登录后显示 -->
    <div v-else class="user">
      <div class="bt-created">创建<i class="el-icon-caret-bottom" /></div>
      <i class="el-icon-bell" />
      <i class="el-icon-message" />
      <i class="avatar" :style="`background-image: url(${userInfo.avatar || 'https://www.lyh.red/file/%E9%A6%96%E9%A1%B5%E8%BD%AE%E6%92%AD_20190418155210_g6fk/20190418160520_a4e7.jpg'})`" />
      <!-- 用户面板 -->
    </div>
    <!-- 登录注册弹窗 -->
    <page-dialog
      :title="dialogInfo.title[dialogInfo.type]"
      :visible.sync="dialogInfo.visible"
      :width="dialogInfo.width"
      :bt-loading="dialogInfo.btLoading"
      :bt-list="dialogInfo.btList"
      :append-to-body="false"
      @handleClick="handleClick"
    >
      <!-- form -->
      <page-form
        v-if="dialogInfo.type !== 'userTransfer'"
        :ref-obj.sync="formInfo.ref"
        :data="formInfo.data"
        :field-list="formInfo.fieldList"
        :rules="formInfo.rules"
        :label-width="formInfo.labelWidth"
      >
        <!-- 自定义插槽-选择头像 -->
        <template v-slot:form-validCode>
          <div class="valid-code">
            <el-input v-model.trim="formInfo.data.validCode" placeholder="请输入验证码" />
            <valid-code
              v-if="dialogInfo.visible"
              v-model="validCode"
              :refresh="refreshCode"
            />
          </div>
        </template>
      </page-form>
      <el-button
        class="bt-confirm"
        type="primary"
        :loading="dialogInfo.btLoading"
        @click="handleConfirm(dialogInfo.type)"
      >{{ dialogInfo.title[dialogInfo.type] }}
      </el-button>
    </page-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PageDialog from '@/components/PageDialog'
import PageForm from '@/components/PageForm'
import ValidCode from '@/components/ValidCode'
import { _setCookie } from '@/common/js/storage'
import { registeredApi, loginApi } from '@/api/user'
export default {
  name: 'User',
  components: {
    PageDialog,
    PageForm,
    ValidCode
  },
  data () {
    const checkAccount = (rule, value, callback) => {
      const check = this.$validate({ label: '账号', value, rules: ['notnull', 'noChinese', 'length'], conditions: [2, 16] })
      if (!check.result) {
        callback(new Error(check.message))
      } else {
        callback()
      }
    }
    const checkValidCode = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入验证码'))
      } else if (value.toUpperCase() !== this.validCode.toUpperCase()) {
        this.refreshCode = Math.random()
        callback(new Error('验证码不正确'))
      } else {
        callback()
      }
    }
    const checkPassword = (rule, value, callback) => {
      const check = this.$validate({ label: '密码', value, rules: ['notnull', 'string', 'length'], conditions: [6, 16] })
      if (!check.result) {
        callback(new Error(check.message))
      } else {
        callback()
      }
    }
    return {
      visible: false,
      // 验证码
      validCode: '',
      // 刷新验证码
      refreshCode: 0,
      // 表单相关
      formInfo: {
        ref: null,
        data: {
          name: '',
          account: '',
          validCode: '',
          password: '',
          type: 1 // 论坛端登陆
        },
        fieldList: [
          { label: '你的名字', value: 'name', placeholder: '真实姓名或昵称', type: 'input', required: true, show: true },
          { label: '手机号 或 Email', value: 'account', type: 'input', required: true, validator: checkAccount, show: true },
          { label: '', value: 'validCode', type: 'slot', required: true, validator: checkValidCode, show: true },
          { label: '密码', value: 'password', type: 'password', required: true, validator: checkPassword, show: true }
        ],
        rules: {},
        labelWidth: '140px'
      },
      // 弹窗相关
      dialogInfo: {
        title: {
          login: '登陆',
          registered: '注册'
        },
        visible: false,
        type: '',
        btLoading: false
      }
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  watch: {
    'validCode' (val) {
      console.log(val)
    },
    'dialogInfo.visible' (val) {
      const formInfo = this.formInfo
      if (!val) {
        // 表单验证初始化
        if (formInfo.ref) {
          formInfo.ref.resetFields()
        }
        this.resetForm()
        // 重置弹窗按钮loading
        this.dialogInfo.btLoading = false
      }
    },
    'dialogInfo.type' (val) {
      const formInfo = this.formInfo
      switch (val) {
        case 'login':
          for (const item of formInfo.fieldList) {
            if (['name', 'validCode'].includes(item.value)) {
              item.show = false
            }
          }
          break
        case 'registered':
          for (const item of formInfo.fieldList) {
            if (['name', 'validCode'].includes(item.value)) {
              item.show = true
            }
          }
          break
      }
    }
  },
  mounted () {
    console.log(this.userInfo)
    this.initRules()
  },
  methods: {
    // 初始化验证
    initRules () {
      const formInfo = this.formInfo
      formInfo.rules = this.$initRules(formInfo.fieldList)
    },
    // 按钮点击
    handleClick (type, data) {
      const dialogInfo = this.dialogInfo
      switch (type) {
        case 'login':
        case 'registered':
          dialogInfo.visible = true
          dialogInfo.type = type
          break
      }
    },
    // 按钮提交
    handleConfirm (type, data) {
      const formInfo = this.formInfo
      const dialogInfo = this.dialogInfo
      formInfo.ref.validate(valid => {
        if (valid) {
          let api
          if (type === 'login') {
            api = loginApi
          } else if (type === 'registered') {
            api = registeredApi
          } else {
            return
          }
          dialogInfo.btLoading = true
          const params = JSON.parse(JSON.stringify(formInfo.data))
          delete params.validCode
          api(params)
            .then(res => {
              if (res.success) {
                if (type === 'login') {
                  _setCookie('token', res.token)
                  // 设置cookie
                  this.$store.dispatch('user/setToken', res.token)
                  // 设置
                  this.$store.dispatch('user/setUserInfo', res.content.data)
                }
                dialogInfo.visible = false
              }
              this.$message({
                showClose: true,
                message: res.message,
                type: res.success ? 'success' : 'error',
                duration: 3500
              })
              dialogInfo.btLoading = false
            })
            .catch(() => {
              dialogInfo.btLoading = false
            })
        }
      })
    },
    // 表单初始化
    resetForm () {
      this.formInfo.data = {
        name: '',
        account: '',
        validCode: '',
        password: '',
        type: 1 // 论坛端登陆
      }
    }
  }
}
</script>

<style scoped lang="scss">
  @import '@/common/style/base.scss';
  .user-tool{
    display: flex;
    justify-content: flex-end;
    width: 25%;
    padding: 0 15px;
    .login{
      font-size: 13px;
      .bt-login, .bt-registered{
        display: inline-block;
        padding: 0 12px;
        cursor: pointer;
        height: 34px;
        line-height: 34px;
        font-weight: 500;
        border-radius: 5px;
      }
      .bt-login{
        color: $theme;
        &:hover{
          background: #F3F3F3;
        }
      }
      .bt-registered{
        margin-left: 10px;
        background: $theme;
        color: white;
        transition: all .2s linear;
        &:hover{
          background: rgb(205,92,92);
        }
      }
    }
    .valid-code{
      display: flex;
      .el-input{
        margin-right: 10px;
        flex: 1;
      }
    }
    .bt-confirm{
      margin-top: 20px;
      margin-left: 140px;
      width: calc(80% - 140px);
    }
    .user{
      display: flex;
      align-items: center;
      font-size: 14px;
      .bt-created{
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        padding: 6px 12px;
        height: 34px;
        color: #333;
        background: #fff;
        border: 1px solid #ccc;
        border-radius: 3px;
        box-shadow: 0 1px 1px rgba(0,0,0,0.05);
        transition: all .2s linear;
        &:hover{
          background: #e6e6e6;
          border-radius: #adadad;
        }
      }
      .el-icon-bell, .el-icon-message{
        cursor: pointer;
        margin: 0 10px;
        font-size: 20px;
        &:hover{
          color: $theme;
        }
      }
      .avatar{
        margin-left: 10px;
        cursor: pointer;
        display: inline-block;
        width: 35px;
        height: 35px;
        border-radius: 50%;
        background-size: cover;
        background-position: center;
      }
    }
  }
</style>
<style lang="scss">
.user-tool{
  .el-dialog{
    top: 5vh;
    width: 560px;
  }
  .el-dialog__header{
    background: #f3f3f3;
    overflow: hidden;
    border-radius: 6px 6px 0 0;
  }
  .page-form{
    width: 80%;
  }
}
</style>

