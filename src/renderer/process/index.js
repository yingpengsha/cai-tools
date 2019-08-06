import createStore from './createStore';
import processReducer from './processReducer';

const processStore = createStore(processReducer);

export default processStore;
