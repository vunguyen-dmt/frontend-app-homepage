import React, { useEffect } from 'react';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { getConfig } from '@edx/frontend-platform';
import {
  SearchField, Badge,
} from '@edx/paragon';
import { searchCourse } from '../../services/search-service/searchService';
import NavigationTopBar from '../../components/NavigationTopBar/NavigationTopBar';
import messages from '../../messages/messages';
import IMAGES from '../../images/images';
import './HeaderContent.scss';

const HeaderContent = ({ intl }) => {
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
      searchDropdownTimerId = setTimeout(() => {
        searchCourse({
          page: 1,
          limit: 11,
          query: searchQuery,
        }).then(response => {
          setDropdownCourses(response.data.results);
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
    window.location.href = `/courses?q=${searchQuery}`;
  };

  const searchClearHandle = () => {
    setDropdownCourses([]);
  };

  const goToCourseAboutPage = (courseId) => {
    window.location.href = `${getConfig().PUBLIC_PATH}${courseId}`;
  };

  return (
    <>
      <NavigationTopBar />
      <header>
        <div className="banner container">
          <div className="text-over">
            <div className="text-wrapper">
              <div className="text-title">{intl.formatMessage(messages.learning)}</div>
              <div className="text-title margin-bottom-20">{intl.formatMessage(messages.managementSystem)}</div>
              <div className="text-name">HUTECH</div>
              {/* <div className="search-area">
                <SearchField
                  submitButtonLocation="external"
                  buttonText={intl.formatMessage(messages.Search)}
                  placeholder={intl.formatMessage(messages['Find your courses'])}
                  value={searchQuery}
                  onSubmit={searchSubmittedHandle}
                  onChange={searchBoxOnChangeHandle}
                  onClear={searchClearHandle}
                />
                {
                  dropdownCourses.length > 0
                  && (
                  <div className="search-dropdown shadow">
                    <ul>
                      {
                      dropdownCourses.map((item) => (
                        <li key={item.id}><a onClick={() => goToCourseAboutPage(item.data.id)}>{item.data.content.display_name} <Badge variant="light">{item.data.org}</Badge> <Badge variant="dark">{item.data.number}</Badge></a></li>
                      ))
                    }
                      {dropdownCourses.length > 10 && <li className="view-all-search-result"><a onClick={searchSubmittedHandle}>{intl.formatMessage(messages['View all results'])}</a></li>}
                    </ul>
                  </div>
                  )
                }
              </div> */}
            </div>
          </div>
          <img alt="banner" data-aos="slide-leftx" data-aos-easing="ease-in-out" data-aos-duration="900" src={IMAGES.banner} />
        </div>
      </header>
    </>
  );
};

HeaderContent.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(HeaderContent);
