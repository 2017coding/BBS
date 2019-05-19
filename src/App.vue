<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import io from 'socket.io-client'
export default {
  name: 'App',
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  watch: {
    $route (val) {
      this.invalidRoute(val)
    }
  },
  mounted () {
    var socket = io('http://www.lyh.red:1313')
    socket.on('connect', function () {
      console.log(1)
    })
  },
  methods: {
    invalidRoute (val) {
      const matched = this.$route.matched
      // 访问不存在的路由进入404页面
      if (!matched || matched.length === 0 || val.path === '/404') {
        this.$router.push('/404')
        return
      }
      // 如果用户没有登录，进入这些页面将重定向到401页面
      if (!this.userInfo) {
        const inaccessibleList = ['/write', '/draft']
        if (inaccessibleList.includes(val.path)) {
          this.$router.push('/401')
          return
        }
      }
    }
  }
}
</script>

<style scope lang="scss">
@import '@/common/style/base.scss';
#app {
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: $fontSize1;
  color: $fontColor1;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
