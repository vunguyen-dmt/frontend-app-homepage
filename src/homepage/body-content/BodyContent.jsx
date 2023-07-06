import React, { useState, useEffect } from 'react';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { AccessTime, ContentPaste } from '@edx/paragon/icons';
import { VideoPlayer } from '../../components';
import messages from '../messages';
import './BodyContent.scss';

const BodyContent = ({ intl }) => {
  // const [courses, setCourses] = useState([]);
  // useEffect(() => {
  //   fetch(`https://hutech-public.s3.ap-southeast-1.amazonaws.com/home-page-resource/courses.json?t=${+new Date()}`).then(response => response.json())
  //     .then(data => {
  //       console.log(data.courses);
  //       setCourses(data.courses);
  //     }).catch(err => {
  //       console.log(`error loading courses: ${err}`);
  //     });
  // }, []);
  return (
    <div className="body-content-wrapper">
      <div className="body-content container section-mw">
        <div className="tl">{intl.formatMessage(messages.guide)}</div>
        <div className="d-flex flex-wrap justify-content-center py-3">
          <VideoPlayer
            source="https://hutech-statics.s3.ap-southeast-1.amazonaws.com/media/videos/huong-dan-dang-nhap.mp4"
            title="Cách đăng nhập HUTECH eLearning"
            videoPoster="poster1"
          />
          <VideoPlayer
            source="https://hutech-statics.s3.ap-southeast-1.amazonaws.com/media/videos/huongdantracnghiemtuluan-26-05-fix.mp4"
            title="Cách làm bài tập HUTECH eLearning"
            videoPoster="poster2"
          />
        </div>
      </div>
      {/* <div className="container section-mw">
        <div className="tl">{intl.formatMessage(messages.popularCourses)}</div>
        <div className="courses">
          {
                    courses.map((course) => (
                      <div key={course.id} className="course rounded-lg shadow-lg">
                        <div><a href={course.aboutPage}><img alt="course" className="image" src={course.image} /></a></div>
                        <div><a className="name" href={course.aboutPage}>{course.name}</a></div>
                        <div className="px-3 desc">{course.description}</div>
                        <div className="foot">
                          <div><AccessTime /> {course.totalTime} Giờ</div>
                          <div><ContentPaste /> {course.numberOfLessons} Bài học</div>
                        </div>
                      </div>
                    ))
           }
        </div>
        <div className="mt-3 text-center">
          <a href="https://lms.hutech.edu.vn/courses">{intl.formatMessage(messages.viewMoreCourses)}</a>
        </div>
      </div> */}
    </div>
  );
};

BodyContent.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(BodyContent);
