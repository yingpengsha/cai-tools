<template>
  <div id="term" ref="xterm"></div>
</template>

<script>
import { mapGetters } from 'vuex';
import { Terminal } from 'xterm';
import 'xterm/dist/xterm.css';
import * as fit from 'xterm/lib/addons/fit/fit';
import * as attach from 'xterm/lib/addons/attach/attach';
const pty = require('node-pty');
Terminal.applyAddon(fit);
Terminal.applyAddon(attach);
export default {
  name: 'mainPage',
  props: {
    cols: Number,
    rows: Number,
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
      this.ptyProcess = pty.spawn(this.defaultShell, [], {
        name: 'xterm-color',
        cols: 108,
        rows: 21,
        cwd: process.cwd(),
        env,
        encoding: null,
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
      this.ptyProcess.resize(this.cols, this.rows);
    },
    init() {
      const { xterm } = this.$refs;
      this.newTerm(xterm);
      this.newPty();

      this.term.on('data', (data) => {
        this.ptyProcess.write(Buffer.from(data));
      });
      this.ptyProcess.on('data', (data) => {
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