<template>
  <div class="write">
    <Navbar />
    <div class="main">
      <components :is="getComponents(1)" />
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
    getComponents (type) {
      switch (type) {
        case 1:
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
    .main{
      flex: 1;
      width: 100%;
      margin: auto;
      padding: 15px;
      max-width: $maxWidth;
      min-width: $minWidth;
      background: $bgColor;
    }
  }
</style>
