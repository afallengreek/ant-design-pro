import React, { Component } from 'react';
import {Tabs, Form ,message} from 'antd';
import styles from './styles/style.less'
import { connect } from 'dva';
import {getWrapFormFunc} from "./styles/commonFormProps";
import {getAccountLoginContent} from "./bussinessCards/AccountLoginContent";
import {getMobileLoginContent} from "./bussinessCards/MobileLoginContent";
import {getOtherContent} from "./bussinessCards/OtherContent";
import {loginTypeFields} from "./constData/constData";
import {getRenderMessage} from "./utils/utils";

const { TabPane } = Tabs;
@connect(({loginStore})=>({
  loginStore,
  captchaStatus:loginStore.captchaStatus,
  captchaResponse:loginStore.captchaResponse,
  loginStatus:loginStore.loginStatus,
}))
class Login extends Component {
    onSwitch=(key)=>{
      const { dispatch } = this.props;
      dispatch({
        type: 'loginStore/changeLoginType',
        payload: { loginType:key},
      });
    };
    //密码按enter键执行登录
    submitToLogin=(e)=>{
        e.preventDefault();
        const {loginStore } = this.props;
        const {loginType } = loginStore;
        const needValidateFields = loginTypeFields[loginType];
        this.props.form.validateFields(needValidateFields,{
          force: true,
        },this.doSubmit);
    };
    //获得验证码
    onGetCaptcha=()=>{
          this.props.form.validateFields(["mobile"],{},(err,values)=>{
            if(err){
              message.error("请先填写手机号码");
            }else{
              const {dispatch}= this.props;
              dispatch({
                type: 'loginStore/getCaptcha',
                payload: values.mobile,
              }).then(()=>{
                this.runGetCaptchaCountDown();
              }).catch((err)=>{
              })
            }
          });
    };
    runGetCaptchaCountDown = () => {
      let count = 60;
      this.setState({
        count,
      });
      this.interval = window.setInterval(() => {
        count -= 1;
        this.setState({
          count,
        });

        if (count === 0) {
          clearInterval(this.interval);
        }
      }, 1000);
    };
    doSubmit=(err,values)=>{
       if(err){
         message.error("请将表单信息填写完整！")
       }else{
         const {loginStore} = this.props;
         const {loginType} = loginStore;
         const { dispatch } = this.props;
         dispatch({
           type: 'loginStore/login',
           payload: { ...values, type:loginType },
         });
       }
    };
   rememberAccount=(e)=>{
      this.setState({
        rememberAccount:e.target.checked,
      })
   };
    render(){
      const {loginStore,captchaStatus,captchaResponse,loginStatus} = this.props;
      const {count} = this.state||{};
      const commonProps = getWrapFormFunc({type:"LoginNormalCommonProps",form:this.props.form});
      let renderMessage = null;
      if(captchaStatus){
        renderMessage = getRenderMessage({content:captchaResponse,type:"success"});
      }else if(loginStatus === "error"){
        renderMessage = getRenderMessage({content:"密码或账号有误！",type:"error"});
      }
      //整理所有的传给木偶组件的属性，用到可取
      let contentProps = {
        commonProps,
        styles,
        onPressEnter:this.submitToLogin,
        onGetCaptcha:this.onGetCaptcha,
        count,
        rememberAccount:this.rememberAccount,
        handleSubmit:this.submitToLogin,
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
