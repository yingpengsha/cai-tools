<template>
  <div id="env-table">
    <div class="row header">
      <div class="col col-1">环境组名称</div>
      <el-divider direction="vertical"></el-divider>
      <div class="col col-1">
        <el-button type="text" @click="handleAddEnvGroup">添加</el-button>
      </div>
    </div>

    <div class="detail">
      <div class="row" v-for="envItem in envList" :key="envItem.key">
        <div class="col col-1">{{envItem.title}}</div>
        <el-divider direction="vertical"></el-divider>
        <div class="col col-1">
          <el-button type="text" @click="handleEditEnvGroup(envItem)">编辑</el-button>
          <el-button type="text" @click="handleRemoveEnvGroup(envItem)">删除</el-button>
        </div>
      </div>
    </div>

    <el-drawer
      :title="formAction === 'NEW' ? '新建环境' : '编辑环境'"
      :visible.sync="envDetailDrawer"
      direction="rtl"
      size="60%">
      <env-form
        :envData="envData"
        :action="formAction"
        @close="envDetailDrawer=false"
      />
    </el-drawer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import EnvForm from './form';
export default {
  name: 'EnvTable',
  data() {
    return {
      formAction: 'NEW',
      envDetailDrawer: false,
      envData: {},
    };
  },
  computed: {
    ...mapGetters([
      'envList',
    ]),
  },
  methods: {
    handleRemoveEnvGroup(envItem) {
      this.$store.commit('REMOVE_ENV_GROUP', envItem);
    },
    handleEditEnvGroup(envItem) {
      this.formAction = 'EDIT';
      this.envData = envItem;
      this.envDetailDrawer = true;
    },
    handleAddEnvGroup() {
      this.formAction = 'NEW';
      this.envData = {
        title: 'New Env Group',
        key: +new Date(),
        env: [
          { key: 'key', value: 'value', _id: +new Date() },
        ],
      };
      this.envDetailDrawer = true;
    },
  },
  components: {
    EnvForm,
  },
};
</script>

<style lang="scss" scoped>
#env-table{
  width: 100%;
  height: 200px;
  border:1px solid #DCDFE6;
  border-radius: 4px;
  .row{
    width:100%;
    height: 28px;
    display: flex;
    align-items: center;
    border-bottom:1px solid #DCDFE6;
    text-align: center;
    color: #606266;
  }
  .header{
    // box-shadow: 0 2px 2px rgba(0, 0, 0, .12);
    background: #E9E9EB;
  }
  .detail{
    height: calc(100% - 28px);
    overflow: auto;
  }
  .col-1{
    flex: 2 0;
  }
  .col-2{
    flex: 1 0;
  }
}
</style>
