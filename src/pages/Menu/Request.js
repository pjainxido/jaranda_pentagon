import React from 'react';
import Nav from 'components/Nav/Nav';
import menuTheme from 'styles/menuTheme';

const { Container, Contents, Main, LogoImg } = menuTheme;

const Request = () => {
  return (
    <>
      <Nav />
      <Container>
        <Contents>
          <Main>신청서 작성하기</Main>
          <LogoImg src='/image/jaranda.image.jpeg' alt='자란다이미지' />
        </Contents>
      </Container>
    </>
  );
};

export default Request;
