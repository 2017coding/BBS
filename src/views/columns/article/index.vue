<template>
  <div class="page-container">
    <div class="main">
      <div class="">专栏 / 文章详情</div>
      <div class="author-info">
        <router-link :to="''" class="author">
          <i :style="`background-image: url(${articleInfo.avatar})`" class="avatar" />
        </router-link>
        <div class="release-info">
          <div class="">
            <router-link :to="''" class="author">{{ articleInfo.create_user_name }}</router-link>
            <a class="focus">{{ '关注作者' }}</a>
          </div>
          <span class="time">{{ $fn.timeView(articleInfo.create_time) }}发布</span>
        </div>
      </div>
      <side-widget />
      <p class="title">{{ articleInfo.title }}</p>
      <div class="article-info">
        <span :class="'tag ' + getClass(articleInfo.type)">{{ $fn.getDataName({dataList: listTypeInfo.articleTypeList, value: 'value', label: 'key', data: articleInfo.type}) }}</span>
        <span class="more">
          <span class="read-times">0次阅读</span>
          ·
          <span class="read-time">读完需要 {{ articleInfo.readTime }} 分钟</span>
          ·
          <router-link v-if="userInfo && articleInfo.create_user === userInfo.id" :to="`/write?type=write&id=${articleInfo.id}`" class="update">编辑</router-link>
        </span>
      </div>
      <div class="markdown" v-html="marked(articleInfo.content)" />
      <div class="handle">
        <div class="">
          <span class="goods">赞  0</span>
          <span class="collection">收藏  1</span>
        </div>
        <span class="appreciates">赞赏支持</span>
        <span class="desc">如果觉得我的文章对你有用，请随意赞赏</span>
      </div>
      <!--推荐 -->
      <div class="recommended">
        <p class="title">你可能感兴趣的</p>
        <ul class="recommended-list">
          <li v-for="(item, index) in listInfo.data" :key="index" class="item">
            <router-link :to="`/columns/article/${item.id}`" class="recommended-article">{{ item.title }}</router-link>
            <span class="author">{{ item.create_user_name }}</span>
          </li>
        </ul>
      </div>
      <!-- 评论 -->
      <div v-if="userInfo" class="comments">
        <p class="title">评论</p>
        <div class="content">
          <i :style="`background-image: url(${userInfo.avatar})`" class="avatar" />
          <div class="handle">
            <el-input type="textarea" :rows="3" placeholder="文明社会，理性评论" />
            <p style="width: 100%; text-align: right">
              <span class="release">发布评论</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticleInfoApi, getArticleListApi } from '@/api/home'
import { mapGetters } from 'vuex'
import SideWidget from './components/SideWidget'
import marked from '@/common/js/marked'
export default {
  components: {
    SideWidget
  },
  data () {
    return {
      marked,
      listTypeInfo: {
        articleTypeList: [
          { value: 1, key: '原创' }
        ],
        titleList: []
      },
      listInfo: {
        data: [],
        query: {
          curPage: 1,
          pageSize: 8,
          flag: 3 // 审核通过的文章
        }
      },
      articleInfo: {}
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  mounted () {
    this.getArticleInfo()
    this.getList()

    setTimeout(() => {
      document.querySelector('.markdown').addEventListener('click', e => {
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
    getList () {
      const listInfo = this.listInfo
      getArticleListApi(listInfo.query).then(res => {
        if (res.success) {
          listInfo.data = res.content.result
        } else {
          this.$message({
            showClose: true,
            message: res.message,
            type: res.success ? 'success' : 'error',
            duration: 3500
          })
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
        .update{
          color: red;
          opacity: .8;
          &:hover{
            opacity: 1;
            text-decoration: underline;
          }
        }
      }
    }
    .markdown{
      margin-bottom: 40px;
    }
    .handle{
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 40px;
      .goods, .collection, .appreciates{
        cursor: pointer;
        margin: 0 10px;
        margin-bottom: 10px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 10px 16px;
        height: 45px;
        min-width: 90px;
        color: white;
        border: 1px solid #ccc;
        border-radius: 5px;
        box-shadow: 0 1px 1px rgba(0,0,0,0.05);
        font-size: 18px;
        transition: all .2s linear;
        user-select: none;
      }
      .goods{
        background: red;
      }
      .collection{
        color: rgb(50, 50, 50);
      }
      .appreciates{
        width: 200px;
        background: #F2AE43;
      }
    }
    .recommended{
      margin-bottom: 40px;
      .title{
        font-size: 18px;
        font-weight: 300;
        color: rgb(50, 50, 50);
        margin-bottom: 20px;
      }
      .item{
        margin-bottom: 5px;
        .recommended-article{
          padding-right: 10px;
          color: red;
          opacity: .8;;
        }
        &:hover{
          .recommended-article{
            opacity: 1;
            text-decoration: underline;
          }
        }
      }
    }
    .comments{
      margin-bottom: 40px;
      .title{
        font-size: 18px;
        font-weight: 300;
        color: rgb(50, 50, 50);
        margin-bottom: 20px;
      }
      .content{
        display: flex;
        padding: 10px;
        border: 1px solid rgb(240, 240, 240);
        border-radius: 5px;
        background: rgb(248, 248, 248);
        .avatar{
          display: inline-block;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-size: cover;
          background-position: center;
        }
        .handle{
          margin-left: 10px;
          margin-bottom: 0px;
          flex: 1;
          .release{
            margin-top: 10px;
            display: inline-block;
            padding: 0 12px;
            cursor: pointer;
            height: 34px;
            line-height: 34px;
            font-weight: 500;
            border-radius: 5px;
            color: white;
            background: red;
            user-select: none;
          }
        }
      }
    }
  }
}
</style>

