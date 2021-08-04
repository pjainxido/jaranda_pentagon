import React, { useState, useRef } from "react";
import { createPortal } from "react-dom";
import { createUser, checkUserByUserId } from "api/user/index";

import styled from "styled-components";
import theme from "styles/theme";
import loginTheme from "styles/LoginTheme";
import { CreditCardPopup } from "components/CreditCardPopup";

const {
  Container,
  WiderContent,
  NarrowContent,
  ButtonWrap,
  Title,
  StyledButton,
  BasicInput,
} = loginTheme;

const StyledInput = styled(BasicInput)`
  :focus {
    color: ${({ theme }) => theme.colors.blue};
    background-color: rgba(0, 133, 253, 0.1);
    border: 0.5px solid ${({ theme }) => theme.colors.blue};
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
    pwValid: false,
    pwConfirmValid: false,
    name: "",
    age: "",
    cardNumber: "",
    effectiveDate: "",
    cvc: "",
  });
  const [isCreditClick, setIsCreditClick] = useState(false);

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
      var pwValid = regExp.test(value);

      if (pwValid) {
        pwAlert.current.innerHTML = "비밀번호 양식에 맞게 입력하였습니다";
        pwAlert.current.style.color = theme.colors.green;
      } else {
        pwAlert.current.innerHTML = "영문 및 숫자 포함 8 ~ 10자 작성해주세요";
        pwAlert.current.style.color = theme.colors.red;
      }
    }

    if (name == "pwConfirm") {
      var pwConfirmValid = pw == value;

      if (pwConfirmValid) {
        pwConfirmAlert.current.innerHTML = "비밀번호가 일치합니다";
        pwConfirmAlert.current.style.color = theme.colors.green;
      } else {
        pwConfirmAlert.current.innerHTML = "비밀번호가 일치하지 않습니다";
        pwConfirmAlert.current.style.color = theme.colors.red;
      }
    }
  };

  const checkSameId = async () => {
    const { id } = inputs;
    // id 있는지 없는지 확인하는 로직, 있으면 idConfirm: true 로 바꿈
    var checked = await checkUserByUserId(id);
    if (checked) {
      alert("없음");
    } else {
      alert("있음");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(inputs);
    validation();

    const newUser = {
      userId: inputs.id,
      role: "parent",
      password: inputs.pw,
      name: inputs.name,
      age: Number(inputs.age),
      address: "임시 생성",
    };

    console.log(newUser);
    await createUser(newUser);
  };

  const validation = () => {
    // if (inputs.id == "") {
    //   alert("Id alert");
    //   return;
    // }
    // if (inputs.idConfirm === false) {
    //   alert("Id Confirm");
    //   return;
    // }
  };

  return (
    <Container>
      <WiderContent>
        <NarrowContent>
          <Title>
            10초 만에 가입하고<br></br>선생님 정보를 받아보세요
          </Title>
          <ButtonWrap>
            <StyledInput
              placeholder='아이디'
              name='id'
              value={inputs.id}
              onChange={onChange}
            ></StyledInput>
            <StyledButton onClick={checkSameId}>아이디 중복확인</StyledButton>
          </ButtonWrap>
          <StyledInput
            placeholder='비밀번호'
            name='pw'
            type='password'
            value={inputs.pw}
            onChange={onChange}
            style={{ marginBottom: 5 }}
          ></StyledInput>
          <Alert ref={pwAlert}>영문 및 숫자 포함 8 ~ 10자 작성해주세요</Alert>
          <StyledInput
            placeholder='비밀번호 확인'
            name='pwConfirm'
            type='password'
            value={inputs.pwConfirm}
            style={{ marginBottom: 5 }}
            onChange={onChange}
          ></StyledInput>
          <Alert ref={pwConfirmAlert}>비밀번호가 일치하지 않습니다</Alert>
          <StyledInput
            placeholder='이름'
            name='name'
            value={inputs.name}
            onChange={onChange}
          ></StyledInput>
          <StyledInput
            placeholder='나이'
            name='age'
            value={inputs.age}
            onChange={onChange}
          ></StyledInput>
          <ButtonWrap>
            <StyledInput readOnly placeholder='주소'></StyledInput>
            <StyledButton>주소 검색</StyledButton>
          </ButtonWrap>
          <StyledInput readOnly placeholder='상세 주소'></StyledInput>
          <ButtonWrap>
            <StyledInput
              readOnly
              placeholder='카드 번호'
              name='cardNumber'
              value={inputs.cardNumber}
            ></StyledInput>
            <StyledButton onClick={() => setIsCreditClick(true)}>
              신용카드 입력
            </StyledButton>
          </ButtonWrap>
          <ButtonWrap style={{ marginBottom: 30 }}>
            <StyledInput
              readOnly
              placeholder='유효 기간'
              name='effectiveDate'
              value={inputs.effectiveDate}
              style={{ marginRight: 10 }}
            ></StyledInput>
            <StyledInput
              readOnly
              placeholder='CVC 번호'
              name='cvc'
              value={inputs.cvc}
            ></StyledInput>
          </ButtonWrap>
          <form onSubmit={handleSubmit}>
            <StyledButton type='submit' style={{ width: "100%" }}>
              회원가입
            </StyledButton>
          </form>
        </NarrowContent>
      </WiderContent>
      {isCreditClick &&
        createPortal(
          <CreditCardPopup
            onClose={() => setIsCreditClick(false)}
            saveCardInfo={setInputs}
          />,
          document.getElementById("modal-root"),
        )}
    </Container>
  );
}

export default SignUp;
