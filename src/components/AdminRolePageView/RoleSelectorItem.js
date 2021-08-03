import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Item = styled.li`
  display: flex;
`
const CheckBoxContainer = styled.div``;

const RoleSelectorItem = ({ pageViewName, checkRole, checkItemChange}) => {
  return (
    <Item>
      <span>{pageViewName}</span>
      <CheckBoxContainer>
        teacher
        <input type='checkbox' name={pageViewName} checked={checkRole('teacher',pageViewName)} onChange={(e)=>checkItemChange(e,'teacher')}/>
      </CheckBoxContainer>
      <CheckBoxContainer>
        parent
        <input type='checkbox' name={pageViewName} checked={checkRole('parent',pageViewName)} onChange={(e)=>checkItemChange(e,'parent')}/>
      </CheckBoxContainer>
    </Item>
  );
};

RoleSelectorItem.propTypes ={
  pageViewName: PropTypes.string,
  checkRole: PropTypes.func,
  checkItemChange: PropTypes.func
}

export default RoleSelectorItem;
