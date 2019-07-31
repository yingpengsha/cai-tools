<template>
  <div id="terminals">
    <el-tabs
      v-model="editableTabsValue"
      type="border-card"
      @tab-remove="removeTerm"
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
    <div
      class="tabs-content"
      v-for="(term,index) in termsPath"
      :key="term"
      :style="+editableTabsValue===index?'z-index:1':null"
    >
      <div class="container">
        <terminal :cols="cols" :rows="rows" :path="`${workspacePath}/${term}`"/>
      </div>
      <div class="container">
        <terminal :cols="cols" :rows="rows" :path="`${workspacePath}/${term}`"/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Terminal from '@/components/Terminal';
export default {
  name: 'Terminals',
  data() {
    return {
      editableTabsValue: '0',
      tabIndex: 0,
      rows: 0,
      cols: 0,
    };
  },
  computed: {
    ...mapGetters([
      'termsPath',
      'workspacePath',
    ]),
  },
  methods: {
    addTab() {
      const newTabName = `${this.tabIndex += 1}`;
      this.editableTabs.push({
        title: 'New Tab',
        name: newTabName,
        content: 'New Tab content',
      });
      this.editableTabsValue = newTabName;
    },
    removeTerm(targetName) {
      const tabs = this.editableTabs;
      let activeName = this.editableTabsValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            const nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }

      this.editableTabsValue = activeName;
      this.editableTabs = tabs.filter(tab => tab.name !== targetName);
    },
    resize() {
      console.log('resizing');
      const container = document.querySelectorAll('.container')[0];
      const { width, height } = container.getBoundingClientRect();
      this.cols = Math.floor(width / 7.17);
      this.rows = Math.floor(height / 21);
    },
  },
  components: {
    Terminal,
  },
  mounted() {
    this.resize();
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
      background: black
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



