import React, { useState, useEffect, useRef  } from 'react';
import { useIntl } from '@edx/frontend-platform/i18n';
import {
  KeyboardArrowRight
} from '@openedx/paragon/icons';
import {
   Icon, Carousel
} from '@openedx/paragon';
import SearchFilter from '../../components/SearchFilter/SearchFilter';
import Event from '../../components/Event/Event';
import messages from '../../messages/messages';
import trainingUnit from '../data/training-unit.json';
import './BodyContent.scss';
import ChatBot from '../../components/chat-bot/chat-bot';
import { getFilterCourses } from '../../services/getFilterCourses';
import { feature_courses } from './feature_courses';
import { newsList } from '../../news/news_list';
import NewsDetailModal from '../../news/NewsDetailsModal';

const BodyContent = () => {
  const { formatMessage } = useIntl();
  const [courses, setCourses] = useState(feature_courses);
  const [filterRuns, setFilterRuns] = useState([]);
  const [faculties, setFaculties] = useState([]);

  const newsDetailsModalRef = useRef();
  const news = newsList.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3);
  const cdn = "https://hutech-media.goamazing.org/hutech-statics";

  useEffect(() => {
    setCourses(feature_courses);
    getFilterCourses().then(response => {
      var orgDict = {};
      response.data.results.orgs.forEach((i) => {
        orgDict[i.vKey] = i;
      });

      var newFaculties = [];
      trainingUnit.forEach((i) => {
        if(orgDict[i.id]) {
          i.count = orgDict[i.id].count;
        }
        newFaculties.push(i);
      })

      setFaculties(newFaculties);
      const year = (new Date()).getFullYear() + 1;
      const validFormatRegex = /^HK\d+-\d{4}-\d{4}$/;
      const runs = response.data.results.runs.filter(item => validFormatRegex.test(item.vKey) && isAcceptableRuns(item.vKey, year));
      const sortedFilterRuns = runs.sort((a, b) => {
        const [hkA, y1A, y2A] = a.vKey.match(/\d+/g).map(Number);
        const [hkB, y1B, y2B] = b.vKey.match(/\d+/g).map(Number);
        if (y2A !== y2B) return y2B - y2A;
        if (y1A !== y1B) return y1B - y1A;
        return hkB - hkA;
      }).slice(0, 5);
      setFilterRuns(sortedFilterRuns);
    })

  }, []);

  const openNewsModal = (slug) => {
    newsDetailsModalRef.current.openModal(slug);
  }

  const isAcceptableRuns = (run, year) => {
    if (!run.startsWith('HK')) return false;
    const [hkA, y1A, y2A] = run.match(/\d+/g).map(Number);
    if (y2A >  year) return false;
    return true;
  }

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
          
          <section id="popular_courses" className="popular-courses-wrapper">
            <div className="popular-courses d-flex flex-column flex-xl-row px-xl-5 pb-3">
              <div className="px-md-3 /*w-xl-25 px-sm-3*/">
                <div className="blank-area"></div>
                <div className="search-common-course d-flex flex-row flex-xl-column">
                  <div className="icon-info">
                    <img src={cdn + "/media/images/homepage-v2025/icon_1.png"} alt="icon_1" />
                    <SearchFilter data={filterRuns} nameFilter={formatMessage(messages.semesters)} type="semester"/>
                  </div>
                  <div className="icon-info-line"></div>
                  <div className="icon-info">
                    <img src={cdn + "/media/images/homepage-v2025/icon_2.png"} alt="icon_2" />
                    <SearchFilter data={trainingUnit} nameFilter={formatMessage(messages.faculties)} type="unit"/>
                  </div>
                  <div className="icon-info-line"></div>
                </div>
              </div>
              <div className="popular-courses-inner">
                  <div className="px-4 px-xl-5 py-3 text-primary bg-white">
                    <div className='body-text-title'>{formatMessage(messages.popularCourses)}</div>
                  </div>
                  <div className="courses-bg d-flex flex-sm-nowrap flex-md-wrap p-4 pt-xl-5">
                    {
                        courses.map((item) => (
                            <div className="py-2 px-3 p-md-2 ">
                              <div className="card" id={item.id}>
                                <a className='course-card-img-wrapper' href={item.aboutPage}><img src={item.image} alt={item.name} /></a>
                                <a href={item.aboutPage} className="course-name">{item.name}</a>
                                <div className="description">{item.description}</div>
                                <a className="button course-btn" href={item.aboutPage}>
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
            </div>
          </section>

          <section id="user_guide_video" className="guide-video-wrapper">
            <div className="guide-video-area d-flex flex-column flex-xl-row flex-lg-nowrap px-4 px-xl-5 pb-5">
              <div className="video-blank-area"></div>
              <div className="guide-video text-white">
                <div className="px-sm-0 px-md-4 px-xl-5 py-3">
                  <div className="body-text-title">{formatMessage(messages.guide)}</div>
                  <span style={{width: '100px', height: '100px', backgroundImage: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAABWUlEQVR4nO2ZQW7CMBBFUU/SBSdppYo9gUUoZ2fBGRASVHpdgKWRgZrALrNSoDNEiElr0IEUzqp5r2ev9nT0/L3wnVYNxKHBRoZFRoXlQRDsDcybA7QC6DKw9O5OAkF6KyCsQfqsZzGAHo2e1yWnBe1R+HzonEAGYNEaKSuEG8TIpPq9a1kNCEWdVY2VhQ7VCzQ7ktP8OBahT+UUnBKEm6QWgQ2k5uVYUKz1wl4EGC4c1y8gXtdk8lmbjBNGngThcDiTn8sEJXgVGjlAbydnTm0ty3Z4Z6bZ2fSGcGGj6UdpaTff4hsni8KqjdrjL6qNNWdaIilPVofzHMTUKqt8O64D9J4G3DjgaGpBrtYqPzqRRhP4u6EvX2AfP3he0qQ7voQUtHx1rskX7tNbgfcA2aR9J5yD0agAAAABJRU5ErkJggg==)'}}></span>
                </div>
                <div className="videos bg-white d-flex flex-row flex-nowrap">
                  <div className="pr-4">
                    <a href="/home/faq/?role=student" className="link-title">
                      <img src={cdn + "/media/images/homepage-v2025/link-thumbnail-01.jpg"} />
                      <div className="px-3 pt-2">{formatMessage(messages.forLearners)}</div>
                    </a>
                  </div>
                  <div className="pl-4">
                    <a href="/home/faq/?role=instrustor" className="link-title">
                      <img src={cdn + "/media/images/homepage-v2025/link-thumbnail-02.jpg"} />
                      <div className="px-3 pt-2">{formatMessage(messages.forInstructors)}</div>
                    </a>
                  </div>
                </div>
                <Carousel className="video-carousel">
                  <Carousel.Item interval={5000}>
                    <div className="video-wrapper pr-md-4">
                    <a href="/home/faq/?role=student" className="link-title">
                      <img src={cdn + "/media/images/homepage-v2025/link-thumbnail-01.jpg"} />
                      <div className="text-white /*font-weight-bold px-3 pt-2*/">{formatMessage(messages.forLearners)}</div>
                    </a>
                  </div>
                  </Carousel.Item>
                  <Carousel.Item interval={5000}>
                    <div className="video-wrapper pl-md-4">
                    <a href="/home/faq/?role=instrustor" className="link-title">
                      <img src={cdn + "/media/images/homepage-v2025/link-thumbnail-02.jpg"} />
                      <div className="text-white /*font-weight-bold px-3 pt-2*/">{formatMessage(messages.forInstructors)}</div>
                    </a>
                  </div>
                  </Carousel.Item>
                </Carousel>
              </div>
            </div>
          </section>

          <section id="news_event" className="news-event-wrapper d-flex flex-column flex-xl-row flex-lg-nowrap px-sm-4 px-xl-5 pb-3">
            <div className="news-event-content d-flex flex-column flex-md-row flex-lg-nowrap justify-content-between">
              <div>
                <div className="news-events-text">
                  <a style={{color: 'var(--blue-active)'}} className='d-flex' href="/home/news/">{formatMessage(messages.newsInfo)}<Icon src={KeyboardArrowRight} className="mx-1" size="lg"/></a>
                </div>
                <Carousel interval={5000} indicators={true} slide={true} fade={false}>
                  {
                    news
                      .slice(0,5)
                      .map(i => (
                      <Carousel.Item key={i.id}>
                        <a onClick={(e) =>{
                              e.preventDefault();
                              openNewsModal(i.slug);
                            }
                          } href={'/home/news/' + i.slug}>
                          <img
                            className="/*d-block*/ w-100"
                            src={i.image}
                            alt={i.title}
                          />
                        </a>

                        <Carousel.Caption>
                          <a onClick={(e) =>{
                              e.preventDefault();
                              openNewsModal(i.slug);
                            }
                          } className="carousel-title" href={'/home/news/' + i.slug} >{i.title}</a>
                          <div className="carousel-description">{i.description}</div>
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
          </section>
          <NewsDetailModal base="/home/" ref={newsDetailsModalRef} />
        </div>
        <ChatBot />
      </div>
    </>
  );
};

export default BodyContent;
