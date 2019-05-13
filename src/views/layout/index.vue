<template>
  <div class="BBS">
    <navbar />
    <page-main />
    <footerbar />
    <back-to-top />
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import PageMain from './components/PageMain'
import Footerbar from './components/Footerbar'
import BackToTop from '@/components/BackToTop'
export default {
  name: 'Layout',
  components: {
    Navbar,
    PageMain,
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
