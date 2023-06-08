<!--
 * @Author: your name
 * @Date: 2019-12-25 16:39:51
 * @LastEditTime: 2020-12-02 11:46:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /PARK-WEB3.0-Gitee/src/views/screen/main/mainModule/leftTop/index.vue
 -->
<!-- 左上 -->
<template>
  <div class="mainStyle">
    <el-row class="heardStyle">
      <span>培训项目热度统计</span>
    </el-row>
    <el-row class="bodyStyle">
      <div class="contentBox">
        <div class="list">
          <div v-for="(item, index) in hotProject" :key="index" class="item">
            <div class="index">{{ index + 1 }}</div>
            <div class="title">{{ item.title }}</div>
          </div>
        </div>
      </div>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'LeftTop',
  components: {
  },
  data() {
    return {
      hotProject: [
        {
          id: 1,
          title: '瓦工'
        },
        {
          id: 2,
          title: '木工'
        },
        {
          id: 3,
          title: '计算机'
        },
        {
          id: 4,
          title: '教师'
        },
        {
          id: 5,
          title: '养殖'
        },
        {
          id: 6,
          title: '自动化'
        },
        {
          id: 7,
          title: '挖掘机'
        },
        {
          id: 8,
          title: '养护'
        }
      ]
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
      const ball = document.getElementById('ringLeftTopId')
      const ballChart = this.echarts.init(ball)
      ballChart.setOption({
        title: {
          show: true,
          padding: 35,
          backgroundColor: '#426B86',
          borderRadius: 100,
          left: 'center',
          top: 'center'
        },
        series: [{
          name: '',
          type: 'pie',
          radius: ['36%', '66%'],
          center: ['50%', '50%'],
          label: {
            fontSize: 12,
            color: '#F6F7F8',
            formatter: function(param) {
              return param.name + '\n' + param.percent.toFixed(0) + '%'
            }
          },
          labelLine: {
            show: true,
            lineStyle: {
              color: '#F6F7F8'
            }
          },
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
            name: '居民医疗保险',
            value: '300'
          }, {
            name: '职工生育保险',
            value: '120'
          }, {
            name: '职工医疗保险',
            value: '556'
          }]
        }]
      })
      // 设置默认选中高亮部分
      ballChart.dispatchAction({ type: 'highlight', seriesIndex: 0, dataIndex: 0 })
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
      background-size: 100% 100%;
      span{
        font-size: 1rem;
        font-weight: 500;
        color: rgba(255, 255, 255, 0.85);
        line-height: 3.5vh;
        margin-left: 10px;
      }
      @media screen and (max-width:1440px){
        span{
          font-size: .8rem;
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

      .contentBox{
          width: 100%;
          height: 100%;
          .list{
            height: 100%;
            overflow: auto;
            padding: 10px;
            padding-bottom: 0px;
            box-sizing: border-box;
            .item{
              width: 100%;
              height: 20px;
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding: 0 20px;
              box-sizing: border-box;
              background: rgba(0,154,201,.2);
              margin-bottom: 10px;
              font-size: 12px;
              border-radius: 4px;
            }
          }

        }
    }
  }
</style>
