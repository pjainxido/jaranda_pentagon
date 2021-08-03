import React, { useState, useEffect } from "react";
import RoleSelectorItem from "./RoleSelectorItem";
import styled from "styled-components";

const AdminRolePageView = () => {
  const mockPageViewList = ["사자", "호랑이", "코끼리", "기린", "개", "고양이"];
  const mockRoleData = {
    teacher: ["사자", "고양이"],
    parent: ["코끼리"],
  };
  const [pageViewList, setPageViewList] = useState([]);
  const [roleData, setRoleData] = useState({});

  useEffect(() => {
    // get pageViewlist roleData from api
    setPageViewList(mockPageViewList);
    setRoleData(mockRoleData);
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
          {pageViewList.map((item, index) => (
            <RoleSelectorItem
              pageViewName={item}
              checkRole={checkRole}
              roleNameList={roleNameList()}
              checkItemChange={checkItemChange}
              key={index}
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

const ApiCallButton = styled.button``;

const Table = styled.table`
  text-align: center;
`;
const Thead = styled.thead`
  th,
  td {
    padding: 10px;
    border: 1px solid red;
  }
`;
const Tbody = styled.tbody`
  th,
  td {
    padding: 10px;
    border: 1px solid red;
  }
`;