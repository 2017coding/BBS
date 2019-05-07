<template>
  <footer class="footer">
    <span>永远相信美好的事情即将发生</span>
  </footer>
</template>

<script>
export default {
  name: 'Footerbar',
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/common/style/base.scss';
  @import '@/common/style/mixin.scss';
  .footer{
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 54px;
    padding: 20px;
    span{
      background: linear-gradient(to right, #81FFEF, #F067B4);
      -webkit-background-clip: text;
      color: transparent;
    }
    &::after{
      @include border-1px('top', #d8dce5);
    }
  }
</style>
