//其他展示组件
import {ButtonItem} from "../../../../components/StardFormItems/StardardFormItems";
import {Checkbox, Icon} from "antd";
import {Link} from "umi";

export  function getOtherContent({commonProps,styles}){
  return (
    <div>
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
