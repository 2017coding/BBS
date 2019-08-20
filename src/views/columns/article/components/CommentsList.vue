<template>
  <div class="comments">
    <p class="title">{{ commentsInfo.totals ? `${commentsInfo.totals}条评论` : '评论' }}</p>
    <ul class="comments-list">
      <li v-for="(item, index) in commentsInfo.list" :key="index" class="items">
        <i :style="`background-image: url(${item.avatar})`" class="avatar" />
        <div class="content">
          <div class="replier-head">
            <div class="replier-info">
              <span class="replier-user">{{ item.replier_name }}</span>
              <span v-if="item.create_user === articleAuth" class="tag original">作者</span>
              ·
              <span class="replier-time">{{ $fn.timeView(item.create_time) }}</span>
            </div>
            <div class="more">
              <i class="el-icon-albb-flag" @click="handleClick('report', item)" />
              <i v-if="item.create_user === userInfo.id" class="el-icon-albb-delete1" @click="handleClick('delete', item)" />
            </div>
          </div>
          <div class="replier-content">
            {{ item.content }}
          </div>
          <div class="replier-more">
            <span class="praise"><i class="el-icon-albb-good" /></span>
            <span class="reply">回复</span>
          </div>
        </div>
      </li>
    </ul>
    <div class="release">
      <i :style="`background-image: url(${userInfo.avatar})`" class="avatar" />
      <div class="handle">
        <el-input v-model="commentsInfo.data.content" type="textarea" :rows="3" placeholder="文明社会，理性评论" />
        <p style="width: 100%; text-align: right">
          <span class="release" @click="handleClick('release')">发布评论</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { createArticleCommentsApi, deleteArticleCommentsApi, getArticleCommentsApi } from '@/api/article'

export default {
  name: 'CommentsList',
  props: {
    articleId: {
      type: Number
    },
    articleAuth: {
      type: Number
    }
  },
  data () {
    return {
      commentsList: [],
      commentsInfo: {
        listSuccess: true,
        list: [],
        totals: 0,
        data: {
          article_id: '',
          pid: '',
          p_user_id: '',
          content: ''
        }
      }
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  mounted () {
    this.init()
    this.getComments(this.commentsInfo.data)
  },
  methods: {
    init () {
      const commentsData = this.commentsInfo.data
      commentsData.article_id = this.articleId
      commentsData.pid = 0
    },
    handleClick (type, data) {
      const commentsData = this.commentsInfo.data
      switch (type) {
        case 'release':
          commentsData.p_user_id = 0
          this.releaseComments()
          break
        case 'delete':
          this.deleteComments(data.id)
          break
      }
    },
    // 获取评论
    getComments (query) {
      const commentsInfo = this.commentsInfo
      getArticleCommentsApi(query).then(res => {
        if (res.success) {
          commentsInfo.list = res.content
          commentsInfo.totals = res.totals
        } else {
          commentsInfo.listSuccess = false
        }
      }).catch(() => {
        commentsInfo.listSuccess = false
      })
    },
    // 创建评论
    releaseComments () {
      const commentsData = this.commentsInfo.data
      createArticleCommentsApi(commentsData).then(res => {
        if (res.success) {
          commentsData.content = ''
          this.getComments(commentsData)
        } else {
          this.$message({
            showClose: true,
            message: res.message,
            type: res.success ? 'success' : 'error',
            duration: 2000
          })
        }
      })
    },
    // 删除评论
    deleteComments (id) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteArticleCommentsApi(id).then(res => {
          if (res.success) {
            this.getComments(this.commentsInfo.data)
          }
          this.$message({
            showClose: true,
            message: res.message,
            type: res.success ? 'success' : 'error',
            duration: 2000
          })
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.tag{
  display: inline-block;
  padding: 5px 10px;
}
.original{
  color: #017E66;
  background: rgba(1,126,102,0.08);
}
.comments{
  margin-bottom: 40px;
  .title{
    font-size: 18px;
    font-weight: 300;
    color: rgb(50, 50, 50);
    margin-bottom: 20px;
  }
  .comments-list{
    padding: 10px;
    .items{
      display: flex;
      border-top: 1px solid rgb(230, 230, 230);
      padding-top: 10px;
      &:hover{
        .content{
          .replier-head{
            .more{
              display: block;
              color: red;
            }
          }
        }
      }
      .avatar{
        display: inline-block;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-size: cover;
        background-position: center;
      }
      .content{
        margin-left: 10px;
        flex: 1;
        .replier-head, .replier-content, .replier-more{
          margin-bottom: 10px;
        }
        .replier-head{
          display: flex;
          justify-content: space-between;
          .replier-user, .replier-time{
            cursor: pointer;
          }
          .replier-user{
            color: red;
            &:hover{
              text-decoration: underline;
            }
          }
          .more{
            display: none;
            cursor: pointer;
          }
        }
        .replier-more{
          .praise, .reply{
            padding-right: 10px;
            cursor: pointer;
          }
        }
      }
    }
  }
  .release{
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
</style>
