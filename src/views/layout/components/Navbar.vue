<template>
  <div class="LLLyh-header">
    <div class="navbar">
      <p class="logo" @click="$router.push('/')">
        <span class="LLL">LLL</span>
        <span class="yh">yh</span>
      </p>
      <div class="mid">
        <navbar-item />
        <search />
      </div>
      <user-tool />
    </div>
  </div>
</template>

<script>
import NavbarItem from './NavbarItem'
import Search from './Search'
import UserTool from './UserTool'
export default {
  name: 'Navbar',
  components: {
    NavbarItem,
    Search,
    UserTool
  }
}
</script>

<style scoped lang="scss">
  @import '@/common/style/base.scss';
  .LLLyh-header{
    border-top: 3px solid $theme;
    box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.1), 0 1px rgba(0,0,0,0.1);
    height: $headHeight;
    background: #fafafa;
    .navbar{
      margin: auto;
      display: flex;
      // justify-content: center;
      align-items: center;
      max-width: $maxWidth;
      min-width: $minWidth;
      height: 100%;
      font-size: 16px;
      .logo{
        width: 16.66667%;
        padding: 0 15px;
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
      .mid{
        display: flex;
        flex: 1;
        .hide{
          width: 0;
          transition: width .3s;
        }
      }
    }
    .tags{
      margin: auto;
      margin-top: 10px;
      padding: 0 20px;
      display: flex;
      // justify-content: center;
      align-items: center;
      max-width: $maxWidth;
      height: 100%;
      font-size: 16px;
    }
  }
</style>
