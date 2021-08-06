import { getAllRoles } from 'api/role';
import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation, useHistory, withRouter } from 'react-router-dom';
import ToastPortal from 'components/ToastPortal';
import TOAST from 'constants/toast';
import styled from 'styled-components';
import storage from 'utils/storage';
import ROUTE_PATH from 'constants/routePath';

const NOTMEMBER = [
  { name: '자란다선생님 보기', route: '/#' },
  { name: '선생님 지원하기', route: '/#' },
  { name: '이용안내', route: '/#' },
  { name: '로그인/회원가입', route: ROUTE_PATH.SIGN_UP },
];

function Nav() {
  const [isHover, setIsHover] = useState(false);
  const [menuData, setMenuData] = useState('');
  const [userRole, setUserRole] = useState('');
  const toastRef = useRef();
  const location = useLocation();
  const history = useHistory();
  const isforbidden = location.pathname.split('/')[1].includes(userRole);

  useEffect(() => {
    if (storage.get('userInfo')) {
      setUserRole(storage.get('userInfo').role);
    }
  }, [location.pathname]);

  useEffect(() => {
    const fetchRoleData = async () => {
      const res = await getAllRoles();
      if (res) {
        setMenuData(...res.filter((data) => data.id === userRole));
      }
    };

    fetchRoleData();
  }, [userRole]);

  const addToast = (mode, message) => {
    toastRef.current.addMessage({ mode, message });
  };

  const deleteStorage = () => {
    addToast(TOAST.MODE.INFO, '로그아웃 성공');
    setUserRole('');
    storage.remove('userInfo');
    history.push(ROUTE_PATH.MAIN);
  };

  return (
    <>
      {isforbidden && (
        <Container>
          <Banner>
            <img alt='앱다운로드배너' src='/image/app-download-banner.png' />
            <AppStoreLink to='/#'></AppStoreLink>
            <GooglePlayLink to='/#'></GooglePlayLink>
          </Banner>
          <NavBox>
            <Logo>
              <Link to={ROUTE_PATH.MAIN}>
                <img alt='자란다로고' src='/image/jaranda.log.png'></img>
              </Link>
            </Logo>
            <MenuWrapper>
              {menuData
                ? menuData.menu.map((menu, idx) => (
                    <Menu key={idx}>
                      <Link to={`/${userRole}/${menu.route}`}>{menu.name}</Link>
                    </Menu>
                  ))
                : NOTMEMBER.map((menu, idx) => (
                    <Menu key={idx}>
                      <Link to={menu.route}>{menu.name}</Link>
                    </Menu>
                  ))}
              {userRole && (
                <PersonalMenu onClick={() => setIsHover(false)} onMouseLeave={() => setIsHover(false)} onMouseOver={() => setIsHover(true)}>
                  {userRole === 'admin' ? (
                    <AdminMode>
                      <UserRole>관리자모드</UserRole>
                      <i className='fas fa-users-cog'></i>
                    </AdminMode>
                  ) : (
                    <i className='far fa-user-circle' />
                  )}
                  {isHover && <FakeElement isAdmin={userRole === 'admin'}></FakeElement>}
                  <DropList isHover={isHover} isAdmin={userRole === 'admin'}>
                    {userRole !== 'admin' && (
                      <>
                        <DropItem>
                          <Link to='/#'>마이페이지</Link>
                        </DropItem>
                        <Divider />
                        <DropItem>
                          <Link to='/#'>이용안내</Link>
                        </DropItem>
                        <Divider />
                      </>
                    )}
                    <DropItem>
                      <LogOut onClick={deleteStorage}>로그아웃</LogOut>
                    </DropItem>
                  </DropList>
                </PersonalMenu>
              )}
            </MenuWrapper>
          </NavBox>
          <ToastPortal ref={toastRef} position={TOAST.POSITION.BOT_RIGHT} />
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  position: fixed;
  top: 0;
  z-index: 1;
  background-color: #fff;

  @media ${(props) => props.theme.tablet} {
    position: relative;
  }
`;

const Banner = styled.div`
  position: relative;
  width: 100%;
  height: 100px;

  img {
    width: 100%;
  }

  @media ${(props) => props.theme.tablet} {
    display: none;
  }
`;

const AppStoreLink = styled(Link)`
  position: absolute;
  left: 62%;
  top: 22%;
  width: 10.5%;
  height: 53%;
  cursor: pointer;
`;

const GooglePlayLink = styled(AppStoreLink)`
  left: 73%;
  top: 22%;
`;

const NavBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 63px;
  margin: 0 auto;

  @media ${(props) => props.theme.tablet} {
    flex-direction: column;
  }
`;

const MenuWrapper = styled.ul`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  min-width: 960px;

  @media ${(props) => props.theme.tablet} {
    justify-content: center;
    width: 100%;
    margin-top: 40px;
  }
`;

const Logo = styled.div`
  @media ${(props) => props.theme.tablet} {
    display: flex;
    justify-content: center;
    margin-top: 80px;
  }
`;

const Menu = styled.li`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 15px;
  font-size: 15px;
  color: #4a4a4a;

  &:hover {
    font-weight: 600;
    color: #aac04f;
  }
`;

const PersonalMenu = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-left: 20px;

  i {
    color: gray;
    font-size: 24px;
  }

  &:hover {
    cursor: pointer;
  }
`;

const AdminMode = styled.div`
  padding-bottom: 8px;
  font-size: 15px;

  @media ${(props) => props.theme.tablet} {
    display: flex;
    align-items: center;
    padding-bottom: 0px;
  }
`;

const UserRole = styled.span`
  margin-right: 8px;
  color: #4a4a4a;
`;

const FakeElement = styled.div`
  position: absolute;
  top: 20px;
  left: ${(props) => (props.isAdmin ? '-6px' : '-76px')};
  height: 50px;
  min-width: 120px;
  z-index: 1;
`;

const DropList = styled.ul`
  display: ${(props) => (props.isHover ? 'block' : 'none')};
  position: absolute;
  top: 41px;
  left: ${(props) => (props.isAdmin ? '-56px' : '-136px')};
  min-width: 160px;
  padding: 10px 0;
  margin: 2px 0 0;
  text-align: left;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 6px 12px rgb(0 0 0 / 18%);
  z-index: 10;
`;

const DropItem = styled.li`
  padding: 4px 0;
  font-size: 16px;

  a {
    padding: 6px 20px;
    font-weight: 400;
    line-height: 1.42857143;
    color: #4a4a4a;
  }

  &:hover {
    background-color: #ebebeb;
  }
`;

const Divider = styled.div`
  height: 1px;
  margin: 9px 0;
  overflow: hidden;
  background-color: #e5e5e5;
`;

const LogOut = styled.button`
  width: 100%;
  padding: 4px 20px;
  border: none;
  background-color: inherit;
  text-align: start;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.42857143;
  color: #4a4a4a;
`;

export default withRouter(Nav);
