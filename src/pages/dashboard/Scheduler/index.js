import React, { Component } from 'react';
import { Modal } from 'antd';
import Cron from 'react-js-cron';

class SchedulerModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schedule: undefined,
    };
  }

  setCron = value => {
    this.setState({
      schedule: value,
    });
  };

  render() {
    return (
      <Modal
        title="Mail Scheduler"
        visible={this.props.isScheduleOpen}
        onCancel={this.props.closeScheduler}
        okText="Schedule"
        onOk={() => this.props.receiveSchedule(this.state.schedule)}
      >
        <Cron setValue={this.setCron} />
      </Modal>
    );
  }
}

export default SchedulerModal;
