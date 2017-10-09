<template>
  <div>
    正在登入中，请等待
  </div>
</template>

<script>
  import axios from '~/plugins/axios'

  export default {
    mounted () {
      axios.get('/api/login/github/callback' + location.search).then(({data: res}) => {
        if (!res.success) {
          alert(res.message)
        } else {
          alert('登入成功！')
          this.$router.push({path: '/login_test'})
        }
      })
    }
  }
</script>
