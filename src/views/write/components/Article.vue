<template>
  <div class="write-article">
    <!-- 标题 -->
    <div class="title">
      <el-input v-model="query.title" :autofocus="true" class="input-with-select" placeholder="标题: 和你讲讲我的故事">
        <el-select slot="prepend" v-model="query.type" placeholder="请选择">
          <el-option label="原创" value="1" />
        </el-select>
      </el-input>
    </div>
    <!-- 专栏和标签 -->
    <!-- 内容 -->
    <mavon-editor class="mavon-editor" :value="query.content" :max-height="'100%'" />
  </div>
</template>

<script>
import MavonEditor from '@/components/MavonEditor'
export default {
  components: {
    MavonEditor
  },
  data () {
    return {
      query: {
        type: '1',
        title: '',
        content: ''
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
      margin-bottom: 20px;
    }
    .mavon-editor{
      flex: 1;
    }
  }
</style>
