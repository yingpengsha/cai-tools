<template>
  <div id="command-update">
    <el-form :model="form" status-icon ref="form" label-width="100px">
      <el-form-item
        label="指令集名称"
        prop="name"
        style="width:calc(100% - 20px)"
        :rules="{ required: true, message: '请输入指令集名称', trigger: 'blur' }"
      >
        <el-input size="small" v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item
        v-for="(command, index) in form.detail"
        :label="'指令 ' + (index + 1)"
        :key="command.key"
        :prop="'detail.' + index"
        :rules="{
          validator: validateCommand, trigger: 'blur'
        }"
      >
        <el-col :span="10">
          <el-select size="small" v-model="command.term" placeholder="请选择文件夹">
            <el-option
              v-for="path in termsPath"
              :key="path"
              :label="path"
              :value="path">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="10">
          <el-input size="small" v-model="command.command"></el-input>
        </el-col>
        <el-col :span="4">
          <el-button size="small" @click.prevent="removeCommand(index)">删除</el-button>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" @click="submitCommands">保存指令集</el-button>
        <el-button size="small" v-show="action==='UPDATE'" type="danger" @click="removeCommands">删除指令集</el-button>
        <el-button size="small" @click="addCommand">增加指令</el-button>
        <el-button size="small" @click="uploadByYaml" disabled>YAML 上传</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'CommandForm',
  props: {
    form: Object,
    index: Number,
    action: String,
  },
  computed: {
    ...mapGetters([
      'termsPath',
    ]),
  },
  methods: {
    uploadByYaml() {

    },
    removeCommand(index) {
      this.form.detail.splice(index, 1);
    },
    addCommand() {
      this.form.detail.push({
        term: null,
        command: null,
        key: +new Date(),
      });
    },
    validateCommand(rule, value, callback) {
      if (!(value.command && value.term)) {
        callback(new Error('请选择文件夹或者填写指令'));
      } else if (!this.termsPath.includes(value.term)) {
        callback(new Error('工作区不存在该文件夹'));
      } else {
        callback();
      }
    },
    submitCommands() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.action === 'NEW') {
            this.$store.commit('NEW_COMMANDS', this.form);
          } else {
            this.$store.commit('UPDATE_COMMANDS', this.form, this.key);
          }
          this.$emit('done');
        }
      });
    },
    removeCommands() {
      this.$store.commit('REMOVE_COMMANDS', this.key);
      this.$emit('done');
    },
  },
};
</script>

<style lang="scss" scoped>
#command-update{
  width: 100%;
  max-width: 600px;
  padding:0 10px;
  .el-col {
    padding-right: 5px;
  }
}
</style>

