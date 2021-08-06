import React from 'react';

import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router';

const PrivateRoute = ({ isAuthenticated, children, ...rest }) => {
  if (!isAuthenticated)
    return <Redirect to={{ pathname: '/login', state: { from: location } }} />;
  // TODO: redirect by user role
  // if (type === 'MSP' && !isAuthUser)
  //   return <Redirect to={{ pathname: '/login', state: { from: location } }} />;
  return <Route {...rest} />;
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(PrivateRoute);
