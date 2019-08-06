

export default function createProcessStore(reducer, preloadedState) {
  const currentReducer = reducer;
  let currentState = preloadedState;

  function getStateByKey(...args) {
    let target = Object.assign({}, currentState);
    args.forEach((key) => {
      if (target.hasOwnProperty(key)) {
        target = target[key];
      }
    });
    return target;
  }

  function getState() {
    return currentState;
  }

  function dispatch(action) {
    currentState = currentReducer(currentState, action);
  }

  dispatch({ type: Symbol('INIT') });

  return {
    getStateByKey,
    getState,
    dispatch,
  };
}
