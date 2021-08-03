import React, { useState, useEffect } from 'react';
import RoleSelectorItem from './RoleSelectorItem';
import styled from 'styled-components';

const Container = styled.div`
 ul{

 }
`

const ApiCallButton = styled.button`

`

const AdminRolePageView = () => {
  const mockPageViewList = ['사자', '호랑이', '코끼리', '기린', '개', '고양이'];
  const mockRoleData = {
    teacher: ['사자', '고양이'],
    parent: ['코끼리'],
  };
  const [pageViewList, setPageViewList] = useState([]);
  const [roleData, setRoleData] = useState(null);

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
    console.log(roleData[role]);
    if (roleData[role].includes(pageViewName)) {
      handleRoleData(role, true, pageViewName);
    } else {
      handleRoleData(role, false, pageViewName);
    }
  };

  const submitRoleData = () =>{
    console.log(roleData);
    // roleData api로 보냄
  }

  return (
    <Container>
      <ul>
        {pageViewList.map((item, index) => {
          return <RoleSelectorItem pageViewName={item} checkRole={checkRole} checkItemChange={checkItemChange} key={index} />;
        })}
      </ul>
      teacher pageview list
      <div>{roleData?.teacher}</div>
      parent pageview list
      <div>{roleData?.parent}</div>
      <ApiCallButton onClick={submitRoleData}>페이지 뷰 업데이트</ApiCallButton>
    </Container>
  );
};

export default AdminRolePageView;
