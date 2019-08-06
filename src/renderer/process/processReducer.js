/* eslint-disable max-len */
import { ipcRenderer } from 'electron';
import * as actionTypes from './actionTypes';

const initState = {
  groups: {
    one: {
      __status__: 'FREE',
    },
    two: {
      __status__: 'FREE',
    },
  },
};

export default function reducer(state = initState, action) {
  const { type } = action;
  const { groups } = state;
  switch (type) {
    case actionTypes.SET_PROCESS_PATH_LIST:
      const { pathList } = action;
      const groupsKeys = Object.keys(groups);
      groupsKeys.forEach((key) => {
        groups[key] = Object.assign({});
        pathList.forEach((path) => {
          groups[key][path] = null;
        });
      });
      state.groups = groups;
      return state;

    // 设置线程组
    case actionTypes.SET_PROCESS_PTY:
      const { key, path, pty } = action;
      state.groups[key][path] = pty;
      return state;

    // 运行命令集
    case actionTypes.RUN_COMMANDS:
      let isAllRunning = true;
      for (const key in groups) {
        if (groups.hasOwnProperty(key)) {
          if (groups[key].__status__ === 'FREE') {
            isAllRunning = false;
            groups[key].__status__ = action.commands.key;
            action.commands.detail.forEach((item) => {
              groups[key][item.term].write(item.command);
              groups[key][item.term].write(new Buffer([0x0d]));
            });
            break;
          }
        }
      }
      if (isAllRunning) {
        ipcRenderer.send('open-error-by-process');
        action.callback('free');
      } else {
        action.callback('running');
      }
      return state;

    // 停止命令集
    case actionTypes.STOP_COMMANDS:
      for (const key in groups) {
        if (groups.hasOwnProperty(key)) {
          if (groups[key].__status__ === action.commands.key) {
            groups[key].__status__ = 'FREE';
            action.commands.detail.forEach((item) => {
              groups[key][item.term].write(new Buffer([0x03]));
              groups[key][item.term].write(Buffer.from('clear'));
              groups[key][item.term].write(new Buffer([0x0d]));
            });
            break;
          }
        }
      }
      action.callback('free');
      return state;

    default:
      return state;
  }
}
