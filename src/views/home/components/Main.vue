<template>
  <div class="main">
    <div class="carousel">
      <el-carousel v-loading="carouselLoading" height="150px">
        <el-carousel-item v-for="(item, index) in carouselList" :key="index">
          <!-- <span>{{item.title}}</span> -->
          <img :src="item.image" style="width: 100%" @click="handClick('carousel', item)">
        </el-carousel-item>
      </el-carousel>
    </div>
    <article-config />
    <article-list />
  </div>
</template>

<script>
import ArticleConfig from './ArticleConfig'
import ArticleList from './ArticleList'
import { getCarouselApi } from '@/api/home'

export default {
  name: 'Main',
  components: {
    ArticleConfig,
    ArticleList
  },
  data () {
    return {
      carouselLoading: true,
      carouselList: []
    }
  },
  mounted () {
    this.getCarouselList()
  },
  methods: {
    getCarouselList () {
      getCarouselApi({ status: 1 }).then(res => {
        this.carouselLoading = false
        if (res.success) {
          this.carouselList = res.content
        } else {
          this.$message({
            showClose: true,
            message: res.message,
            type: res.success ? 'success' : 'error',
            duration: 3500
          })
        }
      }).catch(() => {
        this.carouselLoading = false
      })
    },
    handClick (type, data) {
      switch (type) {
        case 'carousel':
          if (data.click === 1) {
            const url = location.href.replace(location.hash, '#/') + data.href.replace(/^\//, '')
            this.$fn.openWindow(url, '_self')
          } else if (data.click === 2) {
            const url = location.href.replace(location.hash, '#/') + data.href.replace(/^\//, '')
            this.$fn.openWindow(url)
          } else if (data.click === 3) {
            this.$fn.openWindow(data.href)
          }
          break
      }
    }
  }
}
</script>

<style scoped lang="scss">
.main{
  flex: 1;
  padding: 0 15px;
  .carousel{
    width: 100%;
    border-radius: 8px;
    overflow: hidden;
  }
}
</style>
