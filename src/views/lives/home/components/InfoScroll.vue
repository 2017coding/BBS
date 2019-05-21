<template>
  <ul class="info-scroll">
    <li v-for="(item, index) in list1" :key="index" class="item">
      <div class="content">
        <i class="status" />
        <span class="source">{{ item.source }}</span>
        <span class="time">{{ item.time }}</span>
      </div>
      <p class="desc">{{ item.desc }}</p>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'InfoScroll',
  props: {
    list: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      key: 0,
      timer: '',
      list1: []
    }
  },
  mounted () {
    this.scroll()
  },
  methods: {
    scroll () {
      const boxH = 127
      const listH = this.list.length * 48
      const list = document.querySelector('.info-scroll')
      // const nums = parseInt((listH - boxH) / 30)

      list.style.cssText = 'transform: translate3d(0, 0, 0)'
      if (listH - boxH > 0) {
        // 当列表高度大于盒子高度的时候将数据复制一份，用来做无缝滚动
        const arr = JSON.parse(JSON.stringify(this.list))
        this.list1 = [...arr, ...arr]
        this.timer = setInterval(() => {
          if (this.key > this.list.length / 2) {
            this.key = 0
            list.style.cssText = 'transition: none;'
          } else {
            list.style.cssText = 'transition: all .3s linear;'
          }
          list.style.cssText += 'transform: translate3d(0, -' + this.key * 30 + 'px, 0);'
          this.key++
        }, 3000)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.info-scroll{
  padding: 10px;
  height: 200px;
  overflow: hidden;
  .item{
    margin-bottom: 10px;
    .content{
      display: flex;
      margin-bottom: 5px;
      .status{
        display: inline-block;
        width: 15px;
        height: 15px;
        background: red;
        border-radius: 50%;
      }
      .source{
        padding: 0 3px;
        flex: 1;
      }
      .desc{
        color: rgb(121, 122, 122);
      }
    }
  }
}
</style>
