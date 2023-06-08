<template>
  <div class="tableTransfer">
    <el-row>
      <el-col :span="11">
        <el-card :body-style="{ padding: '0px' }">
          <div slot="header">
            <span>{{ leftTitle }}</span>
          </div>
          <el-input
            v-model="IsShowFormLeft"
            placeholder="请输入查询内容"
            @keyup.enter.native="query(IsShowFormLeft)"
          />
          <el-table
            max-height="500px"
            height="300px"
            :data="dataLeft"
            border
            stripe
            @selection-change="handleLeftSelectionChange"
          >
            <el-table-column
              width="40px"
              type="selection"
            />
            <el-table-column
              v-for="col in columns"
              :key="col.id"
              :prop="col.id"
              :label="col.label"
            >
              <template slot-scope="scope">
                <slot :scope="{row: scope.row, col: col}" />
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            small
            layout="prev, pager, next"
            :total="total"
            @current-change="paginationLeft"
          />
        </el-card>
      </el-col>
      <el-col :span="2">
        <div
          class="opration-container"
          @click="clickToRight"
        >
          <el-button type="primary">
            <i class="el-icon-arrow-right" />
          </el-button>
          <br>
          <br>
          <el-button
            type="primary"
            @click="clickToLeft"
          >
            <i class="el-icon-arrow-left" />
          </el-button>

        </div>
      </el-col>
      <el-col :span="11">
        <el-card :body-style="{ padding: '0px' }">
          <div slot="header">
            <span>{{ rightTitle }}</span>
          </div>
          <el-table
            height="300px"
            :data="dataRight"
            border
            stripe
            @selection-change="handleRightSelectionChange"
          >
            <el-table-column
              :selectable="selectable"
              width="40px"
              type="selection"
            />
            <el-table-column
              v-for="col in columns"
              :key="col.id"
              :prop="col.id"
              :label="col.label"
            >
              <template slot-scope="scope">
                <slot :scope="{row: scope.row, col: col}" />
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// fromNameRight   已选中查询内容   fromNameLeft 未选中查询内容
export default {
  props: {
    leftTitle: {
      type: String,
      default: () => []
    },
    total: {
      type: Number,
      default: () => []
    },
    rightTitle: {
      type: String,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    },
    dataLeft: {
      type: Array,
      default: () => []
    },
    fromNameRight: {
      type: String,
      default: () => []
    },
    fromNameLeft: {
      type: String,
      default: () => []
    },
    dataRight: {
      type: Array,
      default: () => []
    },
    selectable: {
      type: Function,
      default: () => []
    }
  },
  data() {
    return {
      IsShowFormLeft: this.fromNameLeft,
      leftSelection: [],
      rightSelection: []
    }
  },

  watch: {
    fromNameLeft(val) {
      this.fromNameLeft = val// 新增isVisible的watch，监听变更并同步到IsShowPage上
    }
  },
  methods: {
    handleLeftSelectionChange(val) {
      this.leftSelection = val
    },
    query(val) {
      this.$emit('query-left', val)
    },
    query2(val) {
      this.$emit('queryRight', val)
    },
    handleRightSelectionChange(val) {
      this.rightSelection = val
    },
    paginationLeft(val) {
      this.$emit('pagination-left', val)
    },
    paginationRight(val) {
      this.$emit('paginationLeft', val)
    },

    clickToRight() {
      this.dataRight.push(...this.leftSelection)
      for (let i = 0; i < this.leftSelection.length; i++) {
        const index = this.dataLeft.indexOf(this.leftSelection[i])
        console.log(index)
        if (index !== -1) {
          this.dataLeft.splice(index, 1)
        }
      }
      this.leftSelection = []
    },
    clickToLeft() {
      this.dataLeft.push(...this.rightSelection)
      for (let i = 0; i < this.rightSelection.length; i++) {
        const index = this.dataRight.indexOf(this.rightSelection[i])
        console.log(index)
        if (index !== -1) {
          this.dataRight.splice(index, 1)
        }
      }
      this.rightSelection = []
    }
  }
}
</script>

<style lang="scss"  >
.tableTransfer {
  .el-icon-arrow-right,
  .el-icon-arrow-left {
    font-size: 20px;
    display: inline-block;
    cursor: pointer;
  }
  .opration-container {
    padding-left: 15px;
    padding-top: 100px;
  }
  .el-button {
    width: 40px;
    height: 40px;
    padding: 10px;
    text-align: center;
  }
  .el-card {
    border: 1px solid #eee;
  }
  .el-card.is-always-shadow {
    box-shadow: none;
  }
  .el-card__header {
    background: #eee !important;
    color: #555;
  }
  .el-card__body {
    padding: 15px !important;
  }
  .el-card__body .el-table {
    margin-top: 15px;
  }
}
</style>
