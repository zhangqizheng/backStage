<template>
  <div :id="id" class="echartsLine" />
</template>
<script>
import echarts from 'echarts'
export default {
  name: 'EchartsLine',
  props: {
    id: {
      type: String,
      required: true
    },
    type: {
      type: Array,
      required: false,
      default: function() {
        return ['bar', 'line']
      }
    },
    xData: {
      type: Array,
      required: true
    },
    max: {
      type: Number,
      required: false,
      default: 200
    },
    min: {
      type: Number,
      required: false,
      default: 10
    },
    dataList: {
      type: Array,
      required: true
    },
    seriesType: {
      type: String,
      required: true
    },
    legendData: {
      type: Array,
      required: true
    },
    dataZoom: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      echarts: ''
    }
  },
  watch: {
    dataZoom: {
      handler(newVal, oldVal) {
        if (this.echarts) {
          if (newVal) {
            this.echarts.setOption(newVal)
          } else {
            this.echarts.setOption(oldVal)
          }
        } else {
          this.initEchartsLine()
        }
      },
      deep: true // 对象内部属性的监听，关键。
    },
    // 观察option的变化
    xData: {
      handler(newVal, oldVal) {
        if (this.echarts) {
          if (newVal) {
            this.echarts.setOption(newVal)
          } else {
            this.echarts.setOption(oldVal)
          }
        } else {
          this.initEchartsLine()
        }
      },
      deep: true // 对象内部属性的监听，关键。
    }
  },
  mounted() {
    this.initEchartsLine()
    window.addEventListener('resize', () => {
      // 计算echarts高度
      this.setEchartsHeight('echartsLine', this.id, 30)
      this.echarts.resize()
    })
    this.setEchartsHeight('echartsLine', this.id, 30)
  },
  methods: {
    // 默认设置
    initEchartsLine() {
      this.echarts = echarts.init(document.getElementById(this.id))
      var option = {
        title: {
          text: '',
          textStyle: {
            fontWeight: 400,
            fontSize: '20px'
          }
        },
        grid: {
          bottom: '18%',
          left: 50,
          right: 50
        },

        // 提示框组件
        tooltip: {
          show: true,
          trigger: 'axis'
        },
        legend: {
          bottom: '8%',
          data: this.legendData
        },
        // 工具栏
        toolbox: {
          show: false,
          feature: {
            magicType: {
              show: true,
              type: this.type
            }
          },
          right: '6%'
        },
        dataZoom: this.dataZoom,
        // 横坐标
        xAxis: {
          type: 'category',
          data: this.xData,

          axisLine: {
            lineStyle: {
              type: 'solid',
              color: '#333',
              width: '1'
            }
          },

          axisTick: {
            show: true
          },
          axisLabel: {
            interval: 0,
            textStyle: {
              color: '#333'
            }
          }
        },
        // 纵坐标
        yAxis: {
          name: '',
          max: this.max,
          type: 'value',
          axisLine: {
            show: true
          },
          axisTick: {
            show: true
          },
          axisLabel: {
            textStyle: {
              color: '#333'
            }
          },
          minInterval: this.min,
          splitLine: {
            lineStyle: {
              color: '#f6f6f6'
            }
          }
        },
        series: this.dataList
      }
      this.echarts.resize()
      this.echarts.setOption(option)
    },
    // 自适应高度
    setEchartsHeight(className, idName, num = 0) {
      // 父级高度
      // const fatherHeight = document.getElementsByClassName(className)[0].offsetHeight
      // 计算echarts高度
      // const echartsHeight = fatherHeight - num
      // 赋值
      // document.getElementById(idName).style.height = echartsHeight + 'px'
    }
  }
}
</script>
<style lang="scss" scoped>
.echartsLine{
    height: 100%;
    width:100%;
}
</style>
