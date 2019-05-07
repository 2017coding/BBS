<template>
  <div class="article-config">
    <template v-if="sidebarClickData.type === 1">
      <template v-if="sidebarClickData.config === 1">
        <h5 class="recommend">
          我的订阅
        </h5>
      </template>
      <template v-if="sidebarClickData.config === 2">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="日热门" name="day" />
          <el-tab-pane label="周热门" name="week" />
          <el-tab-pane label="月热门" name="month" />
        </el-tabs>
      </template>
      <template v-if="sidebarClickData.config === 3">
        <h5 class="new-content">最新内容</h5>
      </template>
    </template>
    <template v-if="sidebarClickData.type === 2">
      <h5 class="recommend">
        我的订阅
      </h5>
    </template>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'day',
      // 默认模式---为你推荐
      sidebarClickData: {
        type: 1,
        config: 1
      }
    }
  },
  mounted () {
    this.receiveEventBus()
  },
  methods: {
    receiveEventBus () {
      // 接收eventBus
      this.$eventBus.$on('sidebar-click', data => {
        this.sidebarClickData = data
      })
    },
    handleClick () {

    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/common/style/mixin.scss';
  .article-config{
    margin-top: 15px;
    .recommend, .new-content{
      position: relative;
      margin: 10px 0;
      height: 20px;
      line-height: 20px;
      &::after{
        @include border-1px('bottom');
        bottom: -10px;
      }
    }
  }
</style>
