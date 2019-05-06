<template>
  <div class="">
    <div v-if="show" class="back-to-top" @click="backToTop">
      回顶部
    </div>
  </div>
</template>

<script>
export default {
  name: 'BackToTop',
  data () {
    return {
      show: false,
      timer: '',
      speed: 10
    }
  },
  mounted () {
    window.addEventListener('scroll', () => {
      this.show = this.getScrollTop() > 100
    })
  },
  methods: {
    getScrollTop () {
      return document.documentElement.scrollTop || document.body.scrollTop
    },
    backToTop () {
      const currentScroll = this.getScrollTop()
      if (currentScroll > 0) {
        window.scrollTo(0, currentScroll - this.speed)
        // 加速
        this.speed += 1
        this.timer = requestAnimationFrame(() => {
          this.backToTop()
        })
      } else {
        this.speed = 10
        cancelAnimationFrame(this.timer)
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .back-to-top{
    position: fixed;
    right: 40px;
    bottom: 80px;
    padding: 10px;
    width: 36px;
    color: #999;
    text-align: center;
    line-height: 1.25;
    border: 1px solid #DDD;
    background: #FFF;
    cursor: pointer;
    z-index: 9999;
    &:hover{
      background: #F3F3F3;
    }
  }
</style>
