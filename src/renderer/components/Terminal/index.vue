<template>
  <div id="terminal">
    <div id="term" ref="xterm"></div>
  </div>
</template>

<script>
import { Terminal } from 'xterm';
import defaultShell from 'default-shell';
import 'xterm/dist/xterm.css';
import * as fit from 'xterm/lib/addons/fit/fit';
import * as attach from 'xterm/lib/addons/attach/attach';
const pty = require('node-pty');
Terminal.applyAddon(fit);
Terminal.applyAddon(attach);
export default {
  name: 'mainPage',
  data() {
    return {
      term: null,
      ptyProcess: null,
    };
  },
  methods: {
    newPty() {
      const { env } = process;
      env.LC_ALL = 'zh_CN.UTF-8';
      env.LANG = 'zh_CN.UTF-8';
      env.LC_CTYPE = 'zh_CN.UTF-8';
      this.ptyProcess = pty.spawn(defaultShell, [], {
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
    init() {
      const container = this.$refs.xterm;
      this.newTerm(container);
      this.newPty();

      this.term.on('data', (data) => {
        this.ptyProcess.write(Buffer.from(data));
      });
      this.ptyProcess.on('data', (data) => {
        this.term.write(data.toString());
      });
      this.term.on('resize', (v) => { console.log(v); });

      setInterval(() => {
        const { width, height } = document.getElementById('terminal').getBoundingClientRect();
        console.log(height);
        const cols = Math.floor(width / 7.17);
        const rows = Math.floor(height / 21);
        this.term.resize(cols, rows);
        this.ptyProcess.resize(cols, rows);
      }, 1000);
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style scoped>
#terminal{
  width: 100%;
  height: 100%;
}
</style>