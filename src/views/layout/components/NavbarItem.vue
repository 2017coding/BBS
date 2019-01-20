<template>
  <nav class="menu">
    <template v-for="item in list">
      <!-- 一级菜单循环 -->
      <router-link v-if="showingChildren(item) && !item.children[0].children" :to="item.path" :key="item.path">
        <span class="menu-name">{{item.meta.name}}</span>
      </router-link>
      <!-- 多级菜单的循环 -->
      <template v-else>
        <div class="submenu" :key="item.meta.name" style="display: inline-block">
          <div class="menu-name" @mouseover="showNavbarItem('over')" @mouseout="showNavbarItem('out')" @click="showNavbarItem('click')">
            <span>{{item.meta.name}}</span>
            <i :class="showSubmenu ? 'el-icon-caret-bottom icon-rorate-v' : 'el-icon-caret-bottom' "></i>
          </div>
          <!-- <navbar-item v-if="child.children&&child.children.length>0" :key=""></navbar-item> -->
          <el-collapse-transition>
            <!-- <ul class="submenu-list" v-if="showSubmenu" @mouseout="moveSubmenu('out')" @mouseover="moveSubmenu('over')">
              <li class="submenu-item">111</li>
            </ul> -->
          </el-collapse-transition>
        </div>
      </template>
    </template>
  </nav>
</template>

<script>
import router from '@/router'
export default {
  name: 'NavbarItem',
  props: {
    routes: {
      type: Array
    }
  },
  data () {
    return {
      list: [],
      triggerType: 'click',
      showSubmenu: false,
      timer: []
    }
  },
  mounted () {
    this.list = this.routes || router.options.routes
    // router.options.routes
  },
  methods: {
    showingChildren (data) {
      // 设置当只有一个子目录的时候并且名字额父级一样时，菜单不展开
      if (data.children.length === 1 && data.children[0].meta.name === data.meta.name) {
        return true
      }
      return false
    },
    showNavbarItem (type) {
      if (type === this.triggerType) {
        this.showSubmenu = true
      }
      if (type !== 'click') {
        this.moveSubmenu(type)
      }
    },
    moveSubmenu (type) {
      let timer = setTimeout(() => {
        this.showSubmenu = false
      }, 200)
      this.timer.push(timer)
      if (type === 'over') {
        this.timer.forEach(item => {
          clearTimeout(item)
        })
        this.timer = []
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/common/style/base.scss';
  .router-link-exact-active{
    color: $theme;
    font-weight: bold!important;
  }
  .menu{
    flex: 1;
    .menu-name{
      padding: 10px 20px;
      cursor: pointer;
    }
    .el-icon-caret-bottom{
      transform: rotate(0deg);
      transition: transform .3s;
    }
    .icon-rorate-v{
      transform: rotate(180deg);
    }
    .submenu{
      position: relative;
      .submenu-list{
        position: absolute;
        top: 100%;
        min-width: 160px;
        background: rgb(247, 247, 247);
        .submenu-item{
          width: 100%;
          height: 40px;
        }
      }
    }
  }
</style>
