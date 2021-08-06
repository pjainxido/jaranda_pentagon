import React from 'react';
import Nav from 'components/Nav/Nav';
import menuTheme from 'styles/menuTheme';

const { Container, Contents, Main, LogoImg } = menuTheme;

const VisitLog = () => {
  return (
    <>
      <Nav />
      <Container>
        <Contents>
          <Main>방문일지</Main>
          <LogoImg src='/image/jaranda.image.jpeg' alt='자란다이미지' />
        </Contents>
      </Container>
    </>
  );
};

export default VisitLog;
