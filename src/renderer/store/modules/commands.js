const commands = {
  state: {
    commandsList: [],
  },
  mutations: {
    NEW_COMMANDS(state, commands) {
      delete commands.status;
      commands.key = +new Date();
      state.commandsList.push(commands);
    },
    REMOVE_COMMANDS(state, index) {
      state.commandsList.splice(index, 1);
    },
    UPDATE_COMMANDS(state, { index, commands }) {
      state.commandsList[index] = commands;
    },
  },
};

export default commands;
