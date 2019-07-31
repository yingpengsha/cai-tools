const getters = {
  defaultShell: state => state.setting.defaultShell,
  workspacePath: state => state.setting.workspacePath,
  termsPath: state => state.terms.path,
};

export default getters;
