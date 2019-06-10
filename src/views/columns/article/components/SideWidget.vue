<template>
  <div :class="`side-widget ${active ? 'active' : ''}`">
    <i class="el-icon-caret-top" />
    <p class="nums">0</p>
  </div>
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
  .side-widget{
    position: fixed;
    margin-left: -55px;
    margin-top: 0px;
    width: 40px;
    height: 50px;
    font-size: 16px;
    color: rgb(50, 50, 50);
    text-align: center;
    border: 1px solid #DDD;
    background: #FFF;
    cursor: pointer;
    z-index: 9;
    transition: all .3s linear;
    &:hover{
      color: red;
      background: #F3F3F3;
    }
    .el-icon-caret-top{
      font-size: 24px;
    }
    &.active{
      color: red;
      outline: 0;
      outline-offset: -2px;
      background-color: #e6e6e6;
      border-color: #adadad;
    }
  }
</style>
