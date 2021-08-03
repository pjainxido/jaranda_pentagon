import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

function Nav() {
  return (
    <NavContainer>
      <div>
        <Logo>
          <img alt="자란다로고" src="./image/jaranda.log.png"></img>
        </Logo>
      </div>
      <MenuWarrper>
        <Menu>
          <Link>자란다선생님 보기</Link>
        </Menu>
        <Menu>
          <Link>선생님 지원하기</Link>
        </Menu>
        <Menu>
          <Link>이용안내</Link>
        </Menu>
        <Menu>
          <Link>로그아웃</Link>
        </Menu>
      </MenuWarrper>
    </NavContainer>
  );
}

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-width: 320px;
  max-width: 960px;
  height: 63px;
  margin: 0 416px;
`;

const Logo = styled(Link)``;

const MenuWarrper = styled.ul`
  display: flex;
  justify-content: flex-end;
`;

const Menu = styled.li`
  padding: 0 15px;
  font-size: 15px;
  color: #4a4a4a;
`;
export default Nav;
