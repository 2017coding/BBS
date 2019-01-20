<template>
  <div class="user">
    <div class="login" v-if="true">
      <a class="bt-login" @click="handleClick('login')">立即登录</a>
      <a class="bt-registered" @click="handleClick('registered')">免费注册</a>
    </div>
    <template v-else>
    </template>
    <el-dialog :title="dialogInfo.header[dialogInfo.status]" :visible.sync="dialogInfo.show" width="40%" top="5vh">
      <el-form :model="form" :rules="rules" ref="form" label-width="140px" style="width: 80%;">
        <template v-for="(item, index) in fieldList[dialogInfo.status]">
          <div class="valid-code" v-if="item.value === 'validCode'" :key="index">
            <el-form-item :prop="item.value">
              <el-input v-model.trim="form[item.value]" :placeholder="getPlaceholder(item)"></el-input>
            </el-form-item>
            <valid-code :validCode.sync="validCode" v-if="dialogInfo.show"></valid-code>
          </div>
          <el-form-item :label="item.key" :prop="item.value" :key="index" v-else>
            <el-input v-model.trim="form[item.value]" :placeholder="getPlaceholder(item)"></el-input>
          </el-form-item>
        </template>
      </el-form>
      <el-button class="bt-confirm" type="primary" @click="handleConfirm(dialogInfo.status)">{{dialogInfo.header[dialogInfo.status]}}</el-button>
    </el-dialog>
  </div>
</template>

<script>
import ValidCode from '@/components/ValidCode'
export default {
  name: 'user',
  components: {
    ValidCode
  },
  data () {
    return {
      // 表单参数
      validCode: '',
      form: {
        username: '',
        account: '',
        validCode: '',
        password: ''
      },
      rules: {
      },
      fieldList: {
        login: [
          {value: 'account', key: '手机号 或 Email', type: 'input', required: true},
          {value: 'password', key: '密码', type: 'input', required: true}
        ],
        registered: [
          {value: 'username', key: '你的名字', placeholder: '真实姓名或昵称', type: 'input', required: true},
          {value: 'account', key: '手机号 或 Email', type: 'input', required: true},
          {value: 'validCode', key: '验证码', type: 'input', required: true},
          {value: 'password', key: '密码', type: 'input', required: true}
        ]
      },
      dialogInfo: {
        header: {
          login: '登录',
          registered: '注册'
        },
        show: false,
        status: '',
        btLoading: false
      }
    }
  },
  watch: {
    'validCode' (val) {
      console.log(val)
    },
    'dialogInfo.show' () {
      // 弹窗隐藏时，将弹窗数据初始化
      if (!this.dialogInfo.show) {
        // 表单验证初始哈
        if (this.$refs.form) {
          this.$refs.form.resetFields()
        }
        // 表单内容初始化
        this.resetForm()
        // 按钮loading消失
        this.dialogInfo.btLoading = false
      }
    }
  },
  mounted () {
    this.initRules()
  },
  methods: {
    // 初始化验证数据
    initRules () {
      let obj = {}
      // 循环字段列表
      for (let key in this.fieldList) {
        for (let child of this.fieldList[key]) {
          let type = child.type === 'select' ? '选择' : '输入'
          if (child.required) {
            if (child.rules) {
              obj[child.value] = {
                required: child.required,
                validator: child.rules,
                trigger: 'blur'
              }
            } else {
              obj[child.value] = {
                required: child.required,
                message: '请' + type + child.key,
                trigger: 'blur'
              }
            }
          }
        }
      }
      this.rules = obj
    },
    // 得到placeholder的显示
    getPlaceholder (data) {
      let placeholder
      if (data.placeholder) {
        return data.placeholder
      }
      if (data.type === 'input' || data.type === 'textarea') {
        placeholder = '请输入' + data.key
      } else if (data.type === 'select' || data.type === 'date') {
        placeholder = '请选择' + data.key
      } else {
        placeholder = data.key
      }
      return placeholder
    },
    // 按钮点击
    handleClick (type, data) {
      switch (type) {
      case 'login':
      case 'registered':
        this.dialogInfo.show = true
        this.dialogInfo.status = type
        break
      }
    },
    // 按钮提交
    handleConfirm (type, data) {
      this.$refs.form.validate(valid => {
        if (valid) {
        }
      })
    },
    // 表单初始化
    resetForm () {
      this.form = {
        username: '',
        account: '',
        password: ''
      }
    }
  }
}
</script>

<style scoped lang="scss">
  @import '@/common/style/base.scss';
  .user{
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
    }
    .bt-confirm{
      margin-top: 20px;
      margin-left: 140px;
      width: calc(80% - 140px);
    }
  }
</style>
<style lang="scss">
  .user{
    .el-dialog__header{
      background: #f3f3f3;
      overflow: hidden;
      border-radius: 6px 6px 0 0;
    }
  }
</style>
