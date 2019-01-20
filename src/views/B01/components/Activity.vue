<template>
  <div class="activity">
    <div class="head">
      <span class="title">活动推荐</span>
      <span class="more">更多</span>
    </div>
    <div class="item" v-for="(item, index) in list" :key="index">
      <div class="time">
        <p class="month">{{getEngMonth(item.date)}}</p>
        <p class="day">{{$fn.switchTime(item.date, 'DD')}}</p>
      </div>
      <div class="content">
        <p class="title">{{item.title}}</p>
        <div class="info">
          <span class="addr">{{item.addr}}</span>
          <span class="dot">·</span>
          <span class="date">{{$fn.switchTime(item.date, 'MM-DD')}}</span>
          <span class="week">{{getWeek(item.date)}}</span>
          <span class="dot">·</span>
          <span class="status">{{item.status}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    getList () {
      let obj = [
        {
          date: '2019-01-19',
          title: 'TiDB DevCon 2019：年度最高规格的TiDB技术大会',
          addr: '北京',
          status: ''
        },
        {
          date: '2019-01-18',
          title: '大数据技术专场：玩转轻资产的大数据服务',
          addr: '北京',
          status: '报名中'
        },
        {
          date: '2019-01-19',
          title: '阿里云沙龙|云原生数据库POLARDB核心技术分享',
          addr: '北京',
          status: '报名中'
        },
        {
          date: '2019-01-19',
          title: '阿里云栖开发者沙龙合肥专场：高并发企业级应用架构实践',
          addr: '合肥',
          status: '报名中'
        },
        {
          date: '2019-01-20',
          title: '人工智能开发者线下实战训练营北京站 第二期',
          addr: '北京',
          status: '报名中'
        }
      ]
      this.list = obj.map(item => {
        item.weekDay = this.getWeek(item.date)
        return item
      })
    },
    // 得到月份的英文
    getEngMonth (date) {
      switch (new Date(date).getMonth()) {
      case 0: return 'JAN'
      case 1: return 'FEB'
      case 2: return 'MAR'
      case 3: return 'APR'
      case 4: return 'MAY'
      case 5: return 'JUN'
      case 6: return 'JUL'
      case 7: return 'AUG'
      case 8: return 'SEP'
      case 9: return 'OCT'
      case 10: return 'NOV'
      case 11: return 'DEC'
      }
    },
    // 得到星期几
    getWeek (date) {
      let result
      switch (new Date(date).getDay()) {
      case 0:
        result = '日'
        break
      case 1:
        result = '一'
        break
      case 2:
        result = '二'
        break
      case 3:
        result = '三'
        break
      case 4:
        result = '四'
        break
      case 5:
        result = '五'
        break
      case 6:
        result = '六'
        break
      }
      return `星期${result}`
    }
  }
}
</script>

<style scoped lang="scss">
  @import '@/common/style/base.scss';
  .activity{
    .head{
      display: flex;
      .title{
        flex: 1;
        margin-bottom: 15px;
      }
      .more{
        color: $theme;
      }
    }
    .item{
      padding: 8px 0;
      display: flex;
      border-bottom: 1px dashed #eee;
      &:last-child{
        border-bottom: none;
      }
      .time{
        height: 36px;
        color: $theme;
        margin-right: 10px;
        background: rgba(218, 133, 133, .5);
        .month, .day{
          width: 32px;
          text-align: center;
        }
        .month{
          height: 16px;
          line-height: 16px;
          font-size: 12px;
          transform: scale(0.833);
        }
        .day{
          height: 20px;
          line-height: 20px;
          background: rgb(255, 233, 233);
        }
      }
      .content{
        color: $fontColor4;
        font-size: $fontSize4;
        .title{
          color: $fontColor2;
          font-weight: 500;
          font-size: $fontSize1;
          margin-bottom: 2px;
          line-height: 1.5;
        }
        .status{
          color: $warmColor;
        }
      }
    }
  }
</style>
