import React, { useState, useEffect } from 'react';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { ContentPaste, ArrowForward } from '@edx/paragon/icons';
import {
  Hyperlink, Card, Badge, Icon,
} from '@edx/paragon';
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';
import messages from '../../messages/messages';
import './BodyContent.scss';

const BodyContent = ({ intl }) => {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    const coursesUrl = `https://hutech-statics.s3.ap-southeast-1.amazonaws.com/media/home-page-resources/courses.json?t=${+new Date()}`;
    // const coursesUrl = `https://apps.courses.goamazing.org:3000/courses.json?t=${+new Date()}`;
    fetch(coursesUrl).then(response => response.json())
      .then(data => {
        setCourses(data.courses);
      }).catch(err => {
        console.log(`error loading courses: ${err}`);
      });
  }, []);

  return (
    <div className="home-body-content-wrapper">
      <div className="body-content container container-mw-lg">
        <div className="tl">{intl.formatMessage(messages.guide)}</div>
        <div className="d-flex py-3 home-videos">
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
      <div className="container container-mw-lg">
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
                            <Badge variant="light">{intl.formatMessage(messages[item.tag])}</Badge>
                          </div>
                          <div><ContentPaste /> {item.numberOfLessons} {intl.formatMessage(messages.Lessons)}</div>
                        </div>
                      </Card>
                    ))
           }
        </div>
        <div className="mt-3 text-right view-more-courses-wrapper">
          <a className="view-more-courses" href="/courses"><Icon src={ArrowForward} /></a>
          {/* <a href="/courses">{intl.formatMessage(messages.viewMoreCourses)}</a> */}
        </div>
      </div>
    </div>
  );
};

BodyContent.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(BodyContent);
