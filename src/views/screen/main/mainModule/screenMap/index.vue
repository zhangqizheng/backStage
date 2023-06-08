<template>
  <div id="china_map_box">
    <div id="china_map" />
  </div>
</template>

<script>
import echarts from 'echarts'
import 'echarts/map/js/china.js'
export default {
  data() {
    return {
      // echart 配制option
      options: {
        tooltip: {
          triggerOn: 'mousemove', // mousemove、click
          padding: 8,
          borderWidth: 1,
          borderColor: '#409eff',
          backgroundColor: 'rgba(255,255,255,0.7)',
          textStyle: {
            color: '#000000',
            fontSize: 13
          },
          formatter: function(e, t, n) {
            const data = e.data
            // 模拟数据
            data.specialImportant = (Math.random() * 1000) | 0
            data.import = (Math.random() * 100) | 0
            data.value = (Math.random() * 10) | 0

            const context = `
               <div>
                   <p><b style="font-size:15px;">${data.name}</b></p>
                   <p class="tooltip_style"><span class="tooltip_left">机构数量：</span><span class="tooltip_right">${data.value}</span></p>
                   <p class="tooltip_style"><span class="tooltip_left">培训人数：</span><span class="tooltip_right">${data.specialImportant}</span></p>
                   <p class="tooltip_style"><span class="tooltip_left">就业率：</span><span class="tooltip_right">${data.import}%</span></p>
               </div>
            `
            return context
          }
        },
        visualMap: {
          show: false,
          left: 26,
          bottom: 40,
          showLabel: true,
          pieces: [
            {
              gte: 100,
              label: '>= 1000',
              color: 'rgba(41,217,255,.5)'
            },
            {
              gte: 500,
              lt: 999,
              label: '500 - 999',
              color: 'rgba(41,217,255,.5)'
            },
            {
              gte: 100,
              lt: 499,
              label: '100 - 499',
              color: 'rgba(41,217,255,.5)'
            },
            {
              gte: 10,
              lt: 99,
              label: '10 - 99',
              color: 'rgba(41,217,255,.5)'
            },
            {
              lt: 10,
              label: '<10',
              color: 'rgba(41,217,255,.5)'
            }
          ]
        },
        geo: {
          map: 'china',
          scaleLimit: {
            min: 1,
            max: 2
          },
          zoom: 1,
          top: 20,
          label: {
            normal: {
              show: true,
              fontSize: '10',
              color: 'rgba(255,255,255,0.7)'
            }
          },
          itemStyle: {
            normal: {
              borderColor: 'rgba(255, 255, 255, 0.7)'
            },
            emphasis: {
              areaColor: 'rgba(255, 255, 255, 0.7)',
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              borderWidth: 0
            }
          }
        },
        series: [
          {
            name: '突发事件',
            type: 'map',
            geoIndex: 0,
            data: []
          }
        ]
      },
      // echart data
      dataList: [
        {
          name: '南海诸岛',
          value: 100,
          eventTotal: 100,
          specialImportant: 10,
          import: 10,
          compare: 10,
          common: 40,
          specail: 20
        },
        {
          name: '北京',
          value: 540
        },
        {
          name: '天津',
          value: 130
        },
        {
          name: '上海',
          value: 400
        },
        {
          name: '重庆',
          value: 750
        },
        {
          name: '河北',
          value: 130
        },
        {
          name: '河南',
          value: 830
        },
        {
          name: '云南',
          value: 110
        },
        {
          name: '辽宁',
          value: 19
        },
        {
          name: '黑龙江',
          value: 150
        },
        {
          name: '湖南',
          value: 690
        },
        {
          name: '安徽',
          value: 60
        },
        {
          name: '山东',
          value: 39
        },
        {
          name: '新疆',
          value: 4
        },
        {
          name: '江苏',
          value: 31
        },
        {
          name: '浙江',
          value: 104
        },
        {
          name: '江西',
          value: 36
        },
        {
          name: '湖北',
          value: 52
        },
        {
          name: '广西',
          value: 33
        },
        {
          name: '甘肃',
          value: 7
        },
        {
          name: '山西',
          value: 5
        },
        {
          name: '内蒙古',
          value: 778
        },
        {
          name: '陕西',
          value: 22
        },
        {
          name: '吉林',
          value: 4
        },
        {
          name: '福建',
          value: 18
        },
        {
          name: '贵州',
          value: 5
        },
        {
          name: '广东',
          value: 98
        },
        {
          name: '青海',
          value: 1
        },
        {
          name: '西藏',
          value: 0
        },
        {
          name: '四川',
          value: 44
        },
        {
          name: '宁夏',
          value: 4
        },
        {
          name: '海南',
          value: 22
        },
        {
          name: '台湾',
          value: 3
        },
        {
          name: '香港',
          value: 5
        },
        {
          name: '澳门',
          value: 555
        }
      ]
    }
  },
  created() {
    this.setEchartOption()
  },
  mounted() {
    this.$nextTick(() => {
      this.initEchartMap()
    })
  },
  methods: {
    // 初始化中国地图
    initEchartMap() {
      const mapDiv = document.getElementById('china_map')
      const myChart = echarts.init(mapDiv)
      myChart.setOption(this.options)
    },
    // 修改echart配制
    setEchartOption() {
      this.options.series[0]['data'] = this.dataList
    }
  }
}
</script>

<style scoped>
#china_map_box {
  height: 100%;
  position: relative;
}
#china_map_box #china_map {
  height: 100%;
  transform: scale(1.25);
}
#china_map_box .china_map_logo {
  position: absolute;
  top: 0;
  left: 0;
  width: 45px;
}
</style>
<style>
#china_map .tooltip_style {
  line-height: 1.7;
  overflow: hidden;
}
#china_map .tooltip_left {
  float: left;
}
#china_map .tooltip_right {
  float: right;
}
</style>
