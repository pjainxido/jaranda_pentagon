import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const RoleSelectorItem = ({ pageView, getRoleNameList, getCheckedRole, handleRoleData }) => {
  return (
    <Tr>
      <PageName>{pageView.name}</PageName>
      <PageName>{pageView.route}</PageName>
      {getRoleNameList.map((role, index) => (
        <CheckBoxContainer key={index}>
          <CheckBox type='checkbox' name={pageView.name} checked={getCheckedRole(role, pageView)} onChange={() => handleRoleData(role, pageView)} />
        </CheckBoxContainer>
      ))}
    </Tr>
  );
};

RoleSelectorItem.propTypes = {
  pageView: PropTypes.object,
  getRoleNameList: PropTypes.array,
  getCheckedRole: PropTypes.func,
  handleRoleData: PropTypes.func,
};

export default RoleSelectorItem;

const Tr = styled.tr``;
const PageName = styled.td``;
const CheckBoxContainer = styled.td``;
const CheckBox = styled.input`
  width: 15px;
  height: 15px;
  cursor: pointer;
`;
