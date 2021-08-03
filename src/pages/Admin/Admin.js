import React from "react";
import styled from "styled-components";
import dummyData from "pages/Admin/dummy_data.json";
import Search from "./Search";

const Container = styled.div`
  margin-top: 60px;
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
      <h1>유저 정보</h1>
      <Search />
    </Container>
  );
}

export default Admin;
