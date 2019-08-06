const getters = {
  commandsList: state => state.commands.commandsList,
  defaultShell: state => state.setting.defaultShell,
  workspacePath: state => state.setting.workspacePath,
  termsPath: state => state.terms.path,
  process: state => state.process.groups,
};

export default getters;
