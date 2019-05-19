<template>
  <div class="write-article">
    <!-- 标题 -->
    <div class="title">
      <el-select v-model="query.type" placeholder="请选择">
        <el-option label="原创" value="1" />
      </el-select>
      <el-input v-model="query.title" :autofocus="true" class="input-with-select" placeholder="标题: 和你讲讲我的故事" />
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
      <select-tags v-model="query.tags" class="select-tags" :limit="5" :placeholder="'请选择相关的标签'" />
    </div>
    <!-- 内容 -->
    <mavon-editor class="mavon-editor" :value.sync="query.content" :max-height="'100%'" />
  </div>
</template>

<script>
import SelectTags from '@/components/SelectTags'
import MavonEditor from '@/components/MavonEditor'
import { createArticleApi, updateArticleApi } from '@/api/write'
export default {
  components: {
    SelectTags,
    MavonEditor
  },
  props: {
    writeStatus: {
      type: String,
      default: 'create'
    }
  },
  data () {
    return {
      columnList: [],
      timer: null,
      query: {
        id: '',
        type: '1',
        title: '',
        column_id: '',
        tags: [],
        content: ''
      }
    }
  },
  watch: {
    'query.title' () {
      this.dataChange()
    },
    'query.tags' () {
      this.dataChange()
    },
    'query.content' (val) {
      this.dataChange()
    }
  },
  methods: {
    // 数据改变要做的事情
    dataChange () {
      this.$emit('update:writeStatus', 'save')
      const query = this.query
      const api = query.id ? updateArticleApi : createArticleApi
      if (this.timer) {
        clearTimeout(this.timer)
      }
      // 五秒后进行数据创建或者编辑的操作
      this.timer = setTimeout(() => {
        if (!query.title) {
          query.title = '未指定标题的文章'
        }
        api(query).then(res => {
          if (res.success) {
            if (!query.id) {
              query.id = res.content.id
            }
            this.$emit('update:writeStatus', 'finish')
          } else {
            this.$emit('update:writeStatus', 'unfinish')
          }
        }).catch(() => {
          this.$emit('update:writeStatus', 'unfinish')
        })
      }, 5000)
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
      display: flex;
      margin-bottom: 15px;
      .el-select{
        width: 100px;
      }
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
