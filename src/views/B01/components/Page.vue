<template>
  <div class="page">
    <div class="carousel">
      <el-carousel height="150px">
        <el-carousel-item v-for="(item, index) in carouselList" :key="index">
          <img :src="item.src" style="width: 100%">
        </el-carousel-item>
      </el-carousel>
    </div>
    <page-head-config></page-head-config>
    <page-blog-list></page-blog-list>
  </div>
</template>

<script>
import PageHeadConfig from './PageHeadConfig'
import PageBlogList from './PageBlogList'
export default {
  name: 'Page',
  components: {
    PageHeadConfig,
    PageBlogList
  },
  data () {
    return {
      carouselList: [
        {src: require('@/assets/image/B01/a1.png')},
        {src: require('@/assets/image/B01/a2.png')}
      ]
    }
  }
}
</script>

<style scoped lang="scss">
.page{
  flex: 1;
  padding: 0 15px;
  .carousel{
    width: 100%;
    border-radius: 8px;
    overflow: hidden;
  }
}
</style>
