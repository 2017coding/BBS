<template>
  <div class="user-tool">
    <!-- 未登录显示 -->
    <div v-if="!userInfo" class="login">
      <a class="bt-login" @click="handleClick('login')">立即登录</a>
      <a class="bt-registered" @click="handleClick('registered')">免费注册</a>
    </div>
    <!-- 登录后显示 -->
    <div v-else class="user">
      <el-popover
        popper-class="user-tool-popover"
        placement="bottom-start"
        width="120"
        trigger="click"
      >
        <ul class="create-type-list">
          <li v-for="(item, index) in createTypeList.filter(item => item.show)" :key="index" :class="{[item.className]: item.className, item}">
            <router-link :to="item.path">{{ item.label }}</router-link>
          </li>
        </ul>
        <span slot="reference" class="bt-created">
          创建<i class="el-icon-caret-bottom" />
        </span>
      </el-popover>
      <router-link to="">
        <i class="el-icon-bell" />
      </router-link>
      <router-link to="">
        <i class="el-icon-message" />
      </router-link>
      <!-- 用户面板 -->
      <div class="panel" @mouseover="showUserPanel('over')" @mouseout="showUserPanel('out')">
        <i class="avatar" :style="`background-image: url(${userInfo.avatar || 'https://www.lyh.red/file/%E9%A6%96%E9%A1%B5%E8%BD%AE%E6%92%AD_20190418155210_g6fk/20190418160520_a4e7.jpg'})`" />
        <div v-if="userPanelVisible" class="container">
          <div class="score">声望 999</div>
          <ul class="menu">
            <li v-for="(item, index) in userMenu" :key="index" class="item">
              <router-link v-if="item.event === 'href'" :to="item.url">{{ item.name }}</router-link>
              <a v-else @click="handleClick(item.event)">{{ item.name }}</a>
            </li>
          </ul>
          <div class="foot">
            <router-link to="">用户申诉</router-link> ·
            <router-link to="">建议反馈</router-link> ·
            <router-link to="">邀请朋友</router-link>
          </div>
        </div>
      </div>
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
      userPanelVisible: false,
      timer: '',
      // 创建类型
      createTypeList: [
        { label: '提问题', show: true, path: '/write?type=ask' },
        { label: '发头条', show: false, path: '/write?type=submit' },
        { label: '写文章', show: true, path: '/write?type=write' },
        { label: '记笔记', show: false, path: '/write?type=record' },
        { label: '草稿箱', show: true, path: '/draft', className: 'draft' }
      ],
      // 用户菜单
      userMenu: [
        { name: '我的笔记', url: '', event: 'href' },
        { name: '我的主页', url: '', event: 'href' },
        { name: '我的收藏', url: '', event: 'href' },
        { name: '我的档案', url: '', event: 'href' },
        { name: '受邀回答', url: '', event: 'href' },
        { name: '我的资产', url: '', event: 'href' },
        { name: '付费问答', url: '', event: 'href' },
        { name: '个人设置', url: '', event: 'href' },
        { name: '众审中心', url: '', event: 'href' },
        { name: '退出', url: '', event: 'loginOut' }
      ],
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
      // console.log(val)
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
    this.initRules()
  },
  methods: {
    // 初始化验证
    initRules () {
      const formInfo = this.formInfo
      formInfo.rules = this.$initRules(formInfo.fieldList)
    },
    showUserPanel (type) {
      if (type === 'over') {
        this.userPanelVisible = true
        clearTimeout(this.timer)
      } else if (type === 'out') {
        this.timer = setTimeout(() => {
          this.userPanelVisible = false
        }, 500)
      }
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
        case 'loginOut':
          this.$store.dispatch('user/loginOut')
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
                  // 设置cookie过期时间为30天
                  _setCookie('token', res.token, { expires: 30 })
                  // 设置cookie
                  this.$store.dispatch('user/setToken', res.token)
                  // 设置
                  this.$store.dispatch('user/setUserInfo', res.content.data)
                }
                dialogInfo.visible = false
              } else {
                this.$message({
                  showClose: true,
                  message: res.message,
                  type: res.success ? 'success' : 'error',
                  duration: 3500
                })
              }
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
  @import '@/common/style/mixin.scss';
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
        &:hover, &:focus{
          background: #e6e6e6;
          border-radius: #adadad;
        }
        &:active{
          outline: 0;
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
      .panel{
        position: relative;
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
        .container{
          position: absolute;
          margin: 2px;
          top: 100%;
          right: 0;
          width: 240px;
          background: white;
          border: 1px solid rgba(0,0,0,0.15);
          box-shadow: 0 6px 12px rgba(0,0,0,0.175);
          border-radius: 3px;
          z-index: 99;
          .score, .foot{
            padding: 0 10px;
            height: 40px;
            line-height: 40px;
            text-align: center;
          }
          .foot{
            font-size: 12px;
            // text-align: center;
          }
          .menu{
            position: relative;
            padding: 10px 0;
            z-index: 99999;
            &::before{
              @include border-1px('top');
            }
            &::after{
              @include border-1px('bottom');
            }
            .item{
              display: inline-block;
              width: 50%;
              line-height: 1.4;
              padding: 3px 20px;
              cursor: pointer;
              &:hover{
                background: #f5f5f5;
              }
              a{
                font-size: 14px;
                color: rgb(100, 100, 100);
              }
            }
          }
        }
      }
    }
  }
</style>
<style lang="scss">
@import '@/common/style/mixin.scss';
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
.user-tool-popover{
  min-width: 120px!important;
  padding: 0!important;
  .create-type-list{
    padding: 5px 0;
    width: 100%;
    .item{
      padding: 5px;
      text-indent: 5px;
      &:hover{
        background: #e6e6e6;
      }
    }
    .draft{
      position: relative;
      margin-top: 10px;
      &::after{
        @include border-1px('top');
        top: -5px;
      }
    }
  }
}
</style>

