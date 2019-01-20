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
    max-width: 1280px;
    margin-top: 20px;
    margin-left: auto;
    margin-right: auto;
  }
</style>
