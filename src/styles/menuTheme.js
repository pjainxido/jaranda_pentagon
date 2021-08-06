import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: ${({ theme }) => theme.height.component};
  padding: 80px 130px 130px 130px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.green};
`;

const Main = styled.span`
  margin-bottom: 20px;
  color: #ffffff;
  font-size: 30px;
  font-weight: 700;
`;

const LogoImg = styled.img`
  width: 320px;
  border-radius: 10px;
`;

const menuTheme = { Container, Contents, Main, LogoImg };

export default menuTheme;
