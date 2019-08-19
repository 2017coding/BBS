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
  data () {
    return {
      topic: '',
      client: null
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  watch: {
    $route (val) {
      this.invalidRoute(val)
    },
    // 用户登录才会开始订阅, 退出登录则关闭mqtt
    userInfo (val) {
      if (!val) {
        this.disconnectMqtt()
        return
      }
      this.initMqtt()
    }
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
      const URL = process.env.VUE_APP_TYPE === 'localhost' ? '127.0.0.1:1212' : 'www.lyh.red/mqttwss'
      // 在不同协议下，使用不同的连接方式
      const protocol = location.protocol === 'http:' ? 'mqtt:' : 'mqtts:'
      this.client = mqtt.connect(`${protocol}//${URL}`)
      const TopicList = [
        `/chat/user/${this.userInfo.id}`,
        `/chat/group/#`,
        `/message/user/${this.userInfo.id}`,
        `/message/audit/#`
      ]
      // 连接
      this.client.on('connect', () => {
        console.log('连接' + new Date())
        TopicList.forEach(topic => {
          this.client.subscribe(topic, function (err) {
            if (!err) {
              console.log('订阅成功: ' + topic)
            }
          })
        })
      })
      // 获取到消息
      this.client.on('message', (topic, message) => {
        // message is Buffer
        console.log(message.toString())
      })
      // 断开自动重连
      this.client.on('close', () => {
        console.log('close重新连接' + new Date())
      })
    },
    // 断开连接
    disconnectMqtt () {
      if (!this.client) return
      this.client.connected = false
      this.client.end(true)
      console.log('中断当前连接' + new Date())
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
