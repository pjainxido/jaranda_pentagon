import { changeUserRole } from "api/user";
import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Pagination from "./Pagination";
import theme from "styles/theme";

const Container = styled.div`
  table {
    width: 100%;
    text-align: center;
    table-layout: fixed;
    border: 1px solid white;
  }
  thead {
    tr {
      background-color: ${theme.colors.green};
      color: white;
      th {
        border: none;
      }
    }
  }
  tbody {
    tr {
      td {
        border: none;
      }
    }
    tr:nth-child(2n) {
      background-color: ${theme.colors.lightgreen};
    }
  }
`;

const ROLE = ["admin", "teacher", "parent"];

const Table = ({ data, loading, page, setPage }) => {
  const [perPage, setPerPage] = useState(10);

  if (loading) {
    return <div>loading...</div>;
  }

  const postChange = (e) => {
    //서버에 id, value POST
    changeUserRole(e.target.id, e.target.value);
  };

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>아이디</th>
            <th>이름</th>
            <th>역할</th>
            <th>주소</th>
            <th>나이</th>
            <th>카드번호</th>
          </tr>
        </thead>
        <tbody>
          {data.slice(perPage * page - perPage, perPage * page).map((item) => (
            <tr key={item.id}>
              <td>{item.userId}</td>
              <td>{item.name}</td>
              <td>
                <select id={item.id} onChange={postChange}>
                  <option>{item.role}</option>
                  {ROLE.filter((i) => i !== item.role).map((i) => (
                    <option key={i}>{i}</option>
                  ))}
                </select>
              </td>
              <td>{item.address}</td>
              <td>{item.age}</td>
              <td>{item.creditCard?.cardNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        page={page}
        perPage={perPage}
        setPage={setPage}
        pageData={data}
      />
    </Container>
  );
};

Table.propTypes = {
  data: PropTypes.array,
  loading: PropTypes.bool,
  page: PropTypes.number,
  setPage: PropTypes.func,
};

export default Table;
