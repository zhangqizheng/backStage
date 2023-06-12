<template>
  <div class="machineBox">
    <div class="disBox">
      <div @click="disabled = !disabled">
        {{ disabled ? "启用拖拽" : "禁用拖拽" }}
      </div>
    </div>
    <!--使用draggable组件-->
    <div class="machineList">
      <div class="machineItems">
        <draggable
          v-model="arr1"
          :disabled="disabled"
          :group="groupA"
          animation="300"
          :move="onMove"
          style="flex: 1;"
          handle=".mover"
          @start="onStart"
          @end="onEnd"
        >
          <transition-group :style="style">
            <div
              v-for="(item, index) in arr1"
              :key="index"
              class="item"
              :class="item.name ? 'mover' : 'noBg'"
              :style="getNewStyle(arr1, item, index)"
            >
              <div class="name">{{ item.name }}</div>
            </div>
          </transition-group>
        </draggable>
        <div class="numList">
          <div v-for="(item,index) in 43" :key="index">{{ Math.abs(item - 1 - 43) }}</div>
        </div>
      </div>
      <div class="machineItems">
        <draggable
          v-model="arr2"
          :group="groupB"
          animation="300"
          :move="onMove"
          style="flex: 1;"
          handle=".mover"
          @start="onStart"
          @end="onEnd"
        >
          <transition-group :style="style">
            <div
              v-for="(item, index) in arr2"
              :key="index"
              class="item"
              :class="item.name ? 'mover' : 'noBg'"
              :style="getNewStyle(arr1, item, index)"
            >
              <div class="name">{{ item.name }}</div>
            </div>
          </transition-group>
        </draggable>
        <div class="numList">
          <div v-for="(item,index) in 43" :key="index">{{ Math.abs(item - 1 - 43) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// 导入draggable组件
import draggable from 'vuedraggable'
export default {
  // 注册draggable组件
  components: {
    draggable
  },
  data() {
    return {
      drag: false,
      disabled: false,
      groupA: {
        name: 'site',
        pull: true, // 可以拖从
        put: true // 可以拖出
      },
      groupB: {
        name: 'site',
        pull: true,
        put: true
      },
      machineData: [
        {
          machineName: 'C01',
          allNum: 43,
          list: [
            {
              id: '43',
              name: '',
              u: 0
            },
            {
              id: '42',
              name: '',
              u: 0
            },
            {
              id: '41',
              name: '',
              u: 0
            },
            {
              id: '40',
              name: '',
              u: 0
            },
            {
              id: '39',
              name: '',
              u: 0
            },
            {
              id: '38',
              name: '',
              u: 0
            },
            {
              id: '37',
              name: '',
              u: 0
            },
            {
              id: '36',
              name: '',
              u: 0
            },
            {
              id: '35',
              name: '',
              u: 0
            },
            {
              id: '34',
              name: '',
              u: 0
            },
            {
              id: '33',
              name: '',
              u: 0
            },
            {
              id: '32',
              name: '',
              u: 0
            },
            {
              id: '31',
              name: '',
              u: 0
            },
            {
              id: '30',
              name: '',
              u: 0
            },
            {
              id: '29',
              name: '',
              u: 0
            },
            {
              id: '28',
              name: '',
              u: 0
            },
            {
              id: '27',
              name: '',
              u: 0
            },
            {
              id: '26',
              name: '',
              u: 0
            },
            {
              id: '25',
              name: '',
              u: 0
            },
            {
              id: '24',
              name: '',
              u: 0
            },
            {
              id: '23',
              name: '',
              u: 0
            },
            {
              id: '22',
              name: '',
              u: 0
            },
            {
              id: '21',
              name: '',
              u: 0
            },
            {
              id: '20',
              name: '',
              u: 0
            },
            {
              id: '19',
              name: '',
              u: 0
            },
            {
              id: '18',
              name: '',
              u: 0
            },
            {
              id: '17',
              name: '',
              u: 0
            },
            {
              id: '16',
              name: '',
              u: 0
            },
            {
              id: '15',
              name: 'SPINE-3',
              u: 13
            },
            {
              id: '14',
              name: 'SPINE-3',
              u: 0
            },
            {
              id: '13',
              name: 'SPINE-3',
              u: 0
            },
            {
              id: '12',
              name: 'SPINE-3',
              u: 0
            },
            {
              id: '11',
              name: 'SPINE-3',
              u: 0
            },
            {
              id: '10',
              name: 'SPINE-3',
              u: 0
            },
            {
              id: '9',
              name: 'SPINE-3',
              u: 0
            },
            {
              id: '8',
              name: 'SPINE-3',
              u: 0
            },
            {
              id: '7',
              name: 'SPINE-3',
              u: 0
            },
            {
              id: '6',
              name: 'SPINE-3',
              u: 0
            },
            {
              id: '5',
              name: 'SPINE-3',
              u: 0
            },
            {
              id: '4',
              name: 'SPINE-3',
              u: 0
            },
            {
              id: '3',
              name: 'SPINE-3',
              u: 0
            },
            {
              id: '2',
              name: '',
              u: 0
            },
            {
              id: '1',
              name: '',
              u: 0
            }
          ]
        },
        {
          machineName: 'C02',
          allNum: 43,
          list: [
            {
              id: '43',
              name: '',
              u: 0,
              sortNo: 1
            },
            {
              id: '42',
              name: '',
              u: 0,
              sortNo: 2
            },
            {
              id: '41',
              name: '',
              u: 0,
              sortNo: 3
            },
            {
              id: '40',
              name: '25G接入交换机-1',
              u: 1,
              sortNo: 4
            },
            {
              id: '39',
              name: '',
              u: 0,
              sortNo: 5
            },
            {
              id: '38',
              name: '',
              u: 0,
              sortNo: 6
            },
            {
              id: '37',
              name: '',
              u: 0,
              sortNo: 7
            },
            {
              id: '36',
              name: '25G接入交换机-2',
              u: 2,
              sortNo: 8
            },
            {
              id: '35',
              name: '25G接入交换机-2',
              u: 0,
              sortNo: 9
            },
            {
              id: '34',
              name: '',
              u: 0,
              sortNo: 10
            },
            {
              id: '33',
              name: '',
              u: 0,
              sortNo: 11
            },
            {
              id: '32',
              name: '25G接入交换机-3',
              u: 1,
              sortNo: 12
            },
            {
              id: '31',
              name: '',
              u: 0,
              sortNo: 13
            },
            {
              id: '30',
              name: '',
              u: 0,
              sortNo: 14
            },
            {
              id: '29',
              name: '25G接入交换机-4',
              u: 2,
              sortNo: 15
            },
            {
              id: '28',
              name: '25G接入交换机-4',
              u: 0,
              sortNo: 16
            },
            {
              id: '27',
              name: '',
              u: 0,
              sortNo: 17
            },
            {
              id: '26',
              name: '25G接入交换机-5',
              u: 2,
              sortNo: 18
            },
            {
              id: '25',
              name: '25G接入交换机-5',
              u: 0,
              sortNo: 19
            },
            {
              id: '24',
              name: '',
              u: 0,
              sortNo: 20
            },
            {
              id: '23',
              name: '25G接入交换机-6',
              u: 1,
              sortNo: 21
            },
            {
              id: '22',
              name: '',
              u: 0,
              sortNo: 22
            },
            {
              id: '21',
              name: '25G接入交换机-7',
              u: 3,
              sortNo: 23
            },
            {
              id: '20',
              name: '25G接入交换机-7',
              u: 0,
              sortNo: 24
            },
            {
              id: '19',
              name: '25G接入交换机-7',
              u: 0,
              sortNo: 25
            },
            {
              id: '18',
              name: '',
              u: 0,
              sortNo: 26
            },
            {
              id: '17',
              name: '25G接入交换机-8',
              u: 2,
              sortNo: 27
            },
            {
              id: '16',
              name: '25G接入交换机-8',
              u: 0,
              sortNo: 28
            },
            {
              id: '15',
              name: '',
              u: 0,
              sortNo: 29
            },
            {
              id: '14',
              name: '25G接入交换机-9',
              u: 1,
              sortNo: 30
            },
            {
              id: '13',
              name: '',
              u: 0,
              sortNo: 31
            },
            {
              id: '12',
              name: '25G接入交换机-10',
              u: 1,
              sortNo: 32
            },
            {
              id: '11',
              name: '',
              u: 0,
              sortNo: 33
            },
            {
              id: '10',
              name: '25G接入交换机-11',
              u: 3,
              sortNo: 34
            },
            {
              id: '9',
              name: '25G接入交换机-11',
              u: 0,
              sortNo: 35
            },
            {
              id: '8',
              name: '25G接入交换机-11',
              u: 0,
              sortNo: 36
            },
            {
              id: '7',
              name: '',
              u: 0,
              sortNo: 37
            },
            {
              id: '6',
              name: '25G接入交换机-12',
              u: 2,
              sortNo: 38
            },
            {
              id: '5',
              name: '25G接入交换机-12',
              u: 0,
              sortNo: 39
            },
            {
              id: '4',
              name: '',
              u: 0,
              sortNo: 40
            },
            {
              id: '3',
              name: '25G接入交换机-13',
              u: 1,
              sortNo: 41
            },
            {
              id: '2',
              name: '',
              u: 0,
              sortNo: 42
            },
            {
              id: '1',
              name: '',
              u: 0,
              sortNo: 43
            }
          ]
        },
        {
          machineName: 'C03',
          allNum: 43,
          list: [
            {
              id: '43',
              name: '',
              u: 0,
              sortNo: 1
            },
            {
              id: '42',
              name: '',
              u: 0,
              sortNo: 2
            },
            {
              id: '41',
              name: '25G接入交换机-1',
              u: 1,
              sortNo: 3
            },
            {
              id: '40',
              name: '',
              u: 0,
              sortNo: 4
            },
            {
              id: '39',
              name: '25G接入交换机-2',
              u: 1,
              sortNo: 5
            },
            {
              id: '38',
              name: '',
              u: 0,
              sortNo: 6
            },
            {
              id: '37',
              name: '25G接入交换机-3',
              u: 1,
              sortNo: 7
            },
            {
              id: '36',
              name: '',
              u: 0,
              sortNo: 8
            },
            {
              id: '35',
              name: '',
              u: 0,
              sortNo: 9
            },
            {
              id: '34',
              name: '',
              u: 0,
              sortNo: 10
            },
            {
              id: '33',
              name: '',
              u: 0,
              sortNo: 11
            },
            {
              id: '32',
              name: '',
              u: 0,
              sortNo: 12
            },
            {
              id: '31',
              name: '',
              u: 0,
              sortNo: 13
            },
            {
              id: '30',
              name: '',
              u: 0,
              sortNo: 14
            },
            {
              id: '29',
              name: '',
              u: 0,
              sortNo: 15
            },
            {
              id: '28',
              name: '',
              u: 0,
              sortNo: 16
            },
            {
              id: '27',
              name: '',
              u: 0,
              sortNo: 17
            },
            {
              id: '26',
              name: '',
              u: 0,
              sortNo: 18
            },
            {
              id: '25',
              name: '',
              u: 0,
              sortNo: 19
            },
            {
              id: '24',
              name: '',
              u: 0,
              sortNo: 20
            },
            {
              id: '23',
              name: '',
              u: 0,
              sortNo: 21
            },
            {
              id: '22',
              name: '',
              u: 0,
              sortNo: 22
            },
            {
              id: '21',
              name: '',
              u: 0,
              sortNo: 23
            },
            {
              id: '20',
              name: '',
              u: 0,
              sortNo: 24
            },
            {
              id: '19',
              name: '',
              u: 0,
              sortNo: 25
            },
            {
              id: '18',
              name: '',
              u: 0,
              sortNo: 26
            },
            {
              id: '17',
              name: '',
              u: 0,
              sortNo: 27
            },
            {
              id: '16',
              name: '',
              u: 0,
              sortNo: 28
            },
            {
              id: '15',
              name: '',
              u: 0,
              sortNo: 29
            },
            {
              id: '14',
              name: '',
              u: 0,
              sortNo: 30
            },
            {
              id: '13',
              name: '25G接入交换机-9',
              u: 1,
              sortNo: 31
            },
            {
              id: '12',
              name: '',
              u: 0,
              sortNo: 32
            },
            {
              id: '11',
              name: '25G接入交换机-10',
              u: 4,
              sortNo: 33
            },
            {
              id: '10',
              name: '25G接入交换机-10',
              u: 0,
              sortNo: 34
            },
            {
              id: '9',
              name: '25G接入交换机-10',
              u: 0,
              sortNo: 35
            },
            {
              id: '8',
              name: '25G接入交换机-11',
              u: 0,
              sortNo: 36
            },
            {
              id: '7',
              name: '',
              u: 0,
              sortNo: 37
            },
            {
              id: '6',
              name: '25G接入交换机-12',
              u: 1,
              sortNo: 38
            },
            {
              id: '5',
              name: '',
              u: 0,
              sortNo: 39
            },
            {
              id: '4',
              name: '25G接入交换机-13',
              u: 2,
              sortNo: 40
            },
            {
              id: '3',
              name: '25G接入交换机-13',
              u: 0,
              sortNo: 41
            },
            {
              id: '2',
              name: '',
              u: 0,
              sortNo: 42
            },
            {
              id: '1',
              name: '',
              u: 0,
              sortNo: 43
            }
          ]
        },
        {
          machineName: 'C04',
          allNum: 43,
          list: [
            {
              id: '43',
              name: '',
              u: 0
            },
            {
              id: '42',
              name: '',
              u: 0
            },
            {
              id: '41',
              name: '25G接入交换机-1',
              u: 2
            },
            {
              id: '40',
              name: '25G接入交换机-1',
              u: 0
            },
            {
              id: '39',
              name: '',
              u: 0
            },
            {
              id: '38',
              name: '',
              u: 0
            },
            {
              id: '37',
              name: '25G接入交换机-2',
              u: 3
            },
            {
              id: '36',
              name: '25G接入交换机-2',
              u: 0
            },
            {
              id: '35',
              name: '25G接入交换机-2',
              u: 0
            },
            {
              id: '34',
              name: '',
              u: 0
            },
            {
              id: '33',
              name: '',
              u: 0
            },
            {
              id: '32',
              name: '',
              u: 0
            },
            {
              id: '31',
              name: '',
              u: 0
            },
            {
              id: '30',
              name: '',
              u: 0
            },
            {
              id: '29',
              name: '',
              u: 0
            },
            {
              id: '28',
              name: '',
              u: 0
            },
            {
              id: '27',
              name: '',
              u: 0
            },
            {
              id: '26',
              name: '25G接入交换机-3',
              u: 2
            },
            {
              id: '25',
              name: '25G接入交换机-3',
              u: 0
            },
            {
              id: '24',
              name: '',
              u: 0
            },
            {
              id: '23',
              name: '25G接入交换机-4',
              u: 1
            },
            {
              id: '22',
              name: '',
              u: 0
            },
            {
              id: '21',
              name: '25G接入交换机-5',
              u: 3
            },
            {
              id: '20',
              name: '25G接入交换机-5',
              u: 0
            },
            {
              id: '19',
              name: '25G接入交换机-5',
              u: 0
            },
            {
              id: '18',
              name: '',
              u: 0
            },
            {
              id: '17',
              name: '25G接入交换机-6',
              u: 2
            },
            {
              id: '16',
              name: '25G接入交换机-6',
              u: 0
            },
            {
              id: '15',
              name: '',
              u: 0
            },
            {
              id: '14',
              name: '25G接入交换机-7',
              u: 1
            },
            {
              id: '13',
              name: '',
              u: 0
            },
            {
              id: '12',
              name: '25G接入交换机-8',
              u: 1
            },
            {
              id: '11',
              name: '',
              u: 0
            },
            {
              id: '10',
              name: '25G接入交换机-9',
              u: 1
            },
            {
              id: '9',
              name: '',
              u: 0
            },
            {
              id: '8',
              name: '',
              u: 0
            },
            {
              id: '7',
              name: '',
              u: 0
            },
            {
              id: '6',
              name: '25G接入交换机-10',
              u: 1
            },
            {
              id: '5',
              name: '',
              u: 0
            },
            {
              id: '4',
              name: '',
              u: 0
            },
            {
              id: '3',
              name: '25G接入交换机-11',
              u: 1
            },
            {
              id: '2',
              name: '',
              u: 0
            },
            {
              id: '1',
              name: '',
              u: 0
            }
          ]
        }
      ],
      // 定义要被拖拽对象的数组
      arr1: [
        {
          id: '43',
          name: '',
          u: 0,
          sortNo: 1
        },
        {
          id: '42',
          name: '',
          u: 0,
          sortNo: 2
        },
        {
          id: '41',
          name: '',
          u: 0,
          sortNo: 3
        },
        {
          id: '40',
          name: '25G接入交换机-1',
          u: 1,
          sortNo: 4
        },
        {
          id: '39',
          name: '',
          u: 0,
          sortNo: 5
        },
        {
          id: '38',
          name: '',
          u: 0,
          sortNo: 6
        },
        {
          id: '37',
          name: '',
          u: 0,
          sortNo: 7
        },
        {
          id: '36',
          name: '25G接入交换机-2',
          u: 2,
          sortNo: 8
        },
        {
          id: '35',
          name: '25G接入交换机-2',
          u: 0,
          sortNo: 9
        },
        {
          id: '34',
          name: '',
          u: 0,
          sortNo: 10
        },
        {
          id: '33',
          name: '',
          u: 0,
          sortNo: 11
        },
        {
          id: '32',
          name: '25G接入交换机-3',
          u: 1,
          sortNo: 12
        },
        {
          id: '31',
          name: '',
          u: 0,
          sortNo: 13
        },
        {
          id: '30',
          name: '',
          u: 0,
          sortNo: 14
        },
        {
          id: '29',
          name: '25G接入交换机-4',
          u: 2,
          sortNo: 15
        },
        {
          id: '28',
          name: '25G接入交换机-4',
          u: 0,
          sortNo: 16
        },
        {
          id: '27',
          name: '',
          u: 0,
          sortNo: 17
        },
        {
          id: '26',
          name: '25G接入交换机-5',
          u: 2,
          sortNo: 18
        },
        {
          id: '25',
          name: '25G接入交换机-5',
          u: 0,
          sortNo: 19
        },
        {
          id: '24',
          name: '',
          u: 0,
          sortNo: 20
        },
        {
          id: '23',
          name: '25G接入交换机-6',
          u: 1,
          sortNo: 21
        },
        {
          id: '22',
          name: '',
          u: 0,
          sortNo: 22
        },
        {
          id: '21',
          name: '25G接入交换机-7',
          u: 3,
          sortNo: 23
        },
        {
          id: '20',
          name: '25G接入交换机-7',
          u: 0,
          sortNo: 24
        },
        {
          id: '19',
          name: '25G接入交换机-7',
          u: 0,
          sortNo: 25
        },
        {
          id: '18',
          name: '',
          u: 0,
          sortNo: 26
        },
        {
          id: '17',
          name: '25G接入交换机-8',
          u: 2,
          sortNo: 27
        },
        {
          id: '16',
          name: '25G接入交换机-8',
          u: 0,
          sortNo: 28
        },
        {
          id: '15',
          name: '',
          u: 0,
          sortNo: 29
        },
        {
          id: '14',
          name: '25G接入交换机-9',
          u: 1,
          sortNo: 30
        },
        {
          id: '13',
          name: '',
          u: 0,
          sortNo: 31
        },
        {
          id: '12',
          name: '25G接入交换机-10',
          u: 1,
          sortNo: 32
        },
        {
          id: '11',
          name: '',
          u: 0,
          sortNo: 33
        },
        {
          id: '10',
          name: '25G接入交换机-11',
          u: 3,
          sortNo: 34
        },
        {
          id: '9',
          name: '25G接入交换机-11',
          u: 0,
          sortNo: 35
        },
        {
          id: '8',
          name: '25G接入交换机-11',
          u: 0,
          sortNo: 36
        },
        {
          id: '7',
          name: '',
          u: 0,
          sortNo: 37
        },
        {
          id: '6',
          name: '25G接入交换机-12',
          u: 2,
          sortNo: 38
        },
        {
          id: '5',
          name: '25G接入交换机-12',
          u: 0,
          sortNo: 39
        },
        {
          id: '4',
          name: '',
          u: 0,
          sortNo: 40
        },
        {
          id: '3',
          name: '25G接入交换机-13',
          u: 1,
          sortNo: 41
        },
        {
          id: '2',
          name: '',
          u: 0,
          sortNo: 42
        },
        {
          id: '1',
          name: '',
          u: 0,
          sortNo: 43
        }
      ],
      arr2: [
        {
          id: '43',
          name: '',
          u: 0
        },
        {
          id: '42',
          name: '',
          u: 0
        },
        {
          id: '41',
          name: '',
          u: 0
        },
        {
          id: '40',
          name: '',
          u: 0
        },
        {
          id: '39',
          name: '',
          u: 0
        },
        {
          id: '38',
          name: '',
          u: 0
        },
        {
          id: '37',
          name: '',
          u: 0
        },
        {
          id: '36',
          name: '',
          u: 0
        },
        {
          id: '35',
          name: '',
          u: 0
        },
        {
          id: '34',
          name: '',
          u: 0
        },
        {
          id: '33',
          name: '',
          u: 0
        },
        {
          id: '32',
          name: '',
          u: 0
        },
        {
          id: '31',
          name: '',
          u: 0
        },
        {
          id: '30',
          name: '',
          u: 0
        },
        {
          id: '29',
          name: '',
          u: 0
        },
        {
          id: '28',
          name: '',
          u: 0
        },
        {
          id: '27',
          name: '',
          u: 0
        },
        {
          id: '26',
          name: '',
          u: 0
        },
        {
          id: '25',
          name: '',
          u: 0
        },
        {
          id: '24',
          name: '',
          u: 0
        },
        {
          id: '23',
          name: '',
          u: 0
        },
        {
          id: '22',
          name: '',
          u: 0
        },
        {
          id: '21',
          name: '',
          u: 0
        },
        {
          id: '20',
          name: '',
          u: 0
        },
        {
          id: '19',
          name: '',
          u: 0
        },
        {
          id: '18',
          name: '',
          u: 0
        },
        {
          id: '17',
          name: '',
          u: 0
        },
        {
          id: '16',
          name: '',
          u: 0
        },
        {
          id: '15',
          name: 'SPINE-3',
          u: 13
        },
        {
          id: '14',
          name: 'SPINE-3',
          u: 0
        },
        {
          id: '13',
          name: 'SPINE-3',
          u: 0
        },
        {
          id: '12',
          name: 'SPINE-3',
          u: 0
        },
        {
          id: '11',
          name: 'SPINE-3',
          u: 0
        },
        {
          id: '10',
          name: 'SPINE-3',
          u: 0
        },
        {
          id: '9',
          name: 'SPINE-3',
          u: 0
        },
        {
          id: '8',
          name: 'SPINE-3',
          u: 0
        },
        {
          id: '7',
          name: 'SPINE-3',
          u: 0
        },
        {
          id: '6',
          name: 'SPINE-3',
          u: 0
        },
        {
          id: '5',
          name: 'SPINE-3',
          u: 0
        },
        {
          id: '4',
          name: 'SPINE-3',
          u: 0
        },
        {
          id: '3',
          name: 'SPINE-3',
          u: 0
        },
        {
          id: '2',
          name: '',
          u: 0
        },
        {
          id: '1',
          name: '',
          u: 0
        }
      ], // 空数组
      // 空数组之在的样式，设置了这个样式才能拖入
      style: 'min-height:120px;display: block;'
    }
  },
  mounted() {
    const nameList = document.querySelectorAll('.name')
    nameList.forEach((item, index) => {
      if (item.innerText) {
        // console.log(item)
      }
    })
    this.getMergeStyle(this.arr1)
    this.getMergeStyle(this.arr2)
  },
  methods: {
    // 数据初始化
    getMergeStyle(arr) {
      arr.forEach((item, index) => {
        if (item.u > 1) {
          for (let i = 1; i < item.u; i++) {
            arr.splice(index + 1, 1)
          }
        }
      })
      console.log(arr)
    },
    // 合并列
    getNewStyle(arr, item, index) {
      const oneU = { height: '20px' }
      const moreU = { height: 20 * item.u + 'px' }
      if (item.u === 1 || item.u === 0) {
        return oneU
      } else {
        return moreU
      }
    },
    // 开始移动事件
    onMove(e, originalEvent) {
      console.log('move', e, originalEvent)
    },
    // 开始拖拽事件
    onStart(e) {
      console.log('start', e)
      this.drag = true
    },
    // 拖拽结束事件
    onEnd(e) {
      console.log('end', e)
      this.drag = false
    }
  }
}
</script>
<style lang='scss' scoped>
.machineBox {
  width: 100%;
  padding-bottom: 20px;
  box-sizing: border-box;
  position: relative;
  font-size: 12px;
  .disBox {
    position: absolute;
    top: 0px;
    right: 10px;
    padding: 6px 16px;
    background: #ddd;
    border-radius: 5px;
    cursor: pointer;
  }
  .machineList {
    width: 100%;
    display: flex;
    .machineItems {
      width: 240px;
      border-top: solid 1px #aaa;
      display: flex;
      .item {
        width: 100%;
        height: 20px;
        padding: 0 12px;
        line-height: 20px;
        border: solid 1px #aaa;
        background-color: #f1f1f1;
        display: flex;
        justify-content: center;
        align-items: center;
        border-top: 0;
        font-size: 12px;
      }
      .item:hover {
        cursor: move;
      }
      .item + .item {
        // margin-top: 6px;
      }
      .noBg {
        background: #fff;
      }
      .numList{
        width: 30px;
        display: flex;
        flex-direction: column;
        >div{
          width: 100%;
          height: 20px;
          line-height: 20px;
          text-align: center;
          border: solid 1px #aaa;
          border-top: 0;
          border-left: 0;
        }
        div + div {
          // margin-top: 6px;
        }
      }
    }
    .machineItems + .machineItems {
      margin-left: 30px;
    }
  }
}
</style>
