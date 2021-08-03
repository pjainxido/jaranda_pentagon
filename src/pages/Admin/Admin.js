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
      <table>
        <thead>
          <tr>
            <th>user_id</th>
            <th>name</th>
            <th>role</th>
            <th>address</th>
            <th>age</th>
            <th>credit_card</th>
          </tr>
        </thead>
        <tbody>
          {dummyData.data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.userId}</td>
              <td>{item.name}</td>
              <td>{item.role}</td>
              <td>{item.address}</td>
              <td>{item.creditCard}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}

export default Admin;
