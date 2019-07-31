<template>
  <div id="command">
    <el-divider content-position="left">指令管理</el-divider>
    <div class="table">
      <div class="row" v-for="(item,index) in commandsData" :key="item.date">
        <div class="prefix">
          <i class="el-icon-arrow-right"></i>
        </div>
        <div class="col col-1" @click="updateCommandDetail(item,index)">
          {{item.name}}
        </div>
        <div class="col col-2" style="width:100px">
          <el-button
            style="width:100%"
            size="mini"
            :type="buttonClass[item.status]"
            :loading="item.status==='loading'"
            @click="control(item.detail,index)">
            {{item.status === 'running' ? '停止' : '启动'}}
          </el-button>
        </div>
      </div>
    </div>

    <div class="row" @click="addCommandDetail" style="display:block;text-align:center;">
      <i class="el-icon-plus"></i>
    </div>

    <el-drawer
      :title="commandAction==='NEW' ? '新增指令集' : '编辑指令集'"
      :visible.sync="commandDetailDrawer"
      direction="rtl"
      size="60%">
      <command-form
        :form="commandForm"
        :index="commandIndex" 
        :action="commandAction"
        @done="closeDrawer"
      />
    </el-drawer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import CommandForm from './form';
export default {
  name: 'Command',
  data() {
    return {
      commandsData: null,
      buttonClass: {
        stop: 'success',
        loadding: 'info',
        running: 'danger',
      },
      commandDetailDrawer: false,
      commandIndex: null,
      commandForm: null,
      commandAction: 'NEW',
    };
  },
  computed: {
    ...mapGetters([
      'commandsList',
    ]),
  },
  methods: {
    addCommandDetail() {
      this.commandIndex = null;
      this.commandForm = {
        name: '',
        detail: [{ term: null, command: '', key: +new Date() }],
      };
      this.commandAction = 'NEW';
      this.commandDetailDrawer = true;
    },
    updateCommandDetail(item, index) {
      this.commandIndex = index;
      this.commandForm = item;
      this.commandAction = 'UPDATE';
      this.commandDetailDrawer = true;
    },
    control(detail, index) {
      const { status } = this.commandsData[index];
      this.commandsData[index].status = 'loading';
      setTimeout(() => {
        this.commandsData[index].status = status === 'stop' ? 'running' : 'stop';
      }, 2000);
    },
    closeDrawer() {
      this.commandDetailDrawer = false;
      this.getData();
    },
    getData() {
      for (let i = 0; i < this.commandsList.length; i += 1) {
        const element = this.commandsList[i];
        element.status = 'stop';
      }
      this.commandsData = this.commandsList;
    },
  },
  created() {
    this.getData();
  },
  components: {
    CommandForm,
  },
};
</script>

<style lang="scss">
#command{
  display: block;
  padding: 0 10px;
  .table{
    font-size: 14px;
    text-align: center;
  }
  .row{
    box-sizing: content-box;
    height: 35px;
    line-height: 35px;
    display: flex;
    padding: 5px 0;
    border-bottom: 1px solid #DCDFE6;
  }
  .prefix{
    width:50px;
  }
  .col{
    width: 100%;
  }
  .col-1{
    &:hover{
      cursor: pointer;
    }
  }
  .el-drawer__body{
    overflow: scroll;
  }
}
</style>


