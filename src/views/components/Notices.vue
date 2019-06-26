<template>
  <div class="notices">
    <a :href="notices.href" target="_blank">
      {{ notices.content }}
    </a>
  </div>
</template>

<script>
import { getNoticesApi } from '@/api/home'

export default {
  name: 'Notices',
  data () {
    return {
      notices: {
        content: '欢迎来到LLyh',
        href: 'https://github.com/2017coding'
      }
    }
  },
  mounted () {
    this.getNotices()
  },
  methods: {
    getNotices () {
      getNoticesApi().then(res => {
        if (res.success) {
          this.notices = {
            content: res.content[0].content,
            href: res.content[0].href
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.notices{
  cursor: pointer;
  padding: 15px;
  margin-bottom: 20px;
  font-size: 12px;
  border: 1px solid #faebcc;
  background-color: #fcf8e3;
  border-radius: 4px;
  &:hover{
    text-decoration: underline;
  }
}
</style>
