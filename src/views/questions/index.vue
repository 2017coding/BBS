<template>
  <div class="page-questions">
    <div class="main">
      <el-button
        class="create"
        type="primary"
        icon="el-icon-plus"
        size="medium"
      >提问题</el-button>
      <tabs :tab-list="tabList" />
    </div>
    <div class="right">
      <Notices />
      <Advertising />
      <lives />
      <activity />
    </div>
  </div>
</template>

<script>
import Tabs from './components/Tabs'
import Notices from './components/Notices'
import Advertising from './components/Advertising'
import Lives from './components/Lives'
import Activity from './components/Activity'

export default {
  components: {
    Tabs,
    Notices,
    Advertising,
    Lives,
    Activity
  },
  data () {
    return {
      tabList: [
        { id: 1, name: '最新回答', icon: '' },
        { id: 2, name: '等待回答', icon: '' },
        { id: 3, name: '热门回答', icon: '' },
        // { id: 4, name: '付费回答', icon: '' },
        { id: 5, name: '众审中心', icon: '' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.page-questions{
  display: flex;
  .main{
    position: relative;
    padding-left: 10px;
    width: 75%;
    .create{
      position: absolute;
      right: 0px;
      padding: 8px 8px;
    }
  }
  .right{
    padding: 0 15px;
    width: 25%;
  }
}
</style>
