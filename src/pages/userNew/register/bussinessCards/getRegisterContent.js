//注册明细组件
import {Checkbox, Icon} from "antd";
import {Link} from "umi";
import {getWrapFormFunc} from "../../login/styles/commonFormProps";
import {ButtonItem, InputItem, SelectItem} from "../../../../components/StardFormItems/StardardFormItems";
import React, { Component } from 'react';
import {Input} from "antd";
const InputGroup = Input.Group;
export  function getRegisterContent({commonProps,styles,onGetCaptcha,count}) {
  //手机号前缀布局
  const showLeftFormLayout = {span:5};
  const shortLeftProps = Object.assign({},commonProps,showLeftFormLayout);
  //手机号布局
  const showRightFormLayout ={span:19};
  const shortRightProps = Object.assign({},commonProps,showRightFormLayout);

  //验证码左边布局
  const captchaShowLeftFormLayout = {span:16};
  const captchaShortLeftProps = Object.assign({},commonProps,captchaShowLeftFormLayout);
  //验证码右边布局
  const captchaShowRightFormLayout ={span:8};
  const captchaShortRightProps = Object.assign({},commonProps,captchaShowRightFormLayout);
  return (
    <div>
      <h3>注册</h3>
      <InputItem
        {...commonProps}
        size={"large"}
        code={"email"}
        placeholder={"邮箱"}
        rules={[{required: true, message: '请输入邮箱!'}]}
      />
      <InputItem
        {...commonProps}
        size={"large"}
        code={"password"}
        placeholder={"至少六位密码，区分大小写"}
        rules={[{required: true, message: '请输入邮箱!'}]}
        inputType="password"
      />
      <InputItem
        {...commonProps}
        size={"large"}
        code={"rePassword"}
        placeholder={"确认密码"}
        rules={[{required: true, message: '请输入确认密码!'}]}
        inputType="password"
      />
      <SelectItem {...shortLeftProps}
                  size={"large"}
                  code={"mobilePrefix"}
                  options={[{value:"86",text:"+86"},{value:"87",text:"+87"}]}
                  initialvalue={"86"}
                  allowClear={false}
                  className={styles.prefix}
      />
      <InputItem
        {...shortRightProps}
        size={"large"}
        code={"mobile"}
        placeholder={"手机号"}
        className={styles.mobile}
        rules={[{required: true, message: '请输入手机号!'}]}
      />
      <InputItem
        {...captchaShortLeftProps}
        size={"large"}
        code={"captcha"}
        placeholder={"验证码"}
        rules={[{required: true, message: '请输入验证码!'}]}
        prefix={<Icon type="mail" className={styles.prefixIcon} />}
      />
      <ButtonItem
        {...captchaShortRightProps}
        size={"large"}
        text={count||"获取验证码"}
        onClick={onGetCaptcha}
        disabled={!!count}
      />
    </div>
  )
}
