import React from "react";
import styled from "styled-components";

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
  :focus {
    color: ${({ theme }) => theme.colors.blue};
    background-color: rgba(0, 133, 253, 0.1);
    border: 0.5px solid ${({ theme }) => theme.colors.blue};
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

const ButtonWrap = styled.div`
  display: flex;
  justify-content: space-between;
  > input {
    width: 73%;
  }
  > button {
    width: 25%;
  }
`;

const Alert = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.red};
  text-align: left;
  padding-bottom: 15px;
`;

function SignUp(props) {
  return (
    <Container>
      <WiderContent>
        <NarrowContent>
          <Title>
            10초 만에 가입하고<br></br>선생님 정보를 받아보세요
          </Title>
          <ButtonWrap>
            <StyledInput placeholder="아이디" id="id"></StyledInput>
            <StyledButton>아이디 중복확인</StyledButton>
          </ButtonWrap>
          <StyledInput
            placeholder="비밀번호"
            id="pw"
            style={{ marginBottom: 5 }}
          ></StyledInput>
          <Alert>영문 및 숫자 포함 8자 이상 작성해주세요</Alert>
          <StyledInput
            placeholder="비밀번호 확인"
            style={{ marginBottom: 5 }}
          ></StyledInput>
          <Alert>비밀번호가 일치하지 않습니다</Alert>
          <StyledInput placeholder="이름"></StyledInput>
          <StyledInput placeholder="나이"></StyledInput>
          <ButtonWrap>
            <StyledInput readOnly placeholder="주소"></StyledInput>
            <StyledButton>주소 검색</StyledButton>
          </ButtonWrap>
          <StyledInput readOnly placeholder="상세 주소"></StyledInput>
          <ButtonWrap style={{ marginBottom: 30 }}>
            <StyledInput readOnly placeholder="신용카드 정보"></StyledInput>
            <StyledButton>신용카드 입력</StyledButton>
          </ButtonWrap>
          <StyledButton>회원가입</StyledButton>
        </NarrowContent>
      </WiderContent>
    </Container>
  );
}

export default SignUp;
