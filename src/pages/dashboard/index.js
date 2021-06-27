import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from '@reduxjs/toolkit';
import { injectReducer, injectSaga } from 'redux-injectors';
import { Layout, Row, Typography, Table, Button, Col } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import cronstrue from 'cronstrue';

import _pick from 'lodash/pick';

import RightContent from './RightContent';

import {
  name as mailName,
  actions as mailActions,
  reducer as mailReducer,
} from './Reducer';
import mailSaga from './Saga';
import {
  name as userName,
  actions as userActions,
  reducer as userReducer,
} from '../../state/reducers/User';
import userSaga from '../../state/reducers/User/Saga';

const { Header, Content, Footer } = Layout;

class Dashboard extends Component {
  componentDidMount() {
    const { onGetlistScheduledMails, onGetUserDetails } = this.props;
    onGetlistScheduledMails();
    onGetUserDetails();
  }

  render() {
    const columns = [
      {
        title: 'To',
        dataIndex: 'to',
        key: 'to',
      },
      // {
      //   title: 'From',
      //   dataIndex: 'from',
      //   key: 'from',
      // },
      {
        title: 'CC',
        dataIndex: 'cc',
        key: 'cc',
      },
      {
        title: 'Subject',
        dataIndex: 'subject',
        key: 'subject',
      },
      {
        title: 'Mail body',
        dataIndex: 'mailBody',
        key: 'mailBody',
      },
      {
        title: 'Scheduled Time',
        dataIndex: 'schedule',
        key: 'schedule',
        render: text => cronstrue.toString(text),
      },
    ];

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
          <div>
            <Row justify="space-between">
              <Col span={20}>
                <Typography.Title>Scheduled Mails</Typography.Title>
              </Col>
              <Col span={2}>
                <Link to="/sent-mails">
                  <Button type="default">Sent Mails</Button>
                </Link>
              </Col>
              <Col span={2}>
                <Link to="/create-mail">
                  <Button type="primary">Create Mail</Button>
                </Link>
              </Col>
            </Row>
            <Table
              columns={columns}
              rowKey="_id"
              dataSource={
                this.props.listScheduledMails &&
                this.props.listScheduledMails.data
              }
            />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}> Stutis Mailooooo</Footer>
      </Layout>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onGetlistScheduledMails: () => dispatch(mailActions.listScheduledMails()),
  onGetUserDetails: () => dispatch(userActions.getUserDetails()),
});

const mapStateToProps = state => ({
  ..._pick(state.Mail, ['listScheduledMails']),
  ..._pick(state.User, ['getUserDetails']),
});

export default compose(
  injectReducer({ key: mailName, reducer: mailReducer }),
  injectSaga({ key: mailName, saga: mailSaga }),
  injectReducer({ key: userName, reducer: userReducer }),
  injectSaga({ key: userName, saga: userSaga }),
)(connect(mapStateToProps, mapDispatchToProps)(Dashboard));
