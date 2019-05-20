<template>
  <div class="page-container">
    2222
  </div>
</template>

<script>
import { getArticleInfoApi } from '@/api/home'
export default {
  data () {
    return {
    }
  },
  mounted () {
    this.getArticleInfo()
  },
  methods: {
    getArticleInfo () {
      getArticleInfoApi(this.$route.params.id).then(res => {
        console.log(res.content[0].content)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

