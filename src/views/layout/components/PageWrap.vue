<template>
  <div class="page-wrap">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'PageWrap',
  data () {
    return {
    }
  }
}
</script>

<style scoped lang="scss">
  .page-wrap{
    position: relative;
    max-width: 1280px;
    min-height: calc(100% - 60px - 75px);
    margin: 0 auto;
    margin-top: 20px;
    padding: 0 20px;
  }
</style>
