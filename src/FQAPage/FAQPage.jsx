import React, { useEffect, useState } from 'react';
import Footer from '@edx/frontend-component-footer';
import Header from '@edx/frontend-component-header';
import {
  Collapsible, Breadcrumb,
} from '@edx/paragon';
import * as qs from 'qs';
import { Helmet } from 'react-helmet';
import { handleLanguageChange } from '../handleLanguageChange';
import './FAQPage.scss';

const FAQPage = () => {
  const [FAQList, setFAQList] = useState([]);
  const roles = ['student', 'instructor'];
  const parseRole = () => {
    const { role } = qs.parse(window.location.search, { ignoreQueryPrefix: true });
    return roles.includes(role) ? role : 'student';
  };

  useEffect(() => {
    const url = `https://hutech-statics.s3.ap-southeast-1.amazonaws.com/media/home-page-resources/${parseRole()}-faq.json?t=${+new Date()}`;
    // const url = `https://apps.courses.goamazing.org:3000/${parseRole()}-faq.json?t=${+new Date()}`;
    fetch(url).then(response => response.json())
      .then(data => {
        setFAQList(data.data);
      }).catch(err => {
        console.log(`error loading faq: ${err}`);
      });
  }, []);

  return (
    <div>
      <Helmet><title>FQA | HUTECH eLearning</title></Helmet>
      <Header />
      <div className="faq-wrapper mx-auto container-mw-lg">
        <Breadcrumb
          ariaLabel="Breadcrumb is active"
          links={[
            { label: 'Trang chủ', href: 'https://apps.lms.hutech.edu.vn/home' },
          ]}
          activeLabel="FAQ"
        />
        <div className="font-weight-bold py-3 text-center tl">FQA - Các câu hỏi thường gặp</div>
        {
            FAQList.map(item => (
              <Collapsible
                className="collapsible-card"
                title={item.question}
              >
                <div dangerouslySetInnerHTML={{ __html: item.answer }} />
              </Collapsible>
            ))
        }
      </div>
      <Footer
        supportedLanguages={[
          { label: 'English', value: 'en' },
          { label: 'Tiếng Việt', value: 'vi' },
        ]}
        onLanguageSelected={handleLanguageChange}
      />
    </div>
  );
};

export default FAQPage;
