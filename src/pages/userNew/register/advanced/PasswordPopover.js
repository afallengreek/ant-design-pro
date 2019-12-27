import React, {Component} from 'react';
import {Popover,Progress} from "antd";
import styles from "../styles/passwordPopover.less"
const passwordProgressMap = {
  ok: 'success',
  pass: 'normal',
  poor: 'exception',
};
function getPasswordStatus (password) {
  const value = password;

  if (value && value.length > 9) {
    return 'ok';
  }

  if (value && value.length > 5) {
    return 'pass';
  }

  return 'poor';
}
function renderPasswordProgress ({password}){
  const value = password;
  const passwordStatus = getPasswordStatus(password);
  return value && value.length ? (
    <div className={styles[`progress-${passwordStatus}`]}>
      <Progress
        status={passwordProgressMap[passwordStatus]}
        className={styles.progress}
        strokeWidth={6}
        percent={value.length * 10 > 100 ? 100 : value.length * 10}
        showInfo={false}
      />
    </div>
  ) : null;
};

export function PasswordPopover(props) {
    const {password} = props;
    let visible = !!password;
    const passwordStatusMap = {
      ok: (
        <div className={styles.success}>
          强度：强
        </div>
      ),
      pass: (
        <div className={styles.warning}>
          强度：中
        </div>
      ),
      poor: (
        <div className={styles.error}>
          强度：太短
        </div>
      ),
    };
    const passwordStatus = getPasswordStatus(password);
    return (
      <Popover content={ <div
        className={styles.password}
      >
        {passwordStatusMap[passwordStatus]}
        {renderPasswordProgress({styles,password})}
        <div
          style={{
            marginTop: 10,
          }}
        >
          请至少输入 6 个字符。请不要使用容易被猜到的密码。
        </div>
      </div>
      }
       placement="right"
       overlayStyle={{width:"240px"}}
       visible={visible}
      >
        {props.children}
      </Popover>
    )
}
