import React from 'react';
import menuTheme from 'styles/menuTheme';

const { Container, Contents, Main, LogoImg } = menuTheme;


function RequestDetail() {
  return (
    <Container>
      <Contents>
        <Main>신청서 내역</Main>
        <LogoImg src='/image/jaranda.image.jpeg' alt='자란다이미지' />
      </Contents>
    </Container>
  );
}

export default RequestDetail;
