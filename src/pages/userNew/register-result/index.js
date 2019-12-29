import { Button, Result } from 'antd';
import Link from 'umi/link';
import React from 'react';
import styles from "./style.less"
const actions =(
  <div className={styles.actions}>
    <a href={""}>
     <Button type="primary" size="large">查看邮箱</Button>
    </a>
    <Link to={"/"}>
     <Button size="large">返回首页</Button>
    </Link>
  </div>
);
const RegisterResult =({location})=>{
  return <Result
    status="success"
    className={styles.registerResult}
    title={
      <div className={styles.title}>
        你的账户：{location.state ? location.state.account : 'AntDesign@example.com'} 注册成功
      </div>
    }
    subTitle={"激活邮件已发送到你的邮箱中，邮件有效期为24小时。请及时登录邮箱，点击邮件中的链接激活帐户。"}
    extra={actions}
  />
};
export default RegisterResult;
