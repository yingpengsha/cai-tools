const commands = {
  state: {
    commandsList: [],
  },
  mutations: {
    NEW_COMMANDS(state, commands) {
      delete commands.status;
      state.commandsList.push(commands);
    },
    REMOVE_COMMANDS(state, index) {
      state.commandsList.splice(index, 1);
    },
    UPDATE_COMMANDS(state, index, commands) {
      delete commands.status;
      state.commandsList[index] = commands;
    },
  },
};

export default commands;
