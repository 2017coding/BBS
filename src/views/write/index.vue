<template>
  <div class="page-container">
    <Navbar
      :type="getType()"
      :bt-loading="btLoading"
      :write-status="writeStatus"
      @handleClick="handleClick"
    />
    <div class="main">
      <components
        :is="getType()"
        :commit="commit"
        :data="data"
        :bt-loading.sync="btLoading"
        :write-status.sync="writeStatus"
      />
    </div>
  </div>
</template>

<script>
import { getArticleInfoApi } from '@/api/home'
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
      commit: 0,
      btLoading: false,
      writeStatus: '',
      data: {}
    }
  },
  mounted () {
    this.getArticleInfo()
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
    getArticleInfo () {
      if (!this.$route.query.id) return
      getArticleInfoApi(this.$route.query.id).then(res => {
        if (res.success) {
          this.data = res.content[0]
        } else {
          this.$router.push('/404')
        }
      })
    },
    handleClick (type, data) {
      switch (type) {
        case 'save':
          this.btLoading = true
          this.commit = Math.random()
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
