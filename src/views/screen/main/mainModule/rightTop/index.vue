<!--
 * @Author: your name
 * @Date: 2019-12-25 16:39:51
 * @LastEditTime: 2020-11-24 14:47:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /PARK-WEB3.0-Gitee/src/views/screen/main/mainModule/rightTop/index.vue
 -->
<!-- 右上 -->
<template>
  <div class="mainStyle">
    <el-row class="heardStyle">
      <span>学员培训类型热度统计</span>
    </el-row>
    <el-row class="bodyStyle">
      <div id="ringRightTopId" ref="ringRightTopId" :style="{width: '95%', height: '95%'}" />
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'RightTop',
  components: {
  },
  data() {
    return {
    }
  },
  mounted() {
    this.chartsFunction()
  },
  methods: {
    moreClick() {
      // this.$router.push(`/LRD`)
    },
    // 图标初始化
    chartsFunction() {
      const ball = document.getElementById('ringRightTopId')
      const ballChart = this.echarts.init(ball)
      ballChart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c} ({d}%)'
        },

        visualMap: {
          show: false,
          min: 500,
          max: 600,
          inRange: {
            // colorLightness: [0, 1]
          }
        },
        series: [{
          name: '培训类型',
          type: 'pie',
          radius: '80%',
          center: ['50%', '50%'],
          itemStyle: {
            normal: {
              color: (list) => {
                // 注意 ！！！！！ 这里的数组一定要和实际的类目长度相等或大于，不然会缺少颜色报错
                var colorList = [
                  {
                    colorStart: '#FFAB62',
                    colorEnd: '#EA42A3'
                  },
                  {
                    colorStart: '#2BAFFF',
                    colorEnd: '#2B8CFD'
                  },
                  {
                    colorStart: '#2C6BF8',
                    colorEnd: '#6A13CD'
                  },
                  {
                    colorStart: '#003cff',
                    colorEnd: '#00fff8'
                  }
                ]
                return new this.echarts.graphic.LinearGradient(1, 0, 0, 0, [{ // 左、下、右、上
                  offset: 0,
                  color: colorList[list.dataIndex]['colorStart']
                }, {
                  offset: 1,
                  color: colorList[list.dataIndex]['colorEnd']
                }])
              }
            }
          },
          data: [{
            value: 285,
            name: '适应性培训'
          },
          {
            value: 410,
            name: '创业培训'
          },
          {
            value: 274,
            name: '职业技能培训'
          },
          {
            value: 167,
            name: '其他'
          }
          ].sort(function(a, b) {
            return a.value - b.value
          }),
          roseType: 'radius',

          label: {
            normal: {
              formatter: ['{b|{b}}', '{c|{c}次}'].join('\n'),
              rich: {
                b: {
                  color: '#F6F7F8',
                  fontSize: 12,
                  lineHeight: 5
                },
                c: {
                  color: '#F6F7F8',
                  fontSize: 12,
                  height: 40
                }
              }
            }
          },
          labelLine: {
            normal: {
              lineStyle: {
                color: 'rgb(98,137,169)'
              },
              smooth: 0.2,
              length: 10,
              length2: 20

            }
          }
        }]
      })
      window.addEventListener('resize', function() {
        ballChart.resize()
      })
    }
  }
}
</script>
<style  lang="scss" scoped>
  .mainStyle{
    height: 100%;
    .heardStyle{
      padding-left: .5vw;
      text-align: left;
      height: 8%;
      background-image: url('../../../../../assets/visual/titleBg.png');
      background-repeat: no-repeat;   //不重复
      background-size: 100% 100%;     // 满屏
      // border-radius: 4px 4px 0px 0px;
      // opacity: 0.8;
      // border: 3px solid;
      // border-image: radial-gradient(circle, rgba(124, 190, 255, 1), rgba(51, 101, 172, 0)) 3 3;
      .iconStyle{
        color: #17E1CD;
      }
      span{
        font-size: 1rem;
        font-weight: 500;
        color: rgba(255, 255, 255, 0.85);
        line-height: 3.5vh;
      }
      @media screen and (max-width:1440px){
        span{
          font-size: .8rem;
        }
      }
      .moreStyle{
        text-align: right;
        padding-right: .5vw;
        a{
          font-size: .8rem;
          font-weight: 500;
          color: #17E1CD;
          line-height: 4vh;
        }
      }
    }
    .bodyStyle{
      overflow: auto;
      height: 88%;
      background: rgba(3,23,31,0.41);
      border-radius: 0px 0px 4px 4px;
      border: 2px solid rgba(51, 101, 172, 0.2);
      text-align: center;
      .iconStyle{
        margin-top: 15%;
        width: 120px;
        height: 120px;
      }
      .caseStyle1{
        height: 100%;
      }
    }
  }
</style>
