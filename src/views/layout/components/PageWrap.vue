<template>
  <div class="page-wrap">
    <router-view />
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
  @import '@/common/style/base.scss';
  .page-wrap{
    position: relative;
    max-width: $maxWidth;
    min-height: calc(100% - 60px - 75px);
    margin: auto;
    margin-top: 30px;
  }
</style>
