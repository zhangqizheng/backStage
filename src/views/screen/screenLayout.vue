<!--
 * @Author: your name
 * @Date: 2019-12-23 18:00:11
 * @LastEditTime: 2020-12-04 17:06:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /PARK-WEB3.0-Gitee/src/views/screen/screenLayout.vue
 -->
<template>
  <div class="screenStyle">
    <div class="screenStyleSon">
      <div style="height: 12vh;">
        <screenHeard :heard-title="heardTitle" />
      </div>
      <div style="height: 88vh;">
        <router-view />
      </div>
      <el-drawer
        class="immersionMain"
        title="title"
        :visible.sync="drawer"
        :with-header="false"
        direction="rtl"
        size="15%"
      >
        <div class="immersionStyle">
          <h3 class="immersionTitle"><svg-icon icon-class="theme" /> 请选择首页风格</h3>
          <el-divider><i class="el-icon-magic-stick" /></el-divider>
          <div class="immersionBtn">
            <div class="backSystemBtnStyle">
              <router-link to="/screenMain">
                <el-button type="primary" @click="styleBtn('/screenMain')">
                  <svg-icon icon-class="example" /> 标准式风格
                </el-button>
              </router-link>
            </div>
            <div class="backSystemBtnStyle">
              <router-link to="/immersion">
                <el-button type="primary" @click="styleBtn('/immersion')">
                  <svg-icon icon-class="example" /> 沉浸式风格
                </el-button>
              </router-link>
            </div>
          </div>
        </div>
      </el-drawer>
    </div>
  </div>
</template>
<script>
import { screenHeard } from './component'
export default {
  name: 'ScreenLayout',
  components: {
    screenHeard
  },
  data() {
    return {
      heardTitle: '',
      drawer: false
    }
  },
  mounted() {
    /**
     * 大屏组件初始化
     * 这里可以调用厚点接口返回对应数据
     */
    this.$EventBus.$on('styleState', (val) => {
      this.drawer = val
    })
  },
  methods: {
    styleBtn(e) {
      this.$store.dispatch('screenStyle/SetThemeData', e)
    }
  }
}
</script>
<style lang="scss" scoped>
.screenStyle{
  .screenStyleSon {
    width: 100%;
    height: 100%;
    background: url('../../assets/visual/bodyBg.png') no-repeat;
    background-size: 100% 100%;
    position: absolute;
    color: #fff;
  }
  .immersionMain{
    text-align: center;
    .immersionStyle{
      height: 100%;
      .immersionTitle{
        color: rgba(47, 141, 230, 0.548);
        margin-bottom: 30px;
      }
      padding: 20px;
      .immersionBtn{
        margin-top: 30px;
        .backSystemBtnStyle{
          padding-top: 20px;
        }
      }
    }
  }
}

</style>
