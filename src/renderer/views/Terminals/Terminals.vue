<template>
  <div id="terminals">
    <el-tabs
      v-model="editableTabsValue"
      type="border-card"
      class="tabs"
    >
      <el-tab-pane
        v-for="(term,index) in termsPath"
        :key="term"
        :label="term"
        :name="String(index)"
      >
      </el-tab-pane>
    </el-tabs>

    <div v-if="$store.getters.termsPath.length">
      <div
        class="tabs-content"
        v-for="(term,index) in termsPath"
        :key="term"
        :style="+editableTabsValue===index?'z-index:1':null"
        v-loading="termsNum != termsPath.length*2"
        element-loading-text="正在加载控制台"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
      >
        <div class="container" v-for="group in 2" :key="group">
          <terminal
            :cols="cols"
            :rows="rows"
            :termPath="term"
            :workspacePath="workspacePath"
            @instantiation="termsNum+=1"
          />
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
// import Terminal from '@/components/Terminal';
export default {
  name: 'Terminals',
  data() {
    return {
      termsNum: 0,
      editableTabsValue: '0',
      tabIndex: 0,
      rows: 0,
      cols: 0,
    };
  },
  computed: {
    ...mapGetters([
      'workspacePath',
      'process',
    ]),
    termsPath() {
      return this.$store.getters.termsPath.length ? this.$store.getters.termsPath : ['请导入文件夹'];
    },
  },
  methods: {
    resize() {
      const container = document.querySelectorAll('#terminals')[0];
      const { width, height } = container.getBoundingClientRect();
      this.cols = Math.floor(width / 7.17 / 2);
      this.rows = Math.floor((height - 40) / 21);
    },
    init() {
      this.$store.commit('INIT_PROCESS');
    },
  },
  components: {
    // Terminal,
    Terminal: () => ({
      component: import('@/components/Terminal'),
    }),
  },
  mounted() {
    this.resize();
    this.init();
  },
};
</script>

<style lang="scss">
#terminals{
  width: 100%;
  height: 100%;
  background: white;
  position: relative;
  .tabs-content{
    background: black;
    width: 100%;
    height: calc(100% - 40px);
    display: flex;
    position:absolute;
    top:40px;
    left: 0px;
    z-index: -1;
    .container{
      height: 100%;
      width: 50%;
      background: black;
    }
    .container:nth-of-type(2){
      border-left:2px solid gray;
    }
  }
  .tabs{
    box-shadow: none;
    .el-tabs__content {
      padding: 0 !important;
    }
  }
}
</style>



