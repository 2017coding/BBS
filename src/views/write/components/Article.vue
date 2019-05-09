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
    <!-- 相关设置 -->
    <div class="config">
      <el-select v-model="query.column" size="small" placeholder="发布专栏(选填)" style="margin-right: 10px;" clearable>
        <el-option
          v-for="item in columnList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <!-- 内容 -->
    <mavon-editor class="mavon-editor" :value.sync="query.content" :max-height="'100%'" />
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
      columnList: [],
      query: {
        type: '1',
        title: '',
        column: '',
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
      margin-bottom: 15px;
    }
    .config{
      display: flex;
      margin-bottom: 15px;
    }
    .mavon-editor{
      flex: 1;
    }
  }
</style>
