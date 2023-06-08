<template>
  <div>
    <el-dialog :title="dialogTitle" :visible.sync="visible" :append-to-body="true" :before-close="cancel">
      <slot>
        <p>弹框自定义的内容</p>
      </slot>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    dialogTitle: {
      type: String,
      default: '标题'
    },
    visible: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    // 取消按钮
    cancel() {
      this.$emit('cancel')
    },
    // 确认按钮
    confirm() {
      this.$emit('confirm')
    },
    // 关闭前的回调
    handleClose() {
      this.$emit('handleClose')
    }
  }
}
</script>
