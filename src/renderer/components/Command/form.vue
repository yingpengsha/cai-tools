<template>
  <div style="position:relative">
    <div id="command-editor" @keyup.alt="saveData" ref="editor">
    </div>
  </div>
</template>

<script>
import YAML from 'yamljs';
import CodeMirror from 'codemirror/lib/codemirror';
import 'codemirror/lib/codemirror.css';
export default {
  name: 'CommandsForm',
  props: {
    commandsData: Array,
  },
  data() {
    return {
      editor: null,
    };
  },
  methods: {
    updateData() {
      this.$emit('yamlUpdate', YAML.parse(this.editor.getValue()));
      // this.$store.commit('YAML_UPDATE_COMMANDS', YAML.parse(this.editor.getValue()));
    },
    init() {
      this.editor = CodeMirror(this.$refs.editor, {
        tabSize: 2,
        autoCloseBrackets: true,
        matchBrackets: true,
        showCursorWhenSelecting: true,
        // 显示行号
        lineNumbers: true,
        fullScreen: true,
        mode: 'yaml',
        theme: 'material',
        lint: true,
        gutters: ['CodeMirror-lint-markers'],
      });

      this.editor.setOption('extraKeys', {
        // TODO: 截流
        'Ctrl-S': () => (this.updateData()),
        'Cmd-S': () => (this.updateData()),
      });

      const commands = {};
      for (let i = 0; i < this.commandsData.length; i += 2) {
        const element = this.commandsData[i];
        const nextElement = this.commandsData[i + 1];
        commands[element.path] = [element.command, nextElement.command];
      }
      this.editor.setValue(YAML.stringify(commands, 3));
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style lang="scss" scope>
.bar{
  position: sticky;
  top: 0;
  height: 50px;
  z-index: 10000;
}
.command-editor{
  height: 100% ;
  width: 100%;
  overflow: auto;
}
.CodeMirror {
  border: 1px solid #eee;
  height: auto;
}

.CodeMirror-scroll {
  height: auto;
  overflow-y: hidden;
  overflow-x: auto;
}
</style>

