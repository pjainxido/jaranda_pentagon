import React, { useState, useRef } from "react";
import { createPortal } from "react-dom";
import { createUser, checkUserByUserId } from "api/user/index";
import AddressApi from "components/AddressApi/AddressApi";
import styled from "styled-components";
import theme from "styles/theme";
import loginTheme from "styles/loginTheme";
import { CreditCardPopup } from "components/CreditCardPopup";

import PropTypes from "prop-types";

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

function SignUp(props) {
  const [inputs, setInputs] = useState({
    id: "",
    idConfirm: false,
    pw: "",
    pwConfirm: "",
    name: "",
    age: "",
    address: "",
    addressDetail: "",
    isDaumPost: false,
    cardNumber: "",
    effectiveDate: "",
    cvc: "",
  });
  const [isCreditClick, setIsCreditClick] = useState(false);

  const pwAlert = useRef(null);
  const pwConfirmAlert = useRef(null);
  const pwValidCheck = useRef(false);
  const pwConfirmCheck = useRef(false);

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

    if (name == "pw") {
      var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/;
      var pwValid = regExp.test(value);

      if (pwValid) {
        pwAlert.current.innerHTML = "비밀번호 양식에 맞게 입력하였습니다";
        pwAlert.current.style.color = theme.colors.green;
        pwValidCheck.current = true;
      } else {
        pwAlert.current.innerHTML = "영문 및 숫자 포함 8 ~ 10자 작성해주세요";
        pwAlert.current.style.color = theme.colors.red;
        pwValidCheck.current = false;
      }
    }

    if (name == "pwConfirm") {
      var pwConfirmValid = inputs.pw == value;

      if (pwConfirmValid) {
        pwConfirmAlert.current.innerHTML = "비밀번호가 일치합니다";
        pwConfirmAlert.current.style.color = theme.colors.green;
        pwConfirmCheck.current = true;
      } else {
        pwConfirmAlert.current.innerHTML = "비밀번호가 일치하지 않습니다";
        pwConfirmAlert.current.style.color = theme.colors.red;
        pwConfirmCheck.current = false;
      }
    }
  };

  const checkSameId = async () => {
    if (inputs.id.trim() !== "") {
      var checked = await checkUserByUserId(inputs.id);
      if (checked) {
        alert("아이디로 가입할 수 있습니다");
        setInputs({
          ...inputs,
          idConfirm: true,
        });
      } else {
        alert("중복된 아이디입니다");
      }
    } else {
      alert("아이디를 입력하세요");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    var valid = validation();

    if (valid) {
      var newUser = {
        userId: inputs.id,
        role: "parent",
        password: inputs.pw,
        name: inputs.name,
        age: Number(inputs.age),
        address: "",
        creditCard: {},
      };
      await createUser(newUser);

      props.history.push("/");
      // if (result) {
      //   history.push("/");
      // } else {
      //   alert("회원가입이 실패했습니다.");
      // }
    }
  };

  const validation = () => {
    if (inputs.id == "") {
      alert("Id를 입력하세요");
      return false;
    }
    if (inputs.idConfirm === false) {
      alert("아이디 중복확인을 해주세요");
      return false;
    }
    if (inputs.pw == "" || inputs.pw == undefined) {
      alert("비밀번호를 입력하세요");
      return false;
    }
    if (!pwValidCheck.current) {
      alert("비밀번호를 양식에 맞게 입력하세요");
      return false;
    }
    if (!pwConfirmCheck.current) {
      alert("비밀번호를 확인하세요");
      return false;
    }
    return true;
  };

  const handlePostModal = () => {
    setInputs({ ...inputs, isDaumPost: true });
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
          <Alert ref={pwAlert}>영문 및 숫자 포함 8 ~ 10자 작성해주세요</Alert>
          <StyledInput
            placeholder="비밀번호 확인"
            name="pwConfirm"
            type="password"
            value={inputs.pwConfirm}
            style={{ marginBottom: 5 }}
            onChange={onChange}
          ></StyledInput>
          <Alert ref={pwConfirmAlert}>비밀번호가 일치하지 않습니다</Alert>
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
            <StyledInput
              readOnly
              placeholder="주소"
              value={inputs.address}
            ></StyledInput>
            <StyledButton onClick={handlePostModal}>주소 검색</StyledButton>
            {inputs.isDaumPost && (
              <AddressApi inputs={inputs} setInputs={setInputs} />
            )}
          </ButtonWrap>
          <StyledInput
            placeholder="상세 주소"
            name="addressDetail"
            value={inputs.addressDetail}
            onChange={onChange}
          ></StyledInput>
          <ButtonWrap>
            <StyledInput
              readOnly
              placeholder="카드 번호"
              name="cardNumber"
              value={inputs.cardNumber}
            ></StyledInput>
            <StyledButton onClick={() => setIsCreditClick(true)}>
              신용카드 입력
            </StyledButton>
          </ButtonWrap>
          <ButtonWrap style={{ marginBottom: 30 }}>
            <StyledInput
              readOnly
              placeholder="유효 기간"
              name="effectiveDate"
              value={inputs.effectiveDate}
              style={{ marginRight: 10 }}
            ></StyledInput>
            <StyledInput
              readOnly
              placeholder="CVC 번호"
              name="cvc"
              value={inputs.cvc}
            ></StyledInput>
          </ButtonWrap>
          <form onSubmit={handleSubmit}>
            <StyledButton type="submit" style={{ width: "100%" }}>
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
          document.getElementById("modal-root")
        )}
    </Container>
  );
}

SignUp.propTypes = {
  props: PropTypes.any,
  history: PropTypes.any,
};

export default SignUp;
