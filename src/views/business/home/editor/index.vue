<template>
  <div class="page-x">
    <div id="containerG6" class="g6-x" />
  </div>
</template>

<script>
import G6 from '@antv/g6'
const lineStyle = { stroke: '#000', lineWidth: 2 }
export default {
  name: 'Started',
  data() {
    return {
      gplot: null, // 拓扑图实例
      gplotData: {
        // 点集
        nodes: [
          {
            id: '1',
            label: '',
            img: require('@/assets/test/d.jpg'),
            x: 500,
            y: 50
          },
          {
            id: '2',
            label: '',
            img: require('@/assets/test/e.jpg'),
            x: 400,
            y: 200
          },
          {
            id: '3',
            label: '',
            img: require('@/assets/test/e.jpg'),
            x: 600,
            y: 200
          },
          {
            id: '4',
            label: '',
            img: require('@/assets/test/f.jpg'),
            x: 300,
            y: 350
          },
          {
            id: '5',
            label: '',
            img: require('@/assets/test/f.jpg'),
            x: 400,
            y: 350
          },
          {
            id: '6',
            label: '',
            img: require('@/assets/test/f.jpg'),
            x: 500,
            y: 350
          },
          {
            id: '7',
            label: '',
            img: require('@/assets/test/f.jpg'),
            x: 600,
            y: 350
          },
          {
            id: '8',
            label: '',
            img: require('@/assets/test/f.jpg'),
            x: 700,
            y: 350
          },
          {
            id: '9',
            label: '',
            img: require('@/assets/test/g.jpg'),
            x: 200,
            y: 500
          },
          {
            id: '10',
            label: '',
            img: require('@/assets/test/g.jpg'),
            x: 300,
            y: 500
          },
          {
            id: '11',
            label: '',
            img: require('@/assets/test/g.jpg'),
            x: 400,
            y: 500
          },
          {
            id: '12',
            label: '',
            img: require('@/assets/test/g.jpg'),
            x: 500,
            y: 500
          },
          {
            id: '13',
            label: '',
            img: require('@/assets/test/g.jpg'),
            x: 600,
            y: 500
          },
          {
            id: '14',
            label: '',
            img: require('@/assets/test/g.jpg'),
            x: 700,
            y: 500
          },
          {
            id: '15',
            label: '',
            img: require('@/assets/test/g.jpg'),
            x: 800,
            y: 500
          }
        ],
        // 边集
        edges: [
          { source: '1', target: '2', style: lineStyle },
          { source: '1', target: '3', style: lineStyle },
          { source: '2', target: '3', style: lineStyle },
          { source: '2', target: '4', style: lineStyle },
          { source: '2', target: '5', style: lineStyle },
          { source: '2', target: '6', style: lineStyle },
          { source: '2', target: '7', style: lineStyle },
          { source: '2', target: '8', style: lineStyle },
          { source: '3', target: '4', style: lineStyle },
          { source: '3', target: '5', style: lineStyle },
          { source: '3', target: '6', style: lineStyle },
          { source: '3', target: '7', style: lineStyle },
          { source: '3', target: '8', style: lineStyle },
          { source: '4', target: '5', style: lineStyle },
          { source: '4', target: '9', style: lineStyle },
          { source: '4', target: '10', style: lineStyle },
          { source: '4', target: '11', style: lineStyle },
          { source: '4', target: '12', style: lineStyle },
          { source: '4', target: '13', style: lineStyle },
          { source: '4', target: '14', style: lineStyle },
          { source: '4', target: '15', style: lineStyle },
          { source: '5', target: '6', style: lineStyle },
          { source: '5', target: '9', style: lineStyle },
          { source: '5', target: '10', style: lineStyle },
          { source: '5', target: '11', style: lineStyle },
          { source: '5', target: '12', style: lineStyle },
          { source: '5', target: '13', style: lineStyle },
          { source: '5', target: '14', style: lineStyle },
          { source: '5', target: '15', style: lineStyle },
          { source: '6', target: '7', style: lineStyle },
          { source: '6', target: '9', style: lineStyle },
          { source: '6', target: '10', style: lineStyle },
          { source: '6', target: '11', style: lineStyle },
          { source: '6', target: '12', style: lineStyle },
          { source: '6', target: '13', style: lineStyle },
          { source: '6', target: '14', style: lineStyle },
          { source: '6', target: '15', style: lineStyle },
          { source: '7', target: '8', style: lineStyle },
          { source: '7', target: '9', style: lineStyle },
          { source: '7', target: '10', style: lineStyle },
          { source: '7', target: '11', style: lineStyle },
          { source: '7', target: '12', style: lineStyle },
          { source: '7', target: '13', style: lineStyle },
          { source: '7', target: '14', style: lineStyle },
          { source: '7', target: '15', style: lineStyle },
          { source: '8', target: '9', style: lineStyle },
          { source: '8', target: '10', style: lineStyle },
          { source: '8', target: '11', style: lineStyle },
          { source: '8', target: '12', style: lineStyle },
          { source: '8', target: '13', style: lineStyle },
          { source: '8', target: '14', style: lineStyle },
          { source: '8', target: '15', style: lineStyle }
        ]
      }
    }
  },
  mounted() {
    this.drawing()
  },
  methods: {
    drawing() {
      this.gplot = new G6.Graph({
        container: 'containerG6', // String | HTMLElement，必须，容器 id 或容器本身
        width: 1000, // 设置画布宽度。 Number，必须
        height: 600, // / 设置画布高度。Number，必须
        // 布局设置
        // 布局文档：https://g6.antv.vision/zh/docs/manual/tutorial/layout
        // 默认节点配置（这里的配置是全局的配置，将会在所有节点上生效）
        // 节点文档：https://g6.antv.vision/zh/docs/manual/middle/elements/nodes/defaultNode
        defaultNode: {
          type: 'image',
          size: [50, 50],
          labelCfg: {
            // 文本配置项  https://g6.antv.vision/zh/docs/manual/middle/elements/nodes/defaultNode#%E6%A0%87%E7%AD%BE%E6%96%87%E6%9C%AC-label-%E5%8F%8A%E5%85%B6%E9%85%8D%E7%BD%AE--labelcfg
            style: {
              fontSize: 14, // 文本字体大小
              fill: '#e07a5f' // 文本颜色
            }
          }
        }
      })

      /**
       * graph.read(data)
       * 接收数据，并进行渲染，read 方法的功能相当于 data 和 render 方法的结合。
       * 官方文档：https://g6.antv.vision/zh/docs/api/graphFunc/data#graphreaddata
       *
       * 等同于
       * graph.data(data.value)
       * graph.render()
       */
      this.gplot.read(this.gplotData)
    }
  }
}
</script>

<style lang="scss" scoped>
.g6-x {
  width: 100%;
  height: 100%;
}
</style>
