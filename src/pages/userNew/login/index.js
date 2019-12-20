import React, { Component } from 'react';
import {Tabs, Alert, Form} from 'antd';
import styles from './styles/style.less'

import {getWrapFormFunc} from "./styles/commonFormProps";
import {getAccountLoginContent} from "./bussinessCards/AccountLoginContent";
import {getMobileLoginContent} from "./bussinessCards/MobileLoginContent";
import {getOtherContent} from "./bussinessCards/OtherContent";
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
              {getAccountLoginContent({commonProps,styles})}
            </TabPane>
            <TabPane
              key="2"
              tab={ '手机号登录'}
            >
              {getMobileLoginContent({commonProps,styles})}
            </TabPane>
          </Tabs>
          {getOtherContent({commonProps,styles})}
        </div>
      )
    }
}
export default Form.create()(Login);
