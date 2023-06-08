<!--
 * @Author: your name
 * @Date: 2019-12-25 16:41:22
 * @LastEditTime: 2020-12-09 14:10:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /PARK-WEB3.0-Gitee/src/views/screen/main/mainModule/mainDownA/index.vue
 -->
<!-- 中下1 -->
<template>
  <div class="areaCaseStyle" @keyup="keyup($event)">
    <!-- 视频组件 开始 -->
    <video-player
      ref="videoPlayer"
      class="video-player vjs-custom-skin"
      :playsinline="true"
      :options="playerOptions"
      @play="onPlayerPlay($event)"
      @pause="onPlayerPause($event)"
    />
    <!-- 视频组件 结束 -->
  </div>
</template>
<script>
export default {
  name: 'PMM',
  components: {
  },
  props: {
    videourl: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      heardTitleState: true,
      myVideoUrl: '',
      playerOptions: {
        playbackRates: [0.5, 1.0, 2.5, 5.0], // 播放速度
        autoplay: true, // 如果true,浏览器准备好时开始回放。
        muted: true, // 默认情况下将会消除任何音频。
        loop: true, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: 'video/mp4', // 这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
            src: '' // url地址
          }
        ],
        hls: false, // 直播数据流时候更改为true
        poster: require('@/assets/logo/logo.png'), // 你的封面地址
        width: document.documentElement.clientWidth, // 播放器宽度
        notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true // 全屏按钮
        }
      }
    }
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player// 自定义播放
    }
  },
  watch: {
    videourl: {
      handler(val) {
        this.myVideoUrl = val
      }
    }
  },
  mounted() {
    this.playerOptions.sources[0].src = this.videourl
    this.$nextTick(() => {
      this.init()
    })
  },
  // 离开当前模块后执行
  destroyed() {
  },
  methods: {
    init() {
    },
    onPlayerPlay(e) {
    },
    onPlayerPause() {
    },
    keyup(key) {
      var time = 10 // 单位秒，每次增减10秒
      const myPlayer = this.$refs.videoPlayer.player
      // 按左键
      if (key.keyCode === 37) {
        myPlayer.pause()
        this.player.cache_.currentTime !== 0 ? this.player.cache_.currentTime -= time : 1
        this.player.currentTime(this.player.cache_.currentTime)
        myPlayer.play()
      }
      // 按右键
      if (key.keyCode === 39) {
        myPlayer.pause()
        this.player.cache_.currentTime !== this.player.cache_.duration ? this.player.cache_.currentTime += time : 1
        this.player.currentTime(this.player.cache_.currentTime)
        myPlayer.play()
      }
    }
  }
}
</script>
<style lang='scss' scoped >
.areaCaseStyle{
  height: 100%;
  width: 100%;
  opacity:0.6;
  ::v-deep  .video-js .vjs-tech {
    object-fit: fill;
  }
  ::v-deep  .video-js {
    display: block;
    vertical-align: top;
    box-sizing: border-box;
    color: #fff;
    background-color: #000;
    position: revert;
    padding: 0;
    font-size: 10px;
    line-height: 1;
    font-weight: normal;
    font-style: normal;
    font-family: Arial, Helvetica, sans-serif;
    word-break: initial;
}
}
</style>
