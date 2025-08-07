import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {
  Breadcrumb, Carousel, ModalDialog, Button, useToggle
} from '@openedx/paragon';
import ReactMarkdown from 'react-markdown';
import './News.scss';
import newsList from './news_list';
import Footer from '@edx/frontend-component-footer';
import Header from '@edx/frontend-component-header';
import NavigationTopBar from '../components/NavigationTopBar/NavigationTopBar';

const News = () => {

  const { slug } = useParams();
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(newsList.length / itemsPerPage);

  // Data for current page
  const currentData = newsList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Create page buttons
  const pageButtons = Array.from({ length: totalPages }, (_, index) => (
    <button
      key={index}
      onClick={() => setCurrentPage(index + 1)}
      style={{
        margin: "0 4px",
        padding: "6px 12px",
        backgroundColor: currentPage === index + 1 ? "#007bff" : "#eee",
        color: currentPage === index + 1 ? "#fff" : "#000",
        border: "1px solid #ccc",
        cursor: "pointer",
      }}
    >
      {index + 1}
    </button>
  ));

  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const module = await import(`!raw-loader!../news/news/demo.md`);
        setContent(module.default);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchNews();
  }, [slug]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!content) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="news-list">
        <Helmet><title>News | HUTECH eLearning</title></Helmet>
        <NavigationTopBar />
        {/* <Header /> */}

        <div className="news-list-content">
            <Breadcrumb
                ariaLabel="Breadcrumb is active"
                links={[
                    { label: 'Trang chủ', href: '/home/' },
                    { label: 'Tin tức', href: '/news/' },
                ]}
                activeLabel=""
            />
            <div className='new-list-items'>
              {
                currentData.map((item, index) => (
                  <div key={index} className="d-flex flex-column flex-sm-row">
                    <div>
                      <img src={item.image} alt=''/>
                    </div>
                    <div className="news-text">
                      <div className="news-date">{item.date.toLocaleDateString("vi-VN")}</div>
                      <a href={'/news/' + item.slug}>{item.title}</a>
                      <div>{item.description}</div>
                    </div>
                  </div>
                ))
              }
            </div>
            <div className="page-button">{pageButtons}</div>
        </div>
      
        <Footer showLanguageSelector />
      </div>
    </>
  );
};

export default News;