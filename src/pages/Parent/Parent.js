import React, { useState, useEffect } from 'react';
import { Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import { PrivateRoute } from 'routes';
import { menuRouteMapping } from 'utils';
import { getAllRoles } from 'api/role';
import { storage } from 'utils';
import Nav from 'components/Nav/Nav';
import NotFound from 'pages/NotFound';
import menuTheme from 'styles/menuTheme';
import ROUTE_PATH from 'constants/routePath';

const { Container, Contents, Main, LogoImg } = menuTheme;

const Parent = ({ match }) => {
  const [menus, setMenus] = useState(null);

  useEffect(() => {
    const userRole = storage.get('userInfo');

    const fetchRoleData = async () => {
      const res = await getAllRoles();
      if (res) {
        setMenus(...res.filter((data) => data.id === userRole.role));
      }
    };

    fetchRoleData();
  }, []);

  return (
    <>
      <Nav />
      <Container>
        {match.isExact && (
          <Contents>
            <Main>부모님 메인</Main>
            <LogoImg src='/image/jaranda.image.jpeg' alt='자란다이미지' />
          </Contents>
        )}
        {menus && (
          <Switch>
            {menus.menu.map(({ route }) => (
              <PrivateRoute key={route} path={`${ROUTE_PATH.PARENT}/${route}`} component={menuRouteMapping[`/${route}`]} exact />
            ))}
            {!match.isExact && <NotFound />}
          </Switch>
        )}
      </Container>
    </>
  );
};

Parent.propTypes = {
  match: PropTypes.object,
};

export default Parent;
