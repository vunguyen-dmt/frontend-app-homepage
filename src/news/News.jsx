import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet';
import {
  Breadcrumb
} from '@openedx/paragon';
import './News.scss';
import newsList from './news_list';
import Footer from '@edx/frontend-component-footer';
import { useIntl } from '@edx/frontend-platform/i18n';
import { getConfig } from '@edx/frontend-platform';
import NavigationTopBar from '../components/NavigationTopBar/NavigationTopBar';
import NewsDetailModal from './NewsDetailsModal';
import messages from '../messages/messages';

const News = () => {
  const { formatMessage } = useIntl();
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const news = newsList.sort((a, b) => new Date(b.date) - new Date(a.date));
  const newsDetailsModalRef = useRef();
  const totalPages = Math.ceil(news.length / itemsPerPage);
  const currentData = news.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  const pageButtons = Array.from({ length: totalPages }, (_, index) => (
    <button
      key={index}
      onClick={() => setCurrentPage(index + 1)}
      style={{
        margin: "0 4px",
        padding: "6px 12px",
        backgroundColor: currentPage === index + 1 ? "var(--blue-active)" : "#eee",
        color: currentPage === index + 1 ? "#fff" : "#000",
        border: "1px solid #ccc",
        cursor: "pointer",
      }}
    >
      {index + 1}
    </button>
  ));

  const openNewsModal = (slug) => {
    newsDetailsModalRef.current.openModal(slug);
  }

  return (
    <>
      <div className="news-list">
        <Helmet><title>{formatMessage(messages.newsPageTitle, { siteName: getConfig().SITE_NAME })}</title></Helmet>
        <NavigationTopBar />
        <div className="news-list-content">
            <Breadcrumb
                ariaLabel=""
                links={[
                    { label: formatMessage(messages.home), href: '/home/' },
                ]}
                activeLabel={formatMessage(messages.news)}
            />
            <div className='new-list-items'>
              {
                currentData.map((item, index) => (
                  <div key={index} className="d-flex flex-column flex-sm-row">
                    <div>
                      <a onClick={(e) =>{
                              e.preventDefault();
                              openNewsModal(item.slug);
                            }
                          } href={'/home/news/' + item.slug}><img src={item.image} alt=''/></a>
                    </div>
                    <div className="news-text">
                      <a onClick={(e) =>{
                              e.preventDefault();
                              openNewsModal(item.slug);
                            }
                          } className='news-title' href={'/home/news/' + item.slug}>{item.title}</a>
                      <div className="news-date">{item.date.toLocaleDateString("vi-VN")}</div>
                      <div>{item.description}</div>
                    </div>
                  </div>
                ))
              }
            </div>
            {
              totalPages > 1 && <div className="page-button">{pageButtons}</div>
            }
        </div>
        <NewsDetailModal base="/home/news/" ref={newsDetailsModalRef} />
        <Footer />
      </div>
    </>
  );
};

export default News;