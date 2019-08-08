import { envToObject } from '@/util/commandParse';

const env = {
  state: {
    currentEnv: {},
    envGroupList: [
      {
        title: '19.0',
        _id: +new Date(),
        env: [
          { key: 'IP', value: '19.0', _id: +new Date() },
        ],
      },
    ],
  },
  mutations: {
    SET_CURRENT_ENV(state, _id) {
      for (let i = 0; i < state.envGroupList.length; i += 1) {
        if (state.envGroupList[i]._id === _id) {
          state.currentEnv = JSON.parse(JSON.stringify(state.envGroupList[i]));
          state.currentEnv.env = envToObject(state.currentEnv.env);
          break;
        }
      }
    },
    NEW_ENV_GROUP(state, newEnvGroup) {
      newEnvGroup._id = +new Date();
      state.envGroupList.push(newEnvGroup);
    },
    UPDATE_ENV_GROUP(state, newEnvGroup) {
      for (let i = 0; i < state.envGroupList.length; i += 1) {
        if (state.envGroupList[i]._id === newEnvGroup._id) {
          state.envGroupList[i] = newEnvGroup;
          break;
        }
      }
    },
    REMOVE_ENV_GROUP(state, envGroup) {
      for (let i = 0; i < state.envGroupList.length; i += 1) {
        if (state.envGroupList[i]._id === envGroup._id) {
          state.envGroupList.splice(i, 1);
          break;
        }
      }
    },
  },
};

export default env;
