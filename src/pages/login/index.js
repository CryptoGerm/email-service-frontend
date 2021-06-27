import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from '@reduxjs/toolkit';
import { injectReducer, injectSaga } from 'redux-injectors';
import { Form, Input, Button, Layout, Row, Col } from 'antd';
import { GoogleLogin } from 'react-google-login';

import _pick from 'lodash/pick';

import {
  name as loginName,
  actions as loginActions,
  reducer as loginReducer,
} from './Reducer';
import loginSaga from './Saga';

const { Content } = Layout;

class LoginPage extends Component {
  onFinish = values => {
    const { onLoginSubmit } = this.props;
    onLoginSubmit(values);
  };

  responseGoogle = data => {
    const { onLoginGoogleSubmit } = this.props;
    onLoginGoogleSubmit(data);
  };

  render() {
    return (
      <Layout style={{ height: '100vh' }}>
        <Content>
          <Row justify="center">
            <Form name="login" onFinish={this.onFinish}>
              <Col span={24}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your email!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your password!',
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                <Col span={24}>
                  <Row justify="space-between">
                    <Col span={12}>
                      <Form.Item>
                        <Button type="primary" htmlType="submit">
                          Submit
                        </Button>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <GoogleLogin
                        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                        buttonText="Login"
                        onSuccess={this.responseGoogle}
                        onFailure={this.responseGoogle}
                        cookiePolicy="single_host_origin"
                      />
                    </Col>
                  </Row>
                </Col>
              </Col>
            </Form>
          </Row>
        </Content>
      </Layout>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onLoginSubmit: data => dispatch(loginActions.login(data)),
  onLoginGoogleSubmit: data => dispatch(loginActions.loginGoogle(data)),
});

const mapStateToProps = state => ({
  ..._pick(state.Login, ['login', 'loginGoogle']),
});

export default compose(
  injectReducer({ key: loginName, reducer: loginReducer }),
  injectSaga({ key: loginName, saga: loginSaga }),
)(connect(mapStateToProps, mapDispatchToProps)(LoginPage));
