import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "components/Nav";
import {
  Teachers,
  Request,
  RequestDetail,
  VisitSchedule,
  VisitLog,
} from "pages/Parent";
import {
  ClassRecommendation,
  ClassSupport,
  ClassSchedule,
  TeacherVisit,
  TeacherSchedule,
} from "pages/Teacher";

import Home from "pages/Home/Home";
import AdminRolePageView from "pages/Admin/AdminRolePageView";
import Admin from "pages/Admin";
import SignUp from "pages/SignUp";
import Login from "pages/Login";

function App() {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/parent/teachers" component={Teachers} />
        <Route path="/parent/request" component={Request} />
        <Route path="/parent/request_detail" component={RequestDetail} />
        <Route path="/parent/visit_schedule" component={VisitSchedule} />
        <Route path="/parent/visit_log" component={VisitLog} />
        <Route
          path="/teacher/class_recommendation"
          component={ClassRecommendation}
        />
        <Route path="/teacher/class_support" component={ClassSupport} />
        <Route path="/teacher/class_schedule" component={ClassSchedule} />
        <Route path="/teacher/teacher_visit" component={TeacherVisit} />
        <Route path="/teacher/teacher_schedule" component={TeacherSchedule} />
        <Route path="/admin" exact component={Admin} />
        <Route path="/admin/manage_role" exact component={AdminRolePageView} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
