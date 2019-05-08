<template>
  <div class="advertising">
    <img :src="require('@/assets/image/home/c1.png')" class="advertising-image">
    <p class="desc">想在上方展示你的广告吗</p>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
  @import '@/common/style/base.scss';
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
</style>
