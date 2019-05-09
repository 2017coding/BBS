<template>
  <div class="write">
    <Navbar />
    <div class="main">
      <components :is="getComponents()" />
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import Article from './components/Article'
import Question from './components/Question'

export default {
  components: {
    Navbar,
    Article,
    Question
  },
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
    getComponents () {
      switch (this.$route.query.type) {
        case 'ask':
          return 'Question'
        case 'write':
          return 'Article'
      }
    }
  }
}
</script>

<style scoped lang="scss">
  @import '@/common/style/base.scss';
  $maxWidth: 1480px;
  $minWidth: 720px;
  .write{
    display: flex;
    flex-direction: column;
    height: 100%;
    background: $bgColor;
    .main{
      flex: 1;
      width: 100%;
      margin: auto;
      padding: 15px;
      max-width: $maxWidth;
      min-width: $minWidth;
    }
  }
</style>
