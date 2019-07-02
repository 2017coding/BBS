<template>
  <div class="questions-item">
    <div class="Votes">
      <span>0</span>
      <span>得票</span>
    </div>
    <div class="answer">
      <span>0</span>
      <span>{{ data.resolve ? '回答' : '解决' }}</span>
    </div>
    <div class="views">
      <span>0</span>
      <span>浏览</span>
    </div>
    <div class="info">
      <p>
        <span>0</span>
        <span>0</span>
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

<style scoped>
</style>
