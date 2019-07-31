import defaultShell from 'default-shell';

const setting = {
  state: {
    defaultShell,
    workspacePath: '',
  },
  mutations: {
    SET_SHELL(state, shell) {
      state.defaultShell = shell;
    },
    SET_WORKSPACE_PATH(state, path) {
      state.workspacePath = path;
    },
  },
};

export default setting;
