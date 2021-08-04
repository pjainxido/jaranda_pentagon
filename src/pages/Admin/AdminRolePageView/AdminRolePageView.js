import React, { useState, useEffect } from "react";
import RoleSelectorItem from "./RoleSelectorItem";
import styled from "styled-components";
import { getAllMenus } from "api/menu";
import { getAllRoles } from "api/role";

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
          roles[id] = fetchRoleData
            .find((role) => role.id === id)
            .menu.map((el) => el.name);
        }
      }

      console.log(roles);

      setRoleData(roles);
      setPageViewList(allMenu.map((menu) => menu.name));
    } catch (err) {
      console.error(err);
    }
  }, []);

  const checkRole = (role, pageViewName) => {
    return roleData[role].includes(pageViewName);
  };

  const handleRoleData = (role, isRemove, pageViewName) => {
    if (isRemove) {
      setRoleData((prev) => ({
        ...prev,
        [role]: prev[role].filter((item) => item !== pageViewName),
      }));
    } else {
      setRoleData((prev) => ({
        ...prev,
        [role]: [...prev[role], pageViewName],
      }));
    }
  };

  const checkItemChange = (e, role) => {
    const pageViewName = e.target.name;
    const isExistAndRemove = roleData[role].includes(pageViewName);
    handleRoleData(role, isExistAndRemove, pageViewName);
  };

  const submitRoleData = () => {
    console.log(roleData);
    // roleData api로 보냄
  };

  const roleNameList = () => {
    return Object.keys(roleData);
  };

  return (
    <Container>
      <Table>
        <Thead>
          <tr>
            <th>메뉴명 \ 권한명</th>
            {roleNameList().map((role, index) => (
              <th key={index}>{role}</th>
            ))}
          </tr>
        </Thead>
        <Tbody>
          {pageViewList.map((name, index) => (
            <RoleSelectorItem
              key={index}
              pageViewName={name}
              checkRole={checkRole}
              roleNameList={roleNameList()}
              checkItemChange={checkItemChange}
            />
          ))}
        </Tbody>
      </Table>
      teacher pageview list
      <div>{roleData?.teacher}</div>
      parent pageview list
      <div>{roleData?.parent}</div>
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
  border: 1px solid black;
  color: black;
  width: 100%;
  height: 100%;
  max-height: 240px;
  text-align: center;
  table-layout: fixed;
`;
const Thead = styled.thead`
  th,
  td {
    border: 1px solid black;
    border-collapse: collapse;
    padding: 10px 0;
  }
`;
const Tbody = styled.tbody`
  th,
  td {
    border: 1px solid black;
    border-collapse: collapse;
    padding: 10px;
  }
`;
