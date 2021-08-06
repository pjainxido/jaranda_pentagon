import React from 'react';
import menuTheme from 'styles/menuTheme';

const { Container, Contents, Main, LogoImg } = menuTheme;

function VisitSchedule() {
  return (
    <Container>
      <Contents>
        <Main>방문일정</Main>
        <LogoImg src='/image/jaranda.image.jpeg' alt='자란다이미지' />
      </Contents>
    </Container>
  );
}

export default VisitSchedule;
