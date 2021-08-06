import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ROUTE_PATH from 'constants/routePath';

const NotFound = () => {
  return (
    <Container>
      <ContentWrapper>
        <h3>404 not found page</h3>
        <p>요청하신 페이지를 찾을 수 없습니다.</p>
        <Link to={ROUTE_PATH.MAIN}>돌아가기</Link>
      </ContentWrapper>
    </Container>
  );
};

const Container = styled.div`
  padding: 130px 0;
  width: 100%;
  height: 100vh;
`;

const ContentWrapper = styled.div`
  margin: 0 auto;
  height: 380px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  @media (min-width: 576px) {
    max-width: 540px;
  }
  @media (min-width: 768px) {
    max-width: 720px;
  }
  @media (min-width: 992px) {
    max-width: 960px;
  }

  & > h3 {
    font-size: 2rem;
    font-weight: bold;
  }

  & > p {
    font-size: 1.25rem;
  }

  & > a {
    width: fit-content;
    display: inline-block;
    font-weight: 400;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    user-select: none;
    border: 1px solid transparent;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: 0.25rem;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    color: #fff;
    background-color: #93c83e;
    border-color: #93c83e;

    &:hover {
      color: #fff;
      background-color: #42bc72;
      border-color: #42bc72;
    }
  }
`;

export default NotFound;
