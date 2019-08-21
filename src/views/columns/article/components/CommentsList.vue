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
            <div v-if="userInfo" class="more">
              <i class="el-icon-albb-flag" @click="handleClick('report', item)" />
              <i v-if="item.create_user === userInfo.id" class="el-icon-albb-delete1" @click="handleClick('delete', item)" />
            </div>
          </div>
          <div class="replier-content">
            {{ item.content }}
          </div>
          <div v-if="userInfo" class="replier-more">
            <span class="praise"><i class="el-icon-albb-good" /></span>
            <span class="reply" @click="handleClick('reply', item)">回复</span>
          </div>
          <ul class="reply-list">
            <li v-for="(item1, index1) in item.children" :key="index1" class="reply-item">
              <!-- <div class="reply-content">
                {{ item1.content }}
              </div> -->
              <span class="reply-user">{{ item1.replier_name }}</span>
              <span v-if="item1.create_user === articleAuth" class="tag original">作者</span>
              <br>
              <span>回复</span>
              <span class="by-reply-user">{{ item1.by_replier_name }}</span>
              <span v-if="item1.p_user_id === articleAuth" class="tag original">作者</span>:
              {{ item1.content }}
              <br>
              <span class="reply-time">{{ $fn.timeView(item1.create_time) }}</span>
              <div v-if="userInfo" class="reply-more">
                <span class="praise"><i class="el-icon-albb-good" /></span>
                <span class="reply" @click="handleClick('reply', item)">回复</span>
              </div>
            </li>
            <div v-if="replyInfo.pid === item.id" class="reply-handle">
              <el-input v-model="replyInfo.content" type="textarea" :rows="1" placeholder="文明社会，理性评论" />
              <el-button class="reply-bt" size="mini" @click="handleClick('addReply', item)">添加回复</el-button>
            </div>
          </ul>
        </div>
      </li>
    </ul>
    <div v-if="userInfo" class="release">
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
      },
      replyInfo: {
        article_id: '',
        pid: '',
        p_user_id: '',
        content: ''
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
    this.getComments()
  },
  methods: {
    init () {
      const commentsData = this.commentsInfo.data
      commentsData.article_id = this.articleId
    },
    handleClick (type, data) {
      const commentsData = this.commentsInfo.data
      const replyInfo = this.replyInfo
      switch (type) {
        case 'release':
          commentsData.pid = 0
          commentsData.p_user_id = 0
          this.releaseComments(commentsData)
          break
        case 'reply':
          replyInfo.article_id = this.articleId
          replyInfo.pid = data.id
          replyInfo.p_user_id = data.create_user
          break
        case 'addReply':
          this.releaseComments(this.replyInfo)
          // 清除数据
          this.replyInfo = {
            article_id: '',
            pid: '',
            p_user_id: '',
            content: ''
          }
          break
        case 'delete':
          this.deleteComments(data.id)
          break
      }
    },
    // 获取评论
    getComments (query) {
      const commentsInfo = this.commentsInfo
      getArticleCommentsApi({
        article_id: this.articleId
      }).then(res => {
        if (res.success) {
          res.content.forEach(item => {
            if (item.pid === 0) {
              item.children = []
            }
            res.content.forEach(item1 => {
              if (item.id === item1.pid) {
                item.children = item.children || []
                item.children.push(item1)
              }
            })
          })
          commentsInfo.list = res.content.filter(item => item.pid === 0)
          commentsInfo.totals = res.totals
        } else {
          commentsInfo.listSuccess = false
        }
      }).catch(() => {
        commentsInfo.listSuccess = false
      })
    },
    // 创建评论
    releaseComments (query) {
      const commentsData = this.commentsInfo.data
      createArticleCommentsApi(query).then(res => {
        if (res.success) {
          commentsData.content = ''
          this.getComments()
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
      this.$confirm('此操作将永久删除该评论以及评论下的回复, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteArticleCommentsApi(id).then(res => {
          if (res.success) {
            this.getComments()
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
        .replier-head, .replier-content, .replier-more, .reply-list{
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
        .reply-list{
          .reply-item{
            padding: 10px 20px;
            line-height: 1.5;
            background-color: rgb(245, 245, 245);
            border-bottom: 1px dashed rgb(200, 200, 200);
            .reply-user, .by-reply-user{
              color: red;
              cursor: pointer;
              &:hover{
                text-decoration: underline;
              }
            }
            .reply-more{
              .praise, .reply{
                padding-right: 10px;
                cursor: pointer;
              }
            }
          }
          .reply-handle{
            display: flex;
            padding: 10px;
            background-color: rgb(245, 245, 245);
            .reply-bt{
              margin-left: 10px;
            }
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
