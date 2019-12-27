import { fakeRegister } from './service';

const Model = {
  namespace: 'userAndRegister',
  state: {
    status:null,
  },
  effects: {
    *getCaptcha({ payload }, { call,put }) {
      const result = yield call(fakeRegister, payload);
    },
    *submit({ payload }, { call, put }) {
      const response = yield call(fakeRegister, payload);
      yield put({
        type: 'registerHandle',
        payload: response,
      });
    },
  },
  reducers: {
    registerHandle(state, { payload }) {
      return { ...state, status: payload.status };
    },
  },
};
export default Model;
