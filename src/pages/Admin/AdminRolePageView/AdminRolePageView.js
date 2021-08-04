import React, { useState, useEffect } from "react";
import RoleSelectorItem from "./RoleSelectorItem";
import styled from "styled-components";
import { getAllMenus } from "api/menu";
import { getAllRoles, adjustRoleForMenu } from "api/role";

const AdminRolePageView = () => {
  const [pageViewList, setPageViewList] = useState([]);
  const [roleData, setRoleData] = useState({
    teacher: [],
    parent: [],
  });

  useEffect(async () => {
    try {
      const allMenu = await getAllMenus();
      const fetchRoleData = await getAllRoles();

      const roleNames = fetchRoleData.map((role) => role.id);
      const roles = new Object();

      for (const id of roleNames) {
        if (id !== "admin") {
          roles[id] = fetchRoleData.find((role) => role.id === id).menu;
        }
      }

      setRoleData(roles);
      setPageViewList(allMenu);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const handleRoleData = (role, pageView) => {
    const isExistAndRemove = getCheckedRole(role, pageView);

    setRoleData((prev) => ({
      ...prev,
      [role]: isExistAndRemove
        ? prev[role].filter((el) => el.id !== pageView.id)
        : [...prev[role], pageView],
    }));
  };

  const getCheckedRole = (role, pageView) => {
    return roleData[role].map((el) => el.id).includes(pageView.id);
  };

  const submitRoleData = () => {
    for (const role of Object.keys(roleData)) {
      console.log(role, roleData[role]);
      // adjustRoleForMenu(role, roleData[role]);
    }
  };

  const getRoleNameList = () => {
    return Object.keys(roleData);
  };

  return (
    <Container>
      <Table>
        <Thead>
          <tr>
            <th>메뉴명 \ 권한명</th>
            <th>경로</th>
            {getRoleNameList().map((role, index) => (
              <th key={index}>{role}</th>
            ))}
          </tr>
        </Thead>
        <Tbody>
          {pageViewList.map((page, index) => (
            <RoleSelectorItem
              key={index}
              pageView={page}
              getCheckedRole={getCheckedRole}
              getRoleNameList={getRoleNameList()}
              handleRoleData={handleRoleData}
            />
          ))}
        </Tbody>
      </Table>

      {Object.keys(roleData).map((el, index) => (
        <Preview key={index}>
          <h3>{el}</h3>
          <div>
            {roleData[el].map((role, index) => (
              <div key={index}>{role.name}</div>
            ))}
          </div>
        </Preview>
      ))}
      <ApiCallButton onClick={submitRoleData}>페이지 뷰 업데이트</ApiCallButton>
    </Container>
  );
};

export default AdminRolePageView;

const Container = styled.div`
  margin: 100px auto;
  max-width: 1000px;
`;

const ApiCallButton = styled.button`
  ${({ theme }) => theme.common.button}
  height: 30px;
  background-color: ${({ theme }) => theme.colors.blue};
  color: #fff;
  font-size: 13px;
`;

const Table = styled.table`
  width: 100%;
  height: 100%;
  max-height: 240px;
  text-align: center;
  table-layout: fixed;
  border-collapse: collapse;
  line-height: 1.5;
  color: black;
`;
const Thead = styled.thead`
  th,
  td {
    background-color: ${({ theme }) => theme.colors.green};
    color: white;
    padding: 10px 0;
  }
`;
const Tbody = styled.tbody`
  th,
  td {
    padding: 10px;
  }
  tr:nth-child(even) {
    background: #dcf2b5;
    background: ${({ theme }) => theme.colors.lightgreen};
  }
`;

const Preview = styled.div`
  display: flex;
  margin: 10px;

  h3 {
    margin-right: 10px;
  }
`;
