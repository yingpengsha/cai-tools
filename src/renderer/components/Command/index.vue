<template>
  <div id="command">
    <el-divider content-position="left">指令管理</el-divider>

    <div class="row select">
      <el-select v-model="envID" @change="currentEnvChange" size="mini" filterable placeholder="请选择环境">
        <el-option
          v-for="item in envList"
          :key="item._id"
          :label="item.title"
          :value="item._id">
        </el-option>
      </el-select>
    </div>

    <div class="row">
      <div class="col col-1">
        <el-checkbox :indeterminate="indeterminate" v-model="checkAll" @change="handleCheckAllChange" />
      </div>
      <div class="col col-2">文件夹</div>
      <div class="col col-3">
        <el-button icon="el-icon-edit" size="mini" round @click="commandDetailDrawer=true">指令</el-button>
      </div>
      <div class="col col-4">
        <el-button  
          icon="el-icon-switch-button"
          size="small"
          :type="buttonClass[controlButton]"
          :loading="controlButton==='LOADING'"
          @click="controlButton==='FREE'
            ? handleRunSelectCommands()
            : handleStopSelectCommands()"
        >
        </el-button>
      </div>
    </div>

    <div class="table" v-loading="commandsNum != commands.length">
      <div v-for="(commandItem, index) in commandsData" :key="commandItem.key">
        <CommandItem
          :commandItem="commandItem"
          :index="index"
          :select="commandItem.select"
          @handleCheckSingeChange="handleCheckSingeChange"
          @instantiation="commandsNum+=1"
          @handleRunCommand="handleRunCommand"
          @handleStopCommand="handleStopCommand"
        />
      </div>
    </div>

    <el-drawer
      title="编辑指令（Ctrl/Cmd + S 保存）"
      :visible.sync="commandDetailDrawer"
      direction="rtl"
      size="60%">
      <command-form
        :commandsData="commandsData"
        @yamlUpdate="yamlUpdate"
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
      envID: null,
      checkAll: false,
      checkNum: 0,
      commandsData: [],
      commandsNum: 0,
      controlButton: 'FREE',
      buttonClass: {
        FREE: null,
        LOADDING: 'info',
        RUNNING: 'danger',
      },
      commandDetailDrawer: false,
    };
  },
  computed: {
    ...mapGetters([
      'currentEnv',
      'envList',
    ]),
    indeterminate() {
      return this.checkNum > 0 && this.checkNum !== this.commandsData.length;
    },
    commands() {
      return JSON.parse(JSON.stringify(this.$store.getters.commands));
    },
  },
  watch: {
    commands() {
      Promise.resolve().then(this.init());
    },
  },
  methods: {
    handleStopSelectCommands() {
      this.controlButton = 'LOADING';
      this.commandsData.forEach((commandItem, index) => {
        if (commandItem.select && commandItem.status === 'RUNNING') {
          this.handleStopCommand(commandItem, index);
        }
      });
      this.controlButton = 'FREE';
    },
    handleRunSelectCommands() {
      this.controlButton = 'LOADING';
      this.commandsData.forEach((commandItem, index) => {
        if (commandItem.select && commandItem.status === 'FREE') {
          this.handleRunCommand(commandItem, index);
        }
      });
      this.controlButton = 'RUNNING';
    },
    handleStopCommand(commandItem, index) {
      this.commandsData[index].status = 'LOADING';
      const callback = (status) => {
        this.commandsData[index].status = status;
      };
      this.$store.commit('STOP_COMMAND', { commandItem, callback });
    },
    handleRunCommand(commandItem, index) {
      this.commandsData[index].status = 'LOADING';
      const callback = (status) => {
        this.commandsData[index].status = status;
      };
      this.$store.commit('RUN_COMMAND', { commandItem, callback });
    },
    handleCheckSingeChange(isSelect, index) {
      this.commandsData[index].select = isSelect;
      if (isSelect) {
        this.checkNum += 1;
      } else {
        this.checkNum -= 1;
      }
      if (this.checkNum === this.commandsData.length) {
        this.checkAll = true;
      }
    },
    handleCheckAllChange(isAllSelect) {
      this.commandsData.forEach((value) => {
        value.select = isAllSelect;
      });
      if (!isAllSelect) {
        this.checkNum = 0;
      }
    },
    yamlUpdate(yamlData) {
      this.commandsData.forEach((command) => {
        if (yamlData[command.path].length) {
          command.command = yamlData[command.path][0];
          yamlData[command.path].shift();
        }
      });
      this.$store.commit('UPDATE_COMMANDS', this.commandsData);
    },
    currentEnvChange(_id) {
      this.$store.commit('SET_CURRENT_ENV', _id);
    },
    init() {
      this.envID = this.currentEnv._id;
      this.commandsData = this.commands;
      for (let i = 0; i < this.commandsData.length; i += 1) {
        const element = this.commandsData[i];
        element.status = 'FREE';
        element.select = false;
      }
    },
  },
  created() {
    this.init();
  },
  components: {
    CommandForm,
    CommandItem: () => import('./item'),
  },
};
</script>

<style lang="scss" scoped>
#command{
  display: block;
  padding: 0 10px;
  .table{
    min-height: 50px;
  }
  .row{
    box-sizing: content-box;
    height: 35px;
    line-height: 35px;
    display: flex;
    padding: 5px 0;
    border-bottom: 1px solid #DCDFE6;
    text-align: center;
    font-size: 14px;
  }
  .select{
    justify-content: flex-end;
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
}
</style>

<style lang="scss">
.el-drawer__body{
  overflow: scroll;
}
</style>



