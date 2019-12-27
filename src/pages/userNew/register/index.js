import {Button, Form,message} from "antd";
import React, { Component } from 'react';
import {getRegisterContent} from "./bussinessCards/getRegisterContent";
import {getWrapFormFunc} from "../login/styles/commonFormProps";
import styles from "./styles/style.less"
import Link from "umi/link";
import {connect} from "dva";
@connect(({userAndRegister,loading})=>({
    userAndRegister,
    submitting:loading.effects["userAndRegister/submit"]
}))
class Register extends Component {
  onGetCaptcha = () => {
    this.props.form.validateFields(["mobile"],{},(err,values)=>{
      if(err){
        message.error("请先填写手机号码");
      }else{
        const {dispatch}= this.props;
        dispatch({
          type: 'userAndRegister/getCaptcha',
          payload: values.mobile,
        }).then(()=>{
          this.runGetCaptchaCountDown();
        }).catch((err)=>{
        })
      }
    });
  };
  runGetCaptchaCountDown = () => {
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
  checkPassword =(rule, value, callback) =>{
    let confirm = this.props.form.getFieldValue("confirm");
    if(!value){
      callback("请填写密码！");
    }else if(value.length<6){
      callback("密码的长度必须大于六位！")
    }else if(confirm){
      this.props.form.validateFields(["confirm"],{force:true});
      callback();
    }else {
      callback();
    }
  };
  confirmCheck=(rule,value,callback)=>{
     let password = this.props.form.getFieldValue("password");
     if(value!==password&&value){
       callback("两次输入的密码不一致！")
     }else{
       callback();
     }
  };
  handleSubmit=()=>{
    const { dispatch } = this.props;
    this.props.form.validateFields({force:true},(err,values)=>{
      if (!err) {
        dispatch({
          type: 'userAndRegister/submit',
          payload: { ...values },
        });
      }
    });
  };
  render(){
    const commonProps = getWrapFormFunc({type:"LoginNormalCommonProps",form:this.props.form});
    const {count} = this.state||{};
    const {submitting} = this.props;
    let contentProps = {
      commonProps,
      styles,
      onGetCaptcha:this.onGetCaptcha,
      count,
      checkPassword:this.checkPassword,
      confirmCheck:this.confirmCheck,
    };
     return <div className={styles.main}>
         {getRegisterContent(contentProps)}
         <div>
           <Button
             size="large"
             loading={submitting}
             className={styles.submit}
             type="primary"
             onClick={this.handleSubmit}
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
