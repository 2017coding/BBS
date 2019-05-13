<template>
  <div class="write-article">
    <!-- 标题 -->
    <div class="title">
      <el-input v-model="query.title" :autofocus="true" class="input-with-select" placeholder="标题: 一句话说清问题，用问号结尾" />
    </div>
    <!-- 相关设置 -->
    <div class="config">
      <el-select v-model="templateValue" size="small" placeholder="选择提问模板(可选)" style="margin-right: 10px;" clearable>
        <el-option
          v-for="item in templateList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <select-tags v-model="query.tags" class="select-tags" :limit="5" :placeholder="'请选择相关的标签'" />
    </div>
    <!-- 内容 -->
    <mavon-editor
      class="mavon-editor"
      :value.sync="query.content"
      :max-height="'100%'"
      :placeholder="placeholder"
    />
  </div>
</template>

<script>
import SelectTags from '@/components/SelectTags'
import MavonEditor from '@/components/MavonEditor'
export default {
  components: {
    SelectTags,
    MavonEditor
  },
  data () {
    return {
      templateValue: '',
      templateList: [
        { label: '开发实战相关', value: 1 },
        { label: '编程题目相关', value: 2 },
        { label: '工具软件相关', value: 3 }
      ],
      placeholder: '请描述你的问题...',
      query: {
        type: '1',
        title: '',
        tags: [],
        content: ''
      }
    }
  },
  watch: {
    templateValue (val) {
      if (!val) {
        this.query.content = ''
        return
      }
      this.getTemplate(val)
    }
  },
  methods: {
    getTemplate (type) {
      switch (type) {
        case 1:
          this.query.content = `
### 问题描述


### 问题出现的环境背景及自己尝试过哪些方法


### 相关代码
// 请把代码文本粘贴到下方（请勿用图片代替代码）


### 你期待的结果是什么？实际看到的错误信息又是什么？
`
          break
        case 2:
          this.query.content = `
### 题目描述


### 题目来源及自己的思路


### 相关代码
// 请把代码文本粘贴到下方（请勿用图片代替代码）


### 你期待的结果是什么？实际看到的错误信息又是什么？
`
          break
        case 3:
          this.query.content = `
### 问题描述


### 问题出现的平台版本及自己尝试过哪些方法


### 相关代码
// 请把代码文本粘贴到下方（请勿用图片代替代码）


### 你期待的结果是什么？实际看到的错误信息又是什么？
`
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .write-article{
    display: flex;
    flex-direction: column;
    height: 100%;
    .title{
      margin-bottom: 15px;
    }
    .config{
      display: flex;
      margin-bottom: 15px;
      .select-tags{
        flex: 1;
      }
    }
    .mavon-editor{
      flex: 1;
    }
  }
</style>
