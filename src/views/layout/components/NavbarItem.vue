<template>
  <nav class="menu">
    <template v-for="item in routes.filter(item => item.meta.isMenu)">
      <!-- 一级菜单循环 -->
      <router-link v-if="hasOneShowingChildren(item, item.children) && (!item.children[0].children || item.children[0].children.length === 0)" :key="item.path" :to="resolvePath(item)">
        <span class="menu-title">{{ item.meta.title }}</span>
      </router-link>
      <!-- 多级菜单的循环 -->
      <template v-else>
        <div :key="item.meta.title" class="submenu" style="display: inline-block">
          <div class="menu-title" @mouseover="showNavbarItem('over')" @mouseout="showNavbarItem('out')" @click="showNavbarItem('click')">
            <span>{{ item.meta.title }}</span>
            <i :class="showSubmenu ? 'el-icon-caret-bottom icon-rorate-v' : 'el-icon-caret-bottom' " />
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
import { routes } from '@/router'
export default {
  name: 'NavbarItem',
  data () {
    return {
      routes,
      triggerType: 'click',
      showSubmenu: false,
      timer: []
    }
  },
  methods: {
    resolvePath (item) {
      return item.path ? item.path + '/' + item.children[0].path : item.children[0].path
    },
    hasOneShowingChildren (item, children) {
      // 判断路由是否显示
      const showingChildren = children.filter(item => {
        return !item.hidden
      })
      // 设置当只有一个子目录的时候并且名字和父级一样时，菜单不展开
      if (showingChildren.length === 1 && showingChildren[0].meta.title === item.meta.title) {
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
      const timer = setTimeout(() => {
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
    padding-right: 35px;
    .menu-title{
      padding: 10px 20px;
      cursor: pointer;
      &:first-child{
        padding-left: 15px;
      }
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
