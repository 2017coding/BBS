<template>
  <div class="page-container">
    <div class="main">
      <el-button
        class="create"
        type="primary"
        icon="el-icon-plus"
        size="medium"
      >提问题</el-button>
      <tabs />
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
    }
  },
  methods: {
    // 获取问答列表
  }
}
</script>

<style lang="scss" scoped>
.page-container{
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
