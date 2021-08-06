import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { storage } from 'utils';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isValidURL = (user) => {
    const { path } = rest;
    return path.includes(user.role);
  };

  return (
    <Route
      {...rest}
      render={(props) => {
        const user = storage.get('userInfo');

        if (!user) return <Redirect to='/' />;
        if (!isValidURL(user)) return <Redirect to={`/${user.role}`} />;

        return <Component {...props} />;
      }}
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.func,
};

export default PrivateRoute;
