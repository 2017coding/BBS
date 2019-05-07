<template>
  <div class="search">
    <input v-model="val" class="search-input" placeholder="搜索问题或关键字">
    <i class="el-icon-search" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      val: ''
    }
  },
  mounted () {
    document.body.addEventListener('click', e => {
      if (e.target.className === 'search-input') {
        this.$eventBus.$emit('search-focus', true)
      } else {
        this.$eventBus.$emit('search-focus', false)
      }
    }, false)
  }
}
</script>

<style lang="scss" scoped>
  .search{
    position: relative;
    flex: 1;
    transition: all 0.25s ease;
    .search-input{
      display: block;
      width: 100%;
      height: 34px;
      padding: 6px 12px;
      font-size: 14px;
      line-height: 1.42858;
      color: #555;
      background-color: #fff;
      background-image: none;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-shadow: inset 0 1px 1px rgba(0,0,0,0.075);
      transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
      &:focus{
        border: 1px solid #3b99fc;
        box-shadow: 0 0 3px 0px #3b99fc;
        outline: 0;
      }
      &::-webkit-input-placeholder{
        color: rgb(150, 150, 150)
      }
    }
    .el-icon-search{
      position: absolute;
      top: 50%;
      right: 2px;
      padding: 10px;
      transform: translate(0, -50%);
    }
  }
</style>
