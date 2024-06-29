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
        <div className="banner container">
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
          <img alt="banner" src="https://d10g66pf9vjy7h.cloudfront.net/media/home-page-resources/a-man-holds-a-laptop.png" />
        </div>
      </header>
    </>
  );
};

export default HeaderContent;
