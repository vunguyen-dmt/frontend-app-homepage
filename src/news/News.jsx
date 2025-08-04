import React from 'react';
import { Helmet } from 'react-helmet';
import {
  Breadcrumb,
} from '@openedx/paragon';
import Footer from '@edx/frontend-component-footer';
import Header from '@edx/frontend-component-header';
import './News.scss';

const News = () => {
  var newsList = [
    {
        title: 'news 01',
        description: 'news 01 desc',
        date: new Date(),
        image: 'https://hutech-media.goamazing.org/hutech-statics/media/images/hutech-elearning-app-download-qr.png',
        slug: 'demo'
    },
        {
        title: 'news 01',
        description: 'news 01 desc',
        date: new Date(),
        image: 'https://hutech-media.goamazing.org/hutech-statics/media/images/hutech-elearning-app-download-qr.png'
    },
        {
        title: 'news 01',
        description: 'news 01 desc',
        date: new Date(),
        image: 'https://hutech-media.goamazing.org/hutech-statics/media/images/hutech-elearning-app-download-qr.png'
    },
        {
        title: 'news 01',
        description: 'news 01 desc',
        date: new Date(),
        image: 'https://hutech-media.goamazing.org/hutech-statics/media/images/hutech-elearning-app-download-qr.png'
    },
        {
        title: 'news 01',
        description: 'news 01 desc',
        date: new Date(),
        image: 'https://hutech-media.goamazing.org/hutech-statics/media/images/hutech-elearning-app-download-qr.png'
    }
  ];
  return (
    <div className="news-list">
        <Helmet><title>News | HUTECH eLearning</title></Helmet>
        <Header />

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
                newsList.map(i => (
                    <div><a href={'/news/' + i.slug}>{i.title}</a></div>
                ))
             }
            </div>
        </div>
     
      <Footer showLanguageSelector />
    </div>
  );
};

export default News;