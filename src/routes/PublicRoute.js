import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { storage } from 'utils';

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        const user = storage.get('userInfo');

        return user && restricted ? <Redirect to={`/${user.role}`} /> : <Component {...props} />;
      }}
    />
  );
};

PublicRoute.propTypes = {
  component: PropTypes.func,
  restricted: PropTypes.bool,
};

export default PublicRoute;
