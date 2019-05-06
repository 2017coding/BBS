<template>
  <div class="B02">
    <el-button
      class="create"
      type="primary"
      icon="el-icon-plus"
      size="medium"
    >提问题</el-button>
    <tabs :tab-list="tabList" />
  </div>
</template>

<script>
import Tabs from './components/Tabs'
export default {
  components: {
    Tabs
  },
  data () {
    return {
      tabList: [
        { id: 1, name: '最新回答', icon: '' },
        { id: 2, name: '等待回答', icon: '' },
        { id: 3, name: '热门回答', icon: '' },
        { id: 4, name: '付费回答', icon: '' },
        { id: 5, name: '众审中心', icon: '' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.B02{
  .create{
    position: absolute;
    right: 20px;
    padding: 8px 8px;
  }
}
</style>
