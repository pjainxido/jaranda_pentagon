import React from 'react';
import menuTheme from 'styles/menuTheme';

const { Container, Contents, Main, LogoImg } = menuTheme;

const ClassRecommendation = () => {
  return (
    <Container>
      <Contents>
        <Main>수업추천</Main>
        <LogoImg src='/image/jaranda.image.jpeg' alt='자란다이미지' />
      </Contents>
    </Container>
  );
};

export default ClassRecommendation;
