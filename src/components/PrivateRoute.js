import React from 'react';

import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router';

const PrivateRoute = ({ isAuthenticated, children, ...rest }) => {
  if (!isAuthenticated) return <Redirect to={{ pathname: '/guest/login' }} />;
  // if (user.role === 'CPO' && isAuthenticated) console.log(rest);
  return <Route {...rest} />;

  //   <Route
  //   {...rest}
  //   render={({ location }) =>
  //     auth.user ? (
  //       children
  //     ) : (
  //       <Redirect
  //         to={{
  //           pathname: "/login",
  //           state: { from: location }
  //         }}
  //       />
  //     )
  //   }
  // />
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(PrivateRoute);
