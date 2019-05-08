<template>
  <el-tabs type="card">
    <el-tab-pane v-for="(item, index) in tabList" :key="index" label="">
      <span slot="label"><i :class="item.icon" />{{ item.name }}</span>
      <div class="">{{ item.name }}</div>
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
