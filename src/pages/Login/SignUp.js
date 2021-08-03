import React from "react";
import { useState, useRef } from "react";

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

function SignUp() {
  const [inputs, setInputs] = useState({
    id: "",
    idConfirm: false,
    pw: "",
    pwConfirm: "",
    name: "",
    age: "",
  });

  const pwAlert = useRef(null);
  const pwConfirmAlert = useRef(null);

  const onChange = (e) => {
    let { value, name } = e.target;
    pwValidation(e);
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const pwValidation = (e) => {
    let { value, name } = e.target;
    let { pw } = inputs;

    if (name == "pw") {
      var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/;
      console.log("비밀번호 유효성 검사 :: ", regExp.test(value));
      var pwValid = regExp.test(value);
      pwAlert.current.innerHTML = pwValid
        ? "비밀번호 양식에 맞게 입력하였습니다"
        : "영문 및 숫자 포함 8 ~ 10자 작성해주세요";
    }
    if (name == "pwConfirm") {
      var pwConfirmValid = pw == value;
      pwConfirmAlert.current.innerHTML = pwConfirmValid
        ? "비밀번호가 일치합니다"
        : "비밀번호가 일치하지 않습니다";
    }
  };

  const checkSameId = () => {
    const { id } = inputs;
    // id 있는지 없는지 확인하는 로직, 있으면 idConfirm: true 로 바꿈
    console.log(id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    validation();
  };

  const validation = () => {
    if (inputs.id == "") {
      alert("Id alert");
      return;
    }
    if (inputs.idConfirm === false) {
      alert("Id Confirm");
      return;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Container>
        <WiderContent>
          <NarrowContent>
            <Title>
              10초 만에 가입하고<br></br>선생님 정보를 받아보세요
            </Title>
            <ButtonWrap>
              <StyledInput
                placeholder="아이디"
                name="id"
                value={inputs.id}
                onChange={onChange}
              ></StyledInput>
              <StyledButton onClick={checkSameId}>아이디 중복확인</StyledButton>
            </ButtonWrap>
            <StyledInput
              placeholder="비밀번호"
              name="pw"
              type="password"
              value={inputs.pw}
              onChange={onChange}
              style={{ marginBottom: 5 }}
            ></StyledInput>
            <Alert ref={pwAlert} pwValid={false}>
              영문 및 숫자 포함 8 ~ 10자 작성해주세요
            </Alert>
            <StyledInput
              placeholder="비밀번호 확인"
              name="pwConfirm"
              type="password"
              value={inputs.pwConfirm}
              style={{ marginBottom: 5 }}
              onChange={onChange}
            ></StyledInput>
            <Alert ref={pwConfirmAlert} pwValid={false}>
              비밀번호가 일치하지 않습니다
            </Alert>
            <StyledInput
              placeholder="이름"
              name="name"
              value={inputs.name}
              onChange={onChange}
            ></StyledInput>
            <StyledInput
              placeholder="나이"
              name="age"
              value={inputs.age}
              onChange={onChange}
            ></StyledInput>
            <ButtonWrap>
              <StyledInput readOnly placeholder="주소"></StyledInput>
              <StyledButton>주소 검색</StyledButton>
            </ButtonWrap>
            <StyledInput readOnly placeholder="상세 주소"></StyledInput>
            <ButtonWrap style={{ marginBottom: 30 }}>
              <StyledInput readOnly placeholder="신용카드 정보"></StyledInput>
              <StyledButton>신용카드 입력</StyledButton>
            </ButtonWrap>
            <StyledButton type="submit">회원가입</StyledButton>
          </NarrowContent>
        </WiderContent>
      </Container>
    </form>
  );
}

export default SignUp;
