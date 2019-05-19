<template>
  <ul class="page-article-list">
    <template v-if="listInfo.data.length > 0">
      <li v-for="(item, index) in listInfo.data" :key="index" class="article-item">
        <div class="from" />
        <div class="article">
          <div class="content">
            <p class="title">{{ item.title }}</p>
            <p class="body">{{ item.content }}</p>
          </div>
          <!-- <div class="img" :style="`background-image: url(${require('@/assets/image/home/b1.png')})`" /> -->
        </div>
        <div class="info">
          <div class="praise">
            <span class="wrap"><i class="el-icon-albb-good" /></span>
            <span v-if="item.praiseNums > 0">
              <span class="unit">x</span>
              <span class="praisenums">{{ item.praiseNums }}</span>
            </span>
            <span class="dot">·</span>
            <span class="votes-word">赞</span>
          </div>
          <div class="author">{{ item.create_user_name }}</div>
          <span class="dot" style="padding: 0 5px">·</span>
          <div class="release-time">{{ $fn.timeView(item.create_time) }}</div>
        </div>
      </li>
    </template>
    <p v-else class="no-data">
      暂无数据
    </p>
  </ul>
</template>

<script>
import { getArticleListApi } from '@/api/home'
export default {
  name: 'ArticleList',
  props: {
    bolgData: {
      type: Object
    }
  },
  data () {
    return {
      listInfo: {
        data: [],
        query: {
          curPage: 1,
          pageSize: 20,
          flag: 3 // 审核通过的文章
        }
      }
    }
  },
  created () {
    this.getList()
  },
  methods: {
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
    }
  }
}
</script>

<style scoped lang="scss">
  @import '@/common/style/base.scss';
  .page-article-list{
    font-size: $fontSize3;
    .article-item{
      margin: 20px 0;
      .article{
        cursor: pointer;
        display: flex;
        .content{
          margin: 10px 0;
          .title{
            margin-bottom: 10px;
            font-size: $fontSize2;
            color: $fontColor2;
          }
          .body{
            color: #888;
            line-height: 1.5;
          }
        }
        .img{
          margin-top: 15px;
          margin-left: 20px;
          width: 120px;
          height: 60px;
          border-radius: 4px;
          background-size: cover;
          background-position: center;
        }
      }
      .info{
        display: flex;
        align-items: center;
        .praise{
          cursor: pointer;
          .wrap{
            display: inline-block;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background: rgba(218, 133, 133, .2);
            text-align: center;
            line-height: 24px;
            .el-icon-good{
              font-size: 14px;
              font-weight: bold;
              color: $theme;
            }
          }
          &:hover{
            transform: all;
            transition: .3s;
            .wrap{
              transition: .3s;
              background: $theme;
            }
            .el-icon-good{
              color: rgb(245, 245, 245);
            }
            .votes-word{
              color: $theme;
              text-decoration: underline;
            }
          }
        }
        .author{
          margin-left: 20px;
          cursor: pointer;
          &:hover{
            text-decoration: underline;
          }
        }
        .votes-word, .author{
          color: #666;
        }
        .release-time{
          color: #999;
        }
        .unit{
          padding: 0 5px;
        }
        .unit, .praisenums {
          font-weight: 400;
          color: $theme;
        }
      }
    }
    .no-data{
      height: 100%;
      font-size: 36px;
      padding: 40px;
      text-align: center;
    }
  }
</style>
