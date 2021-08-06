import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import loginTheme from 'styles/loginTheme';
import { findUserByIdAndPassword } from 'api/user';
import storage from 'utils/storage';
import ToastPortal from 'components/ToastPortal';
import TOAST from 'constants/toast';
import ROUTE_PATH from 'constants/routePath';

const Login = (props) => {
  const location = useLocation();
  const toastRef = useRef();
  const history = useHistory();
  const [inputs, setInputs] = useState({
    id: '',
    pw: '',
  });

  useEffect(() => {
    if (toastRef.current && location.state?.isRedirect) {
      toastRef.current.addMessage({ mode: TOAST.MODE.ERROR, message: '잘못된 접근입니다.' });
      history.replace('/');
    }
  }, [toastRef]);

  const onChange = (e) => {
    let { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const addToast = (mode, message) => {
    toastRef.current.addMessage({ mode, message });
  };

  const login = async () => {
    const result = await findUserByIdAndPassword(inputs.id, inputs.pw);
    const user = result[0];

    if (!user) {
      addToast(TOAST.MODE.ERROR, '아이디와 비밀번호를 다시 확인하세요');
      return;
    }

    storage.set('userInfo', {
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
          <StyledInput placeholder='아이디' name='id' onChange={onChange} value={inputs.id} />
          <StyledInput placeholder='비밀번호' type='password' name='pw' onChange={onChange} value={inputs.pw} />
          <GreenButton onClick={login}>로그인</GreenButton>
          <Divider />
          <StyledButton
            onClick={() => {
              props.history.push(ROUTE_PATH.SIGN_UP);
            }}
          >
            회원가입
          </StyledButton>
        </NarrowContent>
        <ToastPortal ref={toastRef} position={TOAST.POSITION.TOP_CENTER} />
      </WiderContent>
      <ToastPortal position={TOAST.POSITION.TOP_RIGHT} ref={toastRef} />
    </Container>
  );
};

const { Container, WiderContent, NarrowContent, Title, StyledButton, BasicInput } = loginTheme;

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

Login.propTypes = {
  props: PropTypes.any,
  history: PropTypes.any,
};

export default Login;
