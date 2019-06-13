<template>
  <el-select
    v-model="tags"
    multiple
    :size="size"
    :multiple-limit="limit"
    filterable
    :placeholder="placeholder"
    @focus="getTags()"
  >
    <el-option
      v-for="item in tagData"
      :key="item.id"
      :label="item.name"
      :value="item.id"
    />
  </el-select>
</template>

<script>
import { getTagApi } from '@/api/tags'
export default {
  name: 'SelectTags',
  props: {
    size: {
      type: String,
      default: 'small'
    },
    limit: {
      type: Number,
      default: 0
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    value: {
      type: Array
    }
  },
  data () {
    return {
      flag: 'inner', // 内 inner  外outside
      tags: [],
      reqStatus: false,
      tagData: []
    }
  },
  watch: {
    tags (val) {
      // 内部数据和外部不一样, 修改外部数据
      if (val !== this.value) {
        this.$emit('update:value', val)
        return
      }
      // 传入参数修改，不派发
      if (this.flag === 'outside') {
        this.flag = 'inner'
        return
      }
      this.$emit('update:value', val)
    },
    value: {
      handler: function (val) {
        this.flag = 'outside' // 标识为传入参数修改
        this.tags = val
      }
    }
  },
  created () {
    this.getTags()
  },
  methods: {
    getTags () {
      if (this.reqStatus) return
      getTagApi().then(res => {
        if (res.success) {
          this.reqStatus = true
          this.tagData = res.content
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
