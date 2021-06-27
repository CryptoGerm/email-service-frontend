import React, { Component, createRef } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from '@reduxjs/toolkit';
import { injectReducer, injectSaga } from 'redux-injectors';
import _pick from 'lodash/pick';
import { MailOutlined } from '@ant-design/icons';
import ReactQuill from 'react-quill';

import {
  Form,
  Input,
  Button,
  Layout,
  Row,
  Col,
  Typography,
  message,
} from 'antd';
import RightContent from '../RightContent';
import SchedulerModal from '../Scheduler';

import {
  name as mailName,
  actions as mailActions,
  reducer as mailReducer,
} from '../Reducer';
import mailSaga from '../Saga';
import 'react-quill/dist/quill.snow.css';
const { Header, Content, Footer } = Layout;

class CreateMail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isScheduleOpen: false,
      schedule: undefined,
    };
    this.form = createRef();
  }

  componentDidUpdate(prevProps) {
    if (this.props.createMail !== prevProps.createMail) {
      if (this.props.createMail.status === 'ok') {
        message.success('Mail scheduled successful!');
        this.props.history.push('/dashboard');
      }
      if (this.props.createMail.status === 'error') {
        message.success('Mail scheduled failure!');
      }
    }
    if (this.props.sendMail !== prevProps.sendMail) {
      if (this.props.sendMail.status === 'ok') {
        message.success('Mail sent successful!');
        this.props.history.push('/sent-mails');
      }
      if (this.props.sendMail.status === 'error') {
        message.success('Mail send Failure!');
      }
    }
  }

  onSendNow = values => {
    const { onSendMailSubmit } = this.props;
    onSendMailSubmit(values);
  };

  handleSchedule = schedule => {
    this.setState({ schedule, isScheduleOpen: false });
    const { to, cc, subject, mailBody } = this.form.current.getFieldsValue();
    const { onCreateMailSubmit } = this.props;
    const data = { to, cc, subject, mailBody, schedule };
    onCreateMailSubmit(data);
  };

  render() {
    return (
      <Layout className="layout" style={{ height: '100vh' }}>
        <Header>
          <Row justify="space-between">
            <Col span={4}>
              <Link to="/dashboard" style={{ cursor: 'pointer' }}>
                <MailOutlined style={{ color: '#fff', padding: '0 10px' }} />
                <Typography.Text style={{ color: '#fff' }}>
                  Stutis Mailooooo
                </Typography.Text>
              </Link>
            </Col>

            <Col span={18} />
            <Col span={1}>
              <Typography.Text style={{ color: '#fff' }}>
                {this.props.getUserDetails.data &&
                  this.props.getUserDetails.data.name}
              </Typography.Text>
            </Col>
            <Col span={1}>
              <RightContent />
            </Col>
          </Row>
        </Header>
        <Content style={{ padding: '30px 50px' }}>
          <Row
            justify="space-between"
            style={{ background: '#fff', padding: '30px' }}
          >
            <Col span={24}>
              <Row>
                <Col span={22}>
                  <Typography.Title>Create Mail</Typography.Title>
                </Col>
                <Col span={2}>
                  <Link to="/dashboard">
                    <Button type="default">Scheduled Mails</Button>
                  </Link>
                </Col>
              </Row>
            </Col>
            <Col span={8}>
              <Form
                name="mail"
                layout="vertical"
                ref={this.form}
                onFinish={this.onSendNow}
              >
                <Form.Item
                  label="To"
                  name="to"
                  rules={[
                    {
                      required: true,
                      message: 'Please input To!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="CC"
                  name="cc"
                  rules={[
                    {
                      message: 'Please input cc!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Subject"
                  name="subject"
                  rules={[
                    {
                      required: true,
                      message: 'Please input subject!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item label="Body" name="mailBody" initialValue="">
                  <ReactQuill placeholder="Type a new message" />
                </Form.Item>
                <Row>
                  <Col span={5}>
                    <Form.Item>
                      <Button
                        type="default"
                        onClick={() =>
                          this.setState({
                            isScheduleOpen: true,
                          })
                        }
                      >
                        Schedule
                      </Button>
                    </Form.Item>
                  </Col>
                  <Col span={3}>
                    <Form.Item>
                      <Button type="primary" htmlType="submit">
                        Send Now
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Content>
        <SchedulerModal
          isScheduleOpen={this.state.isScheduleOpen}
          closeScheduler={() => this.setState({ isScheduleOpen: false })}
          receiveSchedule={schedule => this.handleSchedule(schedule)}
        />
        <Footer style={{ textAlign: 'center' }}> Stutis Mailooooo</Footer>
      </Layout>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onCreateMailSubmit: data => dispatch(mailActions.createMail(data)),
  onSendMailSubmit: data => dispatch(mailActions.sendMail(data)),
});

const mapStateToProps = state => ({
  ..._pick(state.Mail, ['createMail', 'sendMail']),
  ..._pick(state.User, ['getUserDetails']),
});

export default compose(
  injectReducer({ key: mailName, reducer: mailReducer }),
  injectSaga({ key: mailName, saga: mailSaga }),
)(connect(mapStateToProps, mapDispatchToProps)(CreateMail));
