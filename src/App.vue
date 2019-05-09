<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  watch: {
    $route (val) {
      this.invalidRoute(val)
    }
  },
  methods: {
    invalidRoute (val) {
      const matched = this.$route.matched
      // 访问不存在的路由进入404页面
      if (!matched || matched.length === 0 || val.path === '/404') {
        this.$router.push('/404')
        return
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
