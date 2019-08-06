<template>
  <div id="term" ref="container"></div>
</template>

<script>
import { mapGetters } from 'vuex';
import { Terminal } from 'xterm';
import 'xterm/dist/xterm.css';
import * as fit from 'xterm/lib/addons/fit/fit';
import * as attach from 'xterm/lib/addons/attach/attach';
import processStore from '@/process';
import * as processAction from '@/process/actionTypes';
const pty = require('node-pty');
Terminal.applyAddon(fit);
Terminal.applyAddon(attach);
export default {
  name: 'Termainal',
  props: {
    cols: Number,
    rows: Number,
    workspacePath: String,
    termPath: String,
    groupKey: String,
  },
  data() {
    return {
      term: null,
      ptyProcess: null,
      resizeObserver: null,
      recordOldValue: { // 记录下旧的宽高数据，避免重复触发回调函数
        width: '0',
        height: '0',
      },
    };
  },
  computed: {
    ...mapGetters([
      'defaultShell',
      'process',
    ]),
  },
  watch: {
    cols() {
      this.resize();
    },
    rows() {
      this.resize();
    },
  },
  methods: {
    newPty() {
      const { env } = process;
      env.LC_ALL = 'zh_CN.UTF-8';
      env.LANG = 'zh_CN.UTF-8';
      env.LC_CTYPE = 'zh_CN.UTF-8';
      const ptyProcess = pty.spawn(this.defaultShell, [], {
        name: 'xterm-color',
        cols: 108,
        rows: 21,
        cwd: this.workspacePath ? `${this.workspacePath}/${this.termPath}` : process.cwd(),
        env,
        encoding: null,
      });
      processStore.dispatch({
        type: processAction.SET_PROCESS_PTY,
        key: this.groupKey,
        path: this.termPath,
        pty: ptyProcess,
      });
    },
    newTerm(container) {
      this.term = new Terminal({
        cols: 108,
        rows: 24,
        fontFamily: 'Menlo, "DejaVu Sans Mono", Consolas, "Lucida Console", monospace',
        allowTransparency: 'transparent',
        fontSize: 12,
        lineHeight: 1.5,
        theme: {
          foreground: '#f0f0f0',
          selection: 'rgba(248,28,229,0.3)',
        },
      });

      this.term.open(container);
    },
    resize() {
      this.term.resize(this.cols, this.rows);
      processStore.getStateByKey('groups', this.groupKey, this.termPath).resize(this.cols, this.rows);
    },
    init() {
      const { container } = this.$refs;
      this.newTerm(container);
      this.newPty();


      this.term.on('data', (data) => {
        console.log(Buffer.from(data));
        processStore.getStateByKey('groups', this.groupKey, this.termPath).write(data);
      });
      processStore.getStateByKey('groups', this.groupKey, this.termPath).on('data', (data) => {
        this.term.write(data.toString());
      });

      setTimeout(() => {
        this.resize();
      }, 1000 / 60);
    },
  },
  mounted() {
    this.init();
  },
};
</script>