const getters = {
  commands: state => state.commands.commands,
  defaultShell: state => state.setting.defaultShell,
  workspacePath: state => state.setting.workspacePath,
  termsPath: state => state.termsPath.path,
};

export default getters;
