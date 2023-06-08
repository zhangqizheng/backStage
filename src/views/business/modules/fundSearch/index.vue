<template>
  <div>
    <div v-if="!detailVal" class="g-box">
      <el-tabs v-model="tabVal" @tab-click="handleClick">
        <el-tab-pane label="机构" name="1">
          <orgList ref="orgList" />
        </el-tab-pane>
        <el-tab-pane label="退役军人" name="2">
          <soldierList ref="soldierList" />
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 机构详情列表 -->
    <orgDetailList
      v-if="detailVal === 1"
      :visible="true"
      :rule-form="form"
    />

    <!-- 机构培训详情 -->
    <orgDetail
      v-if="detailVal === 2"
      :visible="true"
      :rule-form="form"
      @goBackList="goBackList()"
    />

    <!-- 退役军人详情 -->
    <soldierDetail
      v-if="detailVal === 3"
      :visible="true"
      :rule-form="form"
    />
  </div>
</template>

<script>
import orgList from './details/orgList.vue'
import soldierList from './details/soldierList.vue'
import orgDetail from './details/orgForm.vue'
import soldierDetail from './details/soldierForm.vue'
import orgDetailList from './details/orgDetailList.vue'
export default {
  components: { orgList, soldierList, orgDetail, orgDetailList, soldierDetail },
  data() {
    return {
      tabVal: '1',
      // 详情状态
      projectFlag: false,
      // 正在查询
      detailVal: 0,
      form: {}
    }
  },
  computed: {},
  watch: {},
  created() {
    this.$bus.$on('goBack', () => {
      this.detailVal = 0
    })
    this.$bus.$on('goBackList', () => {
      this.detailVal = 1
    })

    this.$bus.$on('detailVal', (val, data) => {
      this.detailVal = val
      this.form = data
    })
  },
  mounted() {
    this.$nextTick(function() {
      if (this.$refs.orgList) {
        this.$refs.orgList.queryList()
      }
    })
  },
  methods: {
    handleClick(e) {
      if (this.tabVal === '1') {
        this.$refs.orgList.queryList()
      } else if (this.tabVal === '2') {
        this.$refs.soldierList.queryList()
      }
    },
    goBackList() {

    }
  }
}
</script>
<style lang="scss" scoped>
</style>
