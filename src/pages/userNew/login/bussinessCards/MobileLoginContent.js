//手机登录木偶组件

import {ButtonItem, InputItem} from "../../../../components/StardFormItems/StardardFormItems";
import {Icon} from "antd";


export  function getMobileLoginContent({commonProps,styles,onGetCaptcha,count}){
  if(count){
     count = count+"秒";
  }
  //验证码左边布局
  const showLeftFormLayout = {span:16};
  const shortLeftProps = Object.assign({},commonProps,showLeftFormLayout);
  //验证码右边布局
  const showRightFormLayout ={span:8};
  const shortRightProps = Object.assign({},commonProps,showRightFormLayout);
  return (
    <div>
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
        text={count||"获取验证码"}
        onClick={onGetCaptcha}
        disabled={!!count}
      />
    </div>
  )
}
