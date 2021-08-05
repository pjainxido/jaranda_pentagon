import React from "react";
import { Route, Link } from "react-router-dom";
import {
  Teachers,
  Request,
  RequestDetail,
  VisitSchedule,
  VisitLog,
} from "pages/Parent";
import { PrivateRoute } from "components/Route";
import PropTypes from "prop-types";

const Parent = ({ match }) => {
  // role

  // role menu api
  return (
    <>
      <h1>메인</h1>

      <PrivateRoute path='/parent/request' component={Request} />
      <PrivateRoute path='/parent/teachers' component={Teachers} />
      <PrivateRoute path='/parent/request-detail' component={RequestDetail} />
      {match.isExact && (
        <>
          <Link to='/parent/request'>Request</Link>
          <span> </span>
          <Link to='/parent/teachers'>Teachers</Link>
          <span> </span>
          <Link to='/parent/request-detail'>RequestDetail</Link>
        </>
      )}
    </>
  );
};

Parent.propTypes = {
  match: PropTypes.object,
};

export default Parent;
