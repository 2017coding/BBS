<template>
  <div class="page-tags">
    <el-row :gutter="40">
      <el-col
        v-for="(item, index) in tagData"
        :key="index"
        :xs="12"
        :sm="12"
        :lg="6"
      >
        <div class="tagInfo">
          <div class="tagType">
            {{ item.name }}
          </div>
          <!-- <ul class="tag">1</ul> -->
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getTagTypeApi } from '@/api/tags'

export default {
  data () {
    return {
      tagData: []
    }
  },
  mounted () {
    this.getTags()
  },
  methods: {
    getTags () {
      getTagTypeApi().then(res => {
        if (res.success) {
          this.tagData = res.content
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/common/style/mixin.scss';
  .page-tags{
    .tagInfo{
      margin-bottom: 20px;
      .tagType{
        position: relative;
        height: 40px;
        line-height: 40px;
        color: rgb(50, 50, 50);
        font-weight: bold;
        &::after{
          @include border-1px('bottom');
        }
      }
    }
  }
</style>
