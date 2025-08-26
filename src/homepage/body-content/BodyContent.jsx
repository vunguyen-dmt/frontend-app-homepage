import React, { useState, useEffect, useRef  } from 'react';
import { useIntl } from '@edx/frontend-platform/i18n';
import {
  KeyboardArrowRight, AutoStories, EventNote
} from '@openedx/paragon/icons';
import {
   Icon, Carousel, Card
} from '@openedx/paragon';
import SearchFilter from '../../components/SearchFilter/SearchFilter';
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
  const news = newsList.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 4);
  const cdn = "https://hutech-media.goamazing.org/hutech-statics";

  var events = [
    {
        id: 1,
        eventName: 'Hướng dẫn sử dụng hệ thống HUTECH eLearning cho tân sinh viên khóa 2025.',
        weekday: 'Thứ 2',
        date: '01/09/2025   ',
    },
    {
        id: 2,
        eventName: 'Tập huấn vận hành khóa học điện tử trên hệ thống Hutech eLearning - HK1/ 2025-2026 dành cho Giảng viên.',
        weekday: 'Thứ 7',
        date: '23/08/2025 08:30',
    },
    {
        id: 3,
        eventName: 'Hướng dẫn quay - dựng video bài giảng điện tử dành cho giảng viên.',
        weekday: 'Thứ 6',
        date: '15/08/2025 14:30',
    },
];

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
        } else {
          i.count = '-';
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
    <div className='home-body'>
      <div className='container'>
        <div className="row r1">
          <div class="col-xl-2">
            <div className="course-filter-options">
              <div className="blank-area"></div>
              <div className="search-common-course">
                <div className="icon-info">
                  <img src={cdn + "/media/images/homepage-v2025/icon_1.png"} alt="icon_1" />
                  <SearchFilter data={filterRuns} nameFilter={formatMessage(messages.semesters)} type="semester"/>
                </div>
                <div className="icon-info-line"></div>
                <div className="icon-info">
                  <img src={cdn + "/media/images/homepage-v2025/icon_2.png"} alt="icon_2" />
                  <SearchFilter data={faculties} nameFilter={formatMessage(messages.faculties)} type="unit"/>
                </div>
                <div className="icon-info-line"></div>
              </div>
            </div>
          </div>
          <div class="col-xl-8">
            <div className='lg-title primary-text'>{formatMessage(messages.popularCourses)}</div>
            <div className='courses-wrapper'>
              <div className='courses'>
                {courses.map((course)=> (
                  <Card key={course.id}>
                    <a className='course-card-img-wrapper' href={course.aboutPage}>
                      <Card.ImageCap
                        src={course.image}
                        srcAlt="Card image"
                    />
                    </a>
                    <Card.Section className="text-center">
                      <div className='name'><a href={course.aboutPage}>{course.name}</a></div>
                      <p>{course.description}</p>
                    </Card.Section>
                    <div className='bottom'>
                      <div>
                          <Icon src={AutoStories} />
                          {messages[course.tag] ? formatMessage({...messages[course.tag]}) : course.tag}
                        </div>
                        <div>                                    
                          <Icon src={EventNote} />
                          {course.numberOfLessons} {formatMessage(messages.Lessons)}
                        </div>
                    </div>
                  </Card>
                ))}
              </div>
              <a className="viewmore-btn" href="/courses/">{formatMessage(messages.viewMore)}</a>
            </div>
          </div>
          <div class="col-xl-2"></div>
        </div>
      </div>
      <div className='primary-bg'>
        <div className='container'>
          <div className="row r2">
            <div class="col-xl-8 mx-auto">
              <div className='lg-title text-white'>{formatMessage(messages.guide)}</div>
              <div className='container guide-items'>
                  <div className='row'>
                  <div className='col-md-6'>
                    <a href="/home/faq/?role=student"><img src={cdn + "/media/images/homepage-v2025/link-thumbnail-01.jpg"} /></a>
                    <div className="px-3 pt-2">{formatMessage(messages.forLearners)}</div>
                  </div>
                  <div className='col-md-6'>
                    <a href='https://dlc.hutech.edu.vn/docs/gioi-thieu/'><img src={cdn + "/media/images/homepage-v2025/link-thumbnail-02.jpg"} /></a>
                    <div className="px-3 pt-2">{formatMessage(messages.forInstructors)}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row r3">
          <div class="col-xl-8 mx-auto">
            <div className='container news-events px-0'>
              <div className='row'>
                <div className='col-md-7'>
                  <div><a className='news-title md-title' href="/home/news/">{formatMessage(messages.newsInfo)}<Icon src={KeyboardArrowRight} /></a></div>
                  <Carousel interval={5000} indicators={true} slide={true} fade={false}>
                    {
                      news.map(i => (
                        <Carousel.Item key={i.id}>
                          <a className='news-img-wrapper' onClick={(e) =>{e.preventDefault();openNewsModal(i.slug);}} 
                            href={'/home/news/' + i.slug}
                            style={{backgroundImage: 'url('+i.image+')'}}>
                          </a>
                          <div><a className='title' onClick={(e) =>{ e.preventDefault(); openNewsModal(i.slug);}} href={'/home/news/' + i.slug}>{i.title}</a></div>
                          <div className='description'>{i.description}</div>
                        </Carousel.Item>
                      ))
                    }
                  </Carousel>
                </div>
                <div className='col-md-1'></div>
                <div className='col-md-4'>
                  <div className='md-title event-title'>{formatMessage(messages.newsEvent)}</div>
                  <div className='container event-container'>
                    {
                      events.map((event) => (
                        <div className='event row' key={event.id}>
                          <div className='col-lg-5'>
                            <div>
                              <div>{event.weekday}</div>
                              <div>{event.date}</div>
                            </div>
                          </div>
                          <div className='col-lg-7'>{event.eventName}</div>
                        </div>
                      ))
                    }
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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

      <ChatBot />
      <NewsDetailModal base="/home/" ref={newsDetailsModalRef} />
    </div>
    </div>
  );
};

export default BodyContent;
