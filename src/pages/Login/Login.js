import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import loginTheme from "styles/loginTheme";
import { findUserByIdAndPassword } from "api/user";
import storage from "utils/storage";

const {
  Container,
  WiderContent,
  NarrowContent,
  Title,
  StyledButton,
  BasicInput,
} = loginTheme;

const StyledInput = styled(BasicInput)`
  outline-color: #87bf44;

  :focus,
  :hover {
    color: #6dc043;
    background-color: rgba(165, 210, 95, 0.1);
    border: solid 1px #a5d25f;
  }
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

const Login = (props) => {
  const [inputs, setInputs] = useState({
    id: "",
    pw: "",
  });

  const onChange = (e) => {
    let { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const login = async () => {
    const result = await findUserByIdAndPassword(inputs.id, inputs.pw);
    const user = result[0];

    if (!user) {
      alert("아이디와 비밀번호를 다시 확인하세요");
      return;
    }

    storage.set("userInfo", {
      name: user.name,
      role: user.role,
    });

    props.history.push({
      pathname: `/${user.role}`,
      state: {
        name: user.name,
        role: user.role,
      },
    });
  };

  return (
    <Container>
      <WiderContent>
        <NarrowContent>
          <Title>자란다 로그인</Title>
          <StyledInput
            placeholder="아이디"
            name="id"
            onChange={onChange}
            value={inputs.id}
          />
          <StyledInput
            placeholder="비밀번호"
            type="password"
            name="pw"
            onChange={onChange}
            value={inputs.pw}
          />
          <GreenButton onClick={login}>로그인</GreenButton>
          <Divider />
          <StyledButton
            onClick={() => {
              props.history.push("/signup");
            }}
          >
            회원가입
          </StyledButton>
        </NarrowContent>
      </WiderContent>
    </Container>
  );
};

Login.propTypes = {
  props: PropTypes.any,
  history: PropTypes.any,
};

export default Login;
