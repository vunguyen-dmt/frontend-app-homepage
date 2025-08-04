import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Helmet } from 'react-helmet';
import Footer from '@edx/frontend-component-footer';
import Header from '@edx/frontend-component-header';
import {
   Breadcrumb,
} from '@openedx/paragon';
import './NewsDetail.scss';

const NewsDetail = () => {
  const { slug } = useParams();
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const module = await import(`!raw-loader!../news/news/${slug}.md`);
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
    <div className="news-detail">
      <Helmet><title>News | HUTECH eLearning</title></Helmet>
      <Header />
      <div className='news-content'>
        <Breadcrumb
        ariaLabel="Breadcrumb is active"
        links={[
          { label: 'Trang chủ', href: '/home/' },
          { label: 'Tin tức', href: '/news/' },
        ]}
        activeLabel=""
      />
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
      <Footer showLanguageSelector />
    </div>
  );
};

export default NewsDetail;