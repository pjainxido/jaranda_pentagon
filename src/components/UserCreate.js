import React, { useEffect } from "react";
import { useState } from "react";
import { createUser, checkUserByUserId } from "api/user/index";

import styled from "styled-components";
import loginTheme from "styles/LoginTheme";

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

const RoleSelect = styled.select`
  width: 100%;
  margin-bottom: 16px;
  height: 52px;
  padding: 0 15px;
`;

// eslint-disable-next-line react/prop-types
function UserCreate({ setIsShown }) {
  const [inputs, setInputs] = useState({
    id: "",
    idConfirm: false,
    pw: "",
    name: "",
    age: "",
    role: "parent",
    address: "",
  });

  const onChange = (e) => {
    let { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const checkSameId = async () => {
    const { id } = inputs;
    var checked = await checkUserByUserId(id);
    if (checked) {
      alert("아이디로 가입할 수 있습니다");
      setInputs({ idConfirm: true });
    } else {
      alert("중복된 아이디입니다");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // var valid = validation();

    // console.log(inputs);
    // if (valid) {
    const newUser = {
      userId: inputs.id,
      role: inputs.role,
      password: inputs.pw,
      name: inputs.name,
      age: Number(inputs.age),
      address: inputs.address,
      creditCard: {},
    };
    console.log(newUser);
    await createUser(newUser);
    // }
    setIsShown(false);
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
  };

  return (
    // <Container>
      <WiderContent>
        <NarrowContent>
          <Title>계정 임의생성</Title>
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
            value={inputs.pw}
            onChange={onChange}
          ></StyledInput>
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
          <RoleSelect name="role" onChange={onChange} value={inputs.role}>
            <option value="parent">부모님</option>
            <option value="teacher">선생님</option>
          </RoleSelect>
          <StyledInput placeholder="주소"></StyledInput>
          <form onSubmit={handleSubmit}>
            <StyledButton type="submit" style={{ width: "100%" }}>
              계정생성
            </StyledButton>
          </form>
        </NarrowContent>
      </WiderContent>
    // </Container>
  );
}

export default UserCreate;
