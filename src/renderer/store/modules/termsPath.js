const termsPath = {
  state: {
    path: [],
  },
  mutations: {
    SET_TERMS(state, list) {
      state.path = [];
      state.path = list;
    },
  },
};

export default termsPath;
