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
import ChatBot from '../../components/chat-bot/chat-bot';

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
    <>
      <div className='body-content-wrapper'>
        <div className='body-content'>

          <section id="fixed_social_icons">
              <div className="d-flex flex-column social-icons">
                <a href="https://www.facebook.com/profile.php?id=100092564956873">
                  <img src={cdn + "/media/images/homepage-v2025/facebook.png"} alt="facebook" />
                </a>
                <a href="https://x.com/hutechvietnam">
                  <img src={cdn + "/media/images/homepage-v2025/x.png"} alt="x-social" />
                </a>
                <a href="https://www.youtube.com/c/HUTECHChannel">
                  <img src={cdn + "/media/images/homepage-v2025/youtube.png"} alt="youtube" />
                </a>
                <a href="https://www.instagram.com/hutechuniversity">
                  <img src={cdn + "/media/images/homepage-v2025/instagram.png"} alt="instagram" />
                </a>
              </div>
          </section>
          
          <section id="common_courses" className="common-courses d-flex flex-column flex-xl-row px-xl-5 pb-3">
              <div className="w-xl-25 px-md-5 px-3">
                  <div className="blank-area"></div>
                  <div className="search-common-course d-flex flex-row flex-xl-column">
                    <div className="icon-info">
                      <img src={cdn + "/media/images/homepage-v2025/icon_1.png"} alt="icon_1" />
                      <span>Năm học</span>
                    </div>
                    <div className="icon-info-line"></div>
                    <div className="icon-info">
                      <img src={cdn + "/media/images/homepage-v2025/icon_2.png"} alt="icon_2" />
                      <span>Đơn vị đào tạo</span>
                    </div>
                    <div className="icon-info-line"></div>
                    <div className="icon-info">
                      <img src={cdn + "/media/images/homepage-v2025/icon_2.png"} alt="icon_2" />
                      <span className="">Lĩnh vực</span>
                    </div>
                    <div className="icon-info-line"></div>
                  </div>
              </div>

              <div className="popular-courses">
                  <div className="px-4 px-xl-5 py-3 bg-white text-primary">
                    <div className='body-text-title'>{formatMessage(messages.popularCourses)}</div>
                    {/* <div className='body-text-title'>Các khóa học phổ biến</div> */}
                  </div>

                  <div className="courses-bg d-flex flex-sm-nowrap flex-md-wrap justify-content-around justify-content-xl-center p-4 pt-xl-5">
                      {
                          courses.map((item) => (
                              <div className="py-2 px-3 p-md-2 ">
                                <div className="card" id={item.id}>
                                  <img src={item.image} alt="John" />
                                  <a href={item.aboutPage} className="course-name">{item.name}</a>
                                  <div className="description">{item.description}</div>
                                  <a className="button course-btn" href="/courses/" >
                                    {messages[item.tag] ? formatMessage({...messages[item.tag]}) : item.tag}
                                  </a>
                                  <div className="pb-4"></div>
                                </div>
                              </div>
                              )
                          )
                      }
                      
                  </div>

                  <div className="readmore-btn pb-3">
                    <a className="button" href="/courses/" >Xem thêm</a>
                  </div>
              </div>

              <div className="flex-shrink-0 pr-6"></div>
          </section>

          <section id="video_user_guide" className="guide-video-wrapper d-flex flex-column flex-xl-row flex-lg-nowrap px-4 px-xl-5 pb-5">
            <div className="video-blank-area w-0 w-xl-25"></div>

            <div className="guide-video text-white">
              <div className="px-sm-0 px-md-4 px-xl-5 py-3">
                <div className="body-text-title">{formatMessage(messages.guide)}</div>
              </div>

              <div className="bg-white d-flex flex-column flex-md-row justify-content-center p-3">
                <VideoPlayer
                  videoId="learner" 
                  sources={["https://hutech-media.goamazing.org/hutech-statics/media/videos/HD-Dang-Nhap-LMS-20240821.mp4", "https://d10g66pf9vjy7h.cloudfront.net/media/videos/HD-Dang-Nhap-LMS-20240821.mp4"]}
                  title="Dành cho người học"
                  videoPoster={cdn + "/media/images/homepage-v2025/video-thumbnail-01.png"}
                />
                <VideoPlayer
                  videoId="instructor" 
                  sources={["https://hutech-media.goamazing.org/hutech-statics/media/videos/cau-truc-khoa-hoc-he-chinh-quy.mp4", "https://d10g66pf9vjy7h.cloudfront.net/media/videos/cau-truc-khoa-hoc-he-chinh-quy.mp4"]}
                  title="Dành cho giảng viên"
                  videoPoster={cdn + "/media/images/homepage-v2025/video-thumbnail-02.jpg"}
                />
              </div>
            </div>

            <div className="flex-shrink-0 pr-xl-6"></div>
          </section>

          <section id="end-body">
            <div className="end-body"></div>
          </section>
        </div>
        <ChatBot />
      </div>
    </>
  );
};

export default BodyContent;
