//账号登录木偶组件

import {InputItem} from "../../../../components/StardFormItems/StardardFormItems";
import {Icon} from "antd";

export  function getAccountLoginContent({commonProps,styles,onPressEnter}){
  return (
    <div>
      <InputItem
        {...commonProps}
        size={"large"}
        code={"userName"}
        placeholder={"用户名：admin or user"}
        rules={[{required: true, message: '请输入用户名!'}]}
        prefix={<Icon type="user" className={styles.prefixIcon} />}
      />
      <InputItem
        {...commonProps}
        size={"large"}
        code={"password"}
        placeholder={"密码：ant.design"}
        rules={[{required: true, message: '请输入密码!'}]}
        onPressEnter={(e)=>onPressEnter(e)}
        prefix={<Icon type="lock" className={styles.prefixIcon} />}
        inputType="password"
      />
    </div>
  )
}
