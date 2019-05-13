<template>
  <div class="page-main">
    <transition name="el-fade-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  name: 'PageMain',
  data () {
    return {
    }
  }
}
</script>

<style scoped lang="scss">
  @import '@/common/style/base.scss';
  .page-main{
    position: relative;
    max-width: $maxWidth;
    min-width: $minWidth;
    min-height: calc(100% - 64px - 54px);
    margin: auto;
    padding-top: 30px;
  }
</style>
