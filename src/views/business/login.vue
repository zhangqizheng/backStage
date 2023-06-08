<template>
  <div class="login-layout login">
    <div class="header">
      <div class="logo pull-left">
        <img>
        <span>{{ sysname }}</span>
      </div>
    </div>
    <div class="content">
      <div class="pull-right login-content">
        <div class="login-main">
          <div class="login-title"><img></div>
          <div class="login-form">
            <el-form ref="dataForm" :model="dataForm" :rules="dataRule" status-icon @keyup.enter.native="dataFormSubmit()">
              <el-form-item prop="username">
                <el-input v-model="dataForm.username" placeholder="手机号/账号" prefix-icon="el-icon-user" />
              </el-form-item>
              <el-form-item prop="password">
                <el-input v-model="dataForm.password" type="password" placeholder="密码" prefix-icon="el-icon-lock" />
              </el-form-item>
              <el-form-item v-if="showCaptcha" prop="captcha" lable-position="left">
                <el-input v-model="dataForm.captcha" type="text" style="width:50%;float: left" :maxlength="5" placeholder="验证码" />
                <img class="form-yzm" :src="captchaPath" @click="getCaptcha()">
              </el-form-item>
              <el-form-item><el-button type="primary" round :loading="isLoading" style="width: 100%" @click="dataFormSubmit()">登录</el-button></el-form-item>
              <el-form-item>
                <el-button type="text" @click="forgetPassword()">忘记密码</el-button>
                <el-button type="text" @click="register()">立即注册</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="warp">
        <div class="logo-buttom" />
        <p class="bottom-text">
          <span>{{ bottom }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import common from '@/api/common'
//  import dialogFormTips from './real-name-tips-dialog';
export default {
  name: 'Login',
  data() {
    return {
      isLoading: false,
      sysname: '浪潮-神荼平台',
      bottom: '浪潮神荼平台，浪潮科技政府管理提供技术支持',
      captchaPath: '',
      showCaptcha: false,
      dataForm: {
        username: '',
        password: '',
        captcha: ''
      }
    }
  },
  computed: {
    dataRule: function() {
      const rules = {
        userName: [{ required: true, message: '账号不能为空', trigger: 'blur' }],
        password: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
      }
      if (this.showCaptcha) {
        rules['captcha'] = [{ required: true, message: '验证码不能为空', trigger: 'blur' }]
      }
      return rules
    }
  },
  mounted() {
    this.isLoading = false
  },

  methods: {
    register() {
      this.$msgbox('请联系管理员', '注册账号')
    },
    forgetPassword() {
      this.$msgbox('敬请期待', '找回密码')
    },
    // 提交表单 登陆
    dataFormSubmit() {
      const formName = 'dataForm'
      // const data = {}
      this.$refs[formName].validate(valid => {
        if (!valid) {
          return
        }
        this.isLoading = true
        common
          .login(this.dataForm)
          .then(data => {
          })
          .catch(() => {
            this.getCaptcha()
            this.dataForm.captcha = ''
            this.$message.error('登录失败')
          })
          .finally(() => {
            this.isLoading = false
          })
      })
    },
    // 获取验证码
    getCaptcha() {
      // this.captchaPath = common.getCodeImg();
      common
        .getComeImgData()
        .then(res => {
          this.captchaPath = 'data:image/jpeg;base64,' + res.data
        })
        .catch(() => {
          this.$message.error('获取验证码失败')
        })
        .finally(() => {})
    },
    captchaError() {
      console.log('')
    }
  }
}
</script>
