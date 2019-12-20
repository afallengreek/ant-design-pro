import React, { Component } from 'react';
import {Tabs, Alert, Form, Icon, Checkbox} from 'antd';
import styles from './styles/style.less'
import {ButtonItem, CheckboxItem, InputItem} from "../../../components/StardFormItems/StardardFormItems";
import {getWrapFormFunc} from "./styles/commonFormProps";
import {Link} from "umi";
const { TabPane } = Tabs;
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
    render(){
      const commonProps = getWrapFormFunc({type:"LoginNormalCommonProps",form:this.props.form});
      //验证码左边布局
      const showLeftFormLayout = {span:16};
      const shortLeftProps = Object.assign({},commonProps,showLeftFormLayout);
      //验证码右边布局
      const showRightFormLayout ={span:8};
      const shortRightProps = Object.assign({},commonProps,showRightFormLayout);
      let renderMessage = this.renderMessage("默认");
      return (
        <div className={styles.main}>
          {renderMessage}
          <Tabs
            animated={false}
            className={styles.tabs}
            // activeKey={type}
            defaultActiveKey={"1"}
            onChange={this.onSwitch}
          >
            <TabPane
              key="1"
              tab={'账户密码登录'}
            >
              <InputItem
                {...commonProps}
                size={"large"}
                code={"account"}
                placeholder={"用户名：admin or user"}
                rules={[{required: true, message: '请输入用户名!'}]}
                prefix={<Icon type="user" className={styles.prefixIcon} />}
              />
              <InputItem
                {...commonProps}
                size={"large"}
                code={"password"}
                placeholder={"密码：ant.design"}
                rules={[{required: true, message: '请输入用户名!'}]}
                prefix={<Icon type="lock" className={styles.prefixIcon} />}
              />
            </TabPane>
            <TabPane
              key="2"
              tab={ '手机号登录'}
            >
              <InputItem
                {...commonProps}
                size={"large"}
                code={"mobile"}
                placeholder={"手机号"}
                rules={[{required: true, message: '请输入手机号!'},
                  {pattern: /^1\d{10}$/, message: '手机号格式错误!',}]}
                prefix={<Icon type="mobile" className={styles.prefixIcon} />}
              />
              <InputItem
                {...shortLeftProps}
                size={"large"}
                code={"captcha"}
                placeholder={"captcha"}
                rules={[{required: true, message: '请输入验证码!'}]}
                prefix={<Icon type="mail" className={styles.prefixIcon} />}
              />
              <ButtonItem
                {...shortRightProps}
                size={"large"}
                text={"获取验证码"}
              />
            </TabPane>
          </Tabs>
          <div>
            <Checkbox>
              自动登录
            </Checkbox>
            <a href="" style={{float:"right"}}>
              忘记密码
            </a>
          </div>
          <ButtonItem
            {...commonProps}
            size={"large"}
            buttonType={"primary"}
            text={"登录"}
            className={styles.submit}
          />
          <div className={styles.other}>
            其他登录方式
            <Icon type="alipay-circle" className={styles.icon} theme="outlined" />
            <Icon type="taobao-circle" className={styles.icon} theme="outlined" />
            <Icon type="weibo-circle" className={styles.icon} theme="outlined" />
            <Link className={styles.register} to="/user/register">
              注册账户
            </Link>
          </div>
        </div>
      )
    }
}
export default Form.create()(Login);
