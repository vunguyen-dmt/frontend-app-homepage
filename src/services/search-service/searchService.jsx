/* eslint-disable import/prefer-default-export */
import { getHttpClient } from '@edx/frontend-platform/auth';
import { getConfig } from '@edx/frontend-platform';

// export const searchCourse = (query) => {
//   const body = new FormData();
//   body.append('search_string', query.query);
//   body.append('page_size', query.limit);
//   body.append('page_index', query.page - 1);
//   return getAuthenticatedHttpClient().post(`${getConfig().LMS_BASE_URL}/search/course_discovery/`, body);
// };

export const searchCourse = (query) => {
  // const body = new FormData();
  // body.append('search_string', query.query);
  // body.append('page_size', query.limit);
  // body.append('page_index', query.page - 1);
  const body = {
    query: query.query,
    page: query.page,
    pageSize: query.limit,
  };

  var baseUrl = "https://api.hutech-elearning-insights.goamazing.org";
  // var baseUrl = "https://localhost:5001";

  return getHttpClient().post(`${baseUrl}/search`, body);
};
