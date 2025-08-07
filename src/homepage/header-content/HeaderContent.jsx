import React, { useEffect } from 'react';
import { useIntl } from '@edx/frontend-platform/i18n';
import {
  SearchField, Badge,
} from '@openedx/paragon';
import { searchCourse } from '../../services/search-service/searchService';
import NavigationTopBar from '../../components/NavigationTopBar/NavigationTopBar';
import messages from '../../messages/messages';
import './HeaderContent.scss';

const HeaderContent = () => {

  // const cdn = "https://d10g66pf9vjy7h.cloudfront.net";
  const cdn = "https://hutech-media.goamazing.org/hutech-statics";

  const { formatMessage } = useIntl();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [dropdownCourses, setDropdownCourses] = React.useState([]);
  const setSearchBoxAutoCompleteOff = React.useRef(false);
  let searchDropdownTimerId;

  useEffect(() => {
    if (!setSearchBoxAutoCompleteOff.current) {
      document.querySelector('.search-area input[role="searchbox"]')?.setAttribute('autoComplete', 'off');
      setSearchBoxAutoCompleteOff.current = true;
    }
    const delay = 500;
    clearTimeout(searchDropdownTimerId);
    if (searchQuery) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      searchDropdownTimerId = setTimeout(() => {
        searchCourse({
          page: 1,
          limit: 5,
          query: searchQuery,
        }).then(response => {
          setDropdownCourses(response.data);
        });
      }, delay);
    }
    return () => {
      clearTimeout(searchDropdownTimerId);
    };
  }, [searchQuery]);

  const searchBoxOnChangeHandle = async (value) => {
    if (searchQuery !== value) {
      setSearchQuery(value);
    }
  };

  const searchSubmittedHandle = () => {
    window.location.href = `/courses/?q=${searchQuery}`;
  };

  const searchClearHandle = () => {
    setDropdownCourses([]);
  };

  const goToCourseAboutPage = (courseId) => {
    window.location.href = `/courses/${courseId}`;
  };

  return (
    <>
      <NavigationTopBar />
      <header>
        <section className="banner">
          <div className="text-over">
            <div className="text-wrapper">
              <div className="text-title">{formatMessage(messages.learning)}</div>
              <div className="text-title margin-bottom-20">{formatMessage(messages.managementSystem)}</div>
              <div className="text-name">HUTECH</div>
              <div className="search-area">
                <SearchField
                  submitButtonLocation="external"
                  buttonText={formatMessage(messages.Search)}
                  placeholder={formatMessage(messages.FindYourCourses)}
                  value={searchQuery}
                  onSubmit={searchSubmittedHandle}
                  onChange={searchBoxOnChangeHandle}
                  onClear={searchClearHandle}
                />
                {
                  dropdownCourses && dropdownCourses.results && dropdownCourses.results.length > 0
                  && (
                  <div className="search-dropdown shadow">
                    <ul>
                      {
                      dropdownCourses.results.map((item) => (
                        <li key={item.id}><a onClick={() => goToCourseAboutPage(item.id)}>{item.display_name} <Badge variant="light">{item.display_org_with_default}</Badge> <Badge variant="dark">{item.display_number_with_default}</Badge></a></li>
                      ))
                    }
                      {dropdownCourses.total > 5 && <li className="view-all-search-result"><a onClick={searchSubmittedHandle}>{formatMessage(messages.viewAllResults)}</a></li>}
                    </ul>
                  </div>
                  )
                }
              </div>
            </div>
          </div>
          <video autoPlay loop muted preload="auto" className="main-video">
            <source src={cdn + "/media/videos/background_chinh.mp4"} type="video/mp4"/>
          </video>
        </section>
        
        <section id="programs" className="programs d-flex flex-lg-nowrap flex-column flex-md-row /*text-white text-center*/">
          <div className="first-program w-100 py-md-4 p-1">
            <a href="/courses/?page=1&language=&org=TH,DU,DDXN,HQH,HT,MC,KHQHCC,LU,MARQT,NB,DL,QT,NN,TQH,TT,TYCN,XD&run=">{formatMessage(messages.underGraduate)}</a>
          </div>
          <div className="second-program w-100 py-md-4 p-1">
            <a href="/courses/?page=1&language=&org=SDH&run=">{formatMessage(messages.postgraduate)}</a>
          </div>
          <div className="last-program w-100 py-md-4 p-1">
            <a href="/courses/?page=1&language=&org=DHS&run=">{formatMessage(messages.shortTermCourses)}</a>
          </div>
        </section>
      </header>
    </>
  );
};

export default HeaderContent;
