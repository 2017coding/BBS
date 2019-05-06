<template>
  <div class="lecture">
    <div class="head">
      <p class="title">讲座推荐</p>
      <p class="controller">
        <span class="back" @click="handleClick('back')">
          <i class="el-icon-arrow-left" />
        </span>
        <span class="forward" @click="handleClick('forward')">
          <i class="el-icon-arrow-right" />
        </span>
      </p>
    </div>
    <div class="carousel">
      <div v-for="(item, index) in list" :key="index" class="item">
        <img :src="item.src" class="img">
        <p class="title">{{ item.title }}</p>
        <div class="rate">
          <el-rate
            v-model="item.rate"
            disabled
            text-color="#ff9900"
          />
          <span class="nums">{{ `(${item.peoples}人参与)` }}</span>
        </div>
        <div class="price">
          <span class="before" />
          <span class="now" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    getList () {
      this.list = [
        {
          src: require('@/assets/image/home/b1.png'),
          path: '/',
          title: '学习知识',
          rate: 5,
          peoples: '1399',
          beforePrice: '899',
          nowPrice: '599'
        },
        {
          src: require('@/assets/image/home/b2.jpg'),
          path: '/',
          title: '学习知识',
          rate: 5,
          peoples: '1399',
          beforePrice: '899',
          nowPrice: '599'
        },
        {
          src: require('@/assets/image/home/b3.png'),
          path: '/',
          title: '学习知识',
          rate: 5,
          peoples: '1399',
          beforePrice: '899',
          nowPrice: '599'
        },
        {
          src: require('@/assets/image/home/b4.png'),
          path: '/',
          title: '学习知识',
          rate: 5,
          peoples: '1399',
          beforePrice: '899',
          nowPrice: '599'
        },
        {
          src: require('@/assets/image/home/b5.jpg'),
          path: '/',
          title: '学习知识',
          rate: 5,
          peoples: '1399',
          beforePrice: '899',
          nowPrice: '599'
        }
      ]
    },
    handleCarousel () {

    },
    handleClick (type, data) {
      switch (type) {
        case 'back':
        case 'forward':
          break
      }
    }
  }
}
</script>

<style scoped lang="scss">
  @import '@/common/style/base.scss';
  .lecture{
    background: #fafafa;
    padding: 15px;
    padding-right: 0;
    margin-bottom: 30px;
    .head{
      display: flex;
      .title{
        flex: 1;
        color: $theme;
        font-weight: 500;
        font-size: 16px;
      }
      .controller{
        padding-right: 20px;
        .back, .forward{
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: $theme;
          transform: all;
          transition: .3s linear;
          &:hover{
            background: rgb(245, 190, 190);
          }
          i{
            font-size: 12px;
            cursor: pointer;
            font-weight: bolder;
            color: white;
          }
        }
      }
    }
    .carousel{
      margin-top: 10px;
      white-space: nowrap;
      overflow: hidden;
      .item{
        display: inline-block;
        width: 80%;
        padding-right: 20px;
        .img{
          width: 100%;
          border-radius: 5px;
        }
        .title{
          cursor: pointer;
          padding: 10px 0 5px 0;
          font-weight: bold;
          color: black;
          &:hover{
            color: $theme;
            text-decoration: underline;
          }
        }
        .rate{
          display: flex;
          align-items: center;
          .nums{
            color: $fontColor3;
            font-size: 13px;
            padding-left: 10px;
          }
        }
      }
    }
  }
</style>
