const getters = {
  commands: state => state.commands.commands,
  defaultShell: state => state.setting.defaultShell,
  workspacePath: state => state.setting.workspacePath,
  termsPath: state => state.termsPath.path,
  currentEnv: state => state.env.currentEnv,
  envList: state => state.env.envGroupList,
};

export default getters;
