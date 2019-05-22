<template>
  <div class="count" :style="data.countStyle">
    <p class="title" :style="data.titleStyle">{{ data.title }}</p>
    <p class="nums" :style="data.numsStyle">{{ data.nums }}</p>
    <p v-if="data.unit" class="unit" :style="data.unitStyle">{{ data.unit }}</p>
  </div>
</template>

<script>
export default {
  name: 'Count',
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
.count{
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 100%;
  height: 100%;
  text-align: center;
  background: rgb(102, 102, 102);
  .title, .nums, .unit{
    padding: 3px 2px;
  }
  .title{
    color: white;
  }
  .nums{
    color: blue;
  }
  .unit{
    color: rgb(150, 150, 150);
  }
}
</style>
