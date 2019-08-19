<template>
  <el-tabs v-model="tabActive" type="card">
    <el-tab-pane v-for="(item, index) in tabList" :key="index" :name="item.id">
      <span slot="label"><i :class="item.icon" />{{ item.name }}</span>
      <questions-item v-for="(questionItem, questionIndex) in questionList" :key="questionIndex" :data="questionItem" />
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import QuestionsItem from './QuestionsItem'

export default {
  name: 'Tabs',
  components: {
    QuestionsItem
  },
  data () {
    return {
      tabActive: 1,
      tabList: [
        { id: 1, name: '最新回答', icon: '' },
        { id: 2, name: '等待回答', icon: '' },
        { id: 3, name: '热门回答', icon: '' }
        // { id: 4, name: '付费回答', icon: '' },
        // { id: 5, name: '众审中心', icon: '' }
      ]
    }
  },
  watch: {
    tabActive: {
      handler (val) {
        this.getList()
      },
      immediate: true
    }
  },
  methods: {
    getList () {
      this.questionList = [
        [],
        [],
        []
      ]
    }
  }
}
</script>

<style scoped>
</style>
