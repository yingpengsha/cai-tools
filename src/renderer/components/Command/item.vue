<template>
  <div class="item" >
    <div class="col col-1">
      <el-checkbox :value="select" @change="handleCheckSingeChange"></el-checkbox>
    </div>
    <div class="col col-2">
      {{commandItem.path}}
    </div>
    <div class="col col-3">
      <el-input
        size="small"
        placeholder="请编辑指令"
        v-model="commandItem.command"
        disabled
      />
    </div>
    <div class="col col-4">
      <el-button
        icon="el-icon-switch-button"
        size="small"
        :type="buttonClass[commandItem.status]"
        :loading="commandItem.status==='LOADING'"
        @click="commandItem.status==='FREE' 
          ? handleRunCommand(commandItem,index)
          : handleStopCommand(commandItem,index)">
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommandItem',
  props: {
    commandItem: Object,
    index: Number,
    select: Boolean,
  },
  data() {
    return {
      buttonClass: {
        FREE: null,
        LOADDING: 'info',
        RUNNING: 'danger',
      },
    };
  },
  watch: {
    commandItem() {
      console.log(this.commandItem);
    },
  },
  methods: {
    handleCheckSingeChange(isSelect) {
      this.$emit('handleCheckSingeChange', isSelect, this.index);
    },
    handleStopCommand(commandItem, index) {
      this.$emit('handleStopCommand', commandItem, index);
    },
    handleRunCommand(commandItem, index) {
      this.$emit('handleRunCommand', commandItem, index);
    },
  },
  mounted() {
    this.$emit('instantiation');
  },
};
</script>

<style lang="scss" scoped>
.item{
  box-sizing: content-box;
  height: 35px;
  line-height: 35px;
  display: flex;
  padding: 5px 0;
  border-bottom: 1px solid #DCDFE6;
  text-align: center;
  font-size: 14px;
}
.col{
  width: 100%;
  line-height: 35px;
}
.col-1{
  flex: 0 0 20px;
}
.col-2{
  flex: 2;
  padding: 0 3px;
  overflow: hidden;
}
.col-3{
  flex: 3;
}
.col-4{
  flex: 0 0 10px;
  padding-left: 10px;
  display: flex;
  align-items: center;
}
</style>
