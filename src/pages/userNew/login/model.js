
const Model = {
  namespace: 'loginStore',
  state: {
    loginType:"account",
  },
  effects: {

  },
  reducers: {
    changeLoginType(state,{payload}){
      return { ...state, loginType: payload.loginType };
    }
  },
};
export default Model;
