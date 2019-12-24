import {fakeAccountLogin, getFakeCaptcha} from "../../user/login/service";
import {getPageQuery, setAuthority} from "../../user/login/utils/utils";
import {routerRedux} from "dva/router";

const Model = {
  namespace: 'loginStore',
  state: {
    loginType:"account",
    captchaStatus:false,
    captchaResponse:"",
    loginStatus:undefined,
  },
  effects: {
     *getCaptcha({ payload }, { call,put }) {
       const result = yield call(getFakeCaptcha, payload);
       yield put({
         type: 'showCaptcha',
         payload: result,
       });},
    *login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);
      console.log("fdsfasdf",response);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      }); // Login successfully
      if (response.status === 'ok') {
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;

        if (redirect) {
          const redirectUrlParams = new URL(redirect);

          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);

            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = redirect;
            return;
          }
        }

        yield put(routerRedux.replace(redirect || '/'));
      }
    }
  },
  reducers: {
    changeLoginType(state,{payload}){
      return { ...state, loginType: payload.loginType };
    },
    showCaptcha(state,{payload}){
      if(payload){
        payload = "验证码："+payload;
      }
      return { ...state,captchaStatus:true,captchaResponse:payload}
    },
    hideCaptcha(state,{payload}){
      return { ...state,captchaStatus:false,captchaResponse:""}
    },
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return { ...state, loginStatus: payload.status, type: payload.type };
    },

  },
};
export default Model;
