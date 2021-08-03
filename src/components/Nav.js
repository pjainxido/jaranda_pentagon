import React from "react";
import styled from "styled-components";

function Nav() {
  return (
    <NavContainer>
      <div>
        <Logo alt="자란다로고" src="./image/jaranda.log.png" />
      </div>
      <MenuWarrper>
        <Menu>자란다선생님 보기</Menu>
        <Menu>선생님 지원하기</Menu>
        <Menu>이용안내</Menu>
        <Menu>로그아웃</Menu>
      </MenuWarrper>
    </NavContainer>
  );
}

const NavContainer = styled.div`
  height: 63px;
`;

const Logo = styled.img`
  cursor: pointer;
`;

const MenuWarrper = styled.ul``;

const Menu = styled.li``;
export default Nav;
