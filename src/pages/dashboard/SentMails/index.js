import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from '@reduxjs/toolkit';
import { injectReducer, injectSaga } from 'redux-injectors';
import { MailOutlined } from '@ant-design/icons';

import _pick from 'lodash/pick';

import { Layout, Row, Typography, Table, Button, Col } from 'antd';

import RightContent from '../RightContent';

import {
  name as mailName,
  actions as mailActions,
  reducer as mailReducer,
} from '../Reducer';
import mailSaga from '../Saga';
import {
  name as userName,
  reducer as userReducer,
} from '../../../state/reducers/User';
import userSaga from '../../../state/reducers/User/Saga';

const { Header, Content, Footer } = Layout;

class Dashboard extends Component {
  componentDidMount() {
    const { onGetlistSentMails, onGetlistScheduledSentMails } = this.props;
    onGetlistSentMails();
    onGetlistScheduledSentMails();
  }

  render() {
    const sentColumns = [
      {
        title: 'To',
        dataIndex: 'to',
        key: 'to',
      },
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
    ];
    const sentScheduledColumns = [
      {
        title: 'To',
        dataIndex: 'to',
        key: 'to',
      },
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
          <div style={{ padding: '30px 0' }}>
            <Row justify="space-between">
              <Col span={18}>
                <Typography.Title>Sent Mails</Typography.Title>
              </Col>
              <Col span={2}>
                <Link to="/dashboard">
                  <Button type="default">Scheduled Mails</Button>
                </Link>
              </Col>
              <Col span={2}>
                <Link to="/create-mail">
                  <Button type="primary">Create Mail</Button>
                </Link>
              </Col>
            </Row>
            <Table
              columns={sentColumns}
              rowKey="_id"
              dataSource={
                this.props.listSentMails && this.props.listSentMails.data
              }
            />
          </div>
          <div style={{ padding: '30px 0' }}>
            <Row justify="space-between">
              <Col span={24}>
                <Typography.Title>Sent Scheduled Mails</Typography.Title>
              </Col>
            </Row>
            <Table
              columns={sentScheduledColumns}
              rowKey="_id"
              dataSource={
                this.props.listSentScheduledMails &&
                this.props.listSentScheduledMails.data
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
  onGetlistSentMails: () => dispatch(mailActions.listSentMails()),
  onGetlistScheduledSentMails: () =>
    dispatch(mailActions.listSentScheduledMails()),
});

const mapStateToProps = state => ({
  ..._pick(state.Mail, ['listSentMails', 'listSentScheduledMails']),
  ..._pick(state.User, ['getUserDetails']),
});

export default compose(
  injectReducer({ key: mailName, reducer: mailReducer }),
  injectSaga({ key: mailName, saga: mailSaga }),
  injectReducer({ key: userName, reducer: userReducer }),
  injectSaga({ key: userName, saga: userSaga }),
)(connect(mapStateToProps, mapDispatchToProps)(Dashboard));
