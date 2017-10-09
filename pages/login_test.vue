<template>
  <div>
    <h1>登入注册测试页面</h1>
    <hr>
    <div>
      <h2>用户信息</h2>
      <div>
        <p v-if="account.time">
          <span v-if="account.provider.length === 0">邮箱：{{account.email}}, 用户名： {{account.username}}</span>
          <span v-else>第三方登入： {{account.provider}}</span>
          <br>
          <span><button @click="logoutClick">退出</button></span>
        </p>
        <p v-else>
          当前未登入
        </p>
        <div>
          <button @click="setAccount">手动刷新</button>
        </div>
      </div>
      <hr>
    </div>
    <div>
      <h2>登入</h2>
      <div>
        <div>
          <input type="text" v-model="login.username"> 用户名 或 邮箱 <br>
          <input type="text" v-model="login.password"> 密码 <br>
        </div>
        <div>
          <button type="button" @click="loginClick">登入</button>
        </div>
        <div>
          <a href="/api/login/github">github 登入</a>
        </div>
      </div>
      <hr>
    </div>
    <div>
      <h2>注册</h2>
      <div>
        <input type="text" v-model="reg.email"> 邮箱 <br>
        <input type="text" v-model="reg.username"> 用户名 <br>
        <input type="text" v-model="reg.password"> 密码 <br>
      </div>
      <div>
        <button type="button" @click="register">注册</button>
      </div>
      <hr>
    </div>
  </div>
</template>

<script>
  import axios from '~/plugins/axios'

  export default {
    data () {
      return {
        login: { // 登入的用户名和密码
          username: '',
          password: ''
        },
        reg: { // 注册所需信息
          email: '',
          username: '',
          password: ''
        },
        account: {} // 用户信息
      }
    },
    mounted () {
      this.setAccount()
    },
    methods: {
      /**
       * 点击登入
       */
      loginClick () {
        axios.post('/api/login', {username: this.login.username, password: this.login.password}).then(({data: res}) => {
          if (res.success) {
            alert('登入成功')
            this.setAccount()
          } else {
            alert(res.message)
          }
        })
      },
      register () {
        axios.post('/api/register', {
          username: this.reg.username,
          password: this.reg.password,
          email: this.reg.email
        }).then(({data: res}) => {
          if (res.success) {
            alert('注册成功')
            this.setAccount()
          } else {
            alert(res.message)
          }
        })
      },
      /**
       * 获取当前用户信息
       */
      setAccount () {
        axios.get('/api/getAccount').then(({data: res}) => {
          if (!res.success) {
            alert(res.message)
          } else if (res.account) {
            this.account = res.account
          } else {
          }
        })
      },
      /**
       * 退出
       */
      logoutClick () {
        axios.get('/api/logout').then(() => {
          alert('退出成功')
          this.account = {}
        })
      }
    }
  }
</script>

