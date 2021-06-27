import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import _pick from 'lodash/pick';

import 'antd/dist/antd.css';

import DashboardPage from '../pages/dashboard';
import LoginPage from '../pages/login';
import RegisterPage from '../pages/register';

import CreateMail from '../pages/dashboard/CreateMail';
import SentMails from '../pages/dashboard/SentMails';

const App = props => {
  const { isAuthentificated } = props.user;
  return (
    <div>
      <Switch>
        <Route exact path="/register" component={RegisterPage} />
        <Route
          exact
          path="/"
          render={() =>
            isAuthentificated ? <Redirect to="/dashboard" /> : <LoginPage />
          }
        />
        {isAuthentificated ? (
          <>
            <Route exact path="/dashboard" component={DashboardPage} />
            <Route exact path="/create-mail" component={CreateMail} />
            <Route exact path="/sent-mails" component={SentMails} />
          </>
        ) : (
          <Redirect to="/" />
        )}
      </Switch>
    </div>
  );
};
const mapStateToProps = state => ({
  ..._pick(state.App, ['user']),
});

export default connect(mapStateToProps, null)(App);
