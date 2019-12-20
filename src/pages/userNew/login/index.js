import React, { Component } from 'react';
import {Tabs, Alert, Form} from 'antd';
import styles from './styles/style.less'
import { connect } from 'dva';
import {getWrapFormFunc} from "./styles/commonFormProps";
import {getAccountLoginContent} from "./bussinessCards/AccountLoginContent";
import {getMobileLoginContent} from "./bussinessCards/MobileLoginContent";
import {getOtherContent} from "./bussinessCards/OtherContent";

const { TabPane } = Tabs;
@connect(({loginStore})=>({
  loginStore,
}))
class Login extends Component {
    renderMessage=(content)=>{
      return <Alert
        style={{
          marginBottom: 24,
        }}
        message={content}
        type="error"
        showIcon
      />
    };
    onSwitch=(key)=>{
      const { dispatch } = this.props;
      dispatch({
        type: 'loginStore/changeLoginType',
        payload: { loginType:key},
      });
    };
    //密码按enter键执行登录
    onPressEnter=()=>{
         console.log("fsdafsdaf")
    };
    //获得验证码
    onGetCaptcha=()=>{

    };
    render(){
      const {loginStore } = this.props;
      const commonProps = getWrapFormFunc({type:"LoginNormalCommonProps",form:this.props.form});
      let renderMessage = this.renderMessage("默认");
      //整理所有的传给木偶组件的属性，用到可取
      let contentProps = {
        commonProps,
        styles,
        onPressEnter:this.onPressEnter,
        onGetCaptcha:this.onGetCaptcha,
      };
      return (
        <div className={styles.main}>
          {renderMessage}
          <Tabs
            animated={false}
            className={styles.tabs}
            activeKey={loginStore.loginType}
            onChange={this.onSwitch}
          >
            <TabPane
              key="account"
              tab={'账户密码登录'}
            >
              {getAccountLoginContent(contentProps)}
            </TabPane>
            <TabPane
              key="mobile"
              tab={ '手机号登录'}
            >
              {getMobileLoginContent(contentProps)}
            </TabPane>
          </Tabs>
          {getOtherContent(contentProps)}
        </div>
      )
    }
}
export default Form.create()(Login);
