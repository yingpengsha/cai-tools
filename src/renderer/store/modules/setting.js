import defaultShell from 'default-shell';

const setting = {
  state: {
    defaultShell,
  },
  mutations: {
    SET_SHELL(state, shell) {
      state.defaultShell = shell;
    },
  },
};

export default setting;
