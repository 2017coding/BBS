<template>
  <el-tabs type="card">
    <el-tab-pane label="" v-for="(item, index) in tabList" :key="index">
      <span slot="label"><i :class="item.icon"></i>{{item.name}}</span>
      <div class="">{{item.name}}</div>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  name: 'Tabs',
  props: {
    tabList: {
      type: Array,
      default: () => {
        return []
      }
    }
  }
}
</script>

<style scoped>
</style>
