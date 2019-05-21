<template>
  <div class="page-container aaa">
    <div class="main">
      <p class="title">{{ articleInfo.title }}</p>
      <div class="markdown" v-html="marked(articleInfo.content)" />
    </div>
  </div>
</template>

<script>
import { getArticleInfoApi } from '@/api/home'
import marked from '@/common/js/marked'
export default {
  data () {
    return {
      marked,
      articleInfo: {}
    }
  },
  mounted () {
    this.getArticleInfo()

    setTimeout(() => {
      document.querySelector('.aaa').addEventListener('click', e => {
        // 阻止默认事件
        e.preventDefault()
        // 定义a标签跳转规则
        if (e.target.nodeName === 'A') {
          this.$fn.openWindow(e.target.href)
        }
      })
    }, 1000)
  },
  methods: {
    getArticleInfo () {
      getArticleInfoApi(this.$route.params.id).then(res => {
        if (res.success) {
          this.articleInfo = res.content[0]
        } else {
          this.$router.push('/404')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.page-container{
  .main{
    width: 75%;
    padding-left: 10px;
    .title{
      font-size: 32px;
      font-weight: bold;
      color: black;
      margin-bottom: 40px;
    }
  }
}
</style>

