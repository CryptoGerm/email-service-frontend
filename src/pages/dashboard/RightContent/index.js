import React, { Component } from 'react';
import { Menu, Dropdown, Avatar } from 'antd';
import { connect } from 'react-redux';

import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import createStore from '../../../state/store';

import { updateGlobalLogout } from '../../../state/reducers/App';

const { persistStoreConfig } = createStore();

class RightContent extends Component {
  handleLogout = () => {
    const { onLogout } = this.props;
    window.localStorage.removeItem('token');
    onLogout();
    persistStoreConfig.purge();
  };

  render() {
    const logoutDropDown = (
      <Menu onClick={this.handleLogout}>
        <Menu.Item key="logout" itemIcon={<LogoutOutlined />}>
          Logout
        </Menu.Item>
      </Menu>
    );
    return (
      <div>
        <Dropdown
          overlay={logoutDropDown}
          placement="bottomCenter"
          trigger="hover"
        >
          <Avatar icon={<UserOutlined />} />
        </Dropdown>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch(updateGlobalLogout()),
});

export default connect(null, mapDispatchToProps)(RightContent);
