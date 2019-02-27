<template>
  <div class="B01">
    <sidebar></sidebar>
    <page></page>
    <div class="others">
      <p class="alert-warning">
        <!-- {{`回顾${new Date().getFullYear() - 1}， 你都收获了什么?`}} -->
        免费讲座：如何成为一名合格的工程师？
      </p>
      <div class="advertising">
        <img :src="require('@/assets/image/B01/c1.png')" class="advertising-image">
        <p class="desc">想在上方展示你的广告吗</p>
      </div>
      <lecture></lecture>
      <activity></activity>
    </div>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar'
import page from './components/Page'
import Lecture from './components/Lecture'
import Activity from './components/Activity'
export default {
  components: {
    Sidebar,
    page,
    Lecture,
    Activity
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped lang="scss">
  @import '@/common/style/base.scss';
  .B01{
    display: flex;
    .others{
      padding: 0 15px;
      width: 25%;
      .alert-warning{
        cursor: pointer;
        padding: 15px;
        margin-bottom: 20px;
        font-size: 12px;
        border: 1px solid #faebcc;
        background-color: #fcf8e3;
        border-radius: 4px;
        &:hover{
          text-decoration: underline;
        }
      }
      .advertising{
        margin-bottom: 25px;
        .advertising-image{
          width: 100%;
        }
        .desc{
          cursor: pointer;
          padding: 4px;
          text-align: center;
          font-size: $fontSize4;
          color: $fontColor3;
          &:hover{
            text-decoration: underline;
          }
        }
      }
    }
  }
</style>
