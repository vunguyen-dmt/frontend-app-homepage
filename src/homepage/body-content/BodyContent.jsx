import React, { useState, useEffect } from 'react';
import { useIntl } from '@edx/frontend-platform/i18n';
import {
  ArrowForward, AutoStories, EventNote,
} from '@openedx/paragon/icons';
import {
  Hyperlink, Card, Icon, Carousel, ModalDialog, Button
} from '@openedx/paragon';
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';
import SearchFilter from '../../components/SearchFilter/SearchFilter';

import Event from '../../components/Event/Event';
import messages from '../../messages/messages';
import trainingUnit from '../data/training-unit.json';
import './BodyContent.scss';
import ChatBot from '../../components/chat-bot/chat-bot';
import { getFilterCourses } from '../../services/getFilterCourses';
import feature_courses from './feature_courses'
import newsList from '../../news/news_list';
import NewsDetailModal from '../../news/NewsDetailsModal';

const BodyContent = () => {
  const { formatMessage } = useIntl();
  const [courses, setCourses] = useState(feature_courses);
  const [filterRuns, setFilterRuns] = useState([]);

  // const cdn = "https://d10g66pf9vjy7h.cloudfront.net";
  const cdn = "https://hutech-media.goamazing.org/hutech-statics";

  useEffect(() => {
    setCourses(feature_courses);
    // const coursesUrl = `${cdn}/media/home-page-resources/courses.json?t=${+new Date()}`;
    // // const coursesUrl = `https://apps.courses.goamazing.org:3000/courses.json?t=${+new Date()}`;
    // fetch(coursesUrl).then(response => response.json())
    //   .then(data => {
    //     setCourses(data.courses);
    //   }).catch(err => {
    //     console.log(`error loading courses: ${err}`);
    //   });

    getFilterCourses().then(response => {
      const responseData = response.data.results.runs;
      const sortedFilterRuns = responseData.sort((a, b) => {
        if (b.count !== a.count) {
          return b.count - a.count;
        }
        return a.vKey.localeCompare(b.vKey);
      });
      
      setFilterRuns(sortedFilterRuns.slice(0, 10));
    })

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
              <div className="w-xl-25 px-md-5 px-sm-3">
                  <div className="blank-area"></div>
                  <div className="search-common-course d-flex flex-row flex-xl-column">
                    <div className="icon-info">
                      <img src={cdn + "/media/images/homepage-v2025/icon_1.png"} alt="icon_1" />
                      <SearchFilter data={filterRuns} nameFilter={formatMessage(messages.semester)} type="semester"/>
                    </div>
                    <div className="icon-info-line"></div>
                    <div className="icon-info">
                      <img src={cdn + "/media/images/homepage-v2025/icon_2.png"} alt="icon_2" />
                      <SearchFilter data={trainingUnit} nameFilter={formatMessage(messages.trainingUnit)} type="unit"/>
                    </div>
                    <div className="icon-info-line"></div>
                  </div>
              </div>

              <div className="popular-courses">
                  <div className="px-4 px-xl-5 py-3 text-primary">
                    <div className='body-text-title'>{formatMessage(messages.popularCourses)}</div>
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
                    <a className="button" href="/courses/">{formatMessage(messages.viewMore)}</a>
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

              <div className="bg-white videos">
                <VideoPlayer
                  sources={["https://hutech-media.goamazing.org/hutech-statics/media/videos/HD-Dang-Nhap-LMS-20240821.mp4", "https://d10g66pf9vjy7h.cloudfront.net/media/videos/HD-Dang-Nhap-LMS-20240821.mp4"]}
                  title="Dành cho người học"
                  videoPoster={cdn + "/media/images/homepage-v2025/video-thumbnail-01.png"}
                />
                <VideoPlayer
                  sources={["https://hutech-media.goamazing.org/hutech-statics/media/videos/cau-truc-khoa-hoc-he-chinh-quy.mp4", "https://d10g66pf9vjy7h.cloudfront.net/media/videos/cau-truc-khoa-hoc-he-chinh-quy.mp4"]}
                  title="Dành cho giảng viên"
                  videoPoster={cdn + "/media/images/homepage-v2025/video-thumbnail-02.jpg"}
                />
              </div>
              <Carousel className="video-carousel">
                <Carousel.Item interval={1000000}>
                  <div className="video-wrapper">
                    <video poster={cdn + "/media/home-page-resources/video-thumbnail-01.jpg"} controls>
                      <source src='https://hutech-media.goamazing.org/hutech-statics/media/videos/HD-Dang-Nhap-LMS-20240821.mp4'type="video/mp4"/>
                    </video>
                    <div>Dành cho người học</div>
                  </div>
                </Carousel.Item>
                <Carousel.Item interval={1000000}>
                  <div className="video-wrapper">
                    <video poster={cdn + "/media/home-page-resources/video-thumbnail-02.jpg"} controls>
                      <source src='https://hutech-media.goamazing.org/hutech-statics/media/videos/cau-truc-khoa-hoc-he-chinh-quy.mp4'type="video/mp4"/>
                    </video>
                    <div>Dành cho giảng viên</div>
                  </div>
                </Carousel.Item>
              </Carousel>
            </div>

            <div className="flex-shrink-0 pr-xl-6"></div>
          </section>

          <section id="news_event" className="news-event-wrapper d-flex flex-column flex-xl-row flex-lg-nowrap px-4 px-xl-5 pb-3">
            <div className="w-0 w-xl-25"></div>

            <div className="news-event-content d-flex flex-column flex-md-row flex-lg-nowrap justify-content-between">
              <div>
                <div className="news-events-text">{formatMessage(messages.newsInfo)}</div>
                
                <Carousel interval={5000} indicators={true} slide={false} fade={true}>
                  {
                    newsList
                      .slice(0,5)
                      .map(i => (
                      <Carousel.Item key={i.id}>
                        <img
                          className="/*d-block*/ w-100"
                          src={i.image}
                          alt={i.title}
                        />
                        <Carousel.Caption>
                          <a className="carousel-title"  href={'/news/' + i.slug} >{i.title}</a>
                          <div className="carousel-description font-italic">{i.description}</div>
                        </Carousel.Caption>
                      </Carousel.Item>
                    ))
                  }
                </Carousel>
              </div>
              
              <div>
                <div className="text-md-right news-events-text">{formatMessage(messages.newsEvent)}</div>
                <Event />
              </div>
            </div>

            <div className="flex-shrink-0 pr-xl-6"></div>
          </section>
          <NewsDetailModal slug={newsList[0].slug}/>
        </div>
        <ChatBot />


      </div>
    </>
  );
};

export default BodyContent;
