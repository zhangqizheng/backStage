<template>
  <div :id="id" class="pie" />
</template>
<script>
import echarts from 'echarts'
export default {
  props: {
    id: {
      type: String,
      required: true
    },
    dataList: {
      type: Array,
      required: true
    },
    radius: {
      type: Number,
      required: false,
      default: 50
    },
    // 设置显示的toop
    legend: {
      type: String,
      required: true
    },
    title: {
      type: String,
      default: ''
    },
    subtext: {
      type: String,
      default: ''
    },

    // 设置饼居中问题
    seriesCenter: {
      type: Array,
      required: true
    },
    labelShow: {
      type: String,
      default: '' },
    labelLineShow: {
      type: String,
      default: '' },
    // 设置居中
    legendLeft: {
      type: String,
      default: '' },
    // 设置显示横向还是纵向
    orient: {
      type: String,
      default: '' }
  },
  data() {
    return {
      echarts: ''
    }
  },
  watch: {
    dataList: {
      handler(newVal, oldVal) {
        if (this.echarts) {
          if (newVal) {
            this.echarts.setOption(newVal)
          } else {
            this.echarts.setOption(oldVal)
          }
        } else {
          this.initCharts()
        }
      },
      deep: true // 对象内部属性的监听，关键。
    }
  },
  created() {
    this.$nextTick(() => {
      this.initCharts()
    })
  },
  destroy() {
    if (this.echarts) {
      this.echarts.dispose()
      this.echarts = null
    }
  },
  methods: {
    initCharts() {
      this.echarts = echarts.init(document.getElementById(this.id))
      var option = {
        title: {
          text: [
            '{value|' + this.title + '}',
            '{name|' + this.subtext + '}'
          ].join('\n'),
          top: 'center',
          left: '24%',
          textAlign: 'center',
          // subtext: this.subtext,
          x: 'center',
          y: 'center',
          textStyle: {
            rich: {
              value: {
                color: '#303133',
                fontSize: 16,
                fontWeight: 'bold',
                lineHeight: 40
              },
              name: {
                color: '#ccc',
                fontSize: 16,
                lineHeight: 18
              },
              money: {
                color: '#767676',
                fontSize: 16,
                lineHeight: 18
              }
            }
          }
        },

        tooltip: {
          trigger: 'item',
          formatter: '{a}<br>{b}:{c}({d}%)'
        },
        legend: {
          orient: this.orient, // horizontal 横 //vertical 竖
          y: this.legend,
          left: this.legendLeft,
          textStyle: {
            align: 'left',
            fontSize: 12,
            rich: {
            // 自定义class
              percent: {
                padding: [0, 0, 0, 10]
              }
            }
          },
          // 使用回调函数
          formatter: function(name) {
            var data = option.series[0].data
            var total = 0
            var tarValue
            for (var i = 0, l = data.length; i < l; i++) {
              total += data[i].value
              if (data[i].name === name) {
                tarValue = data[i].value
              }
            }
            var p = ((tarValue / total) * 100).toFixed(1)
            return name + ' ' + ' ' + p + '%'
          }
        },
        series: [
          {
            type: 'pie',
            radius: ['30%', '50%'],
            center: this.seriesCenter,
            data: this.dataList,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0,0,0,1)'
              },
              normal: {
                color: function(params) {
                  // 自定义颜色
                  var colorList = [
                    '#4abbf0', '#fdb644', '#79ce82'

                  ]
                  return colorList[params.dataIndex]
                }
              }
            },

            label: {
              normal: {
                show: this.labelShow,
                formatter: '{b}:{d}%',
                fontSize: 16,
                color: '#000'
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '40',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: this.labelLineShow,
                length: 0,
                length2: 50
              }
            }
          }
        ]
      }
      this.echarts.setOption(option, true)
    }
  }
}
</script>
<style lang="scss" scoped>
.pie{
    width: 100%;
    height: 300px;
}
</style>
