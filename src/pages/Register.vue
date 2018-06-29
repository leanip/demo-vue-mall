<template lang='pug'>
  .register
    van-nav-bar(title='用户注册' left-text='返回' left-arrow @click-left='goBack')
    .register-panel
      van-field(
        v-model='username'
        label='用户名'
        placeholder='请输入用户名'
        icon='clear'
        @click-icon='username=""'
        required :error-message='usernameErrorMsg')
      van-field(
        v-model='password'
        type='password'
        label='密码'
        placeholder='请输入密码'
        required
        icon='clear'
        @click-icon='password=""'
        :error-message='passwordErrorMsg')
      van-field(
        v-model='password2'
        type='password'
        label='确认密码'
        placeholder='请再次输入密码'
        required
        icon='clear'
        @click-icon='password2=""'
        :error-message='password2ErrorMsg')
      .register-button
        van-button(type='primary' size='large' @click='registerAction' :loading='openLoading') 马上注册
</template>

<script>
  import axios from 'axios'
  import { Toast } from 'vant'
  import url from '@/serviceAPI.config'

  export default {
    data() {
      return {
        username: '',
        password: '',
        password2: '',
        openLoading: false,
        usernameErrorMsg: '',
        passwordErrorMsg: '',
        password2ErrorMsg: ''
      }
    },
    methods: {
      goBack() {
        this.$router.go(-1)
      },
      registerAction() {
        this.checkForm() && this.register()
      },
      register() {
        this.openLoading = true
        axios({
          url: url.registerUser,
          method: 'post',
          data: {
            username: this.username,
            password: this.password
          }
        })
        .then(res => {
          if (res.data.code === 200) {
            Toast.success('注册成功')
            this.$router.push('/')
          } else {
            Toast.fail('注册失败')
            this.openLoading = false
          }
        })
        .catch(err => {
          console.log(err)
          Toast.fail('注册失败')
          this.openLoading = false
        })
      },
      checkForm() {
        let isOk = true

        if (this.username.length < 5) {
          isOk = false
          this.usernameErrorMsg = '用户名不能小于5位'
        } else {
          this.usernameErrorMsg = ''
        }

        if (this.password.length === 0) {
          isOk = false
          this.passwordErrorMsg = '密码不能为空'
        } else if (this.password.length < 6) {
          isOk = false
          this.passwordErrorMsg = '密码不能小于6位'
        } else {
          this.passwordErrorMsg = ''
        }

        if (this.password2.length === 0) {
          isOk = false
          this.password2ErrorMsg = '确认密码不能为空'
        } else if (this.password !== this.password) {
          isOk = false
          this.password2ErrorMsg = '两次输入密码不一致'
        } else {
          this.password2ErrorMsg = ''
        }

        return isOk
      }
    }
  }
</script>

<style lang='sass' scoped>
.register-panel
  width: 96%
  margin: 20px auto
  padding-bottom: 50px
  border-radius: 5px
.register-button
  padding-top: 10px
</style>