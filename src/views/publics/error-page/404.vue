<template>
  <div class="wscn-http404-container">
    <div class="wscn-http404">
      <el-row>
        <el-col :span="12">
          <div class="pic-404">
            <img class="pic-404__parent" src="@/assets/404_images/404.gif" alt="404">
          </div>
        </el-col>
        <el-col :span="12">
          <div class="bullshit">
            <div class="bullshit__oops">404!</div>
            <div class="bullshit__info">您所访问的页面不通哦~
            </div>
            <div class="bullshit__headline">{{ message }}</div>
            <div class="bullshit__info">请检查您输入的网址是否正确，或点击下面的按钮返回主页。</div>
            <a href="" class="bullshit__return-home">返 回</a>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Page404',
  computed: {
    message() {
      return '没有权限进入这个页面…'
    }
  }
}
</script>

<style lang="scss" scoped>
.wscn-http404-container{
  background: linear-gradient(60deg, rgb(129, 105, 223) 0%, rgb(114, 213, 226) 100%);
  width: 100%;
  height: 100%;
  padding: 100px;
}
.wscn-http404 {
  position: relative;
  overflow: hidden;
  .pic-404 {
    width: 100%;
    .pic-404__parent{
      width: 100%;
    }
  }
  .bullshit {
    padding-top: 200px;
    &__oops {
      font-size: 32px;
      font-weight: bold;
      line-height: 40px;
      color: #1482f0;
      opacity: 0;
      margin-bottom: 20px;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-fill-mode: forwards;
    }
    &__headline {
      font-size: 20px;
      line-height: 24px;
      color: #fff;
      font-weight: bold;
      opacity: 0;
      margin-bottom: 10px;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.1s;
      animation-fill-mode: forwards;
    }
    &__info {
      font-size: 13px;
      line-height: 21px;
      color: #fff;
      opacity: 0;
      margin-bottom: 30px;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.2s;
      animation-fill-mode: forwards;
    }
    &__return-home {
      display: block;
      float: left;
      width: 110px;
      height: 36px;
      background: #1482f0;
      border-radius: 100px;
      text-align: center;
      color: #ffffff;
      opacity: 0;
      font-size: 14px;
      line-height: 36px;
      cursor: pointer;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.3s;
      animation-fill-mode: forwards;
    }
    @keyframes slideUp {
      0% {
        transform: translateY(60px);
        opacity: 0;
      }
      100% {
        transform: translateY(0);
        opacity: 1;
      }
    }
  }
}
</style>
