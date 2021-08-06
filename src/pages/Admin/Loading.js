import React from 'react';
import styled from 'styled-components';
import theme from 'styles/theme';

const Loading = () => {
  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>아이디</th>
            <th>이름</th>
            <th>권한</th>
            <th>주소</th>
            <th>나이</th>
            <th>카드번호</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </Container>
  );
};

const Container = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  table {
    width: 100%;
    height: 500px;
    text-align: center;
    table-layout: fixed;
    border-collapse: initial !important;
    border-radius: 3px;
    padding: 0 !important;
    border: 1px solid ${theme.colors.green} !important;
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
  }
`;

export default Loading;
