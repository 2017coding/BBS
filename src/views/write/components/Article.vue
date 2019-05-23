<template>
  <div class="write-article">
    <!-- 标题 -->
    <div class="title">
      <el-select v-model="form.type" placeholder="请选择">
        <el-option label="原创" :value="1" />
      </el-select>
      <el-input v-model="form.title" :autofocus="true" class="input-with-select" placeholder="标题: 和你讲讲我的故事" />
    </div>
    <!-- 相关设置 -->
    <div class="config">
      <el-select v-model="form.column" size="small" placeholder="发布专栏(选填)" style="margin-right: 10px;" clearable>
        <el-option
          v-for="item in columnList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <select-tags v-model="form.tags" class="select-tags" :limit="5" :placeholder="'请选择相关的标签'" />
    </div>
    <!-- 内容 -->
    <mavon-editor class="mavon-editor" :value.sync="form.content" :max-height="'100%'" />
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
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    writeStatus: {
      type: String,
      default: 'create'
    },
    commit: {
      type: Number,
      default: 0
    },
    btLoading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      columnList: [],
      timer: null,
      form: {
        id: '',
        type: 1,
        title: '',
        column_id: '',
        tags: [],
        content: ''
      }
    }
  },
  watch: {
    data (val) {
      for (const key in val) {
        if (key in this.form) {
          this.form[key] = val[key]
        }
      }
      clearTimeout(this.timer)
    },
    'form.title' () {
      this.dataChange()
    },
    'form.tags' () {
      this.dataChange()
    },
    'form.content' (val) {
      this.dataChange()
    },
    // 监听到外部的提交指令，发布文章
    'commit' (val) {
      const form = this.form
      const api = form.id ? updateArticleApi : createArticleApi
      api({ ...form, flag: 3 }).then(res => {
        this.$emit('update:btLoading', false)
        if (res.success) {
          const id = form.id || res.content.id
          // 进去文章页面
          this.$router.push({
            path: `/columns/article/${id}`
          })
        }
        this.$message({
          showClose: true,
          message: res.success ? '发布成功' : '发布失败',
          type: res.success ? 'success' : 'error',
          duration: 3500
        })
      }).catch(() => {
        this.$emit('update:btLoading', false)
      })
    }
  },
  methods: {
    // 数据改变要做的事情
    dataChange () {
      this.$emit('update:writeStatus', 'save')
      const form = this.form
      const api = form.id ? updateArticleApi : createArticleApi
      if (this.timer) {
        clearTimeout(this.timer)
      }
      // 五秒后进行数据创建或者编辑的操作
      this.timer = setTimeout(() => {
        if (!form.title) {
          form.title = '未指定标题的文章'
        }
        api(form).then(res => {
          if (res.success) {
            if (!form.id) {
              form.id = res.content.id
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
