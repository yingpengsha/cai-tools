const { ipcMain, dialog } = require('electron');

const folder = {
  register: () => {
    ipcMain.on('open-workspace-dir', (event) => {
      dialog.showOpenDialog({
        properties: ['openDirectory'],
      }, (dir) => {
        if (dir) {
          event.sender.send('selected-workspace-dir', dir);
        }
      });
    });
  },
};

export default folder;
