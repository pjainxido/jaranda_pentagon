import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { storage } from 'utils';

import Forbidden from 'pages/Forbidden';

const PrivateRoute = ({ component: Component, ...rest }) => {
	const isValidURL = (user) => {
		const { path } = rest;
		return path.includes(user.role);
	};

	return (
		<Route
			exact
			{...rest}
			render={(props) => {
				const user = storage.get('userInfo');

				if (!user) return <Redirect to={{pathname:'/' , state: {isRedirect: true}}} />;
				// if (!isValidURL(user)) return <Redirect to={`/${user.role}`} />;
				if (!isValidURL(user)) return <Forbidden />;

				return <Component {...props} />;
			}}
		/>
	);
};

PrivateRoute.propTypes = {
	component: PropTypes.func,
};

export default PrivateRoute;
