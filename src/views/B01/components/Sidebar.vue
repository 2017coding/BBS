<template>
  <div class="B01-sidebar">
    <ul class="recommended">
      <li
        v-for="(item, index) in recommended"
        :key="index"
        @click="handleClick('click', item)"
        :class="item.id === activeItem ? 'item active-item' : 'item'">
        <span class="icon-box">
          <i :class="item.icon"></i>
        </span>
        <span class="name">{{item.name}}</span>
      </li>
    </ul>
    <div class="technology-class">
      <p class="title">技术频道</p>
      <ul class="list">
        <li
          v-for="(item, index) in technologyClass"
          :key="index"
          @click="handleClick('click', item)"
          :class="item.id === activeItem ? 'item active-item' : 'item'">
          <span class="icon-box"><img :src="item.icon" class="icon"></span>
          <span class="name">{{item.name}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeItem: '',
      recommended: [
        {id: 1, type: '1', name: '为你推荐', icon: 'el-icon-calendar'},
        {id: 2, type: '1', name: '近期热门', icon: 'el-icon-good'},
        {id: 3, type: '1', name: '最新内容', icon: 'el-icon-int'}
      ],
      technologyClass: [
        {id: 4, type: '2', name: '前端', icon: require('@/assets/image/B01/7.png')},
        {id: 5, type: '2', name: '后端', icon: require('@/assets/image/B01/4.png')},
        {id: 6, type: '2', name: '小程序', icon: require('@/assets/image/B01/1.png')},
        {id: 7, type: '2', name: '人工智能', icon: require('@/assets/image/B01/3.png')},
        {id: 8, type: '2', name: '区块链', icon: require('@/assets/image/B01/10.png')},
        {id: 9, type: '2', name: '安全', icon: require('@/assets/image/B01/2.png')},
        {id: 10, type: '2', name: 'Android', icon: require('@/assets/image/B01/5.png')},
        {id: 11, type: '2', name: 'iOS', icon: require('@/assets/image/B01/6.png')},
        {id: 13, type: '2', name: '工具', icon: require('@/assets/image/B01/9.png')},
        {id: 14, type: '2', name: '程序员', icon: require('@/assets/image/B01/8.png')}
      ]
    }
  },
  mounted () {
    this.handleClick('click', this.recommended[0])
  },
  methods: {
    handleClick (type, data) {
      switch (type) {
      case 'click':
        this.activeItem = data.id
        break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/common/style/base.scss';
  .B01-sidebar{
    padding: 0 15px;
    width: 200px;
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
