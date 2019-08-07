/* eslint-disable max-len */
import { ipcRenderer } from 'electron';
import * as actionTypes from './actionTypes';

const initState = {
  groups: {
  },
};

export default function reducer(state = initState, action) {
  const { type } = action;
  switch (type) {
    // 创建线程组织
    // action: {
    //   type: SET_PROCESS_PATH_LIST,
    //   pathList: ['app-web', ...]
    // }
    case actionTypes.SET_PROCESS_PATH_LIST:
      const { pathList } = action;
      pathList.forEach((path) => {
        state.groups[path] = [];
      });
      return state;

    // 设置线程组
    // action: {
    //   type: SET_PROCESS_PTY
    //   path: 'app-web',
    //   pty: UnixTerminal,
    // }
    case actionTypes.SET_PROCESS_PTY:
      const { path, pty } = action;
      if (!state.groups[path]) {
        state.groups[path] = [];
      }
      state.groups[path].push({ pty, status: 'FREE' });
      return state;

    // 运行命令
    // action: {
    //   path: 'app-web',
    //   key: command.key,
    //   command: commandItem.command,
    //   callback: callback()
    // }
    case actionTypes.RUN_COMMAND:
      if (!action.command) {
        action.callback('FREE');
        return state;
      }
      let isAllRunning = true;
      for (const process of state.groups[action.path]) {
        if (process.status === 'FREE') {
          isAllRunning = false;
          process.status = action.key;
          process.pty.write(Buffer.from(action.command));
          process.pty.write(new Buffer([0x0d]));
          break;
        }
      }
      if (isAllRunning) {
        ipcRenderer.send('open-error-by-process');
        action.callback('FREE');
      } else {
        action.callback('RUNNING');
      }
      return state;

    // 停止命令
    // action: {
    //   path: 'app-web',
    //   key: command.key,
    //   callback: callback(),
    // }
    case actionTypes.STOP_COMMAND:
      for (const process of state.groups[action.path]) {
        if (process.status === action.key) {
          process.status = 'FREE';
          process.pty.write(new Buffer([0x03]));
          process.pty.write(Buffer.from('clear'));
          process.pty.write(new Buffer([0x0d]));
          break;
        }
      }
      action.callback('FREE');
      return state;

    default:
      return state;
  }
}
