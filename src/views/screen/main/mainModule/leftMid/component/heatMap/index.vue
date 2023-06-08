<!--
 * @Author: your name
 * @Date: 2019-12-25 16:04:25
 * @LastEditTime: 2020-11-25 16:39:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /PARK-WEB3.0/src/views/screen/main/mainModule/screenMap/index.vue
 -->
<!-- 地图 -->
<template>
  <div class="areaCaseStyle">
    <!-- 追踪定位 开始 -->
    <el-row style="height: 100%;">
      <el-col :span="24" style="height: 20%;">
        <div class="caseStyle">
          <!-- 地图画布 开始 -->
          <div id="heatMap" class="mapStyle" />
          <!-- 地图画布 结束 -->
        </div>
      </el-col>
    </el-row>
  <!-- 追踪定位 结束 -->
  </div>
</template>
<script>
export default {
  name: 'HeatMap',
  components: {
  },
  data() {
    return {
      markers: []
      // LabelsData: [
      //   { 'name': '设备编号:0868334031678151', 'position': [113.163736, 22.90374], 'zooms': [10, 20], 'opacity': 1, 'zIndex': 10, 'icon': { 'type': 'image', 'image': 'https://a.amap.com/jsapi_demos/static/images/poi-marker.png', 'clipOrigin': [14, 92], 'clipSize': [50, 68], 'size': [25, 34], 'anchor': 'bottom-center', 'angel': 0, 'retina': true }, 'text': { 'content': '设备编号:0868334031678151', 'direction': 'left', 'offset': [0, -5], 'style': { 'fontSize': 13, 'fontWeight': 'normal', 'fillColor': '#fff', 'padding': '2, 5', 'backgroundColor': '#255EA3' }}},
      //   { 'name': '设备编号:0868334031678152', 'position': [113.16372, 22.904436], 'zooms': [10, 20], 'opacity': 1, 'zIndex': 16, 'icon': { 'type': 'image', 'image': 'https://a.amap.com/jsapi_demos/static/images/poi-marker.png', 'clipOrigin': [101, 92], 'clipSize': [50, 68], 'size': [25, 34], 'anchor': 'bottom-center', 'angel': 0, 'retina': true }, 'text': { 'content': '设备编号:0868334031678152', 'direction': 'top', 'offset': [0, 0], 'style': { 'fontSize': 13, 'fontWeight': 'normal', 'fillColor': '#fff', 'padding': '2, 5', 'backgroundColor': '#255EA3' }}},
      //   { 'name': '设备编号:0868334031678153', 'position': [113.163742, 22.904955], 'zooms': [10, 20], 'opacity': 1, 'zIndex': 8, 'icon': { 'type': 'image', 'image': 'https://a.amap.com/jsapi_demos/static/images/poi-marker.png', 'clipOrigin': [194, 92], 'clipSize': [50, 68], 'size': [25, 34], 'anchor': 'bottom-center', 'angel': 0, 'retina': true }, 'text': { 'content': '设备编号:0868334031678153', 'direction': 'right', 'offset': [0, -5], 'style': { 'fontSize': 13, 'fontWeight': 'normal', 'fillColor': '#fff', 'padding': '2, 5', 'backgroundColor': '#666' }}},
      //   { 'name': '设备编号:0868334031678154', 'position': [113.163747, 22.905291], 'zooms': [10, 20], 'opacity': 1, 'zIndex': 23, 'icon': { 'type': 'image', 'image': 'https://a.amap.com/jsapi_demos/static/images/poi-marker.png', 'clipOrigin': [283, 92], 'clipSize': [50, 68], 'size': [25, 34], 'anchor': 'bottom-center', 'angel': 0, 'retina': true }, 'text': { 'content': '设备编号:0868334031678154', 'direction': 'bottom', 'offset': [0, 0], 'style': { 'fontSize': 13, 'fontWeight': 'normal', 'fillColor': '#fff', 'padding': '2, 5', 'backgroundColor': '#A32D30' }}},
      //   { 'name': '设备编号:0868334031678155', 'position': [113.163752, 22.905598], 'zooms': [10, 20], 'opacity': 1, 'zIndex': 6, 'icon': { 'type': 'image', 'image': 'https://a.amap.com/jsapi_demos/static/images/poi-marker.png', 'clipOrigin': [370, 92], 'clipSize': [50, 68], 'size': [25, 34], 'anchor': 'bottom-center', 'angel': 0, 'retina': true }, 'text': { 'content': '设备编号:0868334031678155', 'direction': 'left', 'offset': [-3, -7], 'style': { 'fontSize': 13, 'fontWeight': 'normal', 'fillColor': '#fff', 'padding': '2, 5', 'backgroundColor': '#255EA3' }}},
      //   { 'name': '设备编号:0868334031678156', 'position': [113.16438, 22.905751], 'zooms': [10, 20], 'opacity': 1, 'zIndex': 5, 'icon': { 'type': 'image', 'image': 'https://a.amap.com/jsapi_demos/static/images/poi-marker.png', 'clipOrigin': [459, 92], 'clipSize': [50, 68], 'size': [25, 34], 'anchor': 'bottom-center', 'angel': 0, 'retina': true }, 'text': { 'content': '设备编号:0868334031678156', 'direction': 'top', 'offset': [0, 0], 'style': { 'fontSize': 13, 'fontWeight': 'normal', 'fillColor': '#fff', 'padding': '2, 5', 'backgroundColor': '#666' }}},
      //   { 'name': '设备编号:0868334031678157', 'position': [113.165625, 22.905776], 'zooms': [10, 20], 'opacity': 1, 'zIndex': 4, 'icon': { 'type': 'image', 'image': 'https://a.amap.com/jsapi_demos/static/images/poi-marker.png', 'clipOrigin': [547, 92], 'clipSize': [50, 68], 'size': [25, 34], 'anchor': 'bottom-center', 'angel': 0, 'retina': true }, 'text': { 'content': '设备编号:0868334031678157', 'direction': 'top', 'offset': [0, 0], 'style': { 'fontSize': 13, 'fontWeight': 'normal', 'fillColor': '#fff', 'padding': '2, 5', 'backgroundColor': '#255EA3' }}},
      //   { 'name': '设备编号:0868334031678158', 'position': [113.166038, 22.905776], 'zooms': [10, 20], 'opacity': 1, 'zIndex': 3, 'icon': { 'type': 'image', 'image': 'https://a.amap.com/jsapi_demos/static/images/poi-marker.png', 'clipOrigin': [635, 92], 'clipSize': [50, 68], 'size': [25, 34], 'anchor': 'bottom-center', 'angel': 0, 'retina': true }, 'text': { 'content': '设备编号:0868334031678158', 'direction': 'top', 'offset': [0, 0], 'style': { 'fontSize': 13, 'fontWeight': 'normal', 'fillColor': '#fff', 'padding': '2, 5', 'backgroundColor': '#666' }}},
      //   { 'name': '设备编号:0868334031678159', 'position': [113.166756, 22.905771], 'zooms': [10, 20], 'zIndex': 2, 'opacity': 1, 'icon': { 'type': 'image', 'image': 'https://a.amap.com/jsapi_demos/static/images/poi-marker.png', 'clipOrigin': [723, 92], 'clipSize': [50, 68], 'size': [25, 34], 'anchor': 'bottom-center', 'angel': 0, 'retina': true }, 'text': { 'content': '设备编号:0868334031678159', 'direction': 'top', 'offset': [0, 0], 'style': { 'fontSize': 13, 'fontWeight': 'normal', 'fillColor': '#fff', 'padding': '2, 5', 'backgroundColor': '#255EA3' }}}]
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.MapLoader().then(AMap => {
        // -----初始化地图-开始-----\\
        var map = new AMap.Map('heatMap', {
          resizeEnable: true,
          rotateEnable: true,
          pitchEnable: true,
          zoom: 17,
          pitch: 60,
          rotation: -15,
          viewMode: '3D', // 开启3D视图,默认为关闭
          buildingAnimation: true, // 楼块出现是否带动画

          expandZoomRange: true,
          zooms: [3, 20],
          center: [113.164852, 22.905200]
        })
        // 设置地图主题
        /**
         * 主题参数参考
         * 标准normal；幻影黑dark；月光银light；远山黛whitesmoke；草色青fresh；雅士灰grey；涂鸦graffiti；马卡龙macaron；靛青蓝blue；极夜蓝darkblue；酱籽wine
         */
        map.setMapStyle('amap://styles/' + '0c4ac2c82cf7655375c781771a87063b')
        // -----初始化地图-结束-----\\
        var heatmap
        map.plugin(['AMap.Heatmap'], function() {
          // 初始化heatmap对象
          heatmap = new AMap.Heatmap(map, {
            radius: 25, // 给定半径
            opacity: [0, 0.8],
            gradient: {
              0.5: 'blue',
              0.65: 'rgb(117,211,248)',
              0.7: 'rgb(0, 255, 0)',
              0.9: '#ffea00',
              1.0: 'red'
            }
          })
          // 设置数据集：该数据为北京部分“公园”数据
          heatmap.setDataSet({
            data: [
              { count: 10, lng: 113.163691, lat: 22.902422 },
              { count: 11, lng: 113.163638, lat: 22.902644 },
              { count: 10, lng: 113.163751, lat: 22.902763 },
              { count: 10, lng: 113.163632, lat: 22.902995 },
              { count: 13, lng: 113.163751, lat: 22.903277 },
              { count: 14, lng: 113.163643, lat: 22.903539 },
              { count: 10, lng: 113.163756, lat: 22.903663 },
              { count: 10, lng: 113.163622, lat: 22.903796 },
              { count: 12, lng: 113.16374, lat: 22.903949 },
              { count: 11, lng: 113.163616, lat: 22.904048 },
              { count: 12, lng: 113.163745, lat: 22.904157 },
              { count: 10, lng: 113.163632, lat: 22.904295 },
              { count: 11, lng: 113.163767, lat: 22.904621 },
              { count: 12, lng: 113.16367, lat: 22.90474 },
              { count: 11, lng: 113.163783, lat: 22.904933 },
              { count: 11, lng: 113.163675, lat: 22.905076 },
              { count: 13, lng: 113.167679, lat: 22.905229 },
              { count: 12, lng: 113.163681, lat: 22.905362 },
              { count: 14, lng: 113.163804, lat: 22.905481 },
              { count: 12, lng: 113.163777, lat: 22.905689 },
              { count: 11, lng: 113.163869, lat: 22.905763 },
              { count: 10, lng: 113.16389, lat: 22.905654 },
              { count: 12, lng: 113.164014, lat: 22.905709 },
              { count: 10, lng: 113.16411, lat: 22.905758 },
              { count: 11, lng: 113.164223, lat: 22.905714 },
              { count: 12, lng: 113.164336, lat: 22.905694 },
              { count: 12, lng: 113.164454, lat: 22.905773 },
              { count: 12, lng: 113.164625, lat: 22.905689 },
              { count: 13, lng: 113.164829, lat: 22.905699 },
              { count: 13, lng: 113.164996, lat: 22.905788 },
              { count: 12, lng: 113.165237, lat: 22.905714 },
              { count: 12, lng: 113.165312, lat: 22.905842 },
              { count: 12, lng: 113.165551, lat: 22.905709 },
              { count: 12, lng: 113.165714, lat: 22.905704 },
              { count: 14, lng: 113.165875, lat: 22.905798 },
              { count: 13, lng: 113.166014, lat: 22.905723 },
              { count: 13, lng: 113.166181, lat: 22.905802 },
              { count: 11, lng: 113.16632, lat: 22.905709 },
              { count: 10, lng: 113.16646, lat: 22.905793 },
              { count: 11, lng: 113.166664, lat: 22.905694 },
              { count: 11, lng: 113.166926, lat: 22.905738 },
              { count: 10, lng: 113.167061, lat: 22.905793 },
              { count: 14, lng: 113.167259, lat: 22.905714 },
              { count: 10, lng: 113.167828, lat: 22.905714 },
              { count: 13, lng: 113.168028, lat: 22.905808 },
              { count: 12, lng: 113.168205, lat: 22.905709 },
              { count: 10, lng: 113.168404, lat: 22.905734 },
              { count: 12, lng: 113.168699, lat: 22.905808 },
              { count: 10, lng: 113.168994, lat: 22.905729 },
              { count: 13, lng: 113.169187, lat: 22.905714 }
            ], max: 10
          })
        })
        heatmap.show()
      }, e => {
        console.log('地图加载失败', e)
      })
    }
  }
}
</script>
<style lang='scss' scoped>
  .areaCaseStyle{
    height: 100%;
    .caseStyle{
      height: 100%;
      @media screen and (max-width:1680px){
        .mapStyle {
          height: 25vh;
        }
      }
      @media screen and (max-width:1920px){
        .mapStyle {
          height: 25vh;
        }
      }
      @media screen and (max-width:1440px){
        .mapStyle {
          height: 25vh;
        }
      }
    }

  }
</style>
