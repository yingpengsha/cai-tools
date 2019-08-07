import processStore from '../../process';
import * as processAction from '../../process/actionTypes';

const commands = {
  state: {
    commands: [],
  },
  mutations: {
    INIT_COMMANDS(state, pathList) {
      state.commands = pathList.reduce((target, path) => {
        target.push(
          {
            path, command: null, key: `${path}-1`, status: 'FREE',
          },
          {
            path, command: null, key: `${path}-2`, status: 'FREE',
          },
        );
        return target;
      }, []);
    },
    YAML_UPDATE_COMMANDS(state, YAMLData) {
      state.commands.forEach((command) => {
        if (YAMLData[command.path].length) {
          command.command = YAMLData[command.path][0];
          YAMLData[command.path].shift();
        }
      });
    },
    UPDATE_COMMANDS(state, commandsData) {
      commandsData.forEach((value, index) => {
        state.commands[index].command = value.command;
      });
    },
    CREATE_PROCESS(state, { path, pty }) {
      processStore.dispatch({
        type: processAction.SET_PROCESS_PTY,
        path,
        pty,
      });
    },
    INIT_PROCESS(state) {
      state.commandsLoading = 0;
      state.termsLoading = 0;
      processStore.dispatch({
        type: processAction.SET_PROCESS_PATH_LIST,
        pathList: this.state.termsPath.path,
      });
    },
    RUN_COMMAND(state, { commandItem, callback }) {
      processStore.dispatch({
        type: processAction.RUN_COMMAND,
        key: commandItem.key,
        path: commandItem.path,
        command: commandItem.command,
        callback,
      });
    },
    STOP_COMMAND(state, { commandItem, callback }) {
      processStore.dispatch({
        type: processAction.STOP_COMMAND,
        key: commandItem.key,
        path: commandItem.path,
        callback,
      });
    },
  },
  actions: {
    setCommands({ commit }, pathList) {
      commit('INIT_COMMANDS', pathList);
      commit('SET_TERMS', pathList);
      processStore.dispatch({
        type: processAction.SET_PROCESS_PATH_LIST,
        pathList,
      });
    },
  },
};

export default commands;
