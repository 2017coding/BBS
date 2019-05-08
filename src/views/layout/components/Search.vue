<template>
  <div class="search">
    <input v-model="val" class="search-input" placeholder="搜索问题或关键字">
    <i class="el-icon-search" @click="handleEvent('search')" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      val: ''
    }
  },
  watch: {
    $route (val) {
      // 切换的路由不为搜索，将值清空
      if (val.path !== '/search') {
        this.val = ''
      }
    }
  },
  mounted () {
    document.body.addEventListener('click', e => {
      // 'el-icon-search'
      if (['search-input'].includes(e.target.className)) {
        this.$eventBus.$emit('search-focus', true)
      } else {
        this.$eventBus.$emit('search-focus', false)
      }
    }, false)
  },
  methods: {
    handleEvent (event, data) {
      switch (event) {
        case 'search':
          this.$router.push({
            path: '/search',
            query: { keyword: this.val }
          })
          break
      }
    }
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
      cursor: pointer;
    }
  }
</style>
