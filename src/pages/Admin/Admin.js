import React from 'react';
import styled from 'styled-components';
import Nav from 'components/Nav/Nav';
import Search from './Search';

const Admin = () => {
  return (
    <>
      <Nav />
      <Container>
        <Search />
      </Container>
    </>
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
