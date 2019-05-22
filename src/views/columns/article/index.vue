<template>
  <div class="page-container aaa">
    <div class="main">
      <div class="">专栏 / 文章详情</div>
      <div class="author-info">
        <i :style="`background-image: url(${articleInfo.avatar})`" class="avatar" />
        <div class="release-info">
          <div class="">
            <router-link :to="''" class="author">{{ articleInfo.create_user_name }}</router-link>
            <a class="focus">{{ '关注作者' }}</a>
          </div>
          <span class="time">{{ $fn.timeView(articleInfo.create_time) }}发布</span>
        </div>
      </div>
      <p class="title">{{ articleInfo.title }}</p>
      <div class="article-info">
        <span :class="'tag ' + getClass(articleInfo.type)">{{ $fn.getDataName({dataList: listTypeInfo.articleTypeList, value: 'value', label: 'key', data: articleInfo.type}) }}</span>
        <span class="more">
          <span class="read-times">0次阅读</span>
          ·
          <span class="read-time">读完需要 {{ articleInfo.readTime }} 分钟</span>
        </span>
      </div>
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
      listTypeInfo: {
        articleTypeList: [
          { value: 1, key: '原创' }
        ],
        titleList: []
      },
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
          // marked(this.articleInfo.content).match(/(<h>)/)
          this.articleInfo.readTime = Math.floor(this.articleInfo.content.length / 300)
        } else {
          this.$router.push('/404')
        }
      })
    },
    getClass (type) {
      switch (type) {
        case 1:
          return 'original'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.page-container{
  .main{
    width: 75%;
    padding-left: 10px;
    .author-info{
      display: flex;
      margin: 20px 0;
      .avatar{
        display: inline-block;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-size: cover;
        background-position: center;
      }
      .release-info{
        margin-left: 10px;
        .author, .time{
          padding: 2px 0;
        }
        .author{
          display: inline-block;
          font-size: 16px;
          font-weight: bold;
          color: red;
          &:hover{
            text-decoration: underline;
          }
        }
        .focus{
          margin-left: 10px;
        }
        .time{
          display: block;
        }
      }
    }
    .title{
      font-size: 30px;
      font-weight: bold;
      color: black;
      margin-bottom: 20px;
    }
    .article-info{
      margin-bottom: 40px;
      color: #999;
      .tag{
        display: inline-block;
        padding: 5px 10px;
      }
      .original{
        color: #017E66;
        background: rgba(1,126,102,0.08);
      }
      .more{
        margin-left: 10px;
      }
    }
  }
}
</style>

