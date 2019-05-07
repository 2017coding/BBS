<template>
  <div class="page-home">
    <sidebar />
    <Main />
    <div class="right">
      <Notices />
      <Advertising />
      <lives />
      <activity />
    </div>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar'
import Main from './components/Main'
import Notices from './components/Notices'
import Advertising from './components/Advertising'
import Lives from './components/Lives'
import Activity from './components/Activity'
export default {
  components: {
    Sidebar,
    Main,
    Notices,
    Advertising,
    Lives,
    Activity
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped lang="scss">
  @import '@/common/style/base.scss';
  .page-home{
    display: flex;
    .right{
      padding: 0 15px;
      width: 25%;
    }
  }
</style>
