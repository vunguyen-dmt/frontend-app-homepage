import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Footer from '@edx/frontend-component-footer';
import { useIntl } from '@edx/frontend-platform/i18n';
import { getConfig } from '@edx/frontend-platform';
import NavigationTopBar from '../components/NavigationTopBar/NavigationTopBar';
import {
   Breadcrumb,
} from '@openedx/paragon';
import './NewsDetail.scss';
import NewsBody from './NewsBody';
import messages from '../messages/messages';

const NewsDetail = () => {
  const { formatMessage } = useIntl();
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
      <Helmet><title>{formatMessage(messages.newsPageTitle, { siteName: getConfig().SITE_NAME })}</title></Helmet>
      <NavigationTopBar />
      <div className='news-content'>
        <Breadcrumb
        ariaLabel=""
        links={[
          { label: formatMessage(messages.home), href: '/home/' },
          { label: formatMessage(messages.news), href: '/home/news/' },
        ]}
        activeLabel=""
      />
        <NewsBody content={content} />
      </div>
      <Footer />
    </div>
  );
};

export default NewsDetail;