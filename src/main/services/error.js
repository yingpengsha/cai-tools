const { ipcMain, dialog } = require('electron');

const error = {
  register: () => {
    ipcMain.on('open-error-by-process', () => {
      dialog.showErrorBox('已经没有空余进程组', '请停止已有进程组再重试.');
    });
  },
};

export default error;
