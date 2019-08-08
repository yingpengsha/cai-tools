<template>
  <div id="env-from">
    <el-form :model="form" ref="form" label-width="100px">
      <el-form-item
        prop="title"
        label="变量组名称"
        :rules="[
          { required: true, message: '请输入名称', trigger: 'blur' },
        ]"
      >
        <el-input v-model="form.title" size="mini"></el-input>
      </el-form-item>
      <el-form-item
        v-for="(item, index) in form.env"
        :label="'变量 ' + (index + 1) "
        :key="item._id"
        :prop="'env.' + index"
        :rules="{
          validator: validateEnv, trigger: 'blur'
        }"
      >
        <el-col :span="10">
          <el-input v-model="item.key" size="mini"></el-input>
        </el-col>
        <el-col :span="10">
          <el-input v-model="item.value" size="mini"></el-input>
        </el-col>
        <el-col :span="4">
          <el-button @click.prevent="removeKeyValue(index)" size="mini">删除</el-button>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm" size="mini">保存</el-button>
        <el-button @click="addKeyValue" size="mini">新增变量</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'EnvForm',
  props: {
    envData: Object,
    action: String,
  },
  data() {
    return {
      form: {},
    };
  },
  watch: {
    envData() {
      this.init();
    },
  },
  methods: {
    submitForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.action === 'NEW') {
            this.$store.commit('NEW_ENV_GROUP', this.form);
          } else {
            this.$store.commit('UPDATE_ENV_GROUP', this.form);
          }
          this.$emit('close');
        }
      });
    },
    addKeyValue() {
      this.form.env.push({
        key: 'key',
        value: 'value',
        _id: +new Date(),
      });
    },
    removeKeyValue(index) {
      this.form.env.splice(index, 1);
    },
    init() {
      this.form = JSON.parse(JSON.stringify(this.envData));
    },
    validateEnv(rule, value, callback) {
      if (!(value.key && value.value)) {
        callback(new Error('键值不能为空'));
      } else if (this.form.env.some(item => item._id !== value._id && item.key === value.key)) {
        callback(new Error('键不能重复'));
      } else {
        callback();
      }
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style lang="scss">
#env-from{
  max-width: 500px;
  padding: 0 10px;
  .el-col {
    padding-right: 5px;
  }
}
</style>

