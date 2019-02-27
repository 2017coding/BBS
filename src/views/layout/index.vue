<template>
  <div class="BBS">
    <navbar></navbar>
    <page-wrap></page-wrap>
    <footerbar></footerbar>
    <back-to-top></back-to-top>
  </div>
</template>

<script>
import Navbar from './components/navBar'
import PageWrap from './components/pageWrap'
import Footerbar from './components/footerBar'
import BackToTop from '@/components/BackToTop'
export default {
  name: 'Layout',
  components: {
    Navbar,
    PageWrap,
    Footerbar,
    BackToTop
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped lang="scss">
  .BBS{
    min-width: 1280px;
    height: 100%;
  }
</style>
