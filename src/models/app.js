function delay(timeout){
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}
export default {

  namespace: 'appState',

  state: {
    number:0,
    loading:false
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
    *add(action, { call, put }) {
      yield put ({ type: 'addLoading' })
      yield call(delay, 1000);
      yield put ({ type: 'addSave' })
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
    addLoading(state){
      return {
        ...state,loading:true
      }
    },
    addSave(state) {
      const newCurrent = state.number + 1;
      return { ...state,
        number: newCurrent,
        loading: false
      };
    },
  },

};
