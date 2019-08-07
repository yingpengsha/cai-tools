/* eslint-disable no-console */

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
    if (process.env.NODE_ENV === 'development') {
      console.log('Before state:', currentState);
      console.log('Current action:', action);

      currentState = currentReducer(currentState, action);

      console.log('Current State:', currentState);
    } else {
      currentState = currentReducer(currentState, action);
    }
  }

  dispatch({ type: Symbol('INIT') });

  return {
    getStateByKey,
    getState,
    dispatch,
  };
}
