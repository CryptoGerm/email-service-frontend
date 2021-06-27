import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from '@reduxjs/toolkit';
import { injectReducer, injectSaga } from 'redux-injectors';
import _pick from 'lodash/pick';

import { Form, Input, Button, Layout, Row, Col, message } from 'antd';

import {
  name as registerName,
  actions as registerActions,
  reducer as registerReducer,
} from './Reducer';
import registerSaga from './Saga';

const { Content } = Layout;

class RegisterPage extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.register !== prevProps.register) {
      if (this.props.register.status === 'ok') {
        message.info('Registration Successful!');
        this.props.history.push('/');
      }
      if (this.props.register.status === 'error') {
        message.error('Registration UnSuccessful!');
      }
    }
  }

  onFinish = values => {
    const { onRegisterSubmit } = this.props;
    delete values.confirm;
    onRegisterSubmit(values);
  };

  render() {
    return (
      <Layout style={{ height: '100vh' }}>
        <Content>
          <Row justify="center">
            <Form name="register" onFinish={this.onFinish}>
              <Col span={24}>
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your name!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
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
                <Form.Item
                  name="confirm"
                  label="Confirm Password"
                  dependencies={['password']}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }

                        return Promise.reject(
                          new Error(
                            'The two passwords that you entered do not match!',
                          ),
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Col>
            </Form>
          </Row>
        </Content>
      </Layout>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onRegisterSubmit: data => dispatch(registerActions.register(data)),
});

const mapStateToProps = state => ({
  ..._pick(state.Register, ['register']),
});

export default compose(
  injectReducer({ key: registerName, reducer: registerReducer }),
  injectSaga({ key: registerName, saga: registerSaga }),
)(connect(mapStateToProps, mapDispatchToProps)(RegisterPage));
