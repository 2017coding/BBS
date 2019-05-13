<template>
  <div class="page-container">
    <Navbar
      :type="getType()"
      :bt-loading="btLoading"
      :write-status="writeStatus"
      @handleClick="handleClick"
    />
    <div class="main">
      <components :is="getType()" :write-status.sync="writeStatus" />
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
      btLoading: false,
      writeStatus: ''
    }
  },
  mounted () {
  },
  methods: {
    getType () {
      switch (this.$route.query.type) {
        case 'ask':
          return 'Question'
        case 'write':
          return 'Article'
      }
    },
    handleClick (type, data) {
      switch (type) {
        case 'save':
          this.btLoading = true
          setTimeout(() => {
            this.btLoading = false
          }, 1000)
          break
      }
    }
  }
}
</script>

<style scoped lang="scss">
  @import '@/common/style/base.scss';
  $maxWidth: 1480px;
  $minWidth: 720px;
  .page-container{
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
