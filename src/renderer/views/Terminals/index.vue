<template>
  <div id="terminals-view">
    <split-pane v-on:resize="resize()" :min-percent='32' :default-percent='32' split="vertical">
      <template slot="paneL">
        <console />
      </template>
      <template slot="paneR">
        <terminals ref="terminals"/>
      </template>
    </split-pane>
  </div>
</template>

<script>
import Console from './Console';
import Terminals from './Terminals';

export default {
  name: 'TerminalsView',
  components: {
    Console,
    Terminals,
  },
  methods: {
    resize() {
      // TODO: resize 防抖
      this.$refs.terminals.resize();
    },
  },
  mounted() {
    window.addEventListener('resize', () => { this.resize(); });
  },
};
</script>

<style lang="scss" scoped>
#terminals-view{
  height: 100%;
  width: 100%;
}
</style>


