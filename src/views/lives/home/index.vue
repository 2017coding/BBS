<template>
  <div class="home">
    <div class="left">
      <!-- 数据统计 -->
      <div class="box1">
        <count
          v-for="(item, index) in data1"
          :key="index"
          :data="item"
          class="count"
        />
      </div>
      <!-- 监测仪表概况 -->
      <div class="box2">
        <div class="title">监测仪表概括</div>
        <div class="count">1</div>
        <Radar />
      </div>
      <!-- 预警监测 -->
      <div class="box3">
        <div class="title">预警监测</div>
        <count
          v-for="(item, index) in data2"
          :key="index"
          :data="item"
          class="count"
        />
        <info-scroll :list="list" class="scroll" />
      </div>
    </div>
    <div class="right">
      <div class="map">地图</div>
      <div class="count-box">
        <count
          v-for="(item, index) in data3"
          :key="index"
          :data="item"
          class="count"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Count from './components/Count'
import Radar from './components/Radar'
import InfoScroll from './components/InfoScroll'
export default {
  components: {
    Count,
    Radar,
    InfoScroll
  },
  data () {
    return {
      data1: [
        {
          title: '户数',
          nums: 2833
        },
        {
          title: '台区',
          nums: 4455
        }
      ],
      data2: [
        {
          title: '当月严重预警',
          nums: 1432,
          unit: '次',
          countStyle: 'height: 50px; width: calc(50% - 5px); background: rgb(200, 200, 200); flex-direction: row;'
        },
        {
          title: '当月紧急预警',
          nums: 133,
          unit: '次',
          countStyle: 'height: 50px; width: calc(50% - 5px); margin-left: 10px; background: rgb(200, 200, 200); flex-direction: row;'
        }
      ],
      data3: [
        {
          title: '正常',
          nums: 3840
        },
        {
          title: '信号不稳定',
          nums: 74
        },
        {
          title: '数据缺失验证',
          nums: 62
        },
        {
          title: '长期离线',
          nums: 409
        }
      ],
      list: [
        {
          source: '佛山市南海荣昭置业发展有限公司',
          time: '16:35',
          desc: '过补偿保护（功率因素）：实际值： -0.073'
        },
        {
          source: '佛山市南海洪溢机械厂',
          time: '16:32',
          desc: '最大需量越限告警：实际值： 157.5 上限值： 157'
        },
        {
          source: '郴州市鼎辉房地产开发有限公司',
          time: '16:30',
          desc: '过补偿保护（功率因素）：实际值： -0.672'
        },
        {
          source: '佛山市南海荣昭置业发展有限公司',
          time: '16:35',
          desc: '过补偿保护（功率因素）：实际值： -0.073'
        },
        {
          source: '佛山市南海洪溢机械厂',
          time: '16:32',
          desc: '最大需量越限告警：实际值： 157.5 上限值： 157'
        },
        {
          source: '郴州市鼎辉房地产开发有限公司',
          time: '16:30',
          desc: '过补偿保护（功率因素）：实际值： -0.672'
        },
        {
          source: '佛山市南海荣昭置业发展有限公司',
          time: '16:35',
          desc: '过补偿保护（功率因素）：实际值： -0.073'
        },
        {
          source: '佛山市南海洪溢机械厂',
          time: '16:32',
          desc: '最大需量越限告警：实际值： 157.5 上限值： 157'
        },
        {
          source: '郴州市鼎辉房地产开发有限公司',
          time: '16:30',
          desc: '过补偿保护（功率因素）：实际值： -0.672'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.home{
  display: flex;
  height: 100vh;
  background: rgb(50, 50, 50);
  .left{
    height: 100%;
    margin: 0 10px;
    width: 30%;
    overflow: hidden;
    .box1, .box2{
      margin-bottom: 10px;
    }
    .box2, .box3{
      padding: 10px;
      color: white;
    }
    .box1{
      display: flex;
      height: 10%;
      .count:last-child{
        margin-left: 10px;
      }
    }
    .box2{
      height: calc(50% - 10px);
      background: rgb(102, 102, 102);
    }
    .box3{
      height: calc(40% - 10px);
      background: rgb(102, 102, 102);
      .count{
        display: inline-flex;
      }
    }
  }
  .right{
    flex: 1;
    flex-direction: column;
    height: 100%;
    .map{
      height: calc(90% - 10px);
      margin-bottom: 10px;
      background: rgb(102, 102, 102);
    }
    .count-box{
      display: flex;
      flex: 1;
      .count{
        margin-right: 10px;
      }
    }
  }
}
</style>
