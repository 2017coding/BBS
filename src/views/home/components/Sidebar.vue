<template>
  <div class="home-sidebar">
    <ul class="recommended">
      <li
        v-for="(item, index) in recommended"
        :key="index"
        :class="item.id === activeItem ? 'item active-item' : 'item'"
        @click="handleClick('click', item)"
      >
        <span class="icon-box">
          <i :class="item.icon" />
        </span>
        <span class="name">{{ item.name }}</span>
      </li>
    </ul>
    <div class="technology-class">
      <p class="title">技术频道</p>
      <ul class="list">
        <li
          v-for="(item, index) in technologyClass"
          :key="index"
          :class="item.id === activeItem ? 'item active-item' : 'item'"
          @click="handleClick('click', item)"
        >
          <span class="icon-box">
            <img v-if="item.type === 2" :src="item.icon" class="icon">
            <i v-else class="el-icon-albb-discount" />
          </span>
          <span class="name">{{ item.name }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getTagTypeApi } from '@/api/tags'
export default {
  data () {
    return {
      activeItem: '',
      recommended: [
        { id: '为你推荐', type: 1, config: 1, name: '为你推荐', icon: 'el-icon-albb-calendar' },
        { id: '近期热门', type: 1, config: 2, name: '近期热门', icon: 'el-icon-albb-good' },
        { id: '最新内容', type: 1, config: 3, name: '最新内容', icon: 'el-icon-albb-int' }
      ],
      technologyClass: [
        // { id: 4, type: 2, name: '前端', icon: require('@/assets/image/home/7.png') },
        // { id: 5, type: 2, name: '后端', icon: require('@/assets/image/home/4.png') },
        // { id: 6, type: 2, name: '小程序', icon: require('@/assets/image/home/1.png') },
        // { id: 7, type: 2, name: '人工智能', icon: require('@/assets/image/home/3.png') },
        // { id: 8, type: 2, name: '区块链', icon: require('@/assets/image/home/10.png') },
        // { id: 9, type: 2, name: '安全', icon: require('@/assets/image/home/2.png') },
        // { id: 10, type: 2, name: 'Android', icon: require('@/assets/image/home/5.png') },
        // { id: 11, type: 2, name: 'iOS', icon: require('@/assets/image/home/6.png') },
        // { id: 13, type: 2, name: '工具', icon: require('@/assets/image/home/9.png') },
        // { id: 14, type: 2, name: '程序员', icon: require('@/assets/image/home/8.png') }
      ]
    }
  },
  mounted () {
    this.getTagType()
    this.handleClick('click', this.recommended[0])
  },
  methods: {
    getTagType () {
      getTagTypeApi().then(res => {
        if (res.success) {
          this.technologyClass = res.content.filter(item => {
            item.type = 2
            return item.icon
          })
          this.technologyClass.push(
            { id: '更多标签', type: 3, name: '更多标签', icon: 'el-icon-albb-discount' }
          )
        } else {
          this.$message({
            showClose: true,
            message: res.message,
            type: res.success ? 'success' : 'error',
            duration: 3500
          })
        }
      })
    },
    handleClick (type, data) {
      switch (type) {
        case 'click':
          if (data.type === 3) {
            this.$router.push('/tags')
          } else {
            this.activeItem = data.id
            // 兄弟组件传参
            this.$eventBus.$emit('sidebar-click', data)
          }
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/common/style/base.scss';
  .home-sidebar{
    padding: 0 15px;
    padding-left: 10px;
    width: 16.66667%;
    .recommended{
      .item{
        .icon-box{
          display: inline-block;
          width: 35px;
          text-align: center;
          .icon{
            height: 16px;
            widows: 16px;
          }
        }
        .name{
          flex: 1;
          text-align: left;
        }
      }
    }
    .technology-class{
      .title{
        position: relative;
        margin: 10px 0;
        padding-left: 10px;
        text-align: left;
      }
      .list{
        .item{
          .icon-box{
            display: inline-block;
            width: 35px;
            text-align: center;
            .icon{
              height: 16px;
              widows: 16px;
            }
          }
          .name{
            flex: 1;
            text-align: left;
          }
        }
      }
    }
    .item{
      display: flex;
      align-items: center;
      padding: 10px 0;
      border-radius: 4px;
      cursor: pointer;
      &:hover{
        background: rgba(218, 133, 133, .2);
      }
    }
    .active-item{
      color: white;
      background: $theme;
      font-weight: bold;
      &:hover{
        background: $theme;
      }
      img{
        filter: brightness(0) invert(1)
      }
    }
  }
</style>
