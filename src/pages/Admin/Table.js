import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Pagenation from "./Pagenation";

const Container = styled.div`
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

const Table = ({ data }) => {
  const [page, setPage] = useState(1);

  if (!data) {
    return <div>loading...</div>;
  }
  return (
    <Container>
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
          {data.slice(10 * page - 10, 10 * page).map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.role}</td>
              <td>{item.address}</td>
              <td>{item.age}</td>
              <td>{item.creditCard}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagenation page={page} setPage={setPage} data={data} />
    </Container>
  );
};

Table.propTypes = {
  data: PropTypes.array,
};

export default Table;
