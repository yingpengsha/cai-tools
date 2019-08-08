const npmRunPath = require('npm-run-path');
const path = require('path');
const is = require('electron-is');
const pathKey = require('path-key');
const { APP_BIN_PATH } = require('./paths');

export default function getEnv() {
  const PATH = pathKey();
  const env = Object.assign({}, npmRunPath.env(), {
    CLICOLOR: 1,
    FORCE_COLOR: 1,
    COLORTERM: 'truecolor',
    TERM: 'xterm-256color',
    ICEWORKS_IPC: 'yes',
  });

  const pathEnv = [
    env[PATH],
    APP_BIN_PATH,
  ];

  if (is.osx()) {
    pathEnv.push('/usr/local/bin'); // 最终兜底
  }

  env[PATH] = pathEnv.join(path.delimiter);

  return env;
}
