import { Alert, Checkbox, Icon } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React, { Component } from 'react';
import Link from 'umi/link';
import { connect } from 'dva';
import LoginComponents from './components/Login';
import styles from './style.less';

const { Tab, UserName, Password, Mobile, Captcha, Submit } = LoginComponents;

@connect(({ userAndlogin, loading }) => ({
  userAndlogin,
  submitting: loading.effects['userAndlogin/login'],
}))
class Login extends Component {
  loginForm = undefined;

  state = {
    type: 'account',
    autoLogin: true,
  };

  changeAutoLogin = e => {
    this.setState({
      autoLogin: e.target.checked,
    });
  };

  handleSubmit = (err, values) => {
    const { type } = this.state;

    if (!err) {
      const { dispatch } = this.props;
      dispatch({
        type: 'userAndlogin/login',
        payload: { ...values, type },
      });
    }
  };

  onTabChange = type => {
    this.setState({
      type,
    });
  };

  onGetCaptcha = () =>
    new Promise((resolve, reject) => {
      if (!this.loginForm) {
        return;
      }

      this.loginForm.validateFields(['mobile'], {}, (err, values) => {
        if (err) {
          reject(err);
        } else {
          const { dispatch } = this.props;
          dispatch({
            type: 'userAndlogin/getCaptcha',
            payload: values.mobile,
          })
            .then(resolve)
            .catch(reject);
        }
      });
    });

  renderMessage = content => (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );

  render() {
    const { userAndlogin, submitting } = this.props;
    const { status, type: loginType } = userAndlogin;
    const { type, autoLogin } = this.state;
    return (
      <div className={styles.main}>
        <LoginComponents
          defaultActiveKey={type}
          onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
          ref={form => {
            this.loginForm = form;
          }}
        >
          <Tab
            key="account"
            tab={formatMessage({
              id: 'userandlogin.login.tab-login-credentials', desc: '账户密码登录',
            })}
          >
            {status === 'error' &&
              loginType === 'account' &&
              !submitting &&
              this.renderMessage(
                formatMessage({
                  id: 'userandlogin.login.message-invalid-credentials', desc: '账户或密码错误（admin/ant.design）',
                }),
              )}
            <UserName
              name="userName"
              placeholder={`${formatMessage({
                id: 'userandlogin.login.userName', desc: '用户名',
              })}: admin or user`}
              rules={ [
                {
                  required: true,
                  message: formatMessage({
                    id: 'userandlogin.userName.required', desc: '请输入用户名!',
                  }),
                },
              ]}
            />
            <Password
              name="password"
              placeholder={`${formatMessage({
                id: 'userandlogin.login.password', desc: '密码!',
              })}: ant.design`}
              rules={[
                {
                  required: true,
                  message: formatMessage({
                    id: 'userandlogin.password.required', desc: '请输入密码!',
                  }),
                },
              ]}
              onPressEnter={e => {
                e.preventDefault();
                this.loginForm.validateFields(this.handleSubmit);
              }}
            />
          </Tab>
          <Tab
            key="mobile"
            tab={formatMessage({
              id: 'userandlogin.login.tab-login-mobile', desc: '手机号登录',
            })}
          >
            {status === 'error' &&
              loginType === 'mobile' &&
              !submitting &&
              this.renderMessage(
                formatMessage({
                  id: 'userandlogin.login.message-invalid-verification-code', desc: '验证码错误',
                }),
              )}
            <Mobile
              name="mobile"
              placeholder={formatMessage({
                id: 'userandlogin.phone-number.placeholder', desc: '手机号',
              })}
              rules={[
                {
                  required: true,
                  message: formatMessage({
                    id: 'userandlogin.phone-number.required', desc: '请输入手机号！',
                  }),
                },
                {
                  pattern: /^1\d{10}$/,
                  message: formatMessage({
                    id: 'userandlogin.phone-number.wrong-format', desc: '手机号格式错误！',
                  }),
                },
              ]}
            />
            <Captcha
              name="captcha"
              placeholder={formatMessage({
                id: 'userandlogin.verification-code.placeholder', desc: '验证码',
              })}
              countDown={120}
              onGetCaptcha={this.onGetCaptcha}
              getCaptchaButtonText={formatMessage({
                id: 'userandlogin.form.get-captcha', desc: '获取验证码',
              })}
              getCaptchaSecondText={formatMessage({
                id: 'userandlogin.captcha.second', desc: '秒',
              })}
              rules={[
                {
                  required: true,
                  message: formatMessage({
                    id: 'userandlogin.verification-code.required', desc: '请输入验证码！',
                  }),
                },
              ]}
            />
          </Tab>
          <div>
            <Checkbox checked={autoLogin} onChange={this.changeAutoLogin}>
              <FormattedMessage id="userandlogin.login.remember-me" desc="自动登录"/>
            </Checkbox>
            <a
              style={{
                float: 'right',
              }}
              href=""
            >
              <FormattedMessage id="userandlogin.login.forgot-password" desc="忘记密码"/>
            </a>
          </div>
          <Submit loading={submitting}>
            <FormattedMessage id="userandlogin.login.login" desc="登录"/>
          </Submit>
          <div className={styles.other}>
            <FormattedMessage id="userandlogin.login.sign-in-with" desc="登录"/>
            <Icon type="alipay-circle" className={styles.icon} theme="outlined" />
            <Icon type="taobao-circle" className={styles.icon} theme="outlined" />
            <Icon type="weibo-circle" className={styles.icon} theme="outlined" />
            <Link className={styles.register} to="/user/register">
              <FormattedMessage id="userandlogin.login.signup" desc="注册账户"/>
            </Link>
          </div>
        </LoginComponents>
      </div>
    );
  }
}

export default Login;
