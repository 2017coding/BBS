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
  model: {
    prop: 'value',
    event: 'select'
  },
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
    }
  },
  data () {
    return {
      tags: [],
      reqStatus: false,
      tagData: []
    }
  },
  watch: {
    tags (val) {
      this.$emit('select', val)
    }
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
