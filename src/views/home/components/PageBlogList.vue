<template>
  <ul class="page-blog-list">
    <li v-for="(item, index) in listInfo.data" :key="index" class="blog-item">
      <div class="from" />
      <div class="article">
        <div class="content">
          <p class="title">{{ item.title }}</p>
          <p class="body">{{ item.content }}</p>
        </div>
        <div class="img" :style="`background-image: url(${require('@/assets/image/home/b1.png')})`" />
      </div>
      <div class="info">
        <div class="praise">
          <span class="wrap"><i class="el-icon-good" /></span>
          <span v-if="item.praiseNums > 0">
            <span class="unit">x</span>
            <span class="praisenums">{{ item.praiseNums }}</span>
          </span>
          <span class="dot">·</span>
          <span class="votes-word">赞</span>
        </div>
        <div class="author">{{ item.author }}</div>
        <span class="dot" style="padding: 0 5px">·</span>
        <div class="release-time">{{ item.releaseTime }}</div>
      </div>
    </li>
  </ul>
</template>

<script>
// import { getListApi } from '@/api/home/list'
import List from './list'
export default {
  name: 'PageBlogList',
  props: {
    bolgData: {
      type: Object
    }
  },
  data () {
    return {
      listInfo: {
        data: []
      }
    }
  },
  created () {
    this._getList()
  },
  methods: {
    _getList () {
      let index = 0
      this.listInfo.data = List.data.filter(item => {
        index++
        return index < 10
      })
    }
  }
}
</script>

<style scoped lang="scss">
  @import '@/common/style/base.scss';
  .page-blog-list{
    font-size: $fontSize3;
    .blog-item{
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
  }
</style>
