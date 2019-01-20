<template>
  <div class="LLLyh-header">
    <div class="navbar">
      <p class="logo">
        <span class="LLL">LLL</span>
        <span class="yh">yh</span>
      </p>
      <navbar-item></navbar-item>
      <User></User>
    </div>
  </div>
</template>

<script>
import NavbarItem from './NavbarItem'
import User from './User'
export default {
  name: 'Navbar',
  components: {
    NavbarItem,
    User
  },
  data () {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    }
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">
  @import '@/common/style/base.scss';
  .LLLyh-header{
    border-top: 3px solid $theme;
    box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.1), 0 1px rgba(0,0,0,0.1);
    height: 60px;
    .navbar{
      margin: auto;
      padding: 0 20px;
      max-width: 1280px;
      height: 100%;
      display: flex;
      // justify-content: center;
      align-items: center;
      font-size: 16px;
      .logo{
        padding-right: 110px;
        font-size: 0;
        cursor: pointer;
        .LLL, .yh{
          font-size: 24px;
        }
        .LLL{
          color: $fontColor2;
        }
        .yh{
          color: $theme;
        }
      }
    }
  }
</style>
