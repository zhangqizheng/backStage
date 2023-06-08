<!--
 * @Author: your name
 * @Date: 2019-12-23 18:11:14
 * @LastEditTime: 2021-07-06 16:51:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /PARK-WEB3.0-Gitee/src/views/screen/component/screenNavMenu.vue
 -->
<template>
  <div class="heardStyle" />
</template>
<script>
import Cookies from 'js-cookie'
import logoLong from '@/assets/logo/logo-long.png'
import { mapGetters } from 'vuex'
export default {
  name: 'ScreenHeard',
  props: {
    heardTitle: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      screenUrl: '/screenMain',
      period: '',
      frequency: '',
      screenBtnState: true,
      LayoutBtnState: false,
      btnLayoutState: true,
      btnState: true,
      videoScreen: true,
      logoLong: logoLong,
      titleHeard: 'Tamil可视化平台',
      nowDate: '', // 当前日期
      nowTime: '', // 当前时间
      nowWeek: '' // 当前星期
    }
  },
  computed: {
    ...mapGetters([
      'name', 'remark'
    ])
  },
  watch: {
    $route: {
      handler: function(val, oldVal) {
        console.log(val.name, oldVal.name)
        if (val.name === 'screenMain' || val.name === 'immersion') {
          this.screenBtnState = true
          this.videoScreen = true
        } else {
          this.screenBtnState = false
        }
        if (val.name === 'AIMonitoring') {
          this.titleHeard = '实时监控大屏'
          this.videoScreen = false
        } else if (val.name === 'PanoramicMonitoring') {
          this.titleHeard = '全景监控大屏'
          this.videoScreen = true
        } else if (val.name === 'TrackTracking') {
          this.titleHeard = '轨迹追踪大屏'
          this.videoScreen = true
        } else if (val.name === 'dragDrop') {
          this.titleHeard = '消防安全监测大屏'
          this.LayoutBtnState = true
        } else {
          this.titleHeard = 'Tamil可视化平台'
          this.videoScreen = true
          this.LayoutBtnState = false
        }
      },
      // 深度观察监听
      deep: true
    },
    heardTitle: {
      handler(val) {
        this.titleHeard = val
      }
    }
  },
  created() {
    this.period = '近一周'
    this.frequency = '5'
    this.currentTime()
  },
  mounted() {
    /**
     * 大屏组件初始化
     * 这里可以调用厚点接口返回对应数据
     */
    if (Cookies.get('themeData')) {
      this.screenUrl = Cookies.get('themeData')
    } else {
      this.screenUrl = '/screenMain'
    }
  },
  // 销毁定时器 当离开该界面时触发
  beforeDestroy: function() {
    if (this.getDate) {
      clearInterval(this.getDate) // 在Vue实例销毁前，清除时间定时器
    }
  },
  methods: {
    // 大标题点击事件
    screen() {
      if (Cookies.get('themeData')) {
        const screenUrl = Cookies.get('themeData')
        this.$router.push(screenUrl)
      } else {
        this.$router.push('/screenMain')
      }
    },
    // 拖拽布局按钮事件
    btnLayoutEditor() {
      this.$EventBus.$emit('draggable', true)
      this.btnLayoutState = false
    },
    btnLayoutOk() {
      this.$EventBus.$emit('draggable', false)
      this.btnLayoutState = true
      this.$message({
        message: '恭喜您，设置成功',
        type: 'success'
      })
    },
    // 首页调整模块按钮事件
    changeCaseTBtn() {
      this.$EventBus.$emit('changeCaseTrue', true)
      this.btnState = false
    },
    changeCaseFBtn() {
      this.$EventBus.$emit('changeCaseFalse', false)
      Cookies.set('arrangementState', '1')
      this.btnState = true
      this.$message({
        message: '恭喜您，设置成功',
        type: 'success'
      })
    },
    // 设置主题按钮事件
    style() {
      this.$EventBus.$emit('styleState', true)
    },
    // 退出
    async logout() {
      this.$confirm('确定注销并退出系统吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('user/Logout').then(() => {
          location.reload()
        })
      })
    },
    // 获取当前系统时间
    currentTime() {
      setInterval(this.getDate, 500)
    },
    getDate: function() {
      var _this = this
      const yy = new Date().getFullYear()
      const mm = new Date().getMonth() + 1
      const dd = new Date().getDate()
      const week = new Date().getDay()
      const hh = new Date().getHours()
      const mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes()
      const ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds()
      if (week === 1) {
        this.nowWeek = '星期一'
      } else if (week === 2) {
        this.nowWeek = '星期二'
      } else if (week === 3) {
        this.nowWeek = '星期三'
      } else if (week === 4) {
        this.nowWeek = '星期四'
      } else if (week === 5) {
        this.nowWeek = '星期五'
      } else if (week === 6) {
        this.nowWeek = '星期六'
      } else {
        this.nowWeek = '星期日'
      }
      _this.nowTime = hh + ':' + mf + ':' + ss
      _this.nowDate = yy + '.' + mm + '.' + dd
    }
  }
}
</script>
<style lang="scss" scoped>
.heardStyle{
  width: 100%;
  height: 100%;
  //-----等待替换背景图片-----
  background: url('../../../assets/visual/title.png') no-repeat;
  background-repeat: no-repeat;   //不重复
  background-size: 100% 100%;     // 满屏
  .heardLeft{
    margin-top: 3vh;
    .screen-logo {
      margin-left: .5vw;
      width: 120px;
      height: 40px;
      vertical-align: middle;
    }
  }
  .heardRight{
    margin-top: 2vh;
    .unitTitle{
      font-size: .8rem;
      padding-top: 10px;
      color:#2EEEE3;
      span{
        font-weight: bold;
        font-size: .8rem;
        color: #f78c00;
      }
    }
  }
  .screenTitle{
    padding-top: 1.5vh;
    text-align: center;
    a{
      color: #f1f1f1;
      font-size: 1.7rem;
      font-weight: 800;
      display: inline-block;
      vertical-align: middle;
      margin: 0 auto;
    }
  }
  .heardButtonStyle{
    text-align: right;
    vertical-align: middle;
    margin-top: 1.5vh;
    margin-right: 5px;
    .svgIcon{
      color: #f78c00;
    }
    p{
      display: inline;
      padding-right: 5px;
      font-family: 'AlibabaPuHuiTiM';
      font-weight: bold;
      color: #2EEEE3;
      font-size: 1rem;
      span{
        padding-left: 5px;
      }
    }
    .backSystemBtnStyle{
      font-family: 'AlibabaPuHuiTiM';
      color: #2EEEE3;
      font-size: .8rem;
    }
  }
  @media screen and (max-width:1440px){
    .heardLeft{
      margin-top: 2.5vh;
      .screen-logo {
        margin-left: .5vw;
        width: 120px;
        height: 40px;
        vertical-align: middle;
      }
    }
    .heardRight{
      margin-top: 1.5vh;
      .unitTitle{
        font-size: .8rem;
        padding-top: 10px;
        color:#2EEEE3;
        span{
          font-weight: bold;
          font-size: .8rem;
          color: #f78c00;
        }
      }
    }
    .screenTitle{
      padding-top: 1vh;
      text-align: center;
      a{
        color: #f1f1f1;
        font-size: 1.7rem;
        font-weight: 800;
        display: inline-block;
        vertical-align: middle;
        margin: 0 auto;
      }
      .timeDate{
        .time{
          padding-right: .5vw;
          font-size: 1.0rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.85);
          letter-spacing: 2px;
        }
        .nowDate{
          font-size: .8rem;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.85);
        }
      }
    }
    .heardButtonStyle{
    text-align: right;
    vertical-align: middle;
    margin-top: 1.2vh;
    margin-right: 5px;
    .svgIcon{
      color: #f78c00;
    }
    p{
      display: inline;
      padding-right: 5px;
      font-family: 'AlibabaPuHuiTiM';
      font-weight: bold;
      color: #2EEEE3;
      font-size: .8rem;
      span{
        padding-left: 5px;
      }
    }
    .backSystemBtnStyle{
      font-family: 'AlibabaPuHuiTiM';
      color: #2EEEE3;
      font-size: .8rem;
    }
  }
  }
}
</style>
