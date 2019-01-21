<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
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
