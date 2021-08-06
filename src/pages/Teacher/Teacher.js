import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { PrivateRoute } from 'components/Route';
import { menuRouteMapping } from 'utils';
import { getAllRoles } from 'api/role';
import { storage } from 'utils';
import NotFound from 'pages/NotFound';

/* eslint-disable */
const Teacher = ({ location, match }) => {
	const [menus, setMenus] = useState(null);

	useEffect(() => {
		const userRole = storage.get('userInfo');

		const fetchData = async () => {
			const res = await getAllRoles();
			if (res) {
				setMenus(...res.filter((data) => data.id === userRole.role));
			}
		};

		fetchData();
	}, []);

	return (
		<Container>
			{match.isExact && <h1>Teacher 메인</h1>}
			{menus &&
				menus.menu.map(({ route }) => (
					<PrivateRoute key={route} path={`/teacher/${route}`} component={menuRouteMapping[route]} />
				))}
			{menus &&
				menus.menu.filter(({ route }) => `/teacher/${route}` !== location.pathname).length === menus.menu.length &&
				!match.isExact && <NotFound />}
		</Container>
	);
};

const Container = styled.div`
	padding-top: 160px;
`;

Teacher.propTypes = {
	match: PropTypes.object,
};

export default Teacher;
