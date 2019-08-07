<template>
  <div id="workspace">
    <el-divider content-position="left">工作区设置</el-divider>
    <el-form
      :rules="rules"
      ref="workspaceForm"
      :model="workspaceForm"
      label-width="90px"
      size="mini"
      class="form"
    >
      <el-form-item label="工作区路径" prop="workspacePath">
        <el-input v-model="workspaceForm.workspacePath">
          <template slot="prepend">
            <el-button
              slot="append"
              icon="el-icon-folder-opened"
              @click="selectWorkspaceDir"
            />
          </template>
          <el-button
            slot="append"
            icon="el-icon-s-grid"
            @click="openDialog"
          />
        </el-input>
      </el-form-item>
    </el-form>

    <el-dialog
      title="选择文件夹"
      center
      :visible.sync="dialogVisible">
      <div style="text-align: center">
        <el-transfer
          style="text-align: left; display: inline-block"
          :titles="['可用文件夹', '工作区']"
          v-model="selectList"
          :data="dirList">
        </el-transfer>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitTermList">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import pathExists from 'path-exists';
const fs = require('fs');
export default {
  name: 'Workspace',
  data() {
    const validatePath = async (rule, value, callback) => {
      if (await pathExists(value)) {
        callback();
      } else {
        callback(new Error('路径不合法'));
      }
    };
    return {
      workspaceForm: {
        workspacePath: null,
      },
      rules: {
        workspacePath: [
          { validator: validatePath, trigger: 'blur' },
        ],
      },
      dialogVisible: false,
      selectList: [],
      dirList: [],
    };
  },
  computed: {
    ...mapGetters([
      'workspacePath',
      'termsPath',
    ]),
  },
  methods: {
    selectWorkspaceDir() {
      this.$electron.ipcRenderer.send('open-workspace-dir');
    },
    getDirList() {
      const path = this.$store.getters.workspacePath;
      const files = fs.readdirSync(path);
      const dirList = [];
      for (let i = 0; i < files.length; i += 1) {
        const file = files[i];
        if (fs.statSync(`${path}/${file}`).isDirectory()) {
          dirList.push({
            key: file,
            label: file,
          });
        }
      }
      this.dirList = dirList;
    },
    submitTermList() {
      this.dialogVisible = false;
      this.$store.dispatch('setCommands', this.selectList);
    },
    openDialog() {
      this.getDirList();
      this.dialogVisible = true;
    },
    init() {
      this.selectList = this.termsPath;
      this.workspaceForm.workspacePath = this.workspacePath;

      this.$electron.ipcRenderer.on('selected-workspace-dir', (event, path) => {
        this.workspaceForm.workspacePath = path[0];
        this.$store.commit('SET_WORKSPACE_PATH', path[0]);
      });
    },
  },
  created() {
    this.init();
  },
};
</script>

<style lang="scss">
#workspace{
  padding: 0 10px;
  .el-dialog{
    width: 550px;
  }
}
</style>

