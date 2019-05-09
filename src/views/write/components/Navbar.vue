<template>
  <div class="write-header">
    <nav class="navbar">
      <div class="left">
        <p class="logo" @click="$router.push('/')">
          <span class="LLL">LLL</span>
          <span class="yh">yh</span>
        </p>
        <p class="title">{{ title }}</p>
      </div>
      <div class="right">
        <el-button
          type="primary"
          size="medium"
          style="padding: 8px 8px;"
        >{{ btMsg }}</el-button>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: Number,
      default: 1 // 1 文章 2 问题
    }
  },
  data () {
    return {
      title: '',
      btMsg: ''
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    initData () {
      switch (this.type) {
        case 1:
          this.title = '写文章'
          this.btMsg = '发布文章'
          break
        case 2:
          this.title = '提问'
          this.btMsg = '发布问题'
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/common/style/base.scss';
  $maxWidth: 1480px;
  $minWidth: 720px;
  .write-header{
    position: relative;
    background: #fafafa;
    border-top: 3px solid $theme;
    box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.1), 0 1px rgba(0,0,0,0.1);
    height: $headHeight;
    z-index: 3;
    .navbar{
      margin: auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 15px;
      max-width: $maxWidth;
      min-width: $minWidth;
      height: 100%;
      font-size: 16px;
      .left{
        display: flex;
        align-items: center;
        .logo{
          padding-right: 15px;
          font-size: 0;
          cursor: pointer;
          .LLL, .yh{
            font-size: 24px;
          }
          .LLL{
            color: $fontColor2;
          }
          .yh{
            color: $theme;
          }
        }
      }
      .right{

      }
    }
  }
</style>
