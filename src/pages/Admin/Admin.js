import React from "react";
import styled from "styled-components";
import Search from "./Search";

const Container = styled.div`
  margin-top: 60px;
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
  > h1 {
    text-align: center;
    font-weight: 700;
    font-size: 30px;
  }
  table,
  td,
  th {
    border: 1px solid black;
    border-collapse: collapse;
    padding: 10px 0;
  }
`;

function Admin() {
  return (
    <Container>
      <Search />
    </Container>
  );
}

export default Admin;
