import React, { useRef, useEffect } from 'react';
import { useLocation } from 'react-router';
import styled from 'styled-components';
import theme from 'styles/theme';
import Search from './Search';
import ToastPortal from 'components/ToastPortal';
import TOAST from 'constants/toast';

const Admin = () => {
  const location = useLocation();
  const toastRef = useRef();
  useEffect(() => {
    console.log(location);
    if (toastRef.current && location.state?.isRedirect) {
      toastRef.current.addMessage({ mode: TOAST.MODE.ERROR, message: '잘못된 접근입니다.' });
    }

    return () => {};
  }, [toastRef]);
  return (
    <Container>
      <Search />
      <ToastPortal ref={toastRef} position={TOAST.POSITION.TOP_RIGHT} />
    </Container>
  );
};

const Container = styled.div`
  margin-top: ${({ theme }) => theme.height.component};
  padding: 0 20px;
  > table {
    border: 1px solid black;
    color: black;
    width: 100%;
    height: 100%;
    max-height: 240px;
    text-align: center;
    table-layout: fixed;
  }
  table,
  td,
  th {
    border: 1px solid black;
    border-collapse: collapse;
    padding: 10px 0;
  }
`;

export default Admin;
