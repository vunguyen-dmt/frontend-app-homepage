import React, { useState, useEffect } from 'react';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { ContentPaste } from '@edx/paragon/icons';
import { Hyperlink, Card, Badge } from '@edx/paragon';
import AOS from 'aos';
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';
import messages from '../../messages/messages';
import './BodyContent.scss';

const BodyContent = ({ intl }) => {
  const [courses, setCourses] = useState([]);
  // useEffect(() => {
  //   fetch(`https://apps.courses.goamazing.org:3000/courses.json?t=${+new Date()}`).then(response => response.json())
  //     .then(data => {
  //       setCourses(data.courses);
  //     }).catch(err => {
  //       console.log(`error loading courses: ${err}`);
  //     });
  // }, []);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <div className="body-content-wrapper">
      <div className="body-content container section-mw">
        <div className="tl">{intl.formatMessage(messages.guide)}</div>
        <div className="d-flex flex-wrap py-3">
          <VideoPlayer
            aos="fade-right"
            source="https://hutech-statics.s3.ap-southeast-1.amazonaws.com/media/videos/huong-dan-dang-nhap.mp4"
            title="Cách đăng nhập HUTECH eLearning"
            videoPoster="poster1"
          />
          <VideoPlayer
            aos="fade-left"
            source="https://hutech-statics.s3.ap-southeast-1.amazonaws.com/media/videos/huongdantracnghiemtuluan-26-05-fix.mp4"
            title="Cách làm bài tập HUTECH eLearning"
            videoPoster="poster2"
          />
        </div>
      </div>
      {/* <div className="container section-mw">
        <div className="tl">{intl.formatMessage(messages.popularCourses)}</div>
        <div className="courses d-flex">
          {
                    courses.map((item) => (
                      <Card
                        key={item.id}
                        as={Hyperlink}
                        destination={item.aboutPage}
                        isClickable
                      >
                        <Card.ImageCap
                          src={item.image}
                          srcAlt="course image"
                          logoSrc={item.orgLogo}
                          logoAlt="org logo"
                        />
                        <Card.Header
                          title={item.name}
                        />
                        <Card.Section>
                          <div className="desc">{item.description}</div>
                          <div className="space" />
                        </Card.Section>
                        <div className="foot">
                          <div>
                            <Badge variant="light">{intl.formatMessage(messages.Course)}</Badge>
                          </div>
                          <div><ContentPaste /> {item.numberOfLessons} {intl.formatMessage(messages.Lessons)}</div>
                        </div>
                      </Card>
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
