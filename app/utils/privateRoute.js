import React from 'react';
import PropTypes from 'prop-types';
import {
    Route,
    Redirect,
    withRouter
  } from 'react-router-dom';

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
      rest.user ? (
        <Component {...props}/>
      ) : (
        <Redirect to={{
          pathname: '/',
          state: { from: props.location }
        }}/>
      )
    )}/>
  )
PrivateRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};

export default withRouter(PrivateRoute);