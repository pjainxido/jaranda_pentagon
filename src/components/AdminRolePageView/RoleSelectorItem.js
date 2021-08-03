import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const RoleSelectorItem = ({
  pageViewName,
  roleNameList,
  checkRole,
  checkItemChange,
}) => {
  return (
    <Tr>
      <PageName>{pageViewName}</PageName>
      {roleNameList.map((role, index) => (
        <CheckBoxContainer key={index}>
          <CheckBox
            type="checkbox"
            name={pageViewName}
            checked={checkRole(role, pageViewName)}
            onChange={(e) => checkItemChange(e, role)}
          />
        </CheckBoxContainer>
      ))}
    </Tr>
  );
};

RoleSelectorItem.propTypes = {
  pageViewName: PropTypes.string,
  roleNameList: PropTypes.array,
  checkRole: PropTypes.func,
  checkItemChange: PropTypes.func,
};

export default RoleSelectorItem;

const Tr = styled.tr``;
const PageName = styled.td``;
const CheckBoxContainer = styled.td``;
const CheckBox = styled.input`
  cursor: pointer;
`;
