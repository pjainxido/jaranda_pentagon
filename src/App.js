import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "components/Nav";
import Teachers from "pages/ParentsPages/Teachers";
import Request from "pages/ParentsPages/Request";
import RequestDetail from "pages/ParentsPages/RequestDetail";
import VisitSchedule from "pages/ParentsPages/ VisitSchedule";
import VisitLog from "pages/ParentsPages/VisitLog";
import ClassRecommendation from "pages/TeacherPages/ClassRecommendation";
import ClassSupport from "pages/TeacherPages/ ClassSupport";
import ClassSchedule from "pages/TeacherPages/ClassSchedule";
import TeacherVisit from "pages/TeacherPages/TeacherVisit";
import TeacherSchedule from "pages/TeacherPages/TeacherSchedule";
import Home from "pages/Home/Home";
import Admin from "pages/Admin";

function App() {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/teachers" component={Teachers} />
        <Route path="/request" component={Request} />
        <Route path="/request_detail" component={RequestDetail} />
        <Route path="/visit_schedule" component={VisitSchedule} />
        <Route path="/visit_log" component={VisitLog} />
        <Route path="/class_recommendation" component={ClassRecommendation} />
        <Route path="/class_support" component={ClassSupport} />
        <Route path="/class_schedule" component={ClassSchedule} />
        <Route path="/teacher_visit" component={TeacherVisit} />
        <Route path="/teacher_schedule" component={TeacherSchedule} />
        <Route path="/admin" component={Admin} />
      </Switch>
    </Router>
  );
}

export default App;
