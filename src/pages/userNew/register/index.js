import {Button, Form} from "antd";
import React, { Component } from 'react';
import {getRegisterContent} from "./bussinessCards/getRegisterContent";
import {getWrapFormFunc} from "../login/styles/commonFormProps";
import styles from "./styles/style.less"
import Link from "umi/link";
class Register extends Component {
  onGetCaptcha = () => {
    let count = 59;
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
  render(){
    const commonProps = getWrapFormFunc({type:"LoginNormalCommonProps",form:this.props.form});
    const {count} = this.state||{};
    let contentProps = {
      commonProps,
      styles,
      onGetCaptcha:this.onGetCaptcha,
      count,
    };
     return <div className={styles.main}>
         {getRegisterContent(contentProps)}
         <div>
           <Button
             size="large"
             // loading={submitting}
             className={styles.submit}
             type="primary"
             htmlType="submit"
           >
             注册
           </Button>
           <Link to="/userNew/login" className={styles.login}>
             使用现有账号登录
           </Link>
         </div>
       </div>
  }
}

export default Form.create()(Register);
