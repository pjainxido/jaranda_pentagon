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

const menuRouteMapping = {
  class_schedule: ClassSchedule,
  class_recommendation: ClassRecommendation,
  teachers: Teachers,
  request: Request,
  request_detail: RequestDetail,
  teacher_schedule: TeacherSchedule,
  visit_schedule: VisitSchedule,
  visit_log: VisitLog,
  class_support: ClassSupport,
  teacher_visit: TeacherVisit,
};

export default menuRouteMapping;
