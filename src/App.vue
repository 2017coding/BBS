<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import mqtt from 'mqtt'
import { mapGetters } from 'vuex'
export default {
  name: 'App',
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  watch: {
    $route (val) {
      this.invalidRoute(val)
    }
  },
  mounted () {
    this.initMqtt()
  },
  methods: {
    invalidRoute (val) {
      const matched = this.$route.matched
      // 访问不存在的路由进入404页面
      if (!matched || matched.length === 0 || val.path === '/404') {
        this.$router.push('/404')
        return
      }
      // 如果用户没有登录，进入这些页面将重定向到401页面
      if (!this.userInfo) {
        const inaccessibleList = ['/write', '/draft']
        if (inaccessibleList.includes(val.path)) {
          this.$router.push('/401')
          return
        }
      }
    },
    initMqtt () {
      const URL = process.env.VUE_APP_TYPE === 'localhost' ? '10.61.0.69' : 'www.lyh.red'
      const client = mqtt.connect(`mqtt://${URL}:1212`)
      // 连接
      client.on('connect', () => {
        console.log('连接' + new Date())
        client.subscribe('/11123', function (err) {
          if (!err) {
            client.publish('/11123', 'Hello mqtt')
          }
          console.log('订阅成功')
        })
      })
      // 获取到消息
      client.on('message', (topic, message) => {
        // message is Buffer
        console.log(message.toString())
      })
      // 断开自动重连
      client.on('close', () => {
        console.log('close重新连接' + new Date())
      })
    }
  }
}
</script>

<style scope lang="scss">
@import '@/common/style/base.scss';
#app {
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: $fontSize1;
  color: $fontColor1;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
