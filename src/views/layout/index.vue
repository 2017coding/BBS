<template>
  <div class="BBS">
    <navbar />
    <page-wrap />
    <footerbar />
    <back-to-top />
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import PageWrap from './components/PageWrap'
import Footerbar from './components/Footerbar'
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
    height: 100%;
  }
</style>
