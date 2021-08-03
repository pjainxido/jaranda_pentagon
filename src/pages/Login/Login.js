import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 130px 0;
`;

const WiderContent = styled.div`
  margin: 96px 0 128px 0;
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 0 auto;
`;

const NarrowContent = styled.div`
  width: 500px;
  margin: 48px 0;
  padding: 0 15px;
  text-align: center;
  > input {
    width: 100%;
  }
  > button {
    width: 100%;
  }
`;

const Title = styled.div`
  font-size: 24px;
  margin-bottom: 48px;
`;

const StyledInput = styled.input`
  ${({ theme }) => theme.common.input}
  box-sizing: border-box;
  background-color: #fff;
  padding: 0 15px;
  height: 52px;
  margin-bottom: 16px;
  outline-color: #87bf44;

  :focus,
  :hover {
    color: #6dc043;
    background-color: rgba(165, 210, 95, 0.1);
    border: solid 1px #a5d25f;
  }
`;

const StyledButton = styled.button`
  ${({ theme }) => theme.common.button}
  height: 52px;
  background-color: ${({ theme }) => theme.colors.blue};
  color: #fff;
  font-size: 13px;
  line-height: 48px;
`;

const GreenButton = styled(StyledButton)`
  background-color: ${({ theme }) => theme.colors.green};
`;

const Divider = styled.div`
  margin: 12px 0;
  background-color: #e5e5e5;
  height: 1px;
  width: 100%;
`;

const Login = () => {
  return (
    <Container>
      <WiderContent>
        <NarrowContent>
          <Title>자란다 로그인</Title>
          <StyledInput placeholder='아이디' style={{ marginBottom: 15 }} />
          <StyledInput placeholder='비밀번호' style={{ marginBottom: 15 }} />
          <GreenButton>로그인</GreenButton>
          <Divider />
          <StyledButton>회원가입</StyledButton>
        </NarrowContent>
      </WiderContent>
    </Container>
  );
};

export default Login;
