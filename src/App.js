import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "components/Nav";
import Teachers from "pages/Parent/Teachers";
import Request from "pages/Parent/Request";
import RequestDetail from "pages/Parent/RequestDetail";
import VisitSchedule from "pages/Parent/VisitSchedule";
import VisitLog from "pages/Parent/VisitLog";
import ClassRecommendation from "pages/Teacher/ClassRecommendation";
import ClassSupport from "pages/Teacher/ClassSupport";
import ClassSchedule from "pages/Teacher/ClassSchedule";
import TeacherVisit from "pages/Teacher/TeacherVisit";
import TeacherSchedule from "pages/Teacher/TeacherSchedule";
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
        <Route path="/admin/menu-role" exact component={AdminRolePageView} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
