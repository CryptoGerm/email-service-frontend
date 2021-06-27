import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from '@reduxjs/toolkit';
import { injectReducer, injectSaga } from 'redux-injectors';
import { Form, Input, Button, Layout, Row, Col, Typography } from 'antd';
import { GoogleLogin } from 'react-google-login';
import { Link } from 'react-router-dom';

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
        <Content style={{ background: '#fff' }}>
          <Row justify="center">
            <Col span={8} style={{ textAlign: 'center' }}>
              <Typography.Title>Stutis Mailooo</Typography.Title>
              <Typography.Title level={2}>Login</Typography.Title>
            </Col>
          </Row>
          <Row justify="center">
            <Col span={8}>
              <Form name="login" layout="vertical" onFinish={this.onFinish}>
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
                <Row style={{ padding: '10px 0' }}>
                  <Typography.Text>
                    Don&apos;t have an account?{' '}
                    <Link to="/register">Register</Link>
                  </Typography.Text>
                </Row>
                <Row justify="space-between" style={{ padding: '10px 0' }}>
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
                      cookiePolicy="single_host_origin"
                    />
                  </Col>
                </Row>
              </Form>
            </Col>
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
