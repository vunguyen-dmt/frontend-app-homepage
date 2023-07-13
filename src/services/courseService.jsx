import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { getConfig } from '@edx/frontend-platform';

export const getCourseDetails = (courseId) => {
  return getAuthenticatedHttpClient().get(`${getConfig().LMS_BASE_URL}/api/courses/v1/courses/${courseId}/`);
};
