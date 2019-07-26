<template>
  <div id="terminals">
    <el-tabs
      v-model="editableTabsValue"
      type="border-card"
      closable
      @tab-remove="removeTab"
      class="tabs"
    >
      <el-tab-pane
        v-for="(item) in editableTabs"
        :key="item.name"
        :label="item.title"
        :name="item.name"
      >
        <terminal />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Terminal from '@/components/Terminal';
export default {
  name: 'Terminals',
  data() {
    return {
      editableTabsValue: '1',
      editableTabs: [{
        title: 'Tab 1',
        name: '1',
        content: 'Tab 1 content',
      }],
      tabIndex: 1,
    };
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
    removeTab(targetName) {
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
  },
  components: {
    Terminal,
  },
};
</script>

<style lang="scss">
#terminals{
  width: 100%;
  height: 100%;
  background: white;
  .tabs{
    box-shadow: none;
    height: calc(100% - 2px);
    .el-tabs__content {
      padding: 0 !important;
      height: calc(100% - 40px);
      .el-tab-pane {
        height: 100%;
      }
    }
  }
}
</style>



