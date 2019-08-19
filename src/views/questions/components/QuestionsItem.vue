<template>
  <div class="questions-item">
    <div class="Votes">
      <span class="">0</span>
      <span class="">得票</span>
    </div>
    <div class="answer">
      <span class="">0</span>
      <span class="">{{ data.resolve ? '回答' : '解决' }}</span>
    </div>
    <div class="views">
      <span class="">0</span>
      <span class="">浏览</span>
    </div>
    <div class="info">
      <p>
        <span class="">0</span>
        <span class="">0</span>
      </p>
      <p class="title">0</p>
      <span class="tag">0</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.questions-item{
  display: flex;
  padding: 10px 0;
  border-bottom: 1px solid rgb(245, 245, 245);
  .Votes{
  }
}
</style>
