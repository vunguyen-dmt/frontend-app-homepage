import React, { useState, useEffect } from 'react';
import { useIntl } from '@edx/frontend-platform/i18n';
import {
  ArrowForward, AutoStories, EventNote,
} from '@openedx/paragon/icons';
import {
  Hyperlink, Card, Icon,
} from '@openedx/paragon';
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';
import messages from '../../messages/messages';
import './BodyContent.scss';

const BodyContent = () => {
  const { formatMessage } = useIntl();
  const [courses, setCourses] = useState([]);

  // const cdn = "https://d10g66pf9vjy7h.cloudfront.net";
  const cdn = "https://hutech-media.goamazing.org/hutech-statics";

  useEffect(() => {
    const coursesUrl = `${cdn}/media/home-page-resources/courses.json?t=${+new Date()}`;
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
        <div className="tl">{formatMessage(messages.guide)}</div>
        <div className="d-flex py-3 home-videos">
          <VideoPlayer
            sources={["https://hutech-media.goamazing.org/hutech-statics/media/videos/HD-Dang-Nhap-LMS-20240821.mp4", "https://d10g66pf9vjy7h.cloudfront.net/media/videos/HD-Dang-Nhap-LMS-20240821.mp4"]}
            title="Cách đăng nhập HUTECH eLearning"
            videoPoster={cdn + "/media/home-page-resources/video-thumbnail-01.jpg"}
          />
          <VideoPlayer
            sources={["https://hutech-media.goamazing.org/hutech-statics/media/videos/huongdantracnghiemtuluan-26-05-fix.mp4", "https://d10g66pf9vjy7h.cloudfront.net/media/videos/huongdantracnghiemtuluan-26-05-fix.mp4"]}
            title="Cách làm bài tập HUTECH eLearning"
            videoPoster={cdn + "/media/home-page-resources/video-thumbnail-02.jpg"}
          />
          <VideoPlayer
            sources={["https://hutech-media.goamazing.org/hutech-statics/media/videos/cau-truc-khoa-hoc-he-chinh-quy.mp4", "https://d10g66pf9vjy7h.cloudfront.net/media/videos/cau-truc-khoa-hoc-he-chinh-quy.mp4"]}
            title="Cấu trúc khóa học hệ chính quy"
            videoPoster={cdn + "/media/home-page-resources/video-thumbnail-03.jpg"}
          />
        </div>
      </div>
      <div className="container container-mw-lg">
        <div className="tl">{formatMessage(messages.popularCourses)}</div>
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
                            <Icon src={AutoStories} />
                            {messages[item.tag] ? formatMessage({...messages[item.tag]}) : item.tag}
                          </div>
                          <div>
                            <Icon src={EventNote} />
                            {item.numberOfLessons} {formatMessage(messages.Lessons)}
                          </div>
                        </div>
                      </Card>
                    ))
           }
        </div>
        <div className="mt-3 text-right view-more-courses-wrapper">
          <a className="view-more-courses" href="/courses/"><Icon src={ArrowForward} /></a>
        </div>
      </div>
    </div>
  );
};

export default BodyContent;
