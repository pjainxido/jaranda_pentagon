import React from 'react';
import PropTypes from 'prop-types';

const RoleSelectorItem = ({ pageViewName, checkRole, checkItemChange}) => {
  return (
    <li>
      <span>{pageViewName}</span>
      <div>
        teacher
        <input type='checkbox' name={pageViewName} checked={checkRole('teacher',pageViewName)} onChange={(e)=>checkItemChange(e,'teacher')}/>
      </div>
      <div>
        parent
        <input type='checkbox' name={pageViewName} checked={checkRole('parent',pageViewName)} onChange={(e)=>checkItemChange(e,'parent')}/>
      </div>
    </li>
  );
};

RoleSelectorItem.propTypes ={
  pageViewName: PropTypes.string,
  checkRole: PropTypes.func,
  checkItemChange: PropTypes.func
}

export default RoleSelectorItem;
