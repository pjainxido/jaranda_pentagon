import {
  ClassSchedule,
  ClassRecommendation,
  Teachers,
  Request,
  RequestDetail,
  TeacherSchedule,
  VisitSchedule,
  VisitLog,
  ClassSupport,
  TeacherVisit,
} from 'pages/Menu';
import ROUTE_PATH from 'constants/routePath';

const menuRouteMapping = {
  [ROUTE_PATH.CLASS_SCHEDULE]: ClassSchedule,
  [ROUTE_PATH.CLASS_RECOMMENDATION]: ClassRecommendation,
  [ROUTE_PATH.TEACHERS]: Teachers,
  [ROUTE_PATH.REQUEST]: Request,
  [ROUTE_PATH.REQUEST_DETAIL]: RequestDetail,
  [ROUTE_PATH.TEACHER_SCHEDULE]: TeacherSchedule,
  [ROUTE_PATH.VISIT_SCHEDULE]: VisitSchedule,
  [ROUTE_PATH.VISIT_LOG]: VisitLog,
  [ROUTE_PATH.CLASS_SUPPORT]: ClassSupport,
  [ROUTE_PATH.TEACHER_VISIT]: TeacherVisit,
};

export default menuRouteMapping;
