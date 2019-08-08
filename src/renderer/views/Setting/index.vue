<template>
  <div id="setting">
    <el-form
      :rules="rules"
      ref="settingForm"
      :model="settingForm"
      label-width="120px"
      size="mini"
      class="form"
    >
      <el-form-item label="默认 Shell" prop="defaultShell">
        <el-input v-model="settingForm.defaultShell"></el-input>
      </el-form-item>
      <el-form-item label="环境变量" prop="envList">
        <env-table></env-table>
      </el-form-item>
      <el-form-item size="large">
        <el-button size="small" type="primary" @click="saveSetting">保存配置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import pathExists from 'path-exists';
import EnvTable from '@/components/EnvList';
export default {
  name: 'Setting',
  data() {
    const validatePath = async (rule, value, callback) => {
      if (await pathExists(value)) {
        callback();
      } else {
        callback(new Error('路径不合法'));
      }
    };
    return {
      settingForm: {
        defaultShell: null,
      },
      rules: {
        defaultShell: [
          { required: true, message: '默认 Shell 不能为空', trigger: 'blur' },
          { validator: validatePath, trigger: 'blur' },
        ],
      },
    };
  },
  computed: {
    ...mapGetters([
      'defaultShell',
    ]),
  },
  methods: {
    saveSetting() {
      this.$refs.settingForm.validate((valid) => {
        if (valid) {
          this.$store.commit('SET_SHELL', this.settingForm.defaultShell);
        }
      });
    },
    init() {
      this.settingForm = {
        defaultShell: this.defaultShell,
      };
    },
  },
  created() {
    this.init();
  },
  components: {
    EnvTable,
  },
};
</script>

<style lang="scss" scoped>
#setting{
  box-sizing: border-box;
  padding:10px;
  padding-top: 30px;
  height: 100%;
  width: 100%;
  .form{
    width:500px;
    margin:0 auto;
  }
}
</style>


