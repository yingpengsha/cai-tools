<template>
  <div style="position:relative">
    <div id="command-editor" ref="editor">
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
    saveData() {
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
        'Ctrl-S': () => (this.saveData()),
        'Cmd-S': () => (this.saveData()),
      });

      const commands = {};
      for (let i = 0; i < this.commandsData.length; i += 2) {
        const element = this.commandsData[i];
        const nextElement = this.commandsData[i + 1];
        commands[element.path] = [element.command, nextElement.command];
      }
      if (this.commandsData.length) {
        this.editor.setValue(YAML.stringify(commands, 3));
      }
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style lang="scss">
.command-editor{
  height: 100% ;
  width: 100%;
  overflow: auto;
}
.CodeMirror {
  border: 1px solid #eee;
  min-height: 300px;
  height: auto;
}

.CodeMirror-scroll {
  min-height: 300px;
  height: auto;
  overflow-y: hidden;
  overflow-x: auto;
}
</style>

