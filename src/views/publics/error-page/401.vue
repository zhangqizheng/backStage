<template>
  <div class="errPage-container">
    <el-row>
      <el-col :span="12">
        <div class="textStyle">
          <el-button
            icon="el-icon-arrow-left"
            class="pan-back-btn"
            @click="back"
          >
            返回
          </el-button>
          <h1 class="text-jumbo text-ginormous">温馨提示</h1>
          <h2>您还没有权限去该页面</h2>
          <h6>具体情况请联系管理员</h6>
          <ul class="list-unstyled">
            <li class="link-type" />
          </ul>
        </div>
      </el-col>
      <el-col :span="12">
        <img
          :src="errGif"
          width="100%"
          alt="401"
        >
      </el-col>
    </el-row>
    <el-dialog
      :visible.sync="dialogVisible"
      title="随便看"
    >
      <img
        :src="ewizardClap"
        class="pan-img"
      >
    </el-dialog>
  </div>
</template>

<script>
import errGif from '@/assets/401_images/401.gif'

export default {
  name: 'Page401',
  data() {
    return {
      errGif: errGif + '?' + +new Date(),
      ewizardClap: 'https://wpimg.wallstcn.com/007ef517-bafd-4066-aae4-6883632d9646',
      dialogVisible: false
    }
  },
  methods: {
    back() {
      if (this.$route.query.noGoBack) {
        this.$router.push({ path: '/dashboard' })
      } else {
        this.$router.go(-1)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.errPage-container {
  background: linear-gradient(60deg, rgb(129, 105, 223) 0%, rgb(114, 213, 226) 100%);
  padding: 100px;
  height: 100%;
  .textStyle{
    padding-top: 200px;
    padding-left: 100px;
  }
  .pan-back-btn {
    background: #409EFF;
    color: #fff;
    border: none !important;
  }
  .pan-gif {
    margin: 0 auto;
    display: block;
  }
  .pan-img {
    display: block;
    margin: 0 auto;
    width: 100%;
  }
  .text-jumbo {
    font-size: 60px;
    font-weight: 700;
    color: #fff;
  }
  h2,h6{
    color: #f1f1f1;
  }

  .list-unstyled {
    font-size: 14px;
    li {
      padding-bottom: 5px;
    }
    a {
      color: #409EFF;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
