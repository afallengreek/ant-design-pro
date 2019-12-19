import React, { Component } from 'react';
import { Tabs } from 'antd';
import styles from './style.less'
const { TabPane } = Tabs;
class Login extends Component {
    render(){
      return (
        <div className={styles.main}>
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
            </TabPane>
            <TabPane
              key="2"
              tab={ '账户密码登录'}
            >
            </TabPane>
          </Tabs>
        </div>
      )
    }
}
export default Login;
