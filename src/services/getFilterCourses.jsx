import { getHttpClient } from '@edx/frontend-platform/auth';

export const getFilterCourses = () => {

  var baseUrl = "https://api.hutech-elearning-insights.goamazing.org";
  // var baseUrl = "https://localhost:5001";
  return getHttpClient().get(`${baseUrl}/search/filters_v2`);
};